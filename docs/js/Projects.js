let categories;

function createProjectPreview(project) {
    return `
        <a class="preview project" href="${root}${project.link}">
            <img 
                src="${root}${project.assets_path}${project.thumbnail}"
                alt="${project.title}"
            >
            <div class="preview-text">
                <h2>${project.title}</h2>
                <p>${project.date} - ${createCategories(project.categories)} - ${project.duration}</p>
                <h3>${project.job}</h3>
            </div>
        </a>

        <div class="divider"></div>
    `;
}

function createCategories(project_categories) {
    return project_categories.map(categoryId => {
        return `${categories[categoryId]}`;
    }).join(" - ");
}

async function loadProjects() {
    const container = document.getElementById("projects_container");
    if (container === null) return;

    //Data
    const projects_file = await fetch(root + "Data/Projects.json");
    const projects = await projects_file.json();

    //Categories
    const categories_file = await fetch(root + "Data/Categories.json");
    categories = await categories_file.json();

    //Ranks
    const ranks_file = await fetch(root + "Data/RankedProjects.json");
    const ranks = await ranks_file.json();

    projects.forEach(project => {
        container.innerHTML += createProjectPreview(project); 
    });
}