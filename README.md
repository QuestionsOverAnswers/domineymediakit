# domineydrewmedia.com — Dominey Drew Media Press Kit

A static rebuild of the WordPress/Brizy media kit (backup dated 2026-09-23). It's plain HTML, CSS and JavaScript, with no build step, no plugins and no WordPress. It's hosted on GitHub Pages.

```
index.html          all page content, top to bottom (each section is marked <!-- SECTION: ... -->)
css/styles.css      all styling (colors and fonts are at the top under :root)
js/main.js          "Read More" toggle, gallery carousel, one-video-at-a-time
assets/img/         photos, gold heading graphics (h-*.svg), logos
assets/img/gallery/ gallery carousel photos (numbered in display order)
assets/video/       testimonial videos (re-encoded H.264, each under 30 MB)
assets/fonts/       Inter + Inknut Antiqua, self-hosted
CNAME               tells GitHub Pages the custom domain
```

## Editing

- **Text:** edit `index.html`, commit and push. The site updates in about a minute.
- **Photo:** add the file to `assets/img/` (keep it under about 1 MB, 2000 px wide max) and update the `src=""`.
- **Gallery:** copy one `<figure>…</figure>` block in the Gallery section, then change the image and caption.
- **Section headings** are gold gradient graphics (`assets/img/h-*.svg`), not live text. A new heading needs a new SVG exported in the same style.
- **Video:** GitHub rejects any file over 100 MB. Re-encode first:
  `ffmpeg -i in.mov -vf scale=-2:720 -c:v libx264 -crf 24 -preset medium -c:a aac -b:a 128k -movflags +faststart out.mp4`

To preview locally, run `python -m http.server` in this folder and open http://localhost:8000.

## First-time deploy (GitHub Pages)

1. Create a repo, for example `domineydrewmedia`. A public repo works with a free GitHub account. A private repo needs GitHub Pro or Team for Pages.
2. Push this folder to the `main` branch.
3. Go to repo **Settings → Pages**. Set Source to *Deploy from a branch*, Branch to `main` and folder to `/ (root)`.
4. Set Custom domain to `domineydrewmedia.com`. The `CNAME` file already contains it.
5. **Verify the domain** under GitHub **account Settings → Pages → Add a domain**. GitHub gives you a TXT record to add at the registrar. This stops anyone else from claiming the domain on GitHub.
6. Test at `https://<username>.github.io/domineydrewmedia/` before touching DNS.

## DNS cutover (at the registrar)

Do this only after step 6 looks right. The old SiteGround site keeps serving until DNS changes.

1. A day before: lower the TTL on the existing records to 300 seconds.
2. Replace the apex (`@`) A records with GitHub Pages:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   Optional AAAA records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
3. Set `www` as a CNAME pointing to `<username>.github.io`.
4. **Leave MX, SPF, DKIM and other TXT records alone** (anything email-related).
5. When GitHub shows the certificate is issued, go back to Settings → Pages and tick **Enforce HTTPS**.
6. Cancel the SiteGround plan only after the site has been live on GitHub for a few days.

## What changed from the WordPress version

- The same content, images, section order and layout, at desktop, tablet and phone widths.
- Removed: WordPress, Brizy Pro, SiteGround plugins, the database and the admin login.
- Videos were compressed about 90%: 251 MB → 27 MB, 150 MB (4K) → 28 MB (1080p), and the 11 MB clip unchanged, with no visible loss at web size.
- Things the old site hid and this rebuild omits: the "Money 'n' Morals" block (hidden at every screen size), plus two graphics that only appeared at tablet width (the "Embrace authenticity" quote and one other graphic). Their files are still in the WordPress backup.
- Three gallery photos had "-" or blank captions. They're left blank here.
- There's no mobile menu, which matches the original (nav was desktop-only). Adding one is a small change.
