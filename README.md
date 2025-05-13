# AZ-Solutions

**Developing ideas with an architectural mindset.**

AZ-Solutions is a creative, modular platform focused on architectural thinking — bridging design, identity, and code. This repository contains the foundation of the AZ Portfolio SPA, built using HTML, CSS, and Vanilla JavaScript.

---

## 🚀 Overview

This project was developed entirely from scratch with the help of **ChatGPT** and **Cursor AI Agents**.  
It follows a minimalist, grid-based layout inspired by architectural precision and clarity.

---

## 📁 Project Structure

```
az-solutions/
├── public/
│   ├── index.html                ← Main entry, links all styles and scripts
│   ├── assets/                   ← Fonts, images, icons
│   └── data/
│       ├── cv.json               ← Resume data
│       └── projects.json         ← Portfolio projects
│
├── src/
│   ├── components/               ← Reusable HTML components (header, project card)
│   ├── config/
│   │   └── strings.json          ← Centralized text strings
│   ├── js/
│   │   ├── i18n.js               ← Text loading and replacement
│   │   └── ...                   ← Other JS modules
│   └── styles/
│       ├── variables.css         ← CSS variables including typography
│       ├── typography-overrides.css ← Custom typography adjustments
│       └── ...                   ← Other style modules
│
└── README.md
```

---

## ✨ Key Features

- ✅ SPA structure with clean modular file organization
- ✅ Glass-style header with architectural timeline
- ✅ Dynamic theme toggle, language switch, and fullscreen control
- ✅ Grid-based layout inspired by architectural drawing systems
- ✅ JSON-powered CV and portfolio rendering
- ✅ Centralized text management with i18n support
- ✅ Unified typography system with CSS variables

---

## 🛠️ Tech Stack

- HTML5
- CSS3 (modular + variables)
- Vanilla JavaScript (ES6+)
- JSON-based data loading
- Designed & built using ChatGPT + Cursor

---

## 📝 Text & Typography Management

### Adding or Updating Strings

To add or update text strings:

1. Open `src/config/strings.json`
2. Add your string using the appropriate category or create a new one
3. Use dot notation for the keys (e.g., `navigation.home`)
4. Reference in HTML using data attributes: `<span data-i18n="navigation.home">Home</span>`

### Using the String Loader

To use strings in JavaScript:

```javascript
import i18n from "./i18n.js";

// Get a string programmatically
const buttonLabel = i18n.getString("controls.saveButton");

// Create a new element with i18n support
const element = document.createElement("button");
element.setAttribute("data-i18n", "controls.saveButton");
document.body.appendChild(element);

// Apply strings to all new elements with data-i18n attributes
i18n.updateDom();
```

### Typography Variables

The project uses a comprehensive set of typography variables for consistent styling:

- Font families: `--font-family-base`, `--font-family-heading`, `--font-family-mono`
- Font sizes: `--font-size-xs` through `--font-size-4xl`
- Font weights: `--font-weight-light` through `--font-weight-bold`
- Line heights: `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

#### Menu-Specific Typography

Main Menu and Sub Menu have their own independent typography variables:

**Main Menu Variables:**

- `--main-menu-font-family`
- `--main-menu-font-size`
- `--main-menu-font-weight`
- `--main-menu-line-height`
- `--main-menu-letter-spacing`
- `--main-menu-text-transform`
- `--main-menu-padding`

**Sub Menu Variables:**

- `--sub-menu-font-family`
- `--sub-menu-font-size`
- `--sub-menu-font-weight`
- `--sub-menu-line-height`
- `--sub-menu-letter-spacing`
- `--sub-menu-text-transform`
- `--sub-menu-padding`

This allows for independent styling of each menu type while maintaining consistency with the global typography system.

### Typography Overrides

To customize typography without changing the core variables:

1. Open `src/styles/typography-overrides.css`
2. Uncomment and modify the desired variables
3. These will override the base definitions while preserving the original defaults

---

## 🔗 Live Preview (coming soon)

This repository will later be deployed via **GitHub Pages** or **Vercel**.

---

## 🧠 Author

Ahmad Mirjalalian | WEBGARD
Architect & Platform Developer  
[LinkedIn →](https://www.linkedin.com/in/ahmad-mirjalalian-416b49268/)
