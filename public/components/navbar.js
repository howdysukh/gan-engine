/* ======================================================
   GAN ENGINE
   PROJECT MERCURY
   NAVIGATION ENGINE
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const navItems = document.querySelectorAll(".nav-item");
    const pill = document.querySelector(".dock-pill");
    const views = document.querySelectorAll(".view");

    // --------------------------------------------------
    // Navigation History
    // --------------------------------------------------

    let currentView = "home";
    let previousView = "home";

    // --------------------------------------------------
    // Move Liquid Pill
    // --------------------------------------------------

    function movePill(target) {

        if (!target) return;

        const leftPadding = 8;
        const x = target.offsetLeft - leftPadding;

        pill.style.width = target.offsetWidth + "px";
        pill.style.transform = `translateX(${x}px)`;

    }

    // --------------------------------------------------
    // Switch Views
    // --------------------------------------------------

    function switchView(viewName) {

        if (viewName !== currentView) {

            previousView = currentView;
            currentView = viewName;

        }

        views.forEach(view => {

            view.classList.toggle(
                "active",
                view.dataset.view === viewName
            );

        });

        // Update dock only if this view has a nav button
        const navButton = document.querySelector(
            `.nav-item[data-view="${viewName}"]`
        );

        if (navButton) {

            navItems.forEach(btn =>
                btn.classList.remove("active")
            );

            navButton.classList.add("active");

            movePill(navButton);

        }

        // Load alerts when opening Alerts page
        if (
            viewName === "alerts" &&
            typeof Alerts !== "undefined"
        ) {
            Alerts.load();
        }

    }

    // --------------------------------------------------
    // Navigation Click
    // --------------------------------------------------

    navItems.forEach(button => {

        button.addEventListener("click", () => {

            switchView(button.dataset.view);

            createRipple(button);

        });

    });

    // --------------------------------------------------
    // Ripple Animation
    // --------------------------------------------------

    function createRipple(button) {

        const ripple = document.createElement("span");

        ripple.className = "nav-ripple";

        button.appendChild(ripple);

        ripple.addEventListener("animationend", () => {

            ripple.remove();

        });

    }

    // --------------------------------------------------
    // Window Resize
    // --------------------------------------------------

    window.addEventListener("resize", () => {

        const active = document.querySelector(".nav-item.active");

        if (active) {

            movePill(active);

        }

    });

    // --------------------------------------------------
    // Initialize
    // --------------------------------------------------

    movePill(document.querySelector(".nav-item.active"));

    // --------------------------------------------------
    // Public API
    // --------------------------------------------------

    window.Navbar = {

        switchView,

        goBack() {

            switchView(previousView);

        }

    };

});