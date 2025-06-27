<?php
include('../includes/db.php');

$telegram_id = $_POST['telegram_id'] ?? '';

if ($telegram_id) {
    $sql = "SELECT id FROM users WHERE telegram_id = '$telegram_id'";
    $result = $conn->query($sql);

    if ($result->num_rows == 0) {
        // নতুন ইউজার — Register
        $sql = "INSERT INTO users (telegram_id) VALUES ('$telegram_id')";
        $conn->query($sql);
    }
    echo json_encode(['status' => 'ok']);
} else {
    echo json_encode(['status' => 'error']);
}
?>
