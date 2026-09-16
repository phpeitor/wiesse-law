<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
$weatherApi = null;

if (is_readable($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);

        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);

        if (strlen($value) >= 2 && $value[0] === '"' && substr($value, -1) === '"') {
            $value = substr($value, 1, -1);
        }

        if ($key === 'WEATHER_API') {
            $weatherApi = $value;
            break;
        }
    }
}

if (!$weatherApi || !filter_var($weatherApi, FILTER_VALIDATE_URL)) {
    http_response_code(500);
    echo json_encode(['error' => 'WEATHER_API no está configurada correctamente']);
    exit;
}

$today = (new DateTimeImmutable('now'))->format('Y-m-d');
$query = http_build_query([
    'start_date' => $today,
    'end_date' => $today,
    'hourly' => 'temperature_2m',
    'timezone' => 'auto',
]);
$separator = str_contains($weatherApi, '?') ? '&' : '?';
$requestUrl = $weatherApi . $separator . $query;

$curl = curl_init($requestUrl);
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_FAILONERROR => false,
]);
$response = curl_exec($curl);
$status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
$error = curl_error($curl);
curl_close($curl);

if ($response === false || $error !== '' || $status < 200 || $status >= 300) {
    http_response_code(502);
    echo json_encode(['error' => 'No se pudo consultar el servicio meteorológico']);
    exit;
}

echo $response;