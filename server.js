const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Abilita CORS (necessario per richieste WebGL)
app.use(cors());

// ✅ Middleware per leggere dati JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Servire file statici generali (immagini, CSS, JS, ecc.)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Servire Unity WebGL
app.use('/game', express.static(path.join(__dirname, 'public/game')));

// ✅ EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ Funzione helper per leggere users.json
function readUsers() {
    const filePath = path.join(__dirname, 'users.json');
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf8');
    try {
        return JSON.parse(data);
    } catch (err) {
        console.error('Errore parsing users.json:', err);
        return [];
    }
}

// ✅ Funzione helper per salvare utenti su users.json
function saveUsers(users) {
    const filePath = path.join(__dirname, 'users.json');
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

// ✅ Rotta REGISTRAZIONE
app.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    const users = readUsers();

    if (users.some(u => u.email === email)) {
        return res.json({ success: false, message: 'Email già registrata!' });
    }

    users.push({ email, username, password });
    saveUsers(users);

    console.log('✅ Nuovo utente registrato:', { email, username, password });
    res.json({ success: true, message: 'Registrazione completata!' });
});

// ✅ Rotta LOGIN (Unity WebGL)
app.post('/login', (req, res) => {
    const { email, username, password } = req.body;
    const users = readUsers();

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

// ✅ Homepage
app.get('/', (req, res) => {
    res.render('index', { title: 'Madness Street Wars' });
});

// ✅ Pagina SPECIAL THANKS
app.get('/special-thanks', (req, res) => {
    res.render('special-thanks', {
        names: ['TNS', 'ANTONIO', 'SBUCCHIA', 'FILL', 'GIULIA', 'ANDREA', 'SWALL']
    });
});

// ✅ Pagina LAST UPDATES
app.get('/last-updates', (req, res) => {
    res.render('last-updates', {
        message:
            "HERE WE GO VERSION ALPHA 1.5.3.B THIS VERSION INTRODUCE A NEW AREA BUG FIXING"
    });
});

// ✅ Rotta Unity WebGL
app.get('/play', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/game/index.html'));
});

// ✅ Avvio server
app.listen(PORT, () => {
    console.log(`✅ Server avviato su http://localhost:${PORT}`);
});
