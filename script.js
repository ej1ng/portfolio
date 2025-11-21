// scroll animation!!
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add visible class when scrolling into view
            entry.target.classList.add('visible');
        } else {
            // Remove visible class when scrolling out of view
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});


document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project-container');
    projects.forEach(project => projectObserver.observe(project));
});
