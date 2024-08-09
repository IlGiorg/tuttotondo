document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('prenotaForm');
    const message = document.getElementById('message');
    const disableButton = document.getElementById('disablePrenota');
    const enableButton = document.getElementById('enablePrenota');
    const status = document.getElementById('status');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            fetch('/prenota', {
                method: 'POST',
                body: formData
            }).then(response => response.text())
              .then(data => message.textContent = data)
              .catch(error => message.textContent = "Errore: " + error);
        });
    }

    if (disableButton) {
        disableButton.addEventListener('click', function() {
            togglePrenota('disable');
        });
    }

    if (enableButton) {
        enableButton.addEventListener('click', function() {
            togglePrenota('enable');
        });
    }

    function togglePrenota(action) {
        fetch('/toggle-prenota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({action: action})
        }).then(response => response.json())
          .then(data => status.textContent = "Operazione avvenuta con successo.")
          .catch(error => status.textContent = "Errore: " + error);
    }
});
