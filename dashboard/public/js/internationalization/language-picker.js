(function (){})();

var arrLang = {
  'en': en,
  'fr': fr,
  'es': es,
  'de': de
};

function getLanguage() {
  if (localStorage.getItem('language') == null)  {
    var userLang = navigator.language || navigator.userLanguage; 
    if (userLang != "en" && userLang != "fr") {
      setLanguage("en")
      return "en"
    } else {
      setLanguage(userLang)
      return userLang
    }
  } else {
    return localStorage.getItem('language')
  }
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
}