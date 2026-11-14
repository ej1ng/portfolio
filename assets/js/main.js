const PROJECT_IMAGE_DIR = "assets/images/projects/";

// Build one project card from an entry in PROJECTS (see projects.js).
// Uses DOM methods instead of innerHTML so text is never parsed as HTML.
function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-container";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "project-image-wrapper";
    const image = document.createElement("img");
    image.className = "project-image";
    image.src = PROJECT_IMAGE_DIR + project.image;
    image.alt = project.title + " screenshot";
    image.loading = "lazy";
    imageWrapper.append(image);

    const content = document.createElement("div");
    content.className = "project-content";

    const titleSection = document.createElement("div");
    titleSection.className = "project-title-section";
    const logo = document.createElement("img");
    logo.className = "project-logo";
    logo.src = PROJECT_IMAGE_DIR + project.logo;
    logo.alt = "";
    const title = document.createElement("a");
    title.className = "project-title";
    title.href = project.link;
    title.textContent = project.title;
    titleSection.append(logo, title);

    const text = document.createElement("div");
    text.className = "project-text";
    const paragraph = document.createElement("p");
    paragraph.textContent = project.description;
    text.append(paragraph);

    content.append(titleSection, text);
    card.append(imageWrapper, content);
    return card;
}

// Fade cards in as they scroll into view, and out again when they leave.
const projectObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("visible", entry.isIntersecting);
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.addEventListener("DOMContentLoaded", () => {
    const row = document.getElementById("projects-row");
    PROJECTS.forEach((project) => {
        const card = createProjectCard(project);
        row.append(card);
        projectObserver.observe(card);
    });
});
