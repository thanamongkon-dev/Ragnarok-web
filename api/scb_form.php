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


    try {
        $strAmout = addslashes(trim($_POST["tAmout"]));
        $strAccountId  = addslashes(trim($_POST["tAccountId"]));
        $strRef = addslashes(trim($_POST["tRef"]));
        $strRef = (strlen($strRef) > 9 ? substr($strRef, 0, 9) : $strRef) . date('ymd') . rand(10000, 99999);
        
        $strConfirmId = strtoupper($strRef);
        $date = date('Y-m-d H:i:s');

        // Check if there are too many unpaid QR codes
        $stmt = $conn->prepare("SELECT count(*) AS NumQRNotPay FROM payment WHERE user_id = :accountId AND status = '01' AND added_time >= ADDTIME(NOW(), '-0:10:0')");
        $stmt->execute(['accountId' => $strAccountId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['NumQRNotPay'] > 5) {
            echo json_encode(['status' => 'error', 'message' => 'Too many unpaid QR codes']);
            exit();
        } else {
            // Call the external API
            $url = "https://ro.debug-pay.com/api/payment/checkConfirm/ab7cbe9cac278193fdeb66f0046a00ea/$strConfirmId";
            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($curl, CURLOPT_TIMEOUT, 10);
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
            $curl_content = curl_exec($curl);
            curl_close($curl);

            $DATA = json_decode($curl_content, true);

            $resCode = '01';
            if (isset($DATA['resCode'])) {
                $resCode = $DATA["resCode"];
            }

            // Insert payment record
            $stmt = $conn->prepare("INSERT INTO payment (user_id, confirmId, transactionId, amount, status, added_time) VALUES (:accountId, :confirmId, :transactionId, :amount, :status, :addedTime)");
            $stmt->execute([
                'accountId' => $strAccountId,
                'confirmId' => $strConfirmId,
                'transactionId' => $DATA["transactionId"] ?? '',
                'amount' => $strAmout,
                'status' => $resCode,
                'addedTime' => $date
            ]);

            echo $strRef;
        }
    } catch (\Throwable $e) {
        echo "error";
    }
