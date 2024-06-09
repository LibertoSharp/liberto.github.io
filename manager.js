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

function getLevel(exp) {
    return (25 * Math.log((exp + 750) / 750) / Math.LN2);
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

async function getFieldValueFromJSON(fieldName) {
  var response = await fetch("users/" + username + ".json")

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      jsonfile = await response.json();
        
      return jsonfile[fieldName];
}

async function SetEXP() {
  var EXP = await getFieldValueFromJSON("EXP");

  var level = LevelFromEXP(EXP);

document.getElementById('nametext').textContent =  username;
document.getElementById('leveltext').textContent = Math.round(level);
document.getElementById('exptext').textContent = "EXP:" + Math.round(getLevelEXP(EXP)) + "/" + Math.round(getMaxEXP(level));
document.getElementById('expbar').style.width = (getLevelEXP(EXP)*100)/getMaxEXP(level);
}

SetEXP();



