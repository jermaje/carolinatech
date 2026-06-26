# Carolina Technician - IT Services Landing Page

A modern, high-performance landing page for Carolina Technician, providing IT & computer repair services in Brgy. Carolina, Naga City, Philippines.

## 🚀 Features

- **Premium Developer UI**: A clean, light-themed modern SaaS/developer aesthetic built from scratch with CSS custom properties, grid lines, and soft shadows.
- **Optimized Typography**: Clean editorial headings using *Cabinet Grotesk*, highly legible body copy with *Inter*, and command-line code blocks styled with *JetBrains Mono*.
- **Interactive Service Cards**: Clickable cards that automatically scroll to the contact form and pre-select the appropriate service choice in the dropdown.
- **Technical Terminal Mockup**: A custom dark terminal mockup demonstrating command executions to showcase technical expertise.
- **Interactive Service Tabs**: Clean, tabbed layout for categorizing services (Computer & Device, CCTV & Security, Networking).
- **Contact Form Integration**: Fully functional, spam-protected contact form powered by [Web3Forms](https://web3forms.com/) (No backend required!).
- **Floating Contact Stack**: Quick-access, animated floating buttons for WhatsApp, Viber, and SMS.
- **Fully Responsive**: Optimized for seamless viewing on desktop, tablet, and mobile devices.
- **Modern Icons**: Uses the crisp and lightweight [Lucide Icons](https://lucide.dev/) library.

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure.
- **CSS3**: Custom properties (variables), Grid, Flexbox, and CSS animations (No external frameworks like Bootstrap or Tailwind).
- **Vanilla JavaScript**: DOM manipulation, Intersection Observers for scroll animations, and AJAX fetch requests for form handling.

## 📂 Project Structure

- `index.html` - The main HTML document containing all layout sections (Hero, Services, Why Us, About, Process, FAQ, Contact).
- `assets/` - Directory containing all static assets:
  - `css/` - Modular styling components:
    - `style.css` - Main entry hub importing all stylesheets.
    - `variables.css` - CSS Custom Properties / theme definitions.
    - `reset.css` - Base resets, body scroll parameters, and theme transitions.
    - `layout.css` - Navbar and footer structural styling.
    - `components.css` - Styled individual components (buttons, input elements, modals, FAB stack, segment tabs).
    - `sections.css` - Grid blocks and layouts for page sections.
    - `utilities.css` - Scroll reveals and text alignment helpers.
    - `animations.css` - Global animation `@keyframes`.
    - `responsive.css` - Organized media query overrides.
  - `js/` - Modular JavaScript logic:
    - `main.js` - Application coordinator (modals, cost estimator, area checker, forms, theme state).
    - `navbar.js` - Navigation drawers, active link styling, sticky navbar scroll states, and contact FAB stack toggling.
    - `scroll.js` - Intersection Observer for page element reveals on scroll.
    - `gallery.js` - Testimonials carousel scrolling controls.
    - `faq.js` - Collapsible FAQ accordion items.
    - `counter.js` - Count-up number animation logic.
  - `images/` - Subfolders organized for future image assets (`hero`, `services`, `projects`, etc.).


## 💻 Getting Started

This is a static website, so no complex build tools or servers are required to run it locally.

1. Clone or download the repository.
2. Open the `index.html` file directly in your web browser.
3. *Optional*: For the best development experience, open the folder in VS Code and use an extension like **Live Server** to preview changes in real-time.

## 📝 Configuration (Web3Forms)

To receive emails from the contact form, you need to add your own Web3Forms access key:

1. Visit [web3forms.com](https://web3forms.com/).
2. Enter your email address to get a free Access Key.
3. Open `index.html` and locate the hidden input inside the form.
4. Replace the `value` with your new access key:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```

## 📄 License

This project is created by Jerson Jemenez. All rights reserved.
