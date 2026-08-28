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

function sortProjects(projects, category) {
    return projects.filter(project => 
        project.categories.includes(category)
    );
}

function getProjectAsset(project, fileName) {
    return root + project.assets_path + fileName;
}

function setHeadPage(element, project) {
    element.innerHTML += `
        <h1>${project.title}</h1>
        <h3>${project.date} - ${createCategories(project.categories)} - ${project.duration}</h3>
        <h1>${project.job}</h1>
    `;
}

async function loadProjects() {
    const container = document.getElementById("projects_container");
    const projectId = document.body.dataset.projectId;
    if (container === null && projectId === null) return;

    //Data
    const projects_file = await fetch(root + "Data/Projects.json");
    const all_projects = await projects_file.json();

    //Categories
    const categories_file = await fetch(root + "Data/Categories.json");
    categories = await categories_file.json();

    let projects = all_projects;

    if (container != null) {
        const currentCategory = container.dataset.category;

        if (currentCategory != undefined) {
            projects = sortProjects(projects, currentCategory);
        }

        //Ranks
        const ranks_file = await fetch(root + "Data/RankedProjects.json");
        const ranks = await ranks_file.json();

        projects.sort((a, b) => ranks[a.id] - ranks[b.id]);

        const projectLimit = container.dataset.projectLimit;
        if (projectLimit != undefined) {
            projects = projects.slice(0, Number(projectLimit));
        }

        projects.forEach(project => {
            container.innerHTML += createProjectPreview(project); 
        });
    }

    if (projectId) {
        const project = projects.find(project => project.id === projectId);

        const headPage = document.querySelector(".head-page");
        setHeadPage(headPage, project);

        document.querySelectorAll("[data-src]").forEach(element => {
            const fileName = element.dataset.src;
            const assetPath = getProjectAsset(project, fileName);
            element.src = assetPath;            
            
            const video = element.closest("video");
            if (video) {
                video.load();
            }
        });
    }
}