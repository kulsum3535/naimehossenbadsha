<?php
include('../includes/db.php');

$telegram_id = $_POST['telegram_id'] ?? '';
$amount = $_POST['amount'] ?? 0;

if ($telegram_id && $amount > 0) {
    $sql = "SELECT id, balance FROM users WHERE telegram_id = '$telegram_id'";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        $user_id = $row['id'];
        $balance = $row['balance'];

        if ($balance >= $amount) {
            // Create Withdraw
            $conn->query("INSERT INTO withdraw_requests (user_id, telegram, amount) VALUES ($user_id, '$telegram_id', $amount)");
            // Balance minus
            $conn->query("UPDATE users SET balance = balance - $amount WHERE id = $user_id");

            echo json_encode(['status' => 'ok']);
        } else {
            echo json_encode(['status' => 'low_balance']);
        }
    } else {
        echo json_encode(['status' => 'not_found']);
    }
} else {
    echo json_encode(['status' => 'error']);
}
?>
