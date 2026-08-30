class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <nav>
                <ul class="nav-bar">
                    <h4><a href="${ROOT}index.html">Accueil</a></h4>
                    <li class="nav-dropdown">
                        <h4><a href="${ROOT}personal_projects/index.html">Projets personnels</a></h4>
                        <ul class="nav-dropdown-content">
                            <li><h4><a href="${ROOT}personal_projects/tween_core.html">TweenCore</a></h4></li>
                            <li><h4><a href="${ROOT}personal_projects/devtober.html">Devtober</a></h4></li>
                        </ul>
                    </li>
                    <li class="nav-dropdown">
                        <h4><a href="${ROOT}school_projects/index.html">Projets d'école</a></h4>
                        <ul class="nav-dropdown-content">
                            <li><h4><a href="${ROOT}school_projects/iim/zero_paws.html">Zero Paws</a></h4></li>
                            <li><h4><a href="${ROOT}school_projects/iim/dragons_cadence.html">Dragon's Cadence</a></h4></li>
                            <li><h4><a href="${ROOT}school_projects/iim/color_survivor.html">Color Survivor</a></h4></li>
                            <li><h4><a href="${ROOT}school_projects/isart_digital/sokovolt.html">Sokovolt</a></h4></li>
                            <li><h4><a href="${ROOT}school_projects/isart_digital/morse_learner.html">Morse Learner</a></h4></li>
                        </ul>
                    </li>
                    <h4><a href="${ROOT}contact.html">Contact & CV</a></h4>
                </ul>
            </nav>
        </header>
        `;

        setActivePageInNav();
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <div class="footer-txt">
                <p>Auguste Paccapelo</p>
            </div>

            <div class="footer-img-container">
                <a href="https://github.com/AugustePaccapelo" target="_blank" rel="noopener noreferrer"><img src="${ROOT}assets/misc/logo_github.png"></a>
                <a href="https://www.linkedin.com/in/auguste-paccapelo-2b9b23350/" target="_blank" rel="noopener noreferrer"><img src="${ROOT}assets/misc/logo_linkedin.png"></a>
                <a href="https://augustepaccapelo.itch.io/" target="_blank" rel="noopener noreferrer"><img src="${ROOT}assets/misc/logo_itch.png"></a>
                <a href="mailto:paccapelo.auguste@gmail.com" target="_blank" rel="noopener noreferrer"><img src="${ROOT}assets/misc/logo_mail.png"></a>
            </div>

            <div class="footer-txt">
                <p>Game programmer</p>
            </div>
        </footer>
        `;
    }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);

function setActivePageInNav() {
    const currentPage = window.location.pathname;

    document.querySelectorAll("header a").forEach(function(link) {
        const linkPath = new URL(link.href).pathname;

        if (currentPage === linkPath){
            link.classList.add("active");
        }
        else if (linkPath.endsWith("index.html")) {
            const linkDir = linkPath.replace("index.html", "");

            const isDirValid = !(linkDir.endsWith("docs/") || linkDir.endsWith("PorteFolio/"));

            if (isDirValid && currentPage.startsWith(linkDir)) {
                link.classList.add("active");
            }
        }
    })
}
