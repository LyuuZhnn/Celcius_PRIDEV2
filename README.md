# CELCIUS PRIDE

Website komunitas Free Fire CELCIUS PRIDE. Dibangun dengan HTML, CSS, JavaScript Vanilla, dan SVG tanpa backend maupun framework.

## Isi proyek

- `index.html` — halaman aplikasi dan seluruh section.
- `css/` — style utama, komponen, dan responsive layout.
- `js/` — navigasi, render anggota, pencarian, tema, dan inisialisasi.
- `data/` — satu sumber data untuk anggota, organisasi, List Babu, aktivitas, pengumuman, dan kategori peraturan.
- `assets/` — emblem CP dan favicon SVG.

## Menjalankan secara lokal

Buka `index.html` di browser. Karena seluruh data dan aset menggunakan file lokal relatif, website dapat berjalan tanpa server untuk penggunaan normal. Untuk preview server lokal, jalankan dari folder proyek:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Data yang sudah dimasukkan

- Anggota unik: 16.
- MOBI: 2 penempatan.
- HP: 15 penempatan.
- PC: 0 penempatan.
- Struktur organisasi: Founder `??`, Pengurus `KIN RAMZY`, Kang OP Test `ELO KIN RAMZY`.
- List Babu: 6 catatan.
- Developer: HANIF/ZENN — 0822 9966 0198.
- WhatsApp: <https://wa.me/6282299660198>.

Aktivitas, pengumuman, dan isi peraturan resmi belum diberikan, sehingga website menampilkan empty state dan tidak mengarang data.

## Mengubah data

Edit file yang sesuai di folder `data/`. Data anggota hanya berada di `data/members.js`; statistik, preview, filter, dan direktori dirender otomatis dari file tersebut. Setelah mengubah file, simpan lalu commit dan push ulang ke GitHub.

## Publikasi melalui Termux dan GitHub Pages

1. Unduh `CELCIUS_PRIDE_PIXEL_FINAL.zip` ke folder Downloads Android.
2. Buka Termux lalu jalankan:

```bash
termux-setup-storage
pkg update -y
pkg install git unzip -y
cd ~/storage/downloads
unzip CELCIUS_PRIDE_PIXEL_FINAL.zip
cd CELCIUS-PRIDE
```

3. Buat repository kosong di GitHub. Ganti `USERNAME` dan `NAMA-REPOSITORY` pada perintah berikut dengan akun dan nama repository milikmu:

```bash
git init
git branch -M main
git add .
git commit -m "Build CELCIUS PRIDE website"
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
git push -u origin main
```

Jika `origin` sudah pernah dibuat, ubah alamatnya dengan:

```bash
git remote set-url origin https://github.com/USERNAME/NAMA-REPOSITORY.git
```

Jika push ditolak karena repository GitHub sudah memiliki commit yang belum ada di Termux, sinkronkan terlebih dahulu:

```bash
git pull --rebase origin main
git push -u origin main
```

4. Di halaman repository GitHub buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch **main** dan folder **/(root)**, lalu tekan **Save**.
7. Tunggu sampai GitHub Pages menerbitkan website. Format alamatnya biasanya `https://USERNAME.github.io/NAMA-REPOSITORY/`.

## Catatan WhatsApp

Tautan WhatsApp menggunakan `https://wa.me/6282299660198`. Perangkat/browser dapat membuka aplikasi WhatsApp jika universal link dan pengaturan perangkat mengizinkan; jika tidak, WhatsApp akan menawarkan halaman web atau opsi lanjutan. Perilaku aplikasi tidak dapat dijamin dari website.

## Kompatibilitas

Layout dibuat responsif untuk desktop, tablet, dan perangkat mobile. Tidak ada backend, login, maupun data server. Pembaruan data dilakukan dengan mengedit file proyek lalu push ke GitHub.
