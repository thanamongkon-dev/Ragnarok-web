<?php
session_start();
// Allow CORS and set content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // End the request for OPTIONS
}

include 'dbconn.php';

// Get the posted data
$data = json_decode(file_get_contents('php://input'));

// Check if all required fields are provided
if (empty($data->username) || empty($data->password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "กรุณากรอกข้อมูลให้ครบถ้วน"]);
    exit();
}

// Sanitize user input
$username = htmlspecialchars(strip_tags($data->username));
$password = htmlspecialchars(strip_tags($data->password));

// Convert password to MD5 (consider using stronger encryption in production)
$md5_password = md5($password);

try {
    // Prepare the SQL query
    $query = "SELECT * FROM login WHERE userid = :username";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    // Check if user exists
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Check if the password is correct
        if ($user['user_pass'] == $md5_password) {
            http_response_code(200);
            echo json_encode([
                "success" => true, 
                "message" => "เข้าสู่ระบบสำเร็จ!", 
                "userid" => $user['userid'], 
                "account_id" => $user['account_id']
            ]);
            $_SESSION["userid"] = $user['userid'];
            exit();
        } else {
            http_response_code(401);
            echo json_encode(["success" => false, "message" => "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"]);
            exit();
        }
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง"]);
        exit();
    }
} catch (PDOException $e) {
    // Catch and return the exception message
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "ข้อผิดพลาดของฐานข้อมูล: " . $e->getMessage()]);
    exit();
}
