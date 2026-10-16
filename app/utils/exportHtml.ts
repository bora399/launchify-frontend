/**
 * Export the published page itself, rather than maintaining four duplicate templates.
 * CSS and its assets are embedded so opening the HTML does not depend on Next.js.
 */
export async function buildProjectHtml(
  project: Record<string, any>,
): Promise<string> {
  const slug = project?.slug || project?.Slug;
  if (typeof slug !== "string" || !slug.trim())
    throw new Error("Sayfanın bağlantısı bulunamadı.");
  const pageUrl = new URL(
    `/${encodeURIComponent(slug)}`,
    window.location.origin,
  );
  const response = await fetch(pageUrl, {
    cache: "no-store",
    credentials: "same-origin",
  });
  if (!response.ok)
    throw new Error("Güncel sayfa alınamadı. Lütfen tekrar deneyin.");
  const source = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  );
  const landing = source.querySelector<HTMLElement>(".landing-page");
  if (!landing)
    throw new Error("Sayfanın tasarımı yüklenemedi. Lütfen tekrar deneyin.");

  const resources = new Map<string, Promise<string>>();
  const embedAsset = (href: string) => {
    let asset = resources.get(href);
    if (!asset) {
      asset = (async () => {
        const result = await fetch(href, { credentials: "same-origin" });
        if (!result.ok)
          throw new Error(
            "Tasarım dosyaları indirilemedi. Lütfen tekrar deneyin.",
          );
        const blob = await result.blob();
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () =>
            reject(new Error("Tasarım dosyası okunamadı."));
          reader.readAsDataURL(blob);
        });
      })();
      resources.set(href, asset);
    }
    return asset;
  };

  async function embedCss(css: string, baseUrl: string): Promise<string> {
    // Next's compiled styles contain no imports. Fail explicitly if that changes.
    if (/@import\s/i.test(css))
      throw new Error(
        "Tasarım stilleri henüz hazır değil. Lütfen tekrar deneyin.",
      );
    const matches = [
      ...css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/g),
    ];
    const replacements = await Promise.all(
      matches.map(async (match) => {
        const value = match[1] ?? match[2] ?? match[3];
        if (!value || /^(data:|#)/i.test(value)) return match[0];
        const href = new URL(value, baseUrl).href;
        return `url("${await embedAsset(href)}")`;
      }),
    );
    let index = 0;
    return css.replace(
      /url\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)/g,
      () => replacements[index++],
    );
  }

  const styles = await Promise.all(
    Array.from(source.querySelectorAll('link[rel="stylesheet"], style')).map(
      async (node) => {
        if (node.tagName === "STYLE")
          return embedCss(node.textContent || "", pageUrl.href);
        const href = new URL(node.getAttribute("href") || "", pageUrl).href;
        const result = await fetch(href, { credentials: "same-origin" });
        if (!result.ok)
          throw new Error(
            "Tasarım stilleri indirilemedi. Lütfen tekrar deneyin.",
          );
        const css = await embedCss(await result.text(), href);
        const media = node.getAttribute("media");
        return media && media !== "all" ? `@media ${media}{${css}}` : css;
      },
    ),
  );
  if (!styles.length) throw new Error("Sayfanın stilleri bulunamadı.");

  const output = document.implementation.createHTMLDocument(
    source.title || project.productName || "Tanıtım sayfası",
  );
  output.documentElement.lang = source.documentElement.lang || "tr";
  output.documentElement.className = source.documentElement.className;
  output.body.className = source.body.className;
  const charset = output.createElement("meta");
  charset.setAttribute("charset", "utf-8");
  output.head.prepend(charset);
  const viewport = output.createElement("meta");
  viewport.name = "viewport";
  viewport.content = "width=device-width, initial-scale=1";
  output.head.append(viewport);
  for (const css of styles) {
    const style = output.createElement("style");
    style.textContent = css;
    output.head.append(style);
  }

  const wrapper = output.createElement("main");
  wrapper.className =
    landing.parentElement?.tagName === "MAIN"
      ? landing.parentElement.className
      : "flex-grow flex flex-col relative z-10";
  wrapper.append(output.importNode(landing, true));
  const attribution = source.querySelector(".product-attribution");
  if (attribution) wrapper.append(output.importNode(attribution, true));
  output.body.append(wrapper);

  // Keep anchors local, but resolve links back to Launchify independently of the file location.
  for (const link of output.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    const href = link.getAttribute("href") || "";
    if (href && !href.startsWith("#")) link.href = new URL(href, pageUrl).href;
  }
  for (const node of output.body.querySelectorAll(
    "script, link[rel='preload']",
  ))
    node.remove();

  const config = {
    apiUrl:
      process.env.NEXT_PUBLIC_API_URL ||
      "https://launchify-backend-3a7w.onrender.com",
    pageId: project.id || project.Id || slug,
    liveUrl: `${pageUrl.href}#waitlist`,
  };
  const script = output.createElement("script");
  script.textContent = `(${connectExportedWaitlist.toString()})(${JSON.stringify(config).replace(/</g, "\\u003c")});`;
  output.body.append(script);
  return "<!DOCTYPE html>\n" + output.documentElement.outerHTML;
}

function connectExportedWaitlist(config: {
  apiUrl: string;
  pageId: string;
  liveUrl: string;
}) {
  const signup = document.querySelector<HTMLElement>(".lp-signup");
  const form = signup?.querySelector<HTMLFormElement>("form");
  const message = signup?.querySelector<HTMLElement>('[role="status"]');
  const email = form?.querySelector<HTMLInputElement>('input[name="email"]');
  const honeypot = form?.querySelector<HTMLInputElement>(
    'input[name="b_phone_verification"]',
  );
  const button = form?.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );
  if (!form || !message || !email || !button) return;
  const originalButton = button.innerHTML;
  let pending = false;
  email.addEventListener("input", () => {
    if (pending) return;
    message.className = "lp-form-message lp-form-message--idle";
    message.textContent = "";
    email.removeAttribute("aria-describedby");
  });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending || !email.value.trim()) return;
    pending = true;
    button.disabled = true;
    button.textContent = "Kaydediliyor…";
    form.setAttribute("aria-busy", "true");
    try {
      const response = await fetch(
        config.apiUrl.replace(/\/$/, "") + "/api/Waitlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pageId: config.pageId,
            email: email.value.trim().toLowerCase(),
            honeypot: honeypot?.value || "",
          }),
        },
      );
      if (response.status === 409) {
        message.className = "lp-form-message lp-form-message--duplicate";
        message.textContent =
          "Bu e-posta adresi zaten bekleme listesinde kayıtlı.";
        email.setAttribute("aria-describedby", message.id);
      } else if (response.ok) {
        message.className = "lp-form-message lp-form-message--success";
        const tick = document.createElement("span");
        tick.setAttribute("aria-hidden", "true");
        tick.textContent = "✓";
        const text = document.createElement("div");
        const title = document.createElement("strong");
        title.textContent = "Kaydınız alındı.";
        const thanks = document.createElement("p");
        thanks.textContent = "İlginiz için teşekkür ederiz.";
        text.append(title, thanks);
        message.replaceChildren(tick, text);
        form.hidden = true;
        email.value = "";
      } else throw new Error("Kayıt alınamadı.");
    } catch {
      message.className = "lp-form-message lp-form-message--error";
      message.textContent = "Kaydınız alınamadı. Lütfen tekrar deneyin. ";
      const live = document.createElement("a");
      live.href = config.liveUrl;
      live.target = "_blank";
      live.rel = "noopener noreferrer";
      live.textContent = "Canlı sayfadan kaydolun.";
      message.append(live);
      email.setAttribute("aria-describedby", message.id);
    } finally {
      pending = false;
      button.disabled = false;
      button.innerHTML = originalButton;
      form.setAttribute("aria-busy", "false");
    }
  });
}

export async function exportProjectAsHtml(
  project: Record<string, any>,
): Promise<void> {
  const html = await buildProjectHtml(project);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = String(project.slug || project.Slug || "landing-page").replace(
    /[^\p{L}\p{N}_-]/gu,
    "-",
  );
  link.href = url;
  link.download = `${slug}_website.html`;
  document.body.append(link);
  link.click();
  link.remove();
  // Let the browser consume the blob before releasing its memory.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
