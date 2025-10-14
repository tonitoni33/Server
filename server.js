const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servire file statici dalla cartella public
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware per leggere dati POST
app.use(express.urlencoded({ extended: true }));

// Array per salvare utenti (in memoria)
const users = [];

// Rotta principale
app.get('/', (req, res) => {
    res.render('index', { title: 'Madness Street Wars' });
});

// Rotta SPECIAL THANKS
app.get('/special-thanks', (req, res) => {
    res.render('special-thanks', { names: ['EL CHAPO', 'SBUCCHIA', 'FILL', 'GIULIA', 'ANDREA', 'SWALL'] });
});

// Rotta per registrazione
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    users.push({ email, username, password });
    console.log('Nuovo utente registrato:', { email, username, password });
    res.json({ success: true, message: 'Registrazione completata!' });
});

// Avvio server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
// Rotta LAST UPDATES
app.get('/last-updates', (req, res) => {
    res.render('last-updates', {
        message: "WE MADE IT!!! FIRST VERSION RELEASE: 1.5.3.6.ALPHA\nTHIS FIRST VERSION HAVE, A BEAUTIFUL MAP STARTER WITH HANDSOME MISSIONS, BEAUTIFUL CHARACTERS AND MORE!!!"
    });
});
