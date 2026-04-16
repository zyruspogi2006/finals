async function init() {
    await buildHeader();
    buildAbout();
    buildCharacters();
    buildElements();
    buildItems();
    buildFooter();
}
init();
function checkAuth() {
    const loggedIn = sessionStorage.getItem('genshin_user');
    if (!loggedIn) {
        showLoginModal();
    } else {
        showLogoutBtn(loggedIn);
    }
}

async function showLoginModal() {
    document.getElementById('mainContent').style.display = 'none';

    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';

    document.getElementById('loginBtn').addEventListener('click', () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const errorMsg = document.getElementById('loginError');

        const match = data.auth.users.find(
            u => u.username === username && u.password === password
        );

        if (match) {
            sessionStorage.setItem('genshin_user', username);
            modal.style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            showLogoutBtn(username);
        } else {
            errorMsg.textContent = 'Invalid username or password.';
        }
    });

    document.getElementById('loginPassword').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') document.getElementById('loginBtn').click();
    });
}

function showLogoutBtn(username) {
    const btn = document.getElementById('logoutBtn');
    btn.style.display = 'inline-block';
    btn.textContent = `Logout (${username})`;

    btn.addEventListener('click', () => {
        sessionStorage.removeItem('genshin_user');
        location.reload();
    });
}
async function buildHeader() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const header = document.getElementById('header');
    header.innerHTML = `
        <h1>${data.header.title}</h1>
        <p>${data.header.subtitle}</p>
        <button id="logoutBtn" style="display:none; position:absolute; top:1rem; right:1rem; background:#c8a96e; border:none; padding:0.5rem 1rem; border-radius:6px; cursor:pointer; font-weight:bold;"></button>
    `;
}
async function buildNav() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const navLinks = document.getElementById('navLinks');
    data.nav.forEach(item => {
        navLinks.innerHTML += `<a href="${item.href}">${item.label}</a>`;
    });
}
async function buildAbout() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const section = document.getElementById('about');
    section.innerHTML = `
        <h2>${data.about.heading}</h2>
        <p>${data.about.text}</p>
    `;
}
async function buildCharacters() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const section = document.getElementById('characters');
    section.innerHTML = `
        <h2>${data.characters.heading}</h2>
        <div class="cards" id="characterCards"></div>
    `;

    const cards = document.getElementById('characterCards');
    data.characters.list.forEach(char => {
        cards.innerHTML += `
            <a href="${char.href}" class="card-link">
                <div class="card ${char.element}">
                    <img src="${char.img}" alt="${char.name}" />
                    <h3>${char.name}</h3>
                    <p>${char.role}</p>
                </div>
            </a>
        `;
    });
}
async function buildElements() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const section = document.getElementById('elements');
    section.innerHTML = `
        <h2>${data.elements.heading}</h2>
        <div class="cards" id="elementCards"></div>
    `;

    const cards = document.getElementById('elementCards');
    data.elements.list.forEach(el => {
        cards.innerHTML += `<div class="card ${el.element}">${el.name}</div>`;
    });
}
async function buildItems() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const section = document.getElementById('items');
    section.innerHTML = `
        <h2>${data.items.heading}</h2>
        <div class="cards" id="itemCards"></div>
    `;

    const cards = document.getElementById('itemCards');
    data.items.categories.forEach(cat => {
        const listItems = cat.list.map(item => `<li>${item}</li>`).join('');
        cards.innerHTML += `
            <div class="card">
                <h3>${cat.name}</h3>
                <ul style="margin-top: 10px; text-align: left">${listItems}</ul>
            </div>
        `;
    });
}
async function buildFooter() {
    const getJson = await fetch('genshin_content.json');
    const data = await getJson.json();

    const footer = document.getElementById('mainFooter');
    footer.innerHTML = `<p>${data.footer.text}</p>`;
}
