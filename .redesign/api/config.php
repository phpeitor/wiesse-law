<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$envPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.env';
$calendifyUrl = '';

if (is_readable($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        if (trim($key) !== 'CALENDIFY_URL') {
            continue;
        }

        $calendifyUrl = trim($value);
        if (strlen($calendifyUrl) >= 2 && $calendifyUrl[0] === '"' && substr($calendifyUrl, -1) === '"') {
            $calendifyUrl = substr($calendifyUrl, 1, -1);
        }
        break;
    }
}

$urlParts = parse_url($calendifyUrl);
if (!filter_var($calendifyUrl, FILTER_VALIDATE_URL)
    || !is_array($urlParts)
    || !in_array(strtolower($urlParts['scheme'] ?? ''), ['http', 'https'], true)
    || empty($urlParts['host'])) {
    http_response_code(500);
    echo json_encode(['error' => 'CALENDIFY_URL no está configurada correctamente']);
    exit;
}

echo json_encode(['calendifyUrl' => $calendifyUrl], JSON_UNESCAPED_SLASHES);
