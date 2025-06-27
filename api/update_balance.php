<?php
include('../includes/db.php');

$telegram_id = $_POST['telegram_id'] ?? '';
$earned = $_POST['earned'] ?? 0;

if ($telegram_id && $earned > 0) {
    $sql = "UPDATE users SET balance = balance + $earned WHERE telegram_id = '$telegram_id'";
    $conn->query($sql);
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
