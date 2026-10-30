# Welcome Screen Joomax

Halaman pembuka Joomax: layar merah "Welcome to Joomax!" yang naik (swipe up) saat diklik, lalu menampilkan Home dengan header dan footer dari repo `headerfooter`.

Repo: https://github.com/designjoomax/welcomescreen
Live: https://designjoomax.github.io/welcomescreen/

## Cara kerja
- Klik, Enter/Spasi, scroll ke bawah, atau geser ke atas (layar sentuh) membuka Home.
- Welcome hanya tampil sekali per sesi browser. Buka `?welcome` untuk menampilkannya lagi, atau `#home` untuk melewatinya.
- Header dan footer dimuat dari `https://designjoomax.github.io/headerfooter/`. Kartu di Home dibuat otomatis dari menu di `joomax-layout.config.js`, jadi mengikuti perubahan menu tanpa edit di sini.
- Deploy `headerfooter` dulu, baru repo ini.

## Deploy (GitHub Pages)
Upload isi folder ini ke root repo `welcomescreen`, lalu Settings > Pages > Deploy from branch > `main` / `(root)`.
