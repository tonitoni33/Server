const express = require('express');
const path = require('path');
const cors = require('cors'); // ✅ Serve per permettere richieste da Unity o da altri domini
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Abilita CORS (necessario per richieste esterne come Unity)
app.use(cors());

// ✅ Middleware per leggere i dati JSON e form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Servire file statici (immagini, CSS, JS, ecc.)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Imposta EJS come template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Database temporaneo in memoria
const users = [];

// ✅ Rotta principale (homepage)
app.get('/', (req, res) => {
    res.render('index', { title: 'Madness Street Wars' });
});

// ✅ Rotta SPECIAL THANKS
app.get('/special-thanks', (req, res) => {
    res.render('special-thanks', {
        names: ['TNS','ANTONIO', 'SBUCCHIA', 'FILL', 'GIULIA', 'ANDREA', 'SWALL']
    });
});

// ✅ Rotta LAST UPDATES
app.get('/last-updates', (req, res) => {
    res.render('last-updates', {
        message:
            "WE MADE IT!!! FIRST VERSION RELEASE: 1.5.3.6.ALPHA\nTHIS FIRST VERSION HAVE, A BEAUTIFUL MAP STARTER WITH HANDSOME MISSIONS, BEAUTIFUL CHARACTERS AND MORE!!!"
    });
});

// ✅ Rotta REGISTRAZIONE (usata dal sito web)
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;

    // Impedisce registrazioni duplicate
    if (users.some(u => u.email === email)) {
        return res.json({ success: false, message: 'Email già registrata!' });
    }

    users.push({ email, username, password });
    console.log('Nuovo utente registrato:', { email, username, password });
    res.json({ success: true, message: 'Registrazione completata!' });
});

// ✅ Rotta LOGIN (usata da Unity)
app.post('/login', (req, res) => {
    const { email, username, password } = req.body;

    const user = users.find(
        u => u.email === email && u.username === username && u.password === password
    );

    if (user) {
        console.log(`✅ Login OK per utente: ${username}`);
        res.json({ success: true, message: 'Login success' });
    } else {
        console.log(`❌ Login FALLITO per utente: ${username}`);
        res.json({ success: false, message: 'Login failed' });
    }
});

// ✅ Rotta per il gioco (verrà usata in futuro con Unity WebGL)
app.get('/game', (req, res) => {
    res.render('game', { title: 'Madness Street Wars - MMO' });
});

// ✅ Avvio del server
app.listen(PORT, () => {
    console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
