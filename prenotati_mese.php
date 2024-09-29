<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prenotazioni del Mese</title>
    <link rel="stylesheet" href="styles.css"> <!-- Optional: Add a CSS file for styling -->
</head>
<body>
    <h1>Prenotazioni del Mese</h1>
    
    <?php
    // Load the bookings from the JSON file
    $file = 'bookings.json';
    if (file_exists($file)) {
        $bookings = json_decode(file_get_contents($file), true);
    } else {
        $bookings = [];
    }
    ?>

    <!-- Check if there are any bookings -->
    <?php if (count($bookings) > 0): ?>
        <table border="1">
            <tr>
                <th>Attività</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Email</th>
                <th>Timestamp</th>
            </tr>

            <!-- Loop through each booking and display it in the table -->
            <?php foreach ($bookings as $booking): ?>
            <tr>
                <td><?php echo htmlspecialchars($booking['activities']); ?></td>
                <td><?php echo htmlspecialchars($booking['name']); ?></td>
                <td><?php echo htmlspecialchars($booking['surname']); ?></td>
                <td><?php echo htmlspecialchars($booking['email']); ?></td>
                <td><?php echo htmlspecialchars($booking['timestamp']); ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    <?php else: ?>
        <p>Nessuna prenotazione disponibile.</p>
    <?php endif; ?>
</body>
</html>
