<?php
// Plain config — Remote Hosting
$servername = "103.169.160.74";   // ✅ তোমার Hosting IP
$username   = "product7_testwebapp";     // ✅ DB ইউজার
$password   = "yhC1LpE?GTvR"; // ✅ DB পাসওয়ার্ড
$dbname     = "product7_testwebapp"; // ✅ DB Name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
