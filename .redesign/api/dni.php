<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$dni = $_GET['dni'] ?? '';
if (!preg_match('/^\d{8}$/', $dni)) {
    http_response_code(400);
    echo json_encode(['error' => 'El DNI debe tener 8 dígitos']);
    exit;
}

function readEnvValue(string $key): ?string
{
    $envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
    if (!is_readable($envPath)) {
        return null;
    }

    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }

        [$currentKey, $value] = explode('=', $line, 2);
        if (trim($currentKey) !== $key) {
            continue;
        }

        $value = trim($value);
        if (strlen($value) >= 2 && $value[0] === '"' && substr($value, -1) === '"') {
            $value = substr($value, 1, -1);
        }
        return $value;
    }

    return null;
}

function requestJson(string $url): ?array
{
    $curl = curl_init($url);
    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
    ]);
    $response = curl_exec($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($response === false || $status < 200 || $status >= 300) {
        return null;
    }

    $data = json_decode($response, true);
    return is_array($data) ? $data : null;
}

$primaryUrl = readEnvValue('API_DNI_URL');
$fallbackUrl = readEnvValue('API_DNI_URL_2');
$data = null;

if ($primaryUrl) {
    $data = requestJson($primaryUrl . urlencode($dni));
}

if (!$data && $fallbackUrl) {
    if (strpos($fallbackUrl, 'val=') !== false) {
        $fallbackRequestUrl = preg_replace('/val=[^&]*/', 'val=' . urlencode($dni), $fallbackUrl);
    } else {
        $separator = str_contains($fallbackUrl, '?') ? '&' : '?';
        $fallbackRequestUrl = $fallbackUrl . $separator . 'type=dni&val=' . urlencode($dni);
    }
    $data = requestJson($fallbackRequestUrl);
}

if (!$data) {
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo consultar el DNI']);
    exit;
}

$name = trim((string) ($data['nombre'] ?? $data['name'] ?? ''));
$nombres = trim((string) ($data['nombres'] ?? ''));
$apellidos = trim((string) ($data['apellidoPaterno'] ?? '') . ' ' . (string) ($data['apellidoMaterno'] ?? ''));

if ($nombres === '' && $apellidos === '' && $name !== '') {
    $parts = preg_split('/\s+/', $name);
    $nombres = (string) array_pop($parts);
    $apellidos = trim(implode(' ', $parts));
}

echo json_encode([
    'nombres' => $nombres,
    'apellidos' => $apellidos,
    'nombreCompleto' => $name,
]);
