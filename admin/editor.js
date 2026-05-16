<script>
// === SIMPLE WYSIWYG EDITOR ===

function exec(cmd) {
    document.execCommand(cmd, false, null);
}

function execArg(cmd, arg) {
    document.execCommand(cmd, false, arg);
}

// === IMAGE UPLOAD ===

async function uploadImage() {
    const token = localStorage.getItem("admin_token");
    if (!token) return alert("Nejsi přihlášen.");

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
        const file = input.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("image", file);

        const res = await fetch("/api/admin/upload", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: form
        });

        if (!res.ok) {
            alert("Nahrání obrázku selhalo.");
            return;
        }

        const data = await res.json();

        // vloží obrázek do editoru
        execArg("insertImage", data.url);
    };

    input.click();
}
</script>
