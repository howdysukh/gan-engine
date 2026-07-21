async function router() {

    const page =
    (location.hash.split("#")[1] || "index").trim();

    document.querySelectorAll("#sidebar a").forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.page === page
        );
    });

    const content = document.getElementById("content");

    content.style.opacity = 0;

    try {

        const res = await fetch(`docs/${page}.md`);

        if (!res.ok)
            throw new Error("Page not found");

        const md = await res.text();

        content.innerHTML = marked.parse(md);

        document.querySelectorAll("pre code").forEach(block=>{
            hljs.highlightElement(block);
        });

        buildTOC();

    } catch {

        content.innerHTML = `
        <h1>404</h1>
        <p>Documentation page not found.</p>
        `;

    }

    addCopyButtons();

    requestAnimationFrame(()=>{
        content.style.opacity=1;
    });

}