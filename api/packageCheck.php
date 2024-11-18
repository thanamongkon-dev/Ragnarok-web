<?php
session_start();
// include "../config/config.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(); // End the request for OPTIONS
}

include "dbconn.php";

try {
    $strRef = addslashes(trim($_POST["tRef"]));
    $strAccountId  = addslashes(trim($_POST["tAccountId"]));
    $userId  = addslashes(trim($_POST["tUserId"]));
    $date = date("Y-m-d H:i:s");


    // Check if payment record exists
    $stmt = $conn->prepare("SELECT * FROM promotion WHERE user_id = :accountId AND confirmId = :ref");
    $stmt->execute(['accountId' => $strAccountId, 'ref' => $strRef]);
    $objResult = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($objResult && $objResult["status"] === "02") {
        echo json_encode(['status' => 'true']);
        exit();
    }

    // Call the external API
    $url = "https://ro.debug-pay.com/api/payment/checkConfirm/ab7cbe9cac278193fdeb66f0046a00ea/$strRef";
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($curl, CURLOPT_TIMEOUT, 10);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    $curl_content = curl_exec($curl);

    if ($curl_content === false) {
        throw new Exception('Curl Error: ' . curl_error($curl));
    }

    $DATA = json_decode($curl_content, true);
    curl_close($curl);

    $resCode = $DATA["resCode"] ?? '01';

    if ($resCode === "01") {
        $result = "error";
    } elseif ($resCode === "02") {
        $result = "true";
    } elseif ($resCode === "00") {
        // Update payment record
        $stmt = $conn->prepare("UPDATE promotion SET transactionId = :transactionId, status = :status, added_time = :addedTime WHERE confirmId = :confirmId");
        $stmt->execute([
            'transactionId' => $DATA["transactionId"] ?? '',
            'status' => $resCode,
            'addedTime' => $date,
            'confirmId' => $strRef
        ]);

        // Sum up the amount for the user
        $stmt = $conn->prepare("SELECT SUM(amount) AS totalAmt FROM promotion WHERE user_id = :accountId AND status IN ('00', '02')");
        $stmt->execute(['accountId' => $strAccountId]);
        $lvResult = $stmt->fetch(PDO::FETCH_ASSOC);

        $result = "ok";
    } else {
        $result = "error: $curl_content";
    }

    // echo json_encode(['status' => $result, 'userId' => $userId]);
    echo $result;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

