import { getCookie } from './login.js';

var username = getCookie("Username");

function LevelFromEXP(exp) {
    return (25 * Math.log((exp + 750) / 750) / Math.log(2.7182818) / Math.log(2.7182818));
}

async function getFieldValueFromJSON(fieldName) {
    try {
        // Effettua una richiesta per ottenere il file JSON
        const response = await fetch("users/" + username + ".json");

        // Controlla se la richiesta ha avuto successo
        if (!response.ok) {
            throw new Error('Errore nel recupero del file JSON');
        }

        // Estrai i dati JSON dalla risposta
        const jsonData = await response.json();

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
document.getElementById('exptext').textContent = EXP;