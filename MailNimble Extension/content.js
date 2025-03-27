console.log("Hello from content.js");

function createAiButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "8px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}
function findComposeToolbar() {
  const selectors = [".btC", ".aDh", '[role="toolbar"]', ".gU.Up"];

  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }

    return null;
  }
}

function getEmailContent() {
  const selectors = [
    ".a3s.aiL ",
    ".h7",
    '[role="presentation"]',
    ".gmail_quote",
  ];

  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }

    return "";
  }
}

function injectButton() {
  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) existingButton.remove();
  const toolbar = findComposeToolbar();

  if (!toolbar) {
    console.log("Compose toolbar not found");
    return;
  }

  console.log("Compose toolbar found");
  const button = createAiButton();

  button.classList.add("ai-reply-button");
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;
      const emailContent = getEmailContent();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate AI reply");
      }

      const generatedReply = await response.text();

      const composebox = document.querySelector(
        '[role="textbox"] , [g_editable="true"]'
      );
      if (composebox) {
        composebox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Compose box not found");
      }
    } catch (error) {
      alert("Failed to generate AI reply", error);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });
  toolbar.insertBefore(button, toolbar.firstChild);
  console.log("Button injected");
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    for (const mutation of mutations) {
      const addedNodes = Array.from(mutation.addedNodes);
      const hasComposeElements = addedNodes.some(
        (node) =>
          (node.nodeType === Node.ELEMENT_NODE &&
            node.matches('.aDh, .btC , [role="dialog"]')) ||
          node.querySelector('.aDh, .btC , [role="dialog"]')
      );

      if (hasComposeElements) {
        console.log("Compose elements found");
        setTimeout(injectButton, 500);
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
