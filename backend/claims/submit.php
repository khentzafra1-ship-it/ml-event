<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$mlUserId   = trim($data["ml_user_id"] ?? "");
$serverId   = trim($data["server_id"] ?? "");
$email      = trim($data["email"] ?? "");
$rewardName = trim($data["reward_name"] ?? "");

if (
    empty($mlUserId) ||
    empty($serverId) ||
    empty($email) ||
    empty($rewardName)
) {
    echo json_encode([
        "success" => false,
        "message" => "Please complete all required fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);
    exit;
}

// Reward type is decided on the server from the reward name
$rewardType = (stripos($rewardName, "diamond") !== false)
    ? "diamonds"
    : "skin";

$duplicateMessage =
    "This User ID and Zone ID have already claimed a reward for this event.";

try {

    // ---- Duplicate check: same User ID + Zone ID ----
    $check = $pdo->prepare("
        SELECT id
        FROM claims
        WHERE ml_user_id = ? AND server_id = ?
        LIMIT 1
    ");
    $check->execute([$mlUserId, $serverId]);

    if ($check->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => $duplicateMessage
        ]);
        exit;
    }

    // ---- Save the claim ----
    $stmt = $pdo->prepare("
        INSERT INTO claims
        (ml_user_id, server_id, email, reward_type, reward_name)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $mlUserId,
        $serverId,
        $email,
        $rewardType,
        $rewardName
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Claim request submitted successfully.",
        "claim_id" => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {

    // 1062 = duplicate entry (caught by the unique index below)
    if (($e->errorInfo[1] ?? null) == 1062) {
        echo json_encode([
            "success" => false,
            "message" => $duplicateMessage
        ]);
        exit;
    }

    echo json_encode([
        "success" => false,
        "message" => "Unable to submit claim."
    ]);
}
?>