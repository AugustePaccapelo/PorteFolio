if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onHtmlInitialize);
}
else {
    onHtmlInitialize();
}

async function onHtmlInitialize() {
    await renderProjectsPage();
    applyAlternatingPreviewLayout();
}

function applyAlternatingPreviewLayout() {
    const previews = document.querySelectorAll(".preview");

    previews.forEach((element, index) => {
        if (index % 2 === 0) {
            element.classList.add("right");
        }
        else {
            element.classList.add("left");
        }
    });
}
