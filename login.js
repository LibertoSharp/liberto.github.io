var audio = new Audio("click_sound.mp3");
var audio2 = new Audio("click2_sound.mp3");

function play() {
  audio.play();
}

function play2() {
  audio2.play();
}

// Funzione per controllare le credenziali
function checkCredentials() {
  var username = document.querySelector('input[name="Username"]').value;
  var password = document.querySelector('input[name="Password"]').value;

  if (username == "") {
    attivaScritta("Credenziali Invalide");
    return;
  }

  // Carica il file JSON corrispondente all'username
  fetch("users/" + username + '.json')
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
      setCookie("Username", username, 60);
      setCookie("Password", password, 60);
      caricaPagina("main");
    })
    .catch(error => {
      attivaScritta(error.message);
    });
}

function checkCredentialsAUTO(username, password) {
  if (username == "") {
    attivaScritta("Credenziali Invalide");
    return;
  }

  // Carica il file JSON corrispondente all'username
  fetch("users/" + username + '.json')
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
      setCookie("Username", username, 60);
      setCookie("Password", password, 60);
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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
// Aggiunge un gestore per l'evento click al bottone di login
document.getElementById('wrapper').addEventListener('click', checkCredentials);

username = getCookie("Username");
password = getCookie("Password");

if (username !== "" && password !== "")
  checkCredentialsAUTO(username, password);
