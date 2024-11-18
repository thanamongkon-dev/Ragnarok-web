<?php
// Allow CORS and set content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
// Include database connection
include 'dbconn.php';

// Get the transaction ID from the query parameter
$transactionId = $_GET['transactionId'] ?? '';

if ($transactionId) {
    // Query the payment status from the database
    $stmt = $conn->prepare("SELECT status FROM payments WHERE transaction_id = :transactionId");
    $stmt->execute(['transactionId' => $transactionId]);
    $payment = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($payment) {
        // Return the payment status as JSON
        echo json_encode(['status' => $payment['status']]);
    } else {
        // Transaction ID not found
        echo json_encode(['status' => 'not found']);
    }
} else {
    // Missing transaction ID
    echo json_encode(['status' => 'error', 'message' => 'Transaction ID is required']);
}

