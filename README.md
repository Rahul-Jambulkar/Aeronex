# Aeronex — Next-Gen Space Technology

A modern, futuristic, dark-themed landing page for Aeronex, a next-generation space technology startup. Built with HTML5, TailwindCSS, GSAP, Three.js, Lucide icons, and Google Fonts.

## Directory Structure

```
Aeronex/
│
├── index.html                 # Main entry point (all sections assembled)
│
├── css/
│   ├── styles.css             # Core styles, layout, components, theming
│   └── animations.css         # CSS keyframe animations (GSAP fallbacks)
│
├── js/
│   ├── main.js                # Navigation, smooth scroll, form handling
│   ├── animations.js          # GSAP scroll-triggered animations & parallax
│   └── three-scene.js         # Three.js animated star field & nebula
│
├── components/                # Reusable HTML partials (reference)
│   ├── navbar.html
│   ├── hero.html
│   ├── mission.html
│   ├── technology.html
│   ├── contact.html
│   └── footer.html
│
├── assets/
│   ├── images/                # Static image assets
│   ├── icons/                 # Icon files
│   └── videos/                # Video assets
│
├── models/                    # 3D models (.glb, .gltf)
│
└── README.md
```

## Tech Stack

- **HTML5** — Semantic markup
- **TailwindCSS** — Utility-first CSS (via CDN)
- **GSAP** + ScrollTrigger — Scroll-driven animations, parallax, reveals
- **Three.js** — Animated 3D star field with nebula particles
- **Lucide Icons** — Clean, modern icon set
- **Google Fonts** — Space Grotesk (headings) + Inter (body)

## Features

- Cinematic hero section with gradient text and animated stats counter
- Interactive Three.js space background with star twinkling and nebula
- Mouse-reactive camera for immersive depth
- GSAP-powered scroll-triggered section reveals and staggered card animations
- Parallax effects on headings and glow elements
- Smooth scroll navigation
- Responsive mobile menu
- Contact form with submission feedback
- Modular, well-commented codebase