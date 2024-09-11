// Generates inputs for adding activities for each day of the month
function createNewMonth() {
    const activityForm = document.getElementById('activity-form');
    activityForm.innerHTML = ''; // Clear the form

    // Create activity inputs for each day of the month (assuming 30 days for simplicity)
    for (let day = 1; day <= 30; day++) {
        const dayLabel = document.createElement('label');
        dayLabel.innerText = `Attività per il giorno ${day}:`;

        const dayInput = document.createElement('input');
        dayInput.type = 'text';
        dayInput.name = `activities-day-${day}`;
        dayInput.placeholder = 'Inserisci le attività per oggi';

        activityForm.appendChild(dayLabel);
        activityForm.appendChild(dayInput);
        activityForm.appendChild(document.createElement('br'));
    }

    document.getElementById('activity-calendar').style.display = 'block';
}

// Saves the entered activities to local storage or backend
function saveActivities() {
    const formData = new FormData(document.getElementById('activity-form'));
    let activities = {};

    // Collect activities for each day
    for (let day = 1; day <= 30; day++) {
        const activityForDay = formData.get(`activities-day-${day}`);
        activities[`day-${day}`] = activityForDay;
    }

    // Save activities to localStorage or send to the server
    localStorage.setItem('monthlyActivities', JSON.stringify(activities));
    alert('Attività salvate con successo!');
}

// Publishes activities by enabling prenota
function togglePrenotaPage() {
    let isDisabled = localStorage.getItem('prenotaDisabled') === 'true';
    localStorage.setItem('prenotaDisabled', !isDisabled);

    if (!isDisabled) {
        const activities = JSON.parse(localStorage.getItem('monthlyActivities'));
        if (!activities) {
            alert("Nessuna attività salvata per il mese.");
            return;
        }
        alert('Prenotazioni abilitate con successo!');
    } else {
        alert('Prenotazioni disabilitate.');
    }
    updatePrenotaStatus();
}

// Update the prenota page with available activities
function updatePrenotaStatus() {
    let isDisabled = localStorage.getItem('prenotaDisabled') === 'true';
    const statusText = isDisabled ? "Prenotazione non disponibile al momento. Ci vediamo al 23 del mese!" : "";
    document.getElementById('prenota-status').innerText = statusText;
    document.getElementById('prenota-container').style.display = isDisabled ? 'none' : 'block';

    if (!isDisabled) {
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = ''; // Clear previous activities

        const activities = JSON.parse(localStorage.getItem('monthlyActivities'));
        if (activities) {
            for (let day in activities) {
                const activity = activities[day];
                if (activity) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = 'activities';
                    checkbox.value = activity;

                    const label = document.createElement('label');
                    label.innerText = activity;

                    activityList.appendChild(checkbox);
                    activityList.appendChild(label);
                    activityList.appendChild(document.createElement('br'));
                }
            }
        }
    }
}

// Submitting the form with multiple activities selected
document.getElementById('prenota-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const selectedActivities = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(cb => cb.value);

    const data = {
        name,
        surname,
        email,
        activities: selectedActivities,
        timestamp: new Date().toISOString()
    };

    // Send to server (you'll need PHP and MySQL to store this data)
    fetch('submit_prenota.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => response.text())
      .then(responseText => {
          document.getElementById('response-message').innerText = responseText;
      }).catch(error => {
          console.error('Error:', error);
      });
});

// Call the update status function when the page loads
if (document.getElementById('prenota-container')) {
    updatePrenotaStatus();
}
