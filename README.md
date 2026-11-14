# emilyjing.com

Check it out! https://emilyjing.com/

## Structure

```
index.html              page layout (nav, intro, about, projects, contact)
assets/
  css/styles.css        all styles; colors/fonts/spacing are variables at the top
  js/projects.js        project list - edit this to add/change projects
  js/main.js            builds the project cards + scroll fade-in
  fonts/                Aubrey + Poppins
  images/               site photos, logo, favicon
  images/projects/      project screenshots and logos
CNAME                   custom domain for GitHub Pages
```

## Adding a project

1. Put the screenshot and logo in `assets/images/projects/`.
2. Add an entry to `assets/js/projects.js`:

```js
{
    title: "My Project",
    link: "https://github.com/ej1ng/my-project",
    image: "my-project.png",
    logo: "my-project-logo.png",
    description: "What it does.",
},
```

## Running locally

Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.
