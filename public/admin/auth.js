<script>
    // Vrátí token
    function getToken() {
        return localStorage.getItem("admin_token");
    }

    // Ověří, zda je uživatel přihlášen
    function requireAuth() {
        const token = getToken();
        if (!token) {
            window.location.href = "/admin/login.html";
        }
        return token;
    }

    // Odhlášení
    function logout() {
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/login.html";
    }
</script>
