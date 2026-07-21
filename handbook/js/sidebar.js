const pages = [
    ["Home","index"],
    ["Installation","installation"],
    ["Architecture","ARCHITECTURE"],
    ["Authentication","AUTHENTICATION"],
    ["Database","DATABASE"],
    ["API","API"],
    ["Deployment","deployment"],
    ["Security","SECURITY"],
    ["Tech Stack","TECH_STACK"],
    ["Project Structure","PROJECT_STRUCTURE"],
    ["Coding Standards","CODING_STANDARDS"],
    ["Contributing","CONTRIBUTING"],
    ["Troubleshooting","TROUBLESHOOTING"],
    ["FAQ","FAQ"],
    ["Disclaimer","DISCLAIMER"],
    ["Environment","environment"],
    ["Roadmap","ROADMAP"]
];

const sidebar = document.getElementById("sidebar");

sidebar.innerHTML = pages.map(([title,file]) => `
<a href="#${file}" data-page="${file}">
${title}
</a>
`).join("");