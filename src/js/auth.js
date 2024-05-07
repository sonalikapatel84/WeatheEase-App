import createAuth0Client from '@auth0/auth0-spa-js';

let auth0Client;

async function createClient() {
    return await createAuth0Client({
        domain: 'dev-8miv4dv35na5bsx3.us.auth0.com',
        client_id: 'Nt0o6lclxo5C8njITUcUt3UKiVANea9S'
    });
}

async function login() {
    await auth0Client.loginWithRedirect();
}

function logout() {
    auth0Client.logout();
}

async function handleRedirectCallback() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
        const query = window.location.search;
        if (query.includes('code=') && query.includes('state=')) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, '/');
        }
    }

    await updateUI();
}

async function updateUI() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    const btnLogin = document.getElementById('btn-login');
    const btnLogout = document.getElementById('btn-logout');

    btnLogin.addEventListener('click', login);
    btnLogout.addEventListener('click', logout);

    btnLogin.style.display = isAuthenticated ? 'none' : 'block';
    btnLogout.style.display = isAuthenticated ? 'block' : 'none';

    if (isAuthenticated) {
        const username = document.getElementById('username');
        const user = await auth0Client.getUser();

        username.innerText = user.name;
    }
}

window.addEventListener('load', async () => {
    auth0Client = await createClient();
    await handleRedirectCallback();
});

async function auth() {
    auth0Client = await createClient();
    await handleRedirectCallback();
}

export { auth, login, logout };