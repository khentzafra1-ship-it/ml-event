<?php

header("Content-Type: application/json");


// Admin authentication
require_once "../admin/session.php";


// Database connection
require_once "../config/database.php";


if ($_SERVER["REQUEST_METHOD"] !== "GET") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}


try {

    $stmt = $pdo->query("
        SELECT
            id,
            ml_user_id,
            server_id,
            email,
            reward_type,
            reward_name,
            created_at
        FROM claims
        ORDER BY created_at DESC
    ");

    $claims = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode([
        "success" => true,
        "claims" => $claims
    ]);


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Unable to retrieve claims."
    ]);

}

?>