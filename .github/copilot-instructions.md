# Ajith's Personal Portfolio Website
A personal portfolio website showcasing Ajith's work as a Frontend Developer & Maintenance Technician. Built with HTML5, CSS3, and vanilla JavaScript, designed for desktop viewing with animated elements and social media integration.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively
- **Setup and Dependencies:**
  - `npm install` -- installs linting dependencies in ~1 second. NEVER CANCEL.
  - No build process required - this is a static HTML/CSS/JS website
  - All dependencies are development-only (linting tools)

- **Running the Website:**
  - `npm run serve` or `python3 -m http.server 8000` -- starts local server on port 8000
  - Navigate to `http://localhost:8000` to view the portfolio
  - Server starts instantly, no build time required
  - Website displays desktop alert "Best View In Desktop Mode" on load

- **Linting and Validation:**
  - `npm run lint` -- runs both HTML and CSS validation in ~1.5 seconds. NEVER CANCEL.
  - `npm run lint:html` -- validates HTML structure (~0.7 seconds)
  - `npm run lint:css` -- validates CSS styles (~0.9 seconds)  
  - `npm run lint:fix` -- auto-fixes CSS style issues where possible
  - **Current known issues:** HTML has 10 validation errors, CSS has 2 deprecated property warnings

## Validation Scenarios
Always manually validate changes by:
1. **Start the development server:** `npm run serve`
2. **Open browser to http://localhost:8000** and verify:
   - Alert popup displays "Best View In Desktop Mode"
   - Social media icons are visible and positioned correctly (Instagram, Facebook, Twitter, GitHub, LinkedIn)
   - Introduction section shows "Hi, I'm Ajith" with animated background shapes
   - "Dream It Code It Achieve It" text animation displays
   - Scrolling reveals portfolio sections: "Who I'm Now", "Who I'm After 5 Years", "Those who are with me", "About Author"
   - All sections have readable text with purple/yellow color scheme
   - Background pattern and animations work correctly

## Repository Structure
```
/home/runner/work/My-portfolio/My-portfolio/
├── index.html              # Main portfolio page
├── style.css              # All styling and animations
├── package.json           # npm scripts and linting dependencies
├── .htmlvalidate.json     # HTML validation config
├── .stylelintrc.json      # CSS linting config
├── *.png                  # Social media icons and graphics
├── bg.jpeg, pattern.png   # Background images
├── profile.png            # Profile photo (597KB)
├── README.md              # Basic project description
├── LICENSE                # Apache License 2.0
└── SECURITY.md            # Security policy template
```

## Common Tasks
The following are outputs from frequently run commands. Reference them instead of running bash commands to save time.

### Repository Root Contents
```
.github/               # Copilot instructions directory
index.html            # Main HTML file (3.6KB)
style.css             # Main stylesheet (4.3KB)
package.json          # Dependencies and scripts
*.png                 # Graphics and icons (various sizes)
bg.jpeg               # Background image (72KB)
profile.png           # Profile photo (597KB)
```

### Package.json Scripts
```json
{
  "scripts": {
    "test": "npm run lint:html && npm run lint:css",
    "lint": "npm run lint:html && npm run lint:css", 
    "lint:html": "html-validate index.html",
    "lint:css": "stylelint style.css",
    "lint:fix": "stylelint style.css --fix",
    "serve": "python3 -m http.server 8000",
    "dev": "python3 -m http.server 8000"
  }
}
```

### HTML Structure Overview
- DOCTYPE html5 with viewport meta tag
- CSS linked via `style.css`
- JavaScript alert for desktop mode warning
- Social media links section with PNG icons
- Introduction section with animated text
- Portfolio content in scrollable container
- Known validation issues: 10 HTML errors (script placement, missing alt text, empty IDs, encoding issues)

### CSS Structure Overview  
- Purple/dark theme (#1D1F2D background)
- Animated shapes and text effects using CSS animations
- Absolute positioning for layout elements
- Custom scroll-snap behavior (has deprecated properties)
- Known issues: 2 CSS warnings for deprecated scroll-snap-type-x property

## Important Notes
- **No build process** - this is a static website served directly
- **Desktop-optimized** - displays alert recommending desktop viewing
- **Social media integration** - links to Instagram, Facebook, Twitter, GitHub, LinkedIn
- **Portfolio sections** showcase current role, 5-year goals, support network, and personal story
- **Performance** - Large profile.png (597KB) may affect load times
- **Dependencies** - Only development dependencies for linting (html-validate, stylelint)

## Known Issues
- HTML validation shows 10 errors (mostly accessibility and encoding issues)
- CSS uses deprecated scroll-snap-type-x property 
- Some social media links may be outdated
- Browser timeout issues may occur with automated testing tools
- Profile image is quite large (597KB) and could be optimized

Always test portfolio functionality by starting the server and manually browsing through all sections to ensure animations, links, and layout work correctly.