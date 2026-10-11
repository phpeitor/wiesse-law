<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';
$config = [
    'calendifyUrl' => '',
    'phone' => '',
    'whatsapp' => '',
];

if (is_readable($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || $line[0] === '#' || strpos($line, '=') === false) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $configKey = [
            'CALENDIFY_URL' => 'calendifyUrl',
            'PHONE' => 'phone',
            'WHATSAPP' => 'whatsapp',
        ][$key] ?? null;
        if ($configKey === null) {
            continue;
        }

        $value = trim($value);
        if (strlen($value) >= 2 && $value[0] === '"' && substr($value, -1) === '"') {
            $value = substr($value, 1, -1);
        }
        $config[$configKey] = $value;
    }
}

$isHttpUrl = static function (string $url): bool {
    $parts = parse_url($url);
    return filter_var($url, FILTER_VALIDATE_URL) !== false
        && is_array($parts)
        && in_array(strtolower($parts['scheme'] ?? ''), ['http', 'https'], true)
        && !empty($parts['host']);
};

if (!$isHttpUrl($config['calendifyUrl'])) {
    http_response_code(500);
    echo json_encode(['error' => 'CALENDIFY_URL no está configurada correctamente']);
    exit;
}

if ($config['phone'] === '' || preg_match('/^[0-9\s()+.-]+$/', $config['phone']) !== 1) {
    http_response_code(500);
    echo json_encode(['error' => 'PHONE no está configurada correctamente']);
    exit;
}

if (!$isHttpUrl($config['whatsapp'])) {
    http_response_code(500);
    echo json_encode(['error' => 'WHATSAPP no está configurada correctamente']);
    exit;
}

echo json_encode($config, JSON_UNESCAPED_SLASHES);
