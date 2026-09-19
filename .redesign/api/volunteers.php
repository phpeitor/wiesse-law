<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
$apiKey = '';

if (is_readable($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);

        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        if (trim($key) === 'VOLUNTEERS_API_KEY') {
            $apiKey = trim($value, " \t\n\r\0\x0B\"");
            break;
        }
    }
}

$providedKey = (string) ($_SERVER['HTTP_X_API_KEY'] ?? '');
if ($apiKey === '' || $providedKey === '' || !hash_equals($apiKey, $providedKey)) {
    http_response_code(401);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

$parseDate = static function (?string $value): ?DateTimeImmutable {
    if ($value === null || $value === '') {
        return null;
    }

    try {
        return new DateTimeImmutable($value);
    } catch (Exception $exception) {
        return null;
    }
};

$since = $parseDate(isset($_GET['since']) ? (string) $_GET['since'] : null);
$until = $parseDate(isset($_GET['until']) ? (string) $_GET['until'] : null);

if ((isset($_GET['since']) && $since === null) || (isset($_GET['until']) && $until === null)) {
    http_response_code(422);
    echo json_encode(['error' => 'since y until deben ser fechas válidas']);
    exit;
}

if ($since !== null && $until !== null && $since > $until) {
    http_response_code(422);
    echo json_encode(['error' => 'since no puede ser posterior a until']);
    exit;
}

$limit = filter_var($_GET['limit'] ?? 100, FILTER_VALIDATE_INT, [
    'options' => ['default' => 100, 'min_range' => 1, 'max_range' => 500],
]);
$offset = filter_var($_GET['offset'] ?? 0, FILTER_VALIDATE_INT, [
    'options' => ['default' => 0, 'min_range' => 0],
]);

if ($limit === false || $offset === false) {
    http_response_code(422);
    echo json_encode(['error' => 'limit debe estar entre 1 y 500, y offset debe ser positivo']);
    exit;
}

$storageFile = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . 'volunteers.json';
$storageHandle = fopen($storageFile, 'rb');

if ($storageHandle === false || !flock($storageHandle, LOCK_SH)) {
    http_response_code(500);
    echo json_encode(['error' => 'No se pudo leer el almacenamiento']);
    exit;
}

$storedData = stream_get_contents($storageHandle);
flock($storageHandle, LOCK_UN);
fclose($storageHandle);

$records = json_decode($storedData ?: '[]', true);
if (!is_array($records)) {
    http_response_code(500);
    echo json_encode(['error' => 'El almacenamiento no contiene JSON válido']);
    exit;
}

$filteredRecords = array_values(array_filter($records, static function ($record) use ($since, $until, $parseDate): bool {
    if (!is_array($record) || !isset($record['created_at'])) {
        return false;
    }

    $createdAt = $parseDate((string) $record['created_at']);
    if ($createdAt === null) {
        return false;
    }

    return ($since === null || $createdAt >= $since)
        && ($until === null || $createdAt <= $until);
}));

$total = count($filteredRecords);
$data = array_slice($filteredRecords, $offset, $limit);

echo json_encode([
    'data' => $data,
    'count' => count($data),
    'total' => $total,
    'has_more' => ($offset + count($data)) < $total,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
