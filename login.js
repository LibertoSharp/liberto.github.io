// Funzione per controllare le credenziali
function checkCredentials() {
  var username = document.querySelector('input[name="Username"]').value;
  var password = document.querySelector('input[name="Password"]').value;

  if (username == "") {
    attivaScritta("Credenziali Invalide");
    return;
  }

  // Carica il file JSON corrispondente all'username
  fetch(username + '.json')
    .then(response => {
      if (!response.ok) {
        attivaScritta("Username non trovato");
      }
      return response.json();
    })
    .then(data => {
      if (data.password !== password) {
        attivaScritta("Password Errata");
        return;
      }
      caricaPagina("main");
    })
    .catch(error => {
      attivaScritta(error.message);
    });
}

function caricaPagina(nome) {
  window.location.href = nome+".html";
}

function attivaScritta(msg) {
  clearTimeout();
  var scritta = document.getElementById('testo');
  scritta.classList.add('attiva');
  scritta.textContent = msg;
  setTimeout(function(){
    scritta.classList.remove('attiva');
  }, 4000);
}

// Aggiunge un gestore per l'evento click al bottone di login
document.getElementById('wrapper').addEventListener('click', checkCredentials);
