# Welcome Screen Joomax

Layar merah "Welcome to Joomax!" yang naik (swipe up) saat diklik, lalu menampilkan website di bawahnya.
Repo: https://github.com/designjoomax/welcomescreen
Live: https://designjoomax.github.io/welcomescreen/

## Pasang di website mana pun (mis. Image to Frame)
Cara paling mudah: salin `template.html`. Atau tambahkan manual:

```html
<head>
  <!-- paling atas di <head> -->
  <script src="https://designjoomax.github.io/welcomescreen/welcome.js"></script>
</head>
<body>
  <joomax-header sticky></joomax-header>
  ...isi website...
  <joomax-footer></joomax-footer>

  <!-- akhir <body>, urutan jangan dibalik -->
  <script src="https://designjoomax.github.io/headerfooter/joomax-layout.config.js"></script>
  <script src="https://designjoomax.github.io/headerfooter/joomax-layout.js"></script>
</body>
```

## Opsi welcome.js (atribut di tag script)
- `data-title="Welcome to Joomax!"` dan `data-credit="create : fixs.arts studio"`: ganti teks.
- `data-always`: tampil setiap halaman dibuka (default: sekali per sesi browser, dibagi ke semua website Joomax di `designjoomax.github.io`).
- URL `?welcome` menampilkan lagi, `#home` melewatinya.

## File
| File | Fungsi |
|---|---|
| `welcome.js` | Welcome screen portable (CSS dan HTML sudah di dalamnya) |
| `template.html` | Template dasar untuk website baru |
| `index.html` | Halaman Home Joomax (memakai semua di atas) |

## Deploy (GitHub Pages)
Upload isi folder ini ke root repo `welcomescreen`, lalu Settings > Pages > Deploy from branch > `main` / `(root)`.
