



<div align="center">
  <img src="/MarkUps/1.png" alt="Website Preview" width="700"/>
  <h1>My Personal Blog & Portfolio</h1>
  <p>
    <strong>Showcasing my professional journey, projects, and personal interests. Built with Astro for a lightning-fast, dynamic experience.</strong>
  </p>
  <p>
    <a href="https://www.rafay99.com"><strong>Visit Live Site »</strong></a>
  </p>
  <p>
    <a href="https://github.com/rafay99-epic/Personal-Blog/issues">Report Bug</a>
    ·
    <a href="https://github.com/rafay99-epic/Personal-Blog/issues">Request Feature</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Astro-Powered-purple?style=for-the-badge&logo=astro" alt="Astro Powered">
    <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel Deployed">
    <img src="https://img.shields.io/github/license/rafay99-epic/Personal-Blog?style=for-the-badge" alt="License">
    <img src="https://img.shields.io/github/stars/rafay99-epic/Personal-Blog?style=for-the-badge&logo=github" alt="GitHub Stars">
  </p>
</div>

## ✨ Why This Project?

This website serves as my digital resume, project showcase, and a space to share insights and thoughts through my blog. It's built with modern web technologies to be fast, accessible, and SEO-friendly.

---

## 🚀 Core Features

| Badge                                                               | Feature                    | Description                           |
| ------------------------------------------------------------------- | -------------------------- | ------------------------------------- |
| ![Responsive](https://img.shields.io/badge/Responsive-Design-blue)  | **Responsive Design**      | Seamless experience on all devices.   |
| ![Blog](https://img.shields.io/badge/Dynamic-Blog-orange)           | **Dynamic Blog**           | Regular updates and industry insights.|
| ![Portfolio](https://img.shields.io/badge/Portfolio-Showcase-green) | **Portfolio Showcase**     | Highlights my best projects.          |
| ![Contact](https://img.shields.io/badge/Contact-Form-red)           | **Web3Forms Contact**      | Easy and reliable communication.      |
| ![Astro](https://img.shields.io/badge/Astro-Optimized-purple)       | **Astro-Powered**          | Blazing fast performance & SEO.       |
| ![SEO](https://img.shields.io/badge/SEO-Optimized-blue)             | **SEO Optimized**          | Enhanced search engine visibility.    |
| ![RSS](https://img.shields.io/badge/RSS-Feed-yellow)                | **RSS Feed & Sitemap**     | Stay updated, improved indexing.      |
| ![Search](https://img.shields.io/badge/Search-Enabled-lightblue)    | **Pagefind Search**        | Powerful on-site content search.      |

---

## 🛠️ Tech Stack

This project leverages a modern stack for optimal performance and developer experience:

| Category          | Technology / Tool                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | ![Astro](https://img.shields.io/badge/Astro-Static_Site_Generator-FF5D01?logo=astro)                                                                                                 |
| **Styling**       | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) |
| **Interactivity** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)       |
| **Services**      | ![Web3Forms](https://img.shields.io/badge/Web3Forms-Contact_Form-FF4F8B) ![Pagefind](https://img.shields.io/badge/Pagefind-Site_Search-1E90FF)                                    |
| **DevOps**        | ![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel&logoColor=white) ![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?logo=playwright) |

---

## 📂 Project Structure

A glimpse into the organization of the codebase:

```bash
Personal-Blog/
├── public/                     # Static assets (favicon, images, etc.)
│   ├── favicon.ico
│   └── images/
├── src/                        # Core source code
│   ├── components/             # Reusable Astro/React components
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Site pages & API endpoints
│   ├── styles/                 # Global styles and Tailwind config
│   └── content/                # Markdown content for blog posts, projects (example)
├── .gitignore
├── astro.config.mjs            # Astro configuration
├── package.json
├── tsconfig.json               # TypeScript configuration
└── README.md
```
*Note: The `src/content/` directory is a common pattern with Astro for collections, adjust if your structure differs.*

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm (comes with Node.js)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rafay99-epic/Personal-Blog.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd Personal-Blog # Or Astro-Portfolio-Blog if that's the cloned folder name
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```

### Running Locally

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:4321](http://localhost:4321) (or the port shown in your terminal) to view it in your browser.

### Building for Production

1.  **Build the site**:
    ```bash
    npm run build
    ```
    This will create a production-ready build in the `./dist` directory (or `./vercel/output/static` as per your original config for Vercel).

2.  **Preview the production build**:
    ```bash
    npm run preview
    ```

---

## 🌐 Deployment

The website is live on Vercel, with automatic deployments configured.

*   🌍 **Production:** [rafay99.com](https://www.rafay99.com)
    *   This is the main, live version of the website, deployed from the `main` branch.
*   🧪 **Feature Previews:**
    *   Vercel automatically creates preview deployments for pull requests. This allows testing changes in a production-like environment before merging to `main`.

---

## 🤝 Contributing

Contributions make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

1.  **Fork the Project**
2.  **Create your Feature Branch**:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes**:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the Branch**:
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **Open a Pull Request**:
    *   Please target the **`testing`** branch for your pull requests. PRs to `main` will be redirected or closed.

We value your input!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📬 Get in Touch

I'm always open to connecting, collaborating, or just chatting. Feel free to reach out!

<div align="center">

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:99marafay@gmail.com)
&nbsp;&nbsp;
[![Website Contact](https://img.shields.io/badge/Website-Contact_Me-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://rafay99.com/contact)
&nbsp;&nbsp;
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdul-rafay1999/)

</div>

---

<p align="center">
  <em>If you like this project, please consider giving it a 🌟 on GitHub!</em>
</p>
