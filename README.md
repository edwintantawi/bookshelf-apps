# Bookshelf Apps
Aplikasi web pengolahan buku

## Tujuan
Dicoding Academy "Belajar Membuat Front-End Web untuk Pemula" submission

## Kriteria
Buatlah aplikasi web yang dapat memasukan data buku ke dalam rak, memindahkan data buku antar rak, dan menghapus data buku dari rak.

Untuk lebih jelasnya, terdapat 5 kriteria utama pada Bookshelf Apps yang harus Anda buat.

### Kriteria 1: Mampu Menambahkan Data Buku
Bookshelf Apps harus mampu menambahkan data buku baru.
Data buku yang disimpan merupakan objek JavaScript dengan struktur berikut:
```js
{
    id: string | number,
    title: string,
    author: string,
    year: number,
    isComplete: boolean,
}
```
Berikut contoh data riilnya:

```js
{
    id: 3657848524,
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K Rowling',
    year: 1997,
    isComplete: false,
}
```

### Krieria 2: Memiliki Dua Rak Buku
- Bookshelf Apps harus memiliki 2Rak buku. Yakni, “Belum selesai dibaca” dan “Selesai dibaca”.
- Rak buku Belum selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai false.
- Rak buku Selesai dibaca hanya menyimpan buku yang properti isComplete nya bernilai true.

### Kriteria 3: Dapat Memindahkan Buku antar Rak
- Buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dipindahkan di antara keduanya.

### Kriteria 4: Dapat Menghapus Data Buku
- Buku yang ditampilkan pada rak baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat dihapus.

### Kriteria 5: Manfaatkan localStorage dalam Menyimpan Data Buku
- Data buku yang ditampilkan pada rak, baik itu "Belum selesai dibaca" maupun "Selesai dibaca" harus dapat bertahan walaupun halaman web ditutup.
- Dengan begitu, Anda harus menyimpan data buku pada localStorage.

### Referensi Proyek dan Project Starter Aplikasi Bookshelf Apps
- Silakan untuk akses web [aplikasi Bookshelf](https://bookshelfappsdicoding.netlify.app/) Apps berikut agar Anda memiliki bayangan seperti apa harus membuat proyek submission-nya.

## Penilaian
- Tambahkan fitur pencarian untuk mem-filter buku yang ditampilkan pada rak sesuai dengan title buku yang dituliskan pada kolom pencarian.
- Berkreasilah dengan membuat proyek Bookshelf Apps tanpa menggunakan project starter.
- Menuliskan kode dengan bersih.
  - Bersihkan comment dan kode yang tidak digunakan.
  - Indentasi yang sesuai.
- Terdapat improvisasi fitur seperti (pilih satu):
  - Custom Dialog ketika menghapus buku.
  - Dapat meng-edit buku.
  - dsb.