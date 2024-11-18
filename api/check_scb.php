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
    $stmt = $conn->prepare("SELECT * FROM payment WHERE user_id = :accountId AND confirmId = :ref");
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
        $stmt = $conn->prepare("UPDATE payment SET transactionId = :transactionId, status = :status, added_time = :addedTime WHERE confirmId = :confirmId");
        $stmt->execute([
            'transactionId' => $DATA["transactionId"] ?? '',
            'status' => $resCode,
            'addedTime' => $date,
            'confirmId' => $strRef
        ]);

        // Sum up the amount for the user
        $stmt = $conn->prepare("SELECT SUM(amount) AS totalAmt FROM payment WHERE user_id = :accountId AND status IN ('00', '02')");
        $stmt->execute(['accountId' => $strAccountId]);
        $lvResult = $stmt->fetch(PDO::FETCH_ASSOC);

        // Update cash and bonus
        $stmt = $conn->prepare("SELECT * FROM login WHERE userid = :userid");
        $stmt->execute(['userid' => $userId]);
        $objResultuser = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $conn->prepare("SELECT * FROM acc_reg_num WHERE account_id = :accountId AND `key` = '#CASHPOINTS'");
        $stmt->execute(['accountId' => $objResultuser['account_id']]);
        $objResultPoint = $stmt->fetch(PDO::FETCH_ASSOC);
        $cash = $objResultPoint['value'] ?? 0;

        $stmt = $conn->prepare("SELECT * FROM acc_reg_num WHERE account_id = :accountId AND `key` = '#CASHBONUS'");
        $stmt->execute(['accountId' => $objResultuser['account_id']]);
        $objResultBonus = $stmt->fetch(PDO::FETCH_ASSOC);
        $cashBonus = $objResultBonus['value'] ?? 0;

        $cash += $lvResult['totalAmt'] ?? 0;
        $cashBonus += $lvResult['totalAmt'] ?? 0;

        // Update cash and bonus values
        $stmt = $conn->prepare("UPDATE acc_reg_num SET value = :value WHERE account_id = :accountId AND `key` = '#CASHBONUS'");
        $stmt->execute(['value' => $cash, 'accountId' => $objResultuser['account_id']]);

        $stmt = $conn->prepare("UPDATE acc_reg_num SET value = :value WHERE account_id = :accountId AND `key` = '#CASHPOINTS'");
        $stmt->execute(['value' => $cashBonus, 'accountId' => $objResultuser['account_id']]);

        // Update membership status
        // $allLv = count($_CONFIG['scb']['lv']);
        // if ($allLv > 1) {
        //     $lv = 0;
        //     for ($i = 0; $i < $allLv; $i++) {
        //         if (($lvResult['totalAmt'] ?? 0) >= $_CONFIG['scb']['lv'][$i]) {
        //             $lv = $i;
        //         }
        //     }
        //     $stmt = $conn->prepare("UPDATE login SET member_status = :memberStatus WHERE account_id = :accountId");
        //     $stmt->execute(['memberStatus' => $lv, 'accountId' => $strAccountId]);
        // }

        $result = "ok";
    } else {
        $result = "error: $curl_content";
    }

    // echo json_encode(['status' => $result, 'userId' => $userId]);
    echo $result;
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
exit();

