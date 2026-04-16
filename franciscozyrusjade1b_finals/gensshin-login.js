buildHeader();
buildForm();
buildDivider();
buildSocialButtons();
buildSignupLink();

async function buildHeader() {
    const getJson = await fetch('gensshin-login_content.json');
    const data = await getJson.json();

    const header = document.getElementById('loginHeader');
    header.innerHTML = `
        <h1>${data.header.title}</h1>
        <p>${data.header.subtitle}</p>
    `;
}

async function buildForm() {
    const getJson = await fetch('gensshin-login_content.json');
    const data = await getJson.json();

    const form = document.getElementById('loginForm');

    let fieldsHTML = '';
    data.form.fields.forEach(field => {
        fieldsHTML += `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="${field.type}" id="${field.id}" name="${field.name}" placeholder="${field.placeholder}">
            </div>
        `;
    });

    const rememberForgot = `
        <div class="remember-forgot">
            <div class="remember-me">
                <input type="checkbox" id="${data.form.remember.id}">
                <label for="${data.form.remember.id}">${data.form.remember.label}</label>
            </div>
            <a href="${data.form.forgotPassword.href}" class="forgot-password">${data.form.forgotPassword.label}</a>
        </div>
    `;

    const errorMsg = `<p id="loginError" style="color:red; font-size:0.85rem; min-height:1em;"></p>`;
    const submitBtn = `<button type="button" class="login-btn" id="loginBtn">${data.form.submitBtn}</button>`;

    form.innerHTML = fieldsHTML + rememberForgot + errorMsg + submitBtn;

    // Handle login click - no password check
    document.getElementById('loginBtn').addEventListener('click', () => {
        window.location.href = 'html/genshhin.html';
    });
}

async function buildDivider() {
    const getJson = await fetch('gensshin-login_content.json');
    const data = await getJson.json();

    const divider = document.getElementById('divider');
    divider.textContent = data.divider;
}

async function buildSocialButtons() {
    const getJson = await fetch('gensshin-login_content.json');
    const data = await getJson.json();

    const socialLogin = document.getElementById('socialLogin');

    data.socialButtons.forEach(btn => {
        socialLogin.innerHTML += `<button class="social-btn">${btn.label}</button>`;
    });
}

async function buildSignupLink() {
    const getJson = await fetch('gensshin-login_content.json');
    const data = await getJson.json();

    const signupLink = document.getElementById('signupLink');
    signupLink.innerHTML = `
        ${data.signupLink.text} <a href="${data.signupLink.href}">${data.signupLink.label}</a>
    `;
}
