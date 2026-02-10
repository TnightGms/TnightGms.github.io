let games = [];
let translations = {};
const container = document.getElementById("gamesContainer");
const searchBar = document.getElementById("searchBar");
const gameModal = document.getElementById("gameModal");
const gameFrame = document.getElementById("gameFrame");
const closeBtn = document.querySelector(".close");
const categoriesDiv = document.getElementById("categories");
const toggleThemeBtn = document.getElementById("toggleTheme");
const langSelect = document.getElementById("langSelect");
const contactTitle = document.getElementById("contactTitle");

// Cargar juegos
fetch('games.json')
  .then(res => res.json())
  .then(data => { games = data; setupCategories(); displayGames(games); });

// Cargar traducciones
fetch('translations.json')
  .then(res => res.json())
  .then(data => { translations = data; setLanguage('es'); });

// Mostrar juegos
function displayGames(list){
  container.innerHTML="";
  list.forEach(game=>{
    const card=document.createElement('div');
    card.classList.add('gameCard');
    card.innerHTML=`
      <img src="${game.img}" alt="${game.name}" data-url="${game.url}">
      <h3>${game.name}</h3>
      <div class="gameButtons">
        <button class="playBtn"></button>
        <button class="fullscreenBtn"></button>
      </div>
    `;
    const playBtn = card.querySelector('.playBtn');
    const fullscreenBtn = card.querySelector('.fullscreenBtn');
    playBtn.addEventListener('click',()=>openGameModal(game.url));
    fullscreenBtn.addEventListener('click',()=>openGameFullscreen(game.url));
    container.appendChild(card);
  });
  setLanguage(langSelect.value);
}

// Modal
function openGameModal(url){
  gameFrame.src=url;
  gameModal.style.display="flex";
}
closeBtn.addEventListener('click',()=>{
  gameModal.style.display="none";
  gameFrame.src="";
});

// Buscador
searchBar.addEventListener('input',(e)=>{
  const filtered = games.filter(g=>g.name.toLowerCase().includes(e.target.value.toLowerCase()));
  displayGames(filtered);
});

// Categorías
function setupCategories(){
  const cats=[...new Set(games.map(g=>g.category))];
  categoriesDiv.innerHTML="";
  cats.forEach(cat=>{
    const btn=document.createElement('button');
    btn.addEventListener('click',()=>displayGames(games.filter(g=>g.category===cat)));
    btn.textContent=cat;
    categoriesDiv.appendChild(btn);
  });
}

// Fullscreen independiente
function openGameFullscreen(url){
  const fsContainer=document.createElement('div');
  fsContainer.style.position='fixed';
  fsContainer.style.top=0; fsContainer.style.left=0;
  fsContainer.style.width='100%'; fsContainer.style.height='100%';
  fsContainer.style.background='#000'; fsContainer.style.zIndex=3000;
  fsContainer.style.display='flex'; fsContainer.style.justifyContent='center'; fsContainer.style.alignItems='center';

  const iframe=document.createElement('iframe');
  iframe.src=url; iframe.style.width='100%'; iframe.style.height='100%'; iframe.style.border='none';
  fsContainer.appendChild(iframe);

  const exitBtn=document.createElement('button');
  exitBtn.innerText=translations[langSelect.value].exitFullscreen;
  exitBtn.style.position='absolute'; exitBtn.style.top='20px'; exitBtn.style.right='20px';
  exitBtn.style.padding='10px 15px'; exitBtn.style.fontSize='1rem'; exitBtn.style.background='#ff4d4d';
  exitBtn.style.color='#fff'; exitBtn.style.border='none'; exitBtn.style.borderRadius='6px'; exitBtn.style.cursor='pointer';
  exitBtn.addEventListener('click',()=>{ document.body.removeChild(fsContainer); if(document.fullscreenElement) document.exitFullscreen(); });
  fsContainer.appendChild(exitBtn);

  document.body.appendChild(fsContainer);
  if(fsContainer.requestFullscreen) fsContainer.requestFullscreen();
}

// Dark/Light
toggleThemeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  toggleThemeBtn.innerText = document.body.classList.contains('dark') ? translations[langSelect.value].lightMode : translations[langSelect.value].darkMode;
});

// Multi-idioma
langSelect.addEventListener('change',(e)=>setLanguage(e.target.value));
function setLanguage(lang){
  if(!translations[lang]) return;
  document.getElementById('searchBar').placeholder=translations[lang].search;
  contactTitle.innerText=translations[lang].contact;
  document.querySelector('#contactForm input[name="name"]').placeholder = translations[lang].name;
  document.querySelector('#contactForm input[name="email"]').placeholder = translations[lang].email;
  document.querySelector('#contactForm textarea[name="message"]').placeholder = translations[lang].message;
  document.querySelector('#contactForm button').innerText = translations[lang].send;

  document.querySelectorAll('.playBtn').forEach(btn => btn.innerText = translations[lang].play);
  document.querySelectorAll('.fullscreenBtn').forEach(btn => btn.innerText = translations[lang].fullscreen);

  toggleThemeBtn.innerText = document.body.classList.contains('dark') ? translations[lang].lightMode : translations[lang].darkMode;
  document.querySelector('footer p').innerText = translations[lang].footer;
}
