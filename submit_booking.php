<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $activities = $_POST['activities']; // Assume this comes as a comma-separated string

    // Prepare the data to be saved
    $booking = array(
        'name' => $name,
        'surname' => $surname,
        'email' => $email,
        'activities' => $activities,
        'timestamp' => date('Y-m-d H:i:s')
    );

    // Read the current bookings from the JSON file
    $file = 'bookings.json';
    $bookings = json_decode(file_get_contents($file), true);

    // Add the new booking
    $bookings[] = $booking;

    // Write the updated bookings back to the JSON file
    file_put_contents($file, json_encode($bookings, JSON_PRETTY_PRINT));

    echo 'Prenotazione andata a buon fine';
}
?>
