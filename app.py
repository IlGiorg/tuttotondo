from flask import Flask, render_template, request, redirect, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

# Database Setup
def init_db():
    with sqlite3.connect('database.db') as conn:
        conn.execute('''CREATE TABLE IF NOT EXISTS bookings
                        (id INTEGER PRIMARY KEY, name TEXT, surname TEXT, email TEXT, activities TEXT, timestamp TEXT)''')
        conn.execute('''CREATE TABLE IF NOT EXISTS settings
                        (id INTEGER PRIMARY KEY, prenota_enabled BOOLEAN)''')
        conn.execute('INSERT OR IGNORE INTO settings (id, prenota_enabled) VALUES (1, 1)')

# Homepage Route
@app.route('/')
def home():
    return render_template('index.html')

# Prenota Route
@app.route('/prenota', methods=['GET', 'POST'])
def prenota():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT prenota_enabled FROM settings WHERE id=1')
        enabled = cursor.fetchone()[0]
        if not enabled:
            return "Prenotazione non disponibile al momento. Ci vediamo al 23 del mese!"

    if request.method == 'POST':
        name = request.form['name']
        surname = request.form['surname']
        email = request.form['email']
        activities = ', '.join(request.form.getlist('activity'))
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        with sqlite3.connect('database.db') as conn:
            conn.execute('INSERT INTO bookings (name, surname, email, activities, timestamp) VALUES (?, ?, ?, ?, ?)',
                         (name, surname, email, activities, timestamp))
        return "Prenotazione andata a buon fine"
    return render_template('prenota.html')

# Staff Route
@app.route('/staff')
def staff():
    return render_template('staff.html')

@app.route('/toggle-prenota', methods=['POST'])
def toggle_prenota():
    action = request.json['action']
    new_status = 1 if action == 'enable' else 0
    with sqlite3.connect('database.db') as conn:
        conn.execute('UPDATE settings SET prenota_enabled = ? WHERE id=1', (new_status,))
    return jsonify(status="success")

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
