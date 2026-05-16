# Carolina Technician - IT Services Landing Page

A modern, high-performance landing page for Carolina Technician, providing IT & computer repair services in Brgy. Carolina, Naga City, Philippines.

## 🚀 Features

- **Premium Dark Mode UI**: A sleek, neon-accented dark theme built from scratch with CSS.
- **Dynamic Animations**: Scroll-triggered reveal animations, statistics counters, and cascading service cards.
- **Interactive Service Tabs**: Clean, tabbed layout for categorizing services (Computer & Device, CCTV & Security, Networking).
- **Contact Form Integration**: Fully functional, spam-protected contact form powered by [Web3Forms](https://web3forms.com/) (No backend required!).
- **Floating Socials**: Quick-access, animated floating buttons for WhatsApp and Viber.
- **Fully Responsive**: Optimized for seamless viewing on desktop, tablet, and mobile devices.
- **Modern Icons**: Uses the crisp and lightweight [Lucide Icons](https://lucide.dev/) library.

## 🛠️ Technology Stack

- **HTML5**: Semantic markup and structure.
- **CSS3**: Custom properties (variables), Grid, Flexbox, and CSS animations (No external frameworks like Bootstrap or Tailwind).
- **Vanilla JavaScript**: DOM manipulation, Intersection Observers for scroll animations, and AJAX fetch requests for form handling.

## 📂 Project Structure

- `index.html` - The main HTML document containing all sections (Hero, Services, Why Us, Process, FAQ, Contact).
- `styles.css` - All styling, including typography, layout, variables, and animations.
- `script.js` - Interactivity logic (mobile menu, sticky nav, scroll reveals, tab switching, form submission).

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

This project is created for Carolina Technician. All rights reserved.
