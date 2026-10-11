<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['error' => 'Método no permitido']);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || strlen($rawBody) > 12000) {
    respond(413, ['error' => 'La solicitud es demasiado grande']);
}

$payload = json_decode($rawBody, true);
if (!is_array($payload)) {
    respond(400, ['error' => 'Datos inválidos']);
}

$type = (string) ($payload['type'] ?? '');
$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));

if ($name === '' || mb_strlen($name) > 120) {
    respond(422, ['error' => 'Escribe tu nombre (máximo 120 caracteres).']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    respond(422, ['error' => 'Escribe un correo electrónico válido.']);
}

if ($type === 'contact') {
    $subject = trim((string) ($payload['subject'] ?? ''));
    $message = trim((string) ($payload['message'] ?? ''));
    if ($subject === '' || mb_strlen($subject) > 160) {
        respond(422, ['error' => 'Escribe el asunto de tu consulta (máximo 160 caracteres).']);
    }
    if ($message === '' || mb_strlen($message) > 5000) {
        respond(422, ['error' => 'Escribe tu mensaje (máximo 5000 caracteres).']);
    }
    $record = [
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
    ];
    $storageFileName = 'contact-inquiries.json';
    $successMessage = 'Tu consulta fue enviada correctamente. Gracias por contactarnos.';
} elseif ($type === 'newsletter') {
    $record = [
        'name' => $name,
        'email' => $email,
    ];
    $storageFileName = 'newsletter-subscribers.json';
    $successMessage = '¡Gracias por suscribirte! Ya estás en nuestra lista de novedades.';
} else {
    respond(400, ['error' => 'Tipo de formulario inválido']);
}

$storageDirectory = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage';
if (!is_dir($storageDirectory) && !mkdir($storageDirectory, 0750, true) && !is_dir($storageDirectory)) {
    respond(500, ['error' => 'No se pudo preparar el almacenamiento']);
}

$storagePath = $storageDirectory . DIRECTORY_SEPARATOR . $storageFileName;
$handle = fopen($storagePath, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    if (is_resource($handle)) {
        fclose($handle);
    }
    respond(500, ['error' => 'No se pudo guardar la información']);
}

$contents = stream_get_contents($handle);
$records = json_decode($contents === false || trim($contents) === '' ? '[]' : $contents, true);
if (!is_array($records)) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(500, ['error' => 'El archivo de almacenamiento contiene JSON inválido']);
}

if ($type === 'newsletter') {
    foreach ($records as $existingRecord) {
        if (strcasecmp((string) ($existingRecord['email'] ?? ''), $email) === 0) {
            flock($handle, LOCK_UN);
            fclose($handle);
            respond(409, ['error' => 'Este correo ya está suscrito.']);
        }
    }
}

$record['id'] = bin2hex(random_bytes(8));
$record['created_at'] = (new DateTimeImmutable())->format(DateTimeInterface::ATOM);
$records[] = $record;
$json = json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

rewind($handle);
if ($json === false || !ftruncate($handle, 0) || fwrite($handle, $json . PHP_EOL) === false || !fflush($handle)) {
    flock($handle, LOCK_UN);
    fclose($handle);
    respond(500, ['error' => 'No se pudo guardar la información']);
}

flock($handle, LOCK_UN);
fclose($handle);
respond(200, ['success' => true, 'message' => $successMessage]);
