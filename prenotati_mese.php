<?php
$bookings = json_decode(file_get_contents('bookings.json'), true);
?>

<table>
    <tr>
        <th>Attività</th>
        <th>Nome</th>
        <th>Cognome</th>
        <th>Email</th>
        <th>Timestamp</th>
    </tr>
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
