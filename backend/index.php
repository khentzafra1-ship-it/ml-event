<?php

header("Content-Type: application/json");

echo json_encode([
    "success" => true,
    "message" => "ML Event Demo API is running.",
    "php_version" => PHP_VERSION
]);