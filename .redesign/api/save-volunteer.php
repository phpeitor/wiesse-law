<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos inválidos']);
    exit;
}

$fields = [
    'dni' => trim((string) ($payload['dni'] ?? '')),
    'fecha_nacimiento' => trim((string) ($payload['fecha_nacimiento'] ?? '')),
    'nombres' => trim((string) ($payload['nombres'] ?? '')),
    'apellidos' => trim((string) ($payload['apellidos'] ?? '')),
    'email' => trim((string) ($payload['email'] ?? '')),
    'telefono' => trim((string) ($payload['telefono'] ?? '')),
    'comentario' => trim((string) ($payload['comentario'] ?? '')),
];

foreach ($fields as $value) {
    if ($value === '') {
        http_response_code(422);
        echo json_encode(['error' => 'Todos los campos son obligatorios']);
        exit;
    }
}

if (!preg_match('/^\d{8}$/', $fields['dni'])) {
    http_response_code(422);
    echo json_encode(['error' => 'El DNI debe tener 8 dígitos']);
    exit;
}

$birthDate = DateTimeImmutable::createFromFormat('!Y-m-d', $fields['fecha_nacimiento']);
$birthDateErrors = DateTimeImmutable::getLastErrors();
$birthDateIsValid = $birthDate !== false
    && ($birthDateErrors === false || ($birthDateErrors['warning_count'] === 0 && $birthDateErrors['error_count'] === 0));
$latestAllowedBirthDate = new DateTimeImmutable('today');
$latestAllowedBirthDate = $latestAllowedBirthDate->modify('-16 years');

if (!$birthDateIsValid || $birthDate > $latestAllowedBirthDate) {
    http_response_code(422);
    echo json_encode(['error' => 'Debes tener al menos 16 años']);
    exit;
}

$normalizedPhone = preg_replace('/\D+/', '', $fields['telefono']);
if ($normalizedPhone === null || !preg_match('/^9\d{8}$/', $normalizedPhone)) {
    http_response_code(422);
    echo json_encode(['error' => 'El teléfono no es válido']);
    exit;
}
$fields['telefono'] = $normalizedPhone;

if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'El correo electrónico no es válido']);
    exit;
}

$storageDirectory = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage';
$storageFile = $storageDirectory . DIRECTORY_SEPARATOR . 'volunteers.json';

if (!is_dir($storageDirectory) && !mkdir($storageDirectory, 0750, true)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo preparar el almacenamiento']);
    exit;
}

$storageHandle = fopen($storageFile, 'c+');
if ($storageHandle === false || !flock($storageHandle, LOCK_EX)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar la solicitud']);
    exit;
}

$storedData = stream_get_contents($storageHandle);
$records = json_decode($storedData ?: '[]', true);
$records = is_array($records) ? $records : [];

foreach ($records as $record) {
    $recordPhone = preg_replace('/\D+/', '', (string) ($record['telefono'] ?? ''));
    if (($record['dni'] ?? '') === $fields['dni'] || $recordPhone === $fields['telefono']) {
        flock($storageHandle, LOCK_UN);
        fclose($storageHandle);
        http_response_code(409);
        echo json_encode(['error' => 'El DNI o teléfono ya tiene una solicitud registrada']);
        exit;
    }
}

$fields['id'] = bin2hex(random_bytes(8));
$fields['created_at'] = (new DateTimeImmutable())->format(DateTimeInterface::ATOM);
$records[] = $fields;
$json = json_encode($records, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

rewind($storageHandle);
if ($json === false || ftruncate($storageHandle, 0) === false || fwrite($storageHandle, $json . PHP_EOL) === false) {
    flock($storageHandle, LOCK_UN);
    fclose($storageHandle);
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo guardar la solicitud']);
    exit;
}

fflush($storageHandle);
flock($storageHandle, LOCK_UN);
fclose($storageHandle);

echo json_encode([
    'success' => true,
    'message' => 'Solicitud guardada correctamente.',
]);
