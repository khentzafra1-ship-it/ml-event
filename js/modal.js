// ==========================================
// SIMPLE MODAL (replaces browser alert())
// Usage: showModal("Message", { title: "Title", type: "error", onClose: fn })
// ==========================================

(function () {

    const css = `
    .ml-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(0, 0, 0, .75);
        backdrop-filter: blur(3px);
        opacity: 0;
        transition: opacity .2s ease;
    }
    .ml-modal-overlay.show { opacity: 1; }

    .ml-modal {
        width: 100%;
        max-width: 400px;
        padding: 30px 26px 24px;
        background: #111;
        border: 1px solid #333;
        border-radius: 16px;
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
        color: #fff;
        transform: translateY(14px) scale(.96);
        transition: transform .2s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, .6);
    }
    .ml-modal-overlay.show .ml-modal { transform: none; }

    .ml-modal-icon {
        width: 56px;
        height: 56px;
        margin: 0 auto 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 26px;
        font-weight: bold;
    }
    .ml-modal.error .ml-modal-icon { background: rgba(255, 77, 77, .15); color: #ff4d4d; }
    .ml-modal.info  .ml-modal-icon { background: rgba(229, 184, 46, .15); color: #e5b82e; }
    .ml-modal.success .ml-modal-icon { background: rgba(60, 200, 120, .15); color: #3cc878; }

    .ml-modal h3 {
        margin: 0 0 10px;
        font-size: 20px;
        letter-spacing: .5px;
    }
    .ml-modal p {
        margin: 0 0 22px;
        color: #aaa;
        font-size: 14px;
        line-height: 1.6;
    }
    .ml-modal button {
        width: 100%;
        padding: 13px;
        border: none;
        border-radius: 10px;
        background: #e5b82e;
        color: #050505;
        font-size: 14px;
        font-weight: bold;
        letter-spacing: .5px;
        cursor: pointer;
        transition: transform .15s ease;
    }
    .ml-modal button:hover { transform: translateY(-2px); }
    `;

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    const icons = { error: "!", info: "i", success: "✓" };

    window.showModal = function (message, options) {

        options = options || {};

        const type = options.type || "error";
        const title = options.title || (type === "error" ? "Oops!" : "Notice");
        const buttonText = options.buttonText || "OK";

        const overlay = document.createElement("div");
        overlay.className = "ml-modal-overlay";
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");

        const box = document.createElement("div");
        box.className = "ml-modal " + type;

        const icon = document.createElement("div");
        icon.className = "ml-modal-icon";
        icon.textContent = icons[type] || "i";

        const heading = document.createElement("h3");
        heading.textContent = title;

        const text = document.createElement("p");
        text.textContent = message;   // textContent = safe from HTML injection

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = buttonText;

        box.append(icon, heading, text, button);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        requestAnimationFrame(function () {
            overlay.classList.add("show");
        });

        button.focus();

        function close() {
            document.removeEventListener("keydown", onKey);
            overlay.classList.remove("show");
            setTimeout(function () {
                overlay.remove();
                if (typeof options.onClose === "function") {
                    options.onClose();
                }
            }, 200);
        }

        function onKey(e) {
            if (e.key === "Escape" || e.key === "Enter") {
                e.preventDefault();
                close();
            }
        }

        button.addEventListener("click", close);
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) close();
        });
        document.addEventListener("keydown", onKey);
    };

})();
