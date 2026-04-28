# Vesper Photo — Wedding Photography Website

A fully static, bilingual (繁中 / EN) wedding photography website built for GitHub Pages.
**Theme: Rose Mist** — blush tones, italic serif display font, masonry portfolio grid.

---

## 🚀 Quick Deploy to GitHub Pages 

1. **Create a new GitHub repository** (e.g. `vesperphoto`)
2. **Upload all files** — drag and drop the entire folder contents into the repo, or push via Git:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/vesperphoto.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `main` / `root`
   - Click Save
4. Your site will be live at `https://YOUR_USERNAME.github.io/vesperphoto/`

---

## 📁 File Structure

```
vesper-photo/
├── index.html        ← Main page (all sections)
├── style.css         ← Rose Mist theme styles
├── script.js         ← Language toggle, lightbox, nav, form
├── images/           ← Put your photos here
│   ├── photo-01.jpg  ← Portfolio photos (01–12)
│   ├── photo-02.jpg
│   ├── ...
│   ├── photo-12.jpg
│   └── photographer.jpg  ← Your portrait for the About section
└── README.md
```

---

## 🖼 Adding Your Photos

### Portfolio Grid
Place your photos in the `images/` folder named `photo-01.jpg` through `photo-12.jpg`.

**Grid layout hints** (edit in `index.html`):
- `.tall` — portrait-oriented slot (3:4.5 ratio) — best for vertical bridal shots
- `.wide` — landscape slot (16:9 ratio) — best for ceremony wide shots
- Default — standard 4:3 ratio — great for candid moments

You can add more slots by copying any `.photo-slot` div and updating the image filename.

### Photographer Portrait
Replace `images/photographer.jpg` with your own photo.
Recommended: portrait orientation, at least 800×1000px.

---

## ✏️ Customizing Content

Open `index.html` in any text editor to update:

| What to change | Where to find it |
|---|---|
| Your email | `href="mailto:hello@vesperphoto.com"` |
| Instagram handle | `href="https://instagram.com/vesperphoto"` |
| LINE ID | The LINE `<a href="#">` link |
| Service prices | `svc-price` divs in the Services section |
| Service features | `<li>` items inside `svc-features` |
| Personal story (ZH) | `.zh-text` paragraphs in the About section |
| Personal story (EN) | `.en-text` paragraphs in the About section |
| Stats (150+, 8+) | `.stat-num` spans in the About section |
| Service area | `.ci-value` next to 服務地區 |

All bilingual text uses `data-zh="..."` and `data-en="..."` attributes.
Update both attributes to keep both languages current.

---

## 📬 Making the Contact Form Work

The form is set up visually — to receive actual emails you need a form backend.

**Option A — Formspree (free, easiest):**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your endpoint ID
3. In `index.html`, change the form tag to:
   ```html
   <form class="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Remove the `onsubmit="handleSubmit(event)"` attribute

**Option B — Netlify Forms (if you later move to Netlify):**
Add `netlify` attribute to the `<form>` tag.

---

## 🎨 Customizing the Theme

Edit `style.css` at the top — all colors are CSS variables:

```css
:root {
  --rose-400: #c9a0a0;   /* Primary accent — buttons, borders */
  --rose-500: #b48080;   /* Hover state */
  --text-dark: #3a2828;  /* Main text */
  --text-mid:  #7a5c5c;  /* Body text */
  --text-light: #b08a8a; /* Captions, labels */
}
```

---

## 🌐 Custom Domain

To use a custom domain (e.g. `vesperphoto.com`):
1. Add a `CNAME` file in the repo root containing your domain:
   ```
   vesperphoto.com
   ```
2. Point your domain's DNS to GitHub Pages (see [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

---

## 📱 Responsive

The site is fully responsive:
- **Desktop** (>960px): 3-column masonry grid, side-by-side about layout
- **Tablet** (600–960px): 2-column masonry, stacked about, single-column services
- **Mobile** (<600px): 1-column masonry, hamburger menu

---

*Vesper Photo — 用最柔和的光線，記錄你們的愛。*
