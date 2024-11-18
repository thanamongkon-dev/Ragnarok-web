<?php
// Allow CORS and set content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // End the request for OPTIONS
}

include 'dbconn.php';

if(!isset($_GET['accountId'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "ไม่พบข้อมูลผู้ใช้"]);
    exit();
}

// // Get the posted data
// $data = json_decode(file_get_contents('php://input'));

// // Check if all required fields are provided
// if (empty($data->accountId)) {
//     http_response_code(400);
//     echo json_encode(["success" => false, "message" => "ไม่พบข้อมูลผู้ใช้"]);
//     exit();
// }

$accountId = $_GET['accountId'];

try {
    // Query to get cash points
    $query = "SELECT value FROM acc_reg_num WHERE account_id = :accountId AND `key` = '#CASHPOINTS'";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':accountId', $accountId);
    $stmt->execute();
    $objResultPoint = $stmt->fetch(PDO::FETCH_ASSOC);
    $cash = $objResultPoint['value'] ?? 0;

    // Query to get cash bonus
    $query = "SELECT value FROM acc_reg_num WHERE account_id = :accountId AND `key` = '#CASHBONUS'";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':accountId', $accountId);
    $stmt->execute();
    $objResultBonus = $stmt->fetch(PDO::FETCH_ASSOC);
    $cashBonus = $objResultBonus['value'] ?? 0;

    // Check if any result was found
    if ($objResultPoint || $objResultBonus) {
        http_response_code(200);
        echo json_encode(["success" => true, "Cash" => $cash, "Bonus" => $cashBonus]);
    } else {
        http_response_code(200);
        echo json_encode(["success" => true, "Cash" => $cash, "Bonus" => $cashBonus]);
    }
} catch (PDOException $e) {
    // Catch and return the exception message
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "ข้อผิดพลาดของฐานข้อมูล: " . $e->getMessage()]);
}
exit();
