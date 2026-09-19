<?php

if (session_status() === PHP_SESSION_NONE) {

    session_set_cookie_params([
        "lifetime" => 0,
        "path" => "/",
        "secure" => !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off",
        "httponly" => true,
        "samesite" => "Lax"
    ]);

    session_start();
}

if (empty($_SESSION["admin_id"])) {

    http_response_code(401);

    header("Content-Type: application/json");

    echo json_encode([
        "success" => false,
        "message" => "Unauthorized. Admin login required."
    ]);

    exit;
}