function buildTOC() {

    const toc = document.getElementById("toc");
    toc.innerHTML = "";

    document.querySelectorAll("#content h2, #content h3").forEach(h => {

        const id = h.textContent
            .trim()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        h.id = id;

        const a = document.createElement("a");

        a.textContent = h.textContent;
        a.href = "#";

        a.onclick = (e) => {

            e.preventDefault();

            h.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        };

        toc.appendChild(a);

    });

}