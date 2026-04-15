# Vesper Photo — Wedding Photography Website

A static website for **Vesper Photo**, built with pure HTML, CSS, and vanilla JavaScript.  
Design: **Rose Mist** — blush tones, italic script logo, romantic light & airy aesthetic.  
Languages: **English + 繁體中文** (bilingual toggle)

---

## Folder Structure

```
vesper-photo/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/
│   │   ├── hero-1.jpg      ← Hero grid image (left)
│   │   ├── hero-2.jpg      ← Hero grid image (centre)
│   │   ├── hero-3.jpg      ← Hero grid image (right)
│   │   └── about.jpg       ← Your portrait in the About section
│   └── portfolio/
│       ├── p01.jpg         ← 12 portfolio image slots
│       ├── p02.jpg
│       ├── ...
│       └── p12.jpg
└── README.md
```

---

## Adding Your Photos

### Hero images (top of page)
Place **3 landscape-oriented** photos in `images/hero/`:
- `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` — displayed side-by-side behind the title
- `about.jpg` — your portrait photo (ideally 4:5 portrait ratio)

Recommended size: **1600 × 2000px max**, exported at 80% JPEG quality for web.

### Portfolio images
Place up to **12 photos** in `images/portfolio/` named `p01.jpg` through `p12.jpg`.

A few slots are pre-set as `--tall` (2:3) or `--wide` (4:3) for masonry variety.  
You can adjust which items are tall/wide by editing the CSS classes in `index.html`:
- Default: `3:4` ratio  
- Add `masonry__item--tall` for a taller cell (2:3)  
- Add `masonry__item--wide` for a wider cell (4:3)

To add more photos, duplicate any `<div class="masonry__item">` block in `index.html`.

---

## Customising Content

Open `index.html` and update:

| What | Where to find it |
|------|-----------------|
| Photographer bio (English) | `<p class="about__bio">` (first one) |
| Photographer bio (Chinese) | `<p class="about__bio about__bio--zh">` |
| Email address | Two places: `<a href="mailto:...">` in About + Contact |
| Instagram handle | `<a href="https://instagram.com/...">` |
| LINE ID | Text node near `LINE:` |
| Service names & descriptions | Inside `<div class="service-card">` blocks |
| Footer year | Inside `<span class="footer__copy">` |

### Updating service/package names in the contact form
Edit the `<option>` elements inside `<select id="pkg">`.

---

## Deploying to GitHub Pages

### First-time setup

1. Create a new GitHub repository (e.g. `vesper-photo`)
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vesper-photo.git
   git push -u origin main
   ```
3. Go to your repo on GitHub → **Settings** → **Pages**
4. Under **Source**, select `Deploy from a branch` → `main` → `/ (root)`
5. Click **Save**

Your site will be live at:  
`https://YOUR_USERNAME.github.io/vesper-photo/`

### Custom domain (optional)
1. In the GitHub Pages settings, enter your domain (e.g. `vesperpho.to`)
2. Add a file named `CNAME` to the root of your repo containing just your domain:
   ```
   vesperpho.to
   ```
3. Update your domain DNS with a CNAME record pointing to `YOUR_USERNAME.github.io`

---

## Contact Form

The contact form uses `mailto:` to open the visitor's email client with a pre-filled message. This is the simplest approach for a fully static site — **no backend required**.

If you later want a proper form submission service, drop-in options include:
- [Formspree](https://formspree.io) — free tier available, replace `action` on the `<form>` tag
- [Netlify Forms](https://www.netlify.com/products/forms/) — if you move hosting to Netlify

---

## Credits
- Fonts: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) + [Lato](https://fonts.google.com/specimen/Lato) via Google Fonts
- Images: Add your own photos to the `images/` folder
