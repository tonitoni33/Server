const express = require('express');
const path = require('path');
const cors = require('cors'); // ✅ Importa CORS
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Abilita CORS (serve per Unity)
app.use(cors());

// ✅ Middleware per leggere dati JSON e form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Servire file statici
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Array utenti (temporaneo)
const users = [];

// ✅ Rotta principale
app.get('/', (req, res) => {
    res.render('index', { title: 'Madness Street Wars' });
});

// ✅ Rotta SPECIAL THANKS
app.get('/special-thanks', (req, res) => {
    res.render('special-thanks', {
        names: ['EL CHAPO', 'SBUCCHIA', 'FILL', 'GIULIA', 'ANDREA', 'SWALL']
    });
});

// ✅ Rotta LAST UPDATES
app.get('/last-updates', (req, res) => {
    res.render('last-updates', {
        message: "WE MADE IT!!! FIRST VERSION RELEASE: 1.5.3.6.ALPHA\nTHIS FIRST VERSION HAVE, A BEAUTIFUL MAP STARTER WITH HANDSOME MISSIONS, BEAUTIFUL CHARACTERS AND MORE!!!"
    });
});

// ✅ Rotta REGISTRAZIONE
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    users.push({ email, username, password });
    console.log('Nuovo utente registrato:', { email, username, password });
    res.json({ success: true, message: 'Registrazione completata!' });
});

// ✅ Rotta LOGIN (per Unity)
app.post('/login', (req, res) => {
    const { email, username, password } = req.body;

    const user = users.find(u =>
        u.email === email &&
        u.username === username &&
        u.password === password
    );

    if (user) {
        console.log(`Login OK per utente: ${username}`);
        res.json({ success: true, message: "Login success" });
    } else {
        console.log(`Login FALLITO per utente: ${username}`);
        res.json({ success: false, message: "Login failed" });
    }
});

// ✅ Rotta per il gioco Unity
app.get('/game', (req, res) => {
    res.render('game', { title: 'Madness Street Wars - MMO' });
});

// ✅ Avvio server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});
