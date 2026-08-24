document.addEventListener("DOMContentLoaded", onHtmlInitialize);
displayPreview();

function onHtmlInitialize() {
    displayPreview();
}

function displayPreview() {
    const previews = document.querySelectorAll(".preview");

    previews.forEach((element, index) => {
        if (index % 2 === 0) {
            element.classList.add("right");
        }
        else {
            element.classList.add("left");
        }
    })
}