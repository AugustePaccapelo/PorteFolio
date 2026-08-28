// const root = getRootPath();
const root = new URL("../", document.currentScript.src).href;
window.ROOT = root;

loadScript("js/Projects.js");
loadScript("js/Commons.js");
loadScript("js/Main.js");

loadStyle("css/Variables.css");
loadStyle("css/Reset.css");
loadStyle("css/Style.css");

function getRootPath() {
    const path = window.location.pathname;

    const index = path.indexOf("docs/");

    if (index === -1) {
        return "./";
    }

    return path.substring(0, index + 5);
}

function loadStyle(path) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = root + path;
    document.head.appendChild(link);
}

function loadScript(path) {
    const script = document.createElement("script");
    script.src = root + path;
    script.defer = true;
    document.head.appendChild(script);
}