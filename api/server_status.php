<?php 
    // Allow CORS and set content type
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");

    include 'dbconn.php';

    try {
        // Attempt to connect to the map server
        $map = @fsockopen($DBCONFIG['db_host'], $map_port, $errno, $errstr, 1);

        // Get the number of online players
        $query = "SELECT COUNT(*) as total FROM `char` WHERE `online` != 0";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        $total = $result['total'];

        // Get the total number of accounts
        $query2 = "SELECT COUNT(*) as total FROM `login` WHERE `sex` != 'S'";
        $stmt2 = $conn->prepare($query2);
        $stmt2->execute();
        $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
        $total2 = $result2['total'];

        if ($map) {
            // If the map server is online, close the socket and return status
            fclose($map);
            http_response_code(200);
            echo json_encode([
                "success" => true, 
                "map" => "ONLINE",
                "players" => $total,
                "account" => $total2
            ]);
        } else {
            // If the map server is offline, return status
            http_response_code(200);
            echo json_encode([
                "success" => false, 
                "map" => "OFFLINE",
                "players" => 0,
                "account" => $total2
            ]);
        }
        exit();
    } catch (PDOException $e) {
        http_response_code(500);
        // Log the error message in production, but do not expose it to users
        echo json_encode(["success" => false, "message" => "Database error occurred."]);
        exit();
    }
