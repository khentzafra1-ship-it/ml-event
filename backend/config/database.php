<?php

$host = getenv("DB_HOST");
$port = getenv("DB_PORT") ?: "3306";
$dbname = getenv("DB_NAME");
$username = getenv("DB_USER");
$password = getenv("DB_PASSWORD");

try {

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_SSL_CA => "/etc/ssl/certs/ca-certificates.crt",
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => true
    ];

    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        $options
    );

} catch (PDOException $e) {

    http_response_code(500);

    die("Database connection failed.");

}
?>