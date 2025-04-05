// Select the switcher container and all theme buttons using data attributes
const switcher = document.querySelector('[data-theme-switcher]');
const themeButtons = switcher ? switcher.querySelectorAll('[data-theme]') : [];
const body = document.body;

/**
 * Utility: Extract all available themes from the data-theme attributes
 */
function getAvailableThemes(buttons) {
  return Array.from(buttons).map(btn => btn.dataset.theme);
}

// Try to load saved theme from localStorage
let storedTheme = localStorage.getItem('theme');

// If no theme is stored, use the first button's data-theme as default
if (!storedTheme && themeButtons.length) {
  storedTheme = themeButtons[0].dataset.theme;
  localStorage.setItem('theme', storedTheme);
}

// Apply theme to body using data-current-theme
if (storedTheme) {
  body.setAttribute('data-current-theme', storedTheme);
}

// Update aria-pressed on buttons
themeButtons.forEach(btn => {
  const isActive = btn.dataset.theme === storedTheme;
  btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

  // Add click handler to each button
  btn.addEventListener('click', () => {
    const selectedTheme = btn.dataset.theme;

    // Update body attribute and localStorage
    body.setAttribute('data-current-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);

    // Update aria-pressed states
    themeButtons.forEach(b =>
      b.setAttribute('aria-pressed', b === btn ? 'true' : 'false')
    );
  });
});