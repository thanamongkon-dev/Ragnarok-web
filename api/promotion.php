<?php
$config = include 'config.php';
$secretKey = $config['SECRET_KEY']; // Secret key for authorization
$encryptionKey = '1234567890123456'; // 16-byte key for AES-128-CBC
$iv = '1234567890123456'; // 16-byte IV for AES-128-CBC

// CORS and security headers
$allowedOrigins = ['http://localhost:5173'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';

include 'dbconn.php';

if (!in_array($origin, $allowedOrigins) && !in_array(parse_url($referer, PHP_URL_HOST), array_map('parse_url', $allowedOrigins))) {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden"]);
    exit();
}

header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Secret-Key, X-Encrypted-Data");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // End the request for OPTIONS
}

// Verify the secret key
$headers = apache_request_headers();
if (!isset($headers['X-Secret-Key']) || $headers['X-Secret-Key'] !== $secretKey) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Unauthorized"]);
    exit();
}

// Get encrypted data from headers
$encryptedPayload = $headers['X-Encrypted-Data'] ?? '';

if (!$encryptedPayload) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "No data provided"]);
    exit();
}

// Convert key and IV to binary
$encryptionKey = hex2bin(bin2hex($encryptionKey)); // Convert key to binary
$iv = hex2bin(bin2hex($iv)); // Convert IV to binary

// Decrypt payload
$decryptedData = openssl_decrypt(
    base64_decode($encryptedPayload),
    'aes-128-cbc',
    $encryptionKey,
    OPENSSL_RAW_DATA,
    $iv
);


if ($decryptedData === false) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Decryption failed", "error" => openssl_error_string()]);
    exit();
}

file_put_contents('encrypted.log', $encryptedPayload);
file_put_contents('decrypted.log', $decryptedData);


$data = json_decode($decryptedData);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid data format", "error" => json_last_error_msg()]);
    exit();
}

// Check if all required fields are provided
if (empty($data->pro) || empty($data->amount) || empty($data->user_id)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit();
}

// Sanitize user input
$pro = htmlspecialchars(strip_tags($data->pro));
$amount = htmlspecialchars(strip_tags($data->amount));
$user_id = htmlspecialchars(strip_tags($data->user_id));
$itemId = htmlspecialchars(strip_tags($data->itemId));

try {
    // Prepare the SQL query
    $query = "INSERT INTO promotion (pro, amount, user_id, `status`, added_time, itemId) VALUES (:pro, :amount, :user_id, 1, NOW(), :itemId)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':pro', $pro);
    $stmt->bindParam(':amount', $amount);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':itemId', $itemId);
    $stmt->execute();

    http_response_code(200);
    echo json_encode(["success" => true, "message" => "เพิ่มโปรโมชั่นสำเร็จ"]);
    exit();
} catch (PDOException $e) {
    // Catch and return the exception message
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    exit();
}
?>
