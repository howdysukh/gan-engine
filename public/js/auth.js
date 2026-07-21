// =======================================================
// GAN ENGINE
// Authentication Manager
// =======================================================

const Auth = {

    user: null,

    // ===========================================
    // INITIALIZE
    // ===========================================

    async init() {

        await this.getSession();

        this.renderDashboard();
        this.renderWatchlist();
        this.renderAccount();

        this.bindEvents();

    },

    // ===========================================
    // SESSION
    // ===========================================

    async getSession() {

        try {

            const response = await fetch(
                "/api/auth/session",
                {
                    credentials: "include"
                }
            );

            const data = await response.json();

            if (data.loggedIn) {

                this.user = data.user;

            } else {

                this.user = null;

            }

        } catch (err) {

            console.error(err);

            this.user = null;

        }

    },

    // ===========================================
    // HELPERS
    // ===========================================

    isLoggedIn() {

        return this.user !== null;

    },

    isGuest() {

        return this.user &&
            this.user.provider === "guest";

    },

    isGoogle() {

        return this.user &&
            this.user.provider === "google";

    },

    // ===========================================
    // LOGIN
    // ===========================================

    loginGoogle() {

        window.location.href =
            "/api/auth/google";

    },

    loginGuest() {

        window.location.href =
            "/api/auth/guest";

    },

    async logout() {

    try {

        const response = await fetch("/api/auth/logout", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        this.user = null;

        window.location.reload();

    } catch (err) {

        console.error(err);

    }

},

    // ===========================================
    // BUTTON EVENTS
    // ===========================================

    bindEvents() {

        document
            .getElementById("googleLoginBtn")
            ?.addEventListener(
                "click",
                () => this.loginGoogle()
            );

        document
            .getElementById("guestLoginBtn")
            ?.addEventListener(
                "click",
                () => this.loginGuest()
            );

        document
            .getElementById("logoutBtn")
            ?.addEventListener(
                "click",
                () => this.logout()
            );

    },

        // ===========================================
    // DASHBOARD
    // ===========================================

    renderDashboard() {

        const subtitle = document.getElementById("dashboardSubtitle");
        const cards = document.getElementById("dashboardCards");
        const empty = document.getElementById("dashboardEmpty");

        if (!subtitle || !cards || !empty) return;

        if (!this.isLoggedIn()) {

            subtitle.textContent =
                "Sign in from the Account tab to begin mathematical market monitoring.";

            cards.style.display = "none";
            empty.style.display = "block";

            return;
        }

        subtitle.textContent =
            `Welcome back, ${this.user.name.split(" ")[0]} 👋`;

        cards.style.display = "grid";
        empty.style.display = "none";

    },

    // ===========================================
    // WATCHLIST
    // ===========================================

    renderWatchlist() {

        const subtitle =
            document.getElementById("watchlistSubtitle");

        const empty =
            document.getElementById("watchlistEmpty");

        const container =
            document.getElementById("watchlistContainer");

        if (!subtitle || !empty || !container)
            return;

        if (!this.isLoggedIn()) {

            subtitle.textContent =
                "You're not signed in.";

            empty.style.display = "block";
            container.style.display = "none";

            return;
        }

        subtitle.textContent =
            "Loading your watchlist...";

        empty.style.display = "none";
        container.style.display = "grid";

        // We'll fetch MongoDB data next sprint.

    },

    // ===========================================
    // ACCOUNT
    // ===========================================

    renderAccount() {

        const avatar =
            document.getElementById("avatar");

        const username =
            document.getElementById("username");

        const email =
            document.getElementById("email");

        const provider =
            document.getElementById("provider");

        const googleBtn =
            document.getElementById("googleLoginBtn");

        const guestBtn =
            document.getElementById("guestLoginBtn");

        const logoutBtn =
            document.getElementById("logoutBtn");

        if (!this.isLoggedIn()) {

            if (username)
                username.textContent = "Welcome";

            if (email)
                email.textContent =
                    "Sign in to unlock synchronization.";

            if (provider)
                provider.textContent = "";

            if (avatar)
                avatar.src = "assets/avatar.svg";

            if (googleBtn)
                googleBtn.style.display = "block";

            if (guestBtn)
                guestBtn.style.display = "block";

            if (logoutBtn)
                logoutBtn.style.display = "none";

            return;
        }

        // Logged In

        if (username)
            username.textContent = this.user.name;

        if (email)
            email.textContent =
                this.user.email || "Guest Session";

        if (provider)
            provider.textContent =
                this.isGoogle()
                    ? "Signed in with Google"
                    : "Guest Session";

        if (avatar) {

            if (this.user.photo)
                avatar.src = this.user.photo;
            else
                avatar.src = "assets/avatar.svg";

        }

        if (guestBtn)
            guestBtn.style.display = "none";

        if (googleBtn) {

            if (this.isGuest()) {

                googleBtn.textContent =
                    "Connect Google Account";

                googleBtn.style.display = "block";

            } else {

                googleBtn.style.display = "none";

            }

        }

        if (logoutBtn)
            logoutBtn.style.display = "flex";

    }

};

// =======================================================
// START
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    Auth.init();

});