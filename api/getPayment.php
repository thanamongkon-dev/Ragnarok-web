<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(); // End the request for OPTIONS
    }
    
    include "dbconn.php";

    if (!isset($_GET['accountId'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "ไม่พบข้อมูลผู้ใช้"]);
        exit();
    }

    $accountId = $_GET['accountId'];

    try {
        $stmt = $conn->prepare("SELECT *, amount as price FROM payment WHERE user_id = :accountId");
        $stmt->execute(['accountId' => $accountId]);
        $objResultCash = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $stmt = $conn->prepare("SELECT *, pro*amount as price FROM promotion WHERE user_id = :accountId");
        $stmt->execute(['accountId' => $accountId]);
        $objResultBonus = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($objResultCash || $objResultBonus) {
            //merge array
            $objResult = array_merge($objResultCash, $objResultBonus);

            http_response_code(200);
            echo json_encode($objResult);

            // http_response_code(200);
            // echo json_encode(["Cash" => $objResultCash, "Bonus" => $objResultBonus]);
        }
    } catch (PDOException $e) {
        // Catch and return the exception message
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "ข้อผิดพลาดของฐานข้อมูล: " . $e->getMessage()]);
    }
    exit();