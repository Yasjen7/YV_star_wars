const searchInput = document.getElementById("search-input");
const results = document.getElementById("results");
const dialog = document.getElementById("popup-dialog");
const characterTitle = document.getElementById("character-title");
const dialogContent = document.getElementById("dialog-content");
const closeDialogButton = document.getElementById("close-dialog");

searchInput.addEventListener("input", function (e) {
  if(input.length >= 1){
    debouncedCharacterSearch(input)
   }
   
  const input = e.target.value;
  console.log(input);
})

document.addEventListener("DOMContentLoaded", function(){

  fetch(`https://swapi.py4e.com/api/people`).then(resp =>
  resp.json()).then(data => {
    if (data.count >= 1) {
      displayCharacters(data.results)
      } else {
      displayError()
      }
      
    console.log(data)
    displayCharacters(data.results);
    
    const listOfCharacterNames = data.results.map(character => {
      return `<li>${character.name}</li>`
     }).join("");
     results.innerHTML = `<ul class= "characters">${listOfCharacterNames}</ul>`;

  }).catch(e => {
    console.log(e);
    function displayError() {results.innerHTML = "<ul class='characters'><li>The characters you seek are not here</li></ul>"
    }
  })
})

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
    func.apply(context, args);
    }, wait);
  };
}

  async function searchForCharacter(query) {
    const characterData = await
  fetch(`https://swapi.py4e.com/api/people?search=${query}`).then(resp =>
  resp.json());
  if (characterData.count >= 1) {
    displayCharacters(characterData.results)
    } else {
    displayError()
    }
    
    console.log(characterData);
    displayCharacters(characterData.results)
  }

  const debouncedCharacterSearch = debounce(searchForCharacter, 500)

  searchInput.addEventListener("input", function (e) {
    const input = e.target.value;
    console.log(input);
    searchForCharacter(input);

    debouncedCharacterSearch(input);
  })
  

function displayCharacters(characters){
  function displayError() {results.innerHTML = "<ul class='characters'><li>The characters you seek are not here</li></ul>"
  }
  const listOfNames = characters.map(character => {
    return `<li><a data-url="${character.url}">${character.name}</a></li>`
   }).join(" ")
   
    results.innerHTML = `<ul class="characters">${listOfNames}</ul>`;
  
  const links = document.querySelectorAll('.characters a');

    links.forEach(link => {
      link.addEventListener('click', () => {
      const characterUrl = link.getAttribute('data-url');
      openCharacterDialog(characterUrl);
      });
    });
  }

function openCharacterDialog (characterApiUrl) {

  dialog.showModal();
  fetch(characterApiUrl).then(resp => resp.json()).then(data => {
    characterTitle.innerText = data.name;
    dialogContent.innerHTML = `
  <p><strong> Height:</strong> ${data.height}</p>
  <p><strong> Mass:</strong> ${data.mass}</p>
  <p><strong> Gender:</strong> ${data.gender}</p>
  `;
    }).catch(err => {
      console.log(err);
    function displayError() {results.innerHTML = "<ul class='characters'><li>The characters you seek are not here</li></ul>"
    }
  });

  
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
  dialog.close();
  }
 });
 dialog.addEventListener("close", () => {
  characterTitle.innerText = "";
  dialogContent.innerHTML = "Loading...";
 })
 closeDialogButton.addEventListener('click', () => {
  dialog.close();
 });
}

 
    