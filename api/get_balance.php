<?php
include('../includes/db.php');

$telegram_id = $_GET['telegram_id'] ?? '';

if ($telegram_id) {
    $sql = "SELECT balance FROM users WHERE telegram_id = '$telegram_id'";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        echo json_encode(['balance' => $row['balance']]);
    } else {
        echo json_encode(['balance' => 0]);
    }
} else {
    echo json_encode(['balance' => 0]);
}
?>
