# Automatic Git Commit, Version Bump & NPM Publish Protocol

Setiap kali ada tugas update, penambahan fitur, perbaikan bug, atau penambahan komponen yang telah selesai dikerjakan dan tidak ada instruksi tambahan dari user:

1. **Evaluasi Semantic Versioning**:
   - **MAJOR (`+1.0.0`)**: Jika ada penambahan komponen atau primitive baru.
   - **MINOR (`0.+1.0`)**: Jika ada perbaikan bug atau peningkatan fungsionalitas komponen yang sudah ada.
   - **PATCH (`0.0.+1`)**: Jika ada pembaruan dokumentasi, styling ringan, atau konfigurasi.
   - Terapkan bump versi pada `package.json`.

2. **Verifikasi Build**:
   - Jalankan `npm run build` untuk memastikan type check `vue-tsc` dan Vite bundle 100% bebas error.

3. **Publish ke NPM Registry**:
   - Jalankan perintah publish publik:
     ```bash
     npm publish --access public
     ```

4. **Git Commit & Push ke GitHub**:
   - Stage seluruh perubahan terkait:
     ```bash
     git add -A
     ```
   - Buat commit terstruktur:
     ```bash
     git commit -m "chore(release): bump to vX.Y.Z - <deskripsi update>"
     ```
   - Push commit langsung ke remote repository:
     ```bash
     git push origin main
     ```

Aturan ini berlaku secara otomatis setiap kali siklus update dinyatakan tuntas.
