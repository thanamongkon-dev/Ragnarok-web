<?php

// Allow CORS and set content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // End the request for OPTIONS
}

// Include the database connection
include "dbconn.php";

// Get the posted data
$data = json_decode(file_get_contents('php://input'));

// Check if all required fields are provided
if (empty($data->username) || empty($data->password) || empty($data->email) || empty($data->gender) || empty($data->date)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Incomplete data"]);
    exit();
}

// Sanitize user input
$username = htmlspecialchars(strip_tags($data->username));
$password = htmlspecialchars(strip_tags($data->password));
$email = htmlspecialchars(strip_tags($data->email));
$gender = htmlspecialchars(strip_tags($data->gender));
$date = htmlspecialchars(strip_tags($data->date));

// Convert password to MD5 (consider using stronger encryption in production)
$md5_password = md5($password);

try {
    // Prepare the SQL query
    $query = "INSERT INTO login (userid, user_pass, email, sex, birthdate) VALUES (:username, :password, :email, :gender, :date)";
    $stmt = $conn->prepare($query);

    // Bind the parameters
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $md5_password);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':date', $date);

    // Execute the query
    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Registration successful!"]);
        exit();
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Registration failed!"]);
        exit();
    }
} catch (PDOException $e) {
    // Catch and return the exception message
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    exit();
}
