// Popup Register
function showRegister() {
    document.getElementById('register-popup').style.display = 'flex';
}

function closeRegister() {
    document.getElementById('register-popup').style.display = 'none';
}

// Funzione Register aggiornata
function register() {
    showRegister();
}

// Invio dati del form
document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('/register', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('register-message').textContent = data.message;
            if (data.success) {
                setTimeout(() => closeRegister(), 1500);
                this.reset();
            }
        });
});

// Altre funzioni
function contactSupport() {
    alert("Sezione Contact Support non ancora implementata!");
}

function lastUpdates() {
    alert("Sezione Last Updates non ancora implementata!");
}
// Popup Contact Support
function showContact() {
    document.getElementById('contact-popup').style.display = 'flex';
}

function closeContact() {
    document.getElementById('contact-popup').style.display = 'none';
}

// Aggiorna la funzione contactSupport
function contactSupport() {
    showContact();
}
function lastUpdates() {
    window.location.href = '/last-updates';
}
