function addCopyButtons(){

    document.querySelectorAll("pre").forEach(pre=>{

        if(pre.querySelector("button")) return;

        const btn=document.createElement("button");

        btn.innerText="Copy";

        btn.className="copy-btn";

        btn.onclick=()=>{

            navigator.clipboard.writeText(
                pre.innerText
            );

            btn.innerText="Copied!";

            setTimeout(()=>{
                btn.innerText="Copy";
            },1500);

        };

        pre.appendChild(btn);

    });

}