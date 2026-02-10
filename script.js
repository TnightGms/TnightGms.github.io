// Datos de juegos (puedes moverlos a games.json y cargar con fetch)
const games = [
  { name: "Super Mario", url: "https://example.com/mario", category: "Plataforma", img: "https://via.placeholder.com/220x150" },
  { name: "Pac-Man", url: "https://example.com/pacman", category: "Arcade", img: "https://via.placeholder.com/220x150" },
  { name: "Tetris", url: "https://example.com/tetris", category: "Puzzle", img: "https://via.placeholder.com/220x150" },
  // Agrega más aquí
];

// Referencias DOM
const container = document.getElementById("gamesContainer");
const searchBar = document.getElementById("searchBar");
const gameModal = document.getElementById("gameModal");
const gameFrame = document.getElementById("gameFrame");
const closeBtn = document.querySelector(".close");
const categoriesDiv = document.getElementById("categories");

// Mostrar juegos
function displayGames(list) {
  container.innerHTML = "";
  list.forEach(game => {
    const card = document.createElement("div");
    card.classList.add("gameCard");
    card.innerHTML = `
      <img src="${game.img}" alt="${game.name}">
      <h3>${game.name}</h3>
    `;
    card.addEventListener("click", () => openGame(game.url));
    container.appendChild(card);
  });
}

// Abrir modal
function openGame(url) {
  gameFrame.src = url;
  gameModal.style.display = "flex";
}

// Cerrar modal
closeBtn.addEventListener("click", () => {
  gameModal.style.display = "none";
  gameFrame.src = "";
});

// Buscador
searchBar.addEventListener("input", (e) => {
  const filtered = games.filter(game => game.name.toLowerCase().includes(e.target.value.toLowerCase()));
  displayGames(filtered);
});

// Categorías
const categories = [...new Set(games.map(g => g.category))];
categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.addEventListener("click", () => {
    displayGames(games.filter(g => g.category === cat));
  });
  categoriesDiv.appendChild(btn);
});

// Inicializar
displayGames(games);
