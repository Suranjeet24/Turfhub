// Auth state management
const Auth = {
    // Get current user from localStorage
    getUser() {
        const user = localStorage.getItem('turfhub_user');
        return user ? JSON.parse(user) : null;
    },

    // Get token
    getToken() {
        return localStorage.getItem('turfhub_token');
    },

    // Check if logged in
    isLoggedIn() {
        return !!this.getToken() && !!this.getUser();
    },

    // Save auth data
    setAuth(token, user) {
        localStorage.setItem('turfhub_token', token);
        localStorage.setItem('turfhub_user', JSON.stringify(user));
    },

    // Clear auth data
    clearAuth() {
        localStorage.removeItem('turfhub_token');
        localStorage.removeItem('turfhub_user');
    },

    // Logout
    async logout() {
        try {
            await AuthAPI.logout();
        } catch (e) {
            // Ignore logout API errors
        }
        this.clearAuth();
        window.location.href = 'index.html';
    },

    // Require auth - redirect to login if not authenticated
    requireAuth() {
        if (!this.isLoggedIn()) {
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// Update navbar based on auth state
function updateNavbar() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const user = Auth.getUser();

    // Remove existing auth links
    const existingAuthLinks = navLinks.querySelectorAll('.auth-link');
    existingAuthLinks.forEach(el => el.remove());

    if (user) {
        navLinks.insertAdjacentHTML('beforeend', `
            <li class="auth-link"><span class="user-greeting">👤 ${user.name.split(' ')[0]}</span></li>
            <li class="auth-link"><a href="#" class="logout-btn" id="logoutBtn">Logout</a></li>
        `);

        document.getElementById('logoutBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            await Auth.logout();
        });
    } else {
        navLinks.insertAdjacentHTML('beforeend', `
            <li class="auth-link"><a href="login.html" class="login-nav-btn">Login</a></li>
            <li class="auth-link"><a href="signup.html" class="signup-nav-btn">Sign Up</a></li>
        `);
    }
}

// Initialize navbar on every page
document.addEventListener('DOMContentLoaded', updateNavbar);
