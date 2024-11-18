<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");

    // Handle preflight requests
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        exit(); // End the request for OPTIONS
    }

    include 'dbconn.php';

    $data = json_decode(file_get_contents('php://input'));

    //Check if all required fields are provided
    if (empty($data->tRef) || empty($data->tAmount) || empty($data->tAccountId) || empty($data->user_id) || empty($data->pro) || empty($data->quantity) || empty($data->itemId)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "กรุณากรอกข้อมูลให้ครบ"]);
        exit();
    }

    //Sanitize user input
    $ref = htmlspecialchars(strip_tags($data->tRef));
    $tAmount = htmlspecialchars(strip_tags($data->tAmount));
    $accountId = htmlspecialchars(strip_tags($data->tAccountId));
    $userId = htmlspecialchars(strip_tags($data->user_id));
    $pro = htmlspecialchars(strip_tags($data->pro));
    $quantity = htmlspecialchars(strip_tags($data->quantity));
    $itemId = htmlspecialchars(strip_tags($data->itemId));

    $strRef = (strlen($ref) > 9 ? substr($ref, 0, 9) : $ref) . date('ymd') . rand(10000, 99999);

    $strConfirmId = strtoupper($strRef);
    $date = date('Y-m-d H:i:s');

    try {
        //Check if there are too many unpaid QR codes
        $stmt = $conn->prepare("SELECT count(*) AS NumQRNotPay FROM promotion WHERE user_id = :accountId AND status = '01' AND added_time >= ADDTIME(NOW(), '-0:10:0')");
        $stmt->execute(['accountId' => $accountId]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['NumQRNotPay'] > 5) {
            echo json_encode(['status' => 'error', 'message' => 'Too many unpaid QR codes']);
            exit();
        }else {
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
            $query = "INSERT INTO promotion (pro, confirmId, transactionId, user_id, amount, status, added_time, itemId) VALUES (:pro, :confirmId, :transactionId, :user_id, :amount, :status, :addedTime, :itemId)";
            $stmt = $conn->prepare($query);
            $stmt->execute([
                'pro' => $pro,
                'confirmId' => $strConfirmId,
                'transactionId' => $DATA["transactionId"] ?? '',
                'user_id' => $accountId,
                'amount' => $quantity,
                'status' => $resCode,
                'addedTime' => $date,
                'itemId' => $itemId
            ]);

            http_response_code(200);
            echo json_encode(["success" => true, "ref" => $strRef]);
            exit();
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
        exit();
    }