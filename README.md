# Luxury Glamping — React + Vite veb-sayt

Tabiat qo‘ynidagi hashamatli dam olish maskani uchun premium, to‘liq responsive bir sahifali (single-page) veb-sayt.

**Texnologiyalar:** React 19, Vite 7, JavaScript, oddiy CSS3, React Icons. TypeScript, UI-kutubxona yoki CSS framework ishlatilmagan.

---

## O‘rnatish va ishga tushirish

Talab: **Node.js 18+** (tavsiya: 20 yoki 22) va npm.

```bash
cd luxury-glamping
npm install        # bog‘liqliklarni o‘rnatish
npm run dev        # http://localhost:5173 da ochiladi
```

Production build:

```bash
npm run build      # dist/ papkasiga tayyor sayt
npm run preview    # build qilingan saytni lokal ko‘rish
```

> `dist/` papkasini istalgan statik hostingga (Vercel, Netlify, GitHub Pages) yuklash mumkin.

> Eslatma: ZIP ichida `package-lock.json` yo‘q — u birinchi `npm install` paytida avtomatik yaratiladi.

---

## Bo‘limlar

| Bo‘lim | Imkoniyatlar |
| --- | --- |
| **Header** | Sticky navbar, scroll paytida shaffofdan oq fonga silliq o‘tadi, faol bo‘limni ajratib ko‘rsatadi (scroll-spy), mobil hamburger menyu (Esc bilan yopiladi) |
| **Hero** | Katta fon rasmi — **statik**, zoom yoki cheksiz animatsiya yo‘q; `100svh` sababli mobil brauzerda ham balandlik sakramaydi. Explore Stays / Discover More tugmalari |
| **Stays** | 6 ta turar joy kartasi, kategoriya bo‘yicha filtr, hover effektlari, **View Details** modal oynasi, "Reserve this stay" — booking formaga o‘tib, turar joyni avtomatik tanlaydi |
| **Experiences** | Hiking, Stargazing, Outdoor Dining, Nature Retreat — har biri alohida rasm va tavsif bilan |
| **About** | Editorial dizayn: rasm kollaji, qadriyatlar, iqtibos |
| **Gallery** | Responsive mozaika, bosilganda lightbox; oldingi/keyingi (tugma, ← → klavishlar, mobil swipe), Esc bilan yopish |
| **Booking** | Ism, Email, Turar joy, Check-in, Check-out, Guests; to‘liq validatsiya, tunlar soni va taxminiy narx, muvaffaqiyat xabari |
| **Newsletter** | Email validatsiyasi va muvaffaqiyat xabari |
| **Footer** | Logo, navigatsiya, ijtimoiy tarmoqlar, kontaktlar, copyright |

### ⚠️ Formalar — frontend demo

Loyihada backend **yo‘q**. Booking va Newsletter formalari brauzerda tekshiriladi va natija ko‘rsatiladi, lekin **ma’lumot hech qayerga yuborilmaydi**. Bu sahifada ham "Demo form" yozuvi bilan aniq ko‘rsatilgan. Haqiqiy ishlatish uchun `src/sections/Booking/Booking.jsx` dagi `handleSubmit` ichida `setTimeout` o‘rniga API so‘rovini (masalan `fetch('/api/bookings', …)`) qo‘ying.

---

## Loyiha tuzilmasi

```
luxury-glamping/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/        # Qayta ishlatiladigan UI: Button, Modal, Lightbox, SmartImage, Reveal, FormField…
│   ├── sections/          # Har bir bo‘lim alohida papkada: Komponent + o‘z CSS fayli
│   │   ├── Header/  Hero/  Stays/  Experiences/  About/
│   │   └── Gallery/  Booking/  Newsletter/  Footer/
│   ├── pages/
│   │   └── Home.jsx       # Bo‘limlarni yig‘adi
│   ├── data/              # Matn va rasm ma’lumotlari (stays, experiences, gallery, site)
│   ├── hooks/             # useScrolled, useActiveSection, useScrollLock
│   ├── utils/             # validatsiya, formatlash, rasm URL, scroll
│   ├── styles/            # variables.css (dizayn tokenlari), base.css, components.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

Matnlarni, narxlarni yoki rasmlarni o‘zgartirish uchun faqat `src/data/` dagi fayllarni tahrirlash kifoya. Ranglar, shriftlar, radiuslar va soyalar — `src/styles/variables.css` da.

---

## Dizayn va animatsiya qoidalari

- Ranglar: to‘q yashil, bej, oq, tuproq ranglari (clay/earth), qora.
- Shriftlar: **Cormorant Garamond** (sarlavhalar) + **Inter** (matn), Google Fonts orqali.
- Hover o‘tishlari 0.3–0.5s `ease`; faqat `transform` va `opacity` animatsiya qilinadi (GPU uchun yengil).
- Scroll reveal bitta umumiy `IntersectionObserver` bilan ishlaydi va bir martagina ishga tushadi.
- Reveal animatsiyasi va hover transformi turli elementlarda — ular bir-biriga xalaqit bermaydi, layout siljimaydi.
- `animation: infinite` umuman ishlatilmagan.
- `prefers-reduced-motion` yoqilgan bo‘lsa, barcha animatsiyalar va smooth scroll o‘chadi.
- Modal ochilganda sahifa scroll’i qulflanadi, scrollbar kengligi kompensatsiya qilinadi (sakrash yo‘q); fokus modal ichida qoladi va yopilganda qaytariladi.
- Breakpointlar: 1440 / 1024 / 768 / 375 / 320 px da tekshirilgan, gorizontal scroll yo‘q.

## Rasmlar

Barcha fotosuratlar bepul litsenziyali **Unsplash** va **Pexels** CDN’laridan `srcSet` bilan (ekran o‘lchamiga mos) yuklanadi. Shuning uchun saytni ko‘rishda internet kerak. Rasm yuklanmasa, uning o‘rnida brend rangidagi chiroyli gradient ko‘rinadi — layout buzilmaydi. O‘z rasmlaringizni qo‘yish uchun `src/data/*.js` dagi `img('unsplash', 'ID', 'alt')` qatorlarini almashtiring.
