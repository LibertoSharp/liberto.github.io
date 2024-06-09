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

var username = getCookie("Username");

function LevelFromEXP(exp) {
    return (25 * Math.log((exp + 750) / 750) / Math.log(2.7182818) / Math.log(2.7182818));
}
function getLevelEXP(exp) {
  return exp - getEXPFromLevel(getLevel(exp));
}

function getMaxEXP(level) {
  return getEXPFromLevel(level + 1) - getEXPFromLevel(level);
}

function getEXPFromLevel(level) {
  return Math.pow(2, level / 25) * 750 - 750;
}

function getLevel(exp) {
  let level = 0;
  while (getEXPFromLevel(level) <= exp) {
      level++;
  }
  return level - 1;
}



function getFieldValueFromJSON(fieldName) {
    try {
        // Effettua una richiesta per ottenere il file JSON
        const response = fetch("users/" + username + ".json");

        // Controlla se la richiesta ha avuto successo
        if (!response.ok) {
            throw new Error('Errore nel recupero del file JSON');
        }

        // Estrai i dati JSON dalla risposta
        const jsonData = response.json();

        // Verifica se il campo richiesto esiste nel JSON
        if (fieldName in jsonData) {
            // Ritorna il valore del campo richiesto
            return jsonData[fieldName];
        } else {
            throw new Error('Il campo specificato non esiste nel file JSON');
        }
    } catch (error) {
        console.error('Si è verificato un errore:', error);
        return null; // Ritorna null in caso di errore
    }
}

var EXP = getFieldValueFromJSON("EXP");

document.getElementById('nametext').textContent =  username;
document.getElementById('leveltext').textContent = LevelFromEXP(EXP);
document.getElementById('exptext').textContent = "EXP:" + getLevelEXP(exp) + "/" + getMaxEXP(exp);
document.getElementById('expbar').style.width = (getLevelEXP(exp)*100)/getMaxEXP(exp);