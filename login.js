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
  // Effettua una richiesta AJAX per ottenere il contenuto di pagina2.html
  $.ajax({
      url: nome + '.html',
      type: 'GET',
      success: function(data) {
          // Inserisci il contenuto di pagina2.html all'interno dell'elemento con id "content"
          $('#content').html(data);
      },
      error: function(xhr, status, error) {
          console.error('Errore durante il caricamento della pagina:', error);
      }
  });
}

// Aggiunge un gestore per l'evento click al bottone di login
document.getElementById('wrapper').addEventListener('click', checkCredentials);
