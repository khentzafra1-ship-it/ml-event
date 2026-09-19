<?php

header("Content-Type: application/json");

require_once __DIR__ . "/../config/database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);

    exit;
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$username = trim($data["username"] ?? "");
$password = $data["password"] ?? "";

if ($username === "" || $password === "") {

    echo json_encode([
        "success" => false,
        "message" => "Please enter your username and password."
    ]);

    exit;
}

try {

    $stmt = $pdo->prepare("
        SELECT id, username, password_hash
        FROM admins
        WHERE username = ?
        LIMIT 1
    ");

    $stmt->execute([$username]);

    $admin = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$admin) {

        echo json_encode([
            "success" => false,
            "message" => "Invalid username or password."
        ]);

        exit;
    }

    if (!password_verify($password, $admin["password_hash"])) {

        echo json_encode([
            "success" => false,
            "message" => "Invalid username or password."
        ]);

        exit;
    }

    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "secure" => true,
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    session_start();

    session_regenerate_id(true);

    $_SESSION["admin_id"] = $admin["id"];
    $_SESSION["admin_username"] = $admin["username"];

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "username" => $admin["username"]
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Database error."
    ]);
}