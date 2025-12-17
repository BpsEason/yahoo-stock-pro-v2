<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$symbol = $_GET['symbol'] ?? '2330.TW';
$options = [
    "http" => [
        "method" => "GET",
        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\r\n"
    ]
];
$context = stream_context_create($options);
$url = "https://query1.finance.yahoo.com/v8/finance/chart/" . strtoupper($symbol);

$response = @file_get_contents($url, false, $context);

if ($response) {
    $json = json_decode($response, true);
    $res = $json['chart']['result'][0]['meta'] ?? null;
    
    if ($res) {
        echo json_encode([
            'symbol' => strtoupper($symbol),
            'name' => $res['symbol'],
            'price' => $res['regularMarketPrice'],
            'prevClose' => $res['previousClose'],
            'change' => round($res['regularMarketPrice'] - $res['previousClose'], 2),
            'percent' => round((($res['regularMarketPrice'] / $res['previousClose']) - 1) * 100, 2) . '%',
            'currency' => $res['currency']
        ]);
        exit;
    }
}

http_response_code(404);
echo json_encode(["error" => "查無資料，請確認代號（如：AAPL, 2330.TW）"]);
