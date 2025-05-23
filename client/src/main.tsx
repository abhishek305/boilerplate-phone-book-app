import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Create a link to load Remix icons
const remixIconsLink = document.createElement("link");
remixIconsLink.rel = "stylesheet";
remixIconsLink.href = "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css";
document.head.appendChild(remixIconsLink);

// Create a title element if it doesn't exist
if (!document.querySelector("title")) {
  const titleElement = document.createElement("title");
  titleElement.textContent = "Phone Directory";
  document.head.appendChild(titleElement);
}

createRoot(document.getElementById("root")!).render(<App />);
