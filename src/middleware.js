export const onRequest = async ({ request, locals, redirect }) => {
  const url = new URL(request.url);

  // chráníme jen /admin
  if (url.pathname.startsWith("/admin")) {
    const cookie = request.headers.get("cookie") || "";

    // pokud má session cookie → pustíme dál
    if (cookie.includes("admin_session=1")) {
      return;
    }

    // pokud není přihlášený → přesměruj na login
    if (!url.pathname.startsWith("/admin/login")) {
      return redirect("/admin/login");
    }
  }
};
