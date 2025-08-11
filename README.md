# 🚀 Interactive 3D Portfolio Website

<div align="center">
  <br />
  <h2>Interactive 3D Portfolio Website</h2>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  </div>

  <h3 align="center">A Modern 3D Portfolio Built with React, Three.js & GSAP</h3>
</div>

## 📋 Table of Contents

1. [🎯 Overview](#overview)
2. [✨ Features](#features)
3. [🛠️ Tech Stack](#tech-stack)
4. [🚀 Live Demo](#live-demo)
5. [📦 Installation](#installation)
6. [⚙️ Configuration](#configuration)
7. [🎮 Usage](#usage)
8. [📁 Project Structure](#project-structure)
9. [🎨 Customization](#customization)
10. [🚀 Deployment](#deployment)
11. [🤝 Contributing](#contributing)
12. [📄 License](#license)

## 🎯 Overview

This is a cutting-edge 3D portfolio website that showcases modern web development techniques. Built with React, Three.js, and GSAP, it features:

- **Interactive 3D Models**: Realistic 3D scenes with camera controls
- **Smooth Animations**: GSAP-powered scroll animations and micro-interactions
- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with attention to detail
- **Performance Optimized**: Efficient rendering and loading strategies

## ✨ Features

### 🎨 Visual Features
- **3D Hero Section**: Interactive 3D room model with camera following behavior
- **Animated Text**: Dynamic word cycling with smooth transitions
- **Particle Effects**: Atmospheric particle system for visual appeal
- **Smooth Scrolling**: GSAP-powered scroll animations
- **Responsive Layout**: Mobile-first design approach

### 🎮 Interactive Elements
- **Camera Controls**: Hover-activated orbit and zoom controls
- **3D Model Showcase**: Tech stack logos as interactive 3D models
- **Animated Counters**: Dynamic statistics with smooth counting animations
- **Contact Form**: Functional contact section with 3D computer model
- **Navigation**: Smooth scrolling navigation with active states

### 📱 Technical Features
- **Performance Optimized**: Efficient 3D rendering and asset loading
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cross-browser Compatible**: Works on all modern browsers
- **Mobile Optimized**: Touch-friendly interactions and responsive design

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Three.js** - 3D graphics and rendering
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber
- **GSAP** - Professional animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### 3D & Graphics
- **Three.js** - 3D graphics library
- **GLTF/GLB Models** - Optimized 3D model formats
- **WebGL** - Hardware-accelerated graphics
- **Shadow Mapping** - Realistic lighting and shadows

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control
- **npm** - Package management


## 📦 Installation

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/3d-portfolio.git
   cd 3d-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## ⚙️ Configuration

### EmailJS Setup (Optional)

To enable the contact form functionality:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Add your credentials to the `.env` file

### Customization

- **Personal Information**: Update `src/constants/index.js` with your details
- **3D Models**: Replace models in `public/models/` with your own
- **Images**: Update images in `public/images/` with your content
- **Styling**: Modify `src/index.css` for custom styling

## 🎮 Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Key Features Usage

1. **3D Interaction**: Hover over 3D models to activate camera controls
2. **Navigation**: Use the navigation menu to scroll to different sections
3. **Contact Form**: Fill out the contact form to send messages
4. **Responsive Design**: Test on different screen sizes

## 📁 Project Structure

```
3d-portfolio/
├── public/
│   ├── images/          # Static images and textures
│   ├── models/          # 3D model files (GLB/GLTF)
│   └── index.html       # HTML template
├── src/
│   ├── components/      # Reusable React components
│   │   ├── models/      # 3D model components
│   │   └── ...
│   ├── sections/        # Page sections
│   ├── constants/       # Configuration and data
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # App entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🎨 Customization

### Personal Information

Update your personal details in `src/constants/index.js`:

```javascript
// Update these values with your information
const counterItems = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Satisfied Clients" },
  { value: 25, suffix: "+", label: "Completed Projects" },
  { value: 95, suffix: "%", label: "Client Retention Rate" },
];
```

### 3D Models

Replace the 3D models in `public/models/` with your own:

1. Export your 3D models as GLB/GLTF format
2. Optimize them for web use
3. Update the model paths in your components

### Styling

Customize the design by modifying `src/index.css`:

```css
/* Custom color scheme */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

### GitHub Pages

1. **Add GitHub Pages dependency**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run build
   npm run deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For the amazing 3D graphics library
- **GSAP Team** - For the powerful animation library
- **React Three Fiber** - For the React renderer
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Contact

**Surya Prakash Reddy** - [reddysurya819@gmail.com]



---

<div align="center">
  <p>⭐️ If you found this project helpful, please give it a star!</p>
  <p>Made with ❤️ by Surya Prakash Reddy</p>
</div>
