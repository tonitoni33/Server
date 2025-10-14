// === POPUP REGISTER ===
function showRegister() {
    document.getElementById('register-popup').style.display = 'flex';
}

function closeRegister() {
    document.getElementById('register-popup').style.display = 'none';
}

function register() {
    showRegister();
}

// Gestione invio form
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('register-form');
    const message = document.getElementById('register-message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        fetch('/register', {
            method: 'POST',
            body: new URLSearchParams(formData)
        })
            .then(res => res.json())
            .then(data => {
                message.textContent = data.message;
                if (data.success) {
                    setTimeout(() => closeRegister(), 1500);
                    this.reset();
                }
            });
    });
});

// === POPUP CONTACT SUPPORT ===
function showContact() {
    document.getElementById('contact-popup').style.display = 'flex';
}

function closeContact() {
    document.getElementById('contact-popup').style.display = 'none';
}

function contactSupport() {
    showContact();
}

// === LAST UPDATES ===
function lastUpdates() {
    window.location.href = '/last-updates';
}

// === SPECIAL THANKS ===
function specialThanks() {
    window.location.href = '/special-thanks';
}

// === PLAY NOW ===
function playNow() {
    window.open('/game', '_blank', 'width=1920,height=1080');
}
