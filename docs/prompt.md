====================================================
ADDITIONAL REQUIREMENT — STATIC ARCHITECTURE WEBSITE
WITH THREE.JS & PREMIUM MOTION
====================================================

IMPORTANT:

This website is a 100% STATIC architecture portfolio website.

There is NO backend.
There is NO database.
There is NO authentication.
There is NO admin dashboard.
There is NO server-side API required.

All content should come from local static data files.

The website must remain easy to deploy to:

- Vercel
- Netlify
- Cloudflare Pages
- any static hosting

Prefer static generation wherever possible.

If using Next.js, make all pages statically renderable.

Portfolio dynamic routes such as:

/portfolio/[slug]

must be pre-generated using:

generateStaticParams()

No database queries.
No server actions.
No API routes unless absolutely unavoidable.

====================================================
TECH STACK — UPDATED
====================================================

Use:

- Next.js latest stable version
- App Router
- TypeScript
- Tailwind CSS
- Framer Motion / Motion for React
- Three.js
- React Three Fiber
- @react-three/drei
- next/image
- Lucide icons only when necessary

Optional, ONLY if it genuinely improves the experience:

- GSAP for very specific advanced scroll sequences

However:

DO NOT use both GSAP and Framer Motion for the same animation system.

Prefer Framer Motion as the main UI animation library.

Three.js / React Three Fiber should only be used for
special architectural interactions where WebGL adds real value.

Avoid unnecessary dependencies.

====================================================
THREE.JS CREATIVE DIRECTION
====================================================

Three.js must NOT be used as a gimmick.

Do not create:

- random floating spheres
- colorful blobs
- particle explosions
- generic sci-fi objects
- neon WebGL backgrounds
- game-like effects
- excessive cursor trails

This is an ARCHITECTURE website.

Three.js interactions should feel related to:

- architecture
- geometry
- spatial composition
- structure
- massing
- blueprint
- architectural models
- material
- light and shadow

The WebGL experience should look sophisticated and minimal.

====================================================
HERO THREE.JS EXPERIENCE
====================================================

Create an optional premium Three.js architectural scene
for the homepage hero.

Concept:

An abstract architectural massing model / pavilion /
residential volume rendered in monochrome.

Visual style:

- off-white architectural model
- subtle warm-grey material
- soft directional lighting
- ambient shadows
- architectural studio model feeling
- minimal background
- extremely clean composition

The object can consist of:

- rectangular building masses
- slab geometry
- vertical wall planes
- window openings
- architectural frames
- floating floor plans / structural lines

Avoid excessive details.

The result should resemble an architectural concept model.

INTERACTION:

Desktop:
The 3D model should respond very slightly to mouse movement.

For example:

pointer X → subtle Y rotation
pointer Y → subtle X rotation

Maximum rotation should remain very small.

Example:

±2° to ±5°

DO NOT make the building spin wildly.

Scrolling can slowly change:

- camera position
- model rotation
- scale
- lighting
- geometry composition

Example:

Initial:
abstract model

As user scrolls:
camera slowly moves closer

then architectural lines separate slightly

then resolve into homepage content.

Keep this extremely subtle.

====================================================
OPTIONAL ARCHITECTURAL WIREFRAME
====================================================

An alternative or complementary Three.js treatment:

Create a thin architectural wireframe.

Use:

- fine lines
- structural grids
- floor-plan-like geometry
- elevation lines

Animation:

slowly reveal line segments.

Could appear behind text such as:

PRANAJA
ASHARI

ARCHITECTURE

Keep opacity low.

Example:

opacity: 0.08 – 0.20

The text and portfolio photography must remain dominant.

====================================================
3D → PORTFOLIO TRANSITION
====================================================

Create a premium transition between hero and portfolio.

Example concept:

Hero begins as an abstract architectural model.

When scrolling:

model moves toward one side,
camera zooms slightly,
typography enters,
then the first portfolio image takes visual priority.

Do not create an obvious "3D demo".

It should feel like one continuous art-directed composition.

====================================================
ARCHITECTURAL GRID MOTION
====================================================

Use subtle animated architectural grid lines.

For example:

horizontal line expands:
width 0 → 100%

vertical line:
height 0 → 100%

Section label appears afterward:

01 — SELECTED WORKS

Then project image reveals.

Use these animations sparingly.

====================================================
PORTFOLIO IMAGE REVEAL
====================================================

Portfolio imagery should have premium reveal animations.

Possible method:

clip-path:
inset(100% 0 0 0)

→

inset(0 0 0 0)

Combined with:

image scale:
1.08 → 1

Duration:

0.8s – 1.3s

Easing:

cubic-bezier(0.22, 1, 0.36, 1)

Trigger only when entering viewport.

Do not repeat aggressively when scrolling back and forth.

====================================================
PORTFOLIO HOVER
====================================================

Desktop hover interaction:

image:
scale(1.00) → scale(1.025)

Project title:
slight horizontal shift

Project index:
fade / reveal

Optional:

custom cursor:

VIEW
PROJECT

However:

custom cursor must automatically disappear on:

- mobile
- tablets
- touch devices

And must not interfere with accessibility.

====================================================
TYPOGRAPHY MOTION
====================================================

Use tasteful typography reveal.

For large headings:

PRANAJA
ASHARI

Possible effect:

overflow hidden

each line:
translateY(110%)
→
translateY(0)

stagger:

60–120ms

Do not animate every paragraph.

Only use typography motion for:

- hero
- major section title
- major project transition
- major CTA

====================================================
SCROLL MOTION
====================================================

Use scroll-driven animation carefully.

Good examples:

01.

Portfolio image:
translateY(40px → -40px)

while container scrolls through viewport.

Very subtle parallax.

02.

Large project number:

01

moves slightly slower than its image.

03.

Editorial statement:

text opacity:
0.25 → 1

as it enters viewport.

04.

Large photograph:
scale 1.05 → 1

during entrance.

05.

Section divider:
line grows with scroll progress.

Never implement aggressive scroll hijacking.

DO NOT change the browser's natural scrolling behavior.

====================================================
STICKY ARCHITECTURAL SECTIONS
====================================================

Use sticky layouts where appropriate.

Example:

SERVICES

Left side:

sticky:
WHAT WE DO

Right side scrolls:

01 Architectural Design

02 Interior Design

03 Visualization

04 Renovation

05 Consultation

As each service becomes active:

- index changes
- description changes
- background/image can transition subtly

This creates a premium editorial experience.

====================================================
PROJECT DETAIL SCROLL EXPERIENCE
====================================================

Project pages should feel cinematic but calm.

Suggested flow:

PROJECT NAME

↓

full-bleed cover image

↓

project information

↓

large architecture photograph

↓

description

↓

two-column gallery

↓

full-screen photograph

↓

details

↓

next project

Use subtle parallax.

For example:

image moves ±30–60px over an entire viewport traversal.

Avoid extreme parallax.

====================================================
IMAGE TRANSITIONS
====================================================

Images should never suddenly appear.

Create shared animation component:

<ImageReveal />

Possible sequence:

container clip reveals
+
image scale 1.05 → 1

Use Intersection Observer / Framer Motion viewport.

Reusable across portfolio.

====================================================
PAGE TRANSITIONS
====================================================

Create extremely minimal page transitions.

Example:

click project

→ dark overlay rises from bottom

→ route changes

→ overlay exits upward

OR

simple opacity + slight translate transition.

Duration:

300–600ms.

Do not make users wait for animations.

Navigation responsiveness is more important than animation.

====================================================
MAGNETIC BUTTONS
====================================================

For major desktop CTA only:

KONSULTASIKAN PROYEK

VIEW PROJECTS

Create VERY SUBTLE magnetic button motion.

Maximum offset:
approximately 4–8px.

Disable on:

- touch devices
- prefers-reduced-motion

Do not apply magnetic effects to normal navigation links.

====================================================
3D ARCHITECTURAL OBJECT SECTION
====================================================

Optional section between:

OUR APPROACH

and

SERVICES

Create an interactive architectural concept object.

Example:

three stacked architectural volumes.

Labels:

CONTEXT
FUNCTION
CHARACTER

As user scrolls:

Volume 01 aligns
→ CONTEXT

Volume 02 aligns
→ FUNCTION

Volume 03 aligns
→ CHARACTER

Finally all volumes form one architectural composition.

This symbolizes the design philosophy.

Keep animation elegant.

No bright colors.

====================================================
MOUSE INTERACTION
====================================================

Mouse movement can influence visual elements very subtly.

Allowed:

image translation:
±3–6px

3D building:
±3°

architectural grid:
±2px

Never make interface elements chase the cursor.

Interaction should be almost subconscious.

====================================================
LIGHT & SHADOW
====================================================

For Three.js:

prefer architectural lighting.

Use:

AmbientLight
DirectionalLight
Environment if lightweight

Optional:

ContactShadows

Keep shadows soft.

Avoid expensive real-time lighting effects
unless performance remains excellent.

Do not use:

heavy postprocessing
bloom
chromatic aberration
glitch
neon lighting

This is a luxury architecture website.

====================================================
THREE.JS PERFORMANCE
====================================================

Performance is CRITICAL.

Three.js should not destroy Lighthouse scores.

Requirements:

- dynamically import WebGL scenes
- load Three.js only when required
- do not block initial HTML rendering
- keep geometry simple
- minimize draw calls
- avoid huge textures
- use compressed assets where possible
- dispose geometry/material correctly
- pause animation when canvas is outside viewport
- pause rendering when browser tab is hidden
- adapt DPR

Use something similar to:

dpr={[1, 1.5]}

instead of unnecessarily rendering at very high DPR.

====================================================
MOBILE THREE.JS STRATEGY
====================================================

Do NOT blindly render heavy WebGL effects on mobile.

For lower-powered devices:

replace complex Three.js hero with:

- static portfolio image
or
- simplified 3D scene

Use progressive enhancement.

Desktop:
full subtle architectural 3D experience.

Tablet:
reduced complexity.

Mobile:
minimal WebGL or static fallback.

The mobile site must remain fast.

====================================================
REDUCED MOTION
====================================================

Respect:

prefers-reduced-motion: reduce

When enabled:

- disable parallax
- disable mouse-follow motion
- disable 3D camera motion
- remove large animated transitions
- keep simple fades only
- optionally display static 3D frame / image fallback

Accessibility must take priority.

====================================================
WEBGL FALLBACK
====================================================

If WebGL is unsupported:

the hero must still look excellent.

Create fallback:

premium architectural image
+
PRANAJA ASHARI typography.

Never show:

blank canvas
error
loading spinner forever

====================================================
LOADING EXPERIENCE
====================================================

Do NOT create a long preloader.

If Three.js needs loading:

immediately show:

brand
background
hero typography

Load WebGL progressively.

Optional tiny loading indicator:

ARCHITECTURE
01 — 100

But never block the website for more than necessary.

====================================================
STATIC CONTACT SYSTEM
====================================================

There is NO backend.

Do not create API routes for the contact form.

Instead:

Option A — WhatsApp consultation

Form fields:

Nama
Lokasi
Jenis Proyek
Perkiraan Luas
Budget
Paket
Pesan

When clicking:

"Konsultasi via WhatsApp"

generate a formatted WhatsApp message client-side.

Example:

Halo PRANAJA ASHARI,

Saya ingin berkonsultasi mengenai proyek.

Nama:
Lokasi proyek:
Jenis proyek:
Perkiraan luas:
Budget:
Paket:
Pesan:

Then open:

https://wa.me/[NUMBER]?text=[ENCODED_MESSAGE]

Use encodeURIComponent.

WhatsApp number must come from:

siteConfig.

Option B:

Email link using mailto.

No database submission.

====================================================
STATIC DATA
====================================================

Everything must be managed through static files.

Example:

src/data/site.ts
src/data/projects.ts
src/data/services.ts
src/data/pricing.ts
src/data/testimonials.ts
src/data/faqs.ts

No CMS is required.

Example:

export const siteConfig = {
  name: "PRANAJA ASHARI",
  tagline: "Spaces shaped with purpose.",
  whatsapp: "",
  instagram: "",
  email: "",
}

====================================================
PORTFOLIO IMAGE STRUCTURE
====================================================

Create:

public/
  projects/
    project-01/
      cover.webp
      01.webp
      02.webp
      03.webp

    project-02/
      cover.webp
      01.webp
      02.webp

    project-03/
      cover.webp

The images currently provided are only starter samples.

Architecture project data MUST remain scalable.

====================================================
STATIC EXPORT
====================================================

If all chosen Next.js features support it cleanly,
configure the project for static export.

Example:

next.config.ts

output: "export"

images:
unoptimized: true

ONLY do this if required by the selected static hosting strategy.

Otherwise keep standard Next.js static generation,
while ensuring no backend functionality exists.

Do not introduce server requirements unnecessarily.

====================================================
MOTION COMPONENT ARCHITECTURE
====================================================

Create reusable components such as:

components/motion/
  FadeIn.tsx
  RevealText.tsx
  ImageReveal.tsx
  ParallaxImage.tsx
  Stagger.tsx
  PageTransition.tsx

components/three/
  ArchitecturalHero.tsx
  ArchitecturalModel.tsx
  ArchitecturalGrid.tsx

Do not scatter animation logic everywhere.

Maintain clean code architecture.

====================================================
3D HERO IMPLEMENTATION IDEA
====================================================

For ArchitecturalHero.tsx:

Canvas
  Camera
  AmbientLight
  DirectionalLight

  ArchitecturalModel

  ContactShadows

ArchitecturalModel can use simple BoxGeometry.

For example:

Main building volume
secondary building volume
vertical facade panels
horizontal slab
roof plane

Use procedural/simple geometry.

Do not require external 3D files initially.

This reduces loading time.

Structure components so a .glb model can be added later
without changing the whole page.

====================================================
IMPORTANT UX PRINCIPLE
====================================================

Animations exist to:

guide attention
create hierarchy
communicate space
reinforce architecture

Animations must NEVER exist simply because
"animation looks cool."

PRANAJA ASHARI should feel:

CALM
PRECISE
SPATIAL
PREMIUM
ARCHITECTURAL

not:

FLASHY
GAMING
TECH STARTUP
CRYPTO
SCI-FI

====================================================
DESIGN GOAL
====================================================

When visitors open the website,
the reaction should be:

"This looks like a serious architecture studio."

Not:

"This is a website with lots of effects."

Photography and architecture remain the hero.

Three.js and motion should enhance the spatial experience
without competing with the projects.

====================================================
FINAL PERFORMANCE CHECK
====================================================

After implementation test:

npm run lint
npm run build

Also test:

Desktop:
1440px
1920px

Laptop:
1280px

Tablet:
768px
1024px

Mobile:
390px
430px

Check:

- FPS of Three.js scene
- WebGL fallback
- mobile performance
- scrolling performance
- image optimization
- layout shift
- reduced-motion
- keyboard navigation
- touch interaction
- no horizontal overflow
- no hydration errors
- no console errors

Target smooth 60fps on modern desktop hardware.

If a Three.js effect significantly hurts performance,
simplify or remove the effect.

Performance takes priority over visual gimmicks.

====================================================
FINAL CREATIVE DIRECTION
====================================================

Do not interpret "use Three.js" as a requirement
to make every section 3D.

Use this priority order:

1. Architecture portfolio photography
2. Typography and composition
3. Whitespace and grid
4. Motion
5. Three.js

Three.js is the finishing layer, not the foundation.

I prefer ONE exceptional Three.js interaction
over ten mediocre WebGL effects.

For PRANAJA ASHARI specifically,
focus Three.js primarily on:

1. Homepage architectural hero
2. Architectural philosophy / concept model
3. Subtle transitions if appropriate

Keep portfolio pages image-first.

The final result should feel more like:

a premium architectural publication
that happens to be interactive

rather than:

a Three.js showcase that happens to contain architecture.

NOTE:
Konsep hero yang paling cocok untuk PRANAJA ASHARI

Menurut saya jangan memakai model rumah realistis 3D yang diputar 360°. Itu justru berpotensi terlihat seperti website developer properti. Lebih bagus hero dibuat seperti maket arsitektur putih abstrak.

Saat website pertama dibuka, background warm-white dengan tulisan besar:

PRANAJA
ASHARI

ARCHITECTURE · INTERIOR · VISUALIZATION

Di belakang atau sisi kanan ada bentuk seperti maket:

          ┌───────────────┐
          │               │
      ┌───┤               │
      │   │               │
      │   └───────┐       │
      │           │       │
      └───────────┴───────┘

Tetapi diwujudkan sebagai Three.js 3D massing model dengan bayangan sangat halus.

Mouse bergerak → model hanya bergeser/berotasi sekitar 2–4 derajat.

Scroll ke bawah → model perlahan bergeser keluar dan foto portfolio pertama masuk memenuhi layar.

Lalu muncul:

01 — SELECTED WORKS

RESIDENTIAL 01
Private Residence

Surakarta, Indonesia
2026

Itu akan terasa jauh lebih premium dibanding sekadar hero gambar besar.

Untuk tiga render yang Anda kirim, saya sarankan Claude menggunakannya kira-kira sebagai:

01 — PRIVATE RESIDENCE
Residential Architecture

02 — RESIDENTIAL CLUSTER
Housing / Residential Development

03 — PRIVATE BEDROOM
Interior Architecture

Tetapi nama tersebut dibuat sebagai placeholder yang mudah Anda ubah, karena Claude tidak boleh mengarang nama proyek sebenarnya.

Satu hal lagi: karena tidak ada backend, tombol “Konsultasikan Proyek” sebaiknya bukan form submit biasa. Buat form interaktif yang setelah diisi menghasilkan pesan WhatsApp otomatis, misalnya:

Halo PRANAJA ASHARI,

Saya ingin berkonsultasi mengenai proyek arsitektur.

Nama: Budi
Lokasi proyek: Solo
Jenis proyek: Residential
Perkiraan luas: 180 m²
Budget: Rp...
Paket yang diminati: Professional
Pesan: Saya ingin membangun rumah 2 lantai...

Kemudian langsung membuka WhatsApp. Dengan begitu website tetap full static, tetapi dari sisi calon klien tetap terasa seperti sistem konsultasi profesional.