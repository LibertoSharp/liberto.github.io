// Funzione per controllare le credenziali
function checkCredentials() {
  var username = document.querySelector('input[name="Username"]').value;
  var password = document.querySelector('input[name="Password"]').value;

  // Carica il file JSON corrispondente all'username
  fetch(username + '.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Username non trovato');
      }
      return response.json();
    })
    .then(data => {
      if (data.password !== password) {
        throw new Error('Password errata');
      }
      caricaPagina("main");
    })
    .catch(error => {
      alert(error.message);
    });
}

function caricaPagina(nome) {
  window.location.href = nome+".html";
}

// Aggiunge un gestore per l'evento click al bottone di login
document.getElementById('wrapper').addEventListener('click', checkCredentials);
