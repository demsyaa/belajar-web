const daftarKuliner = [
    {
        id: 1,
        nama: "Seruit Lampung",
        kategori: "makanan",
        hargaTeks: "Rp 35.000 - Rp 50.000",
        gambar: "assets/images/seruit.jpg",
        deskripsi: "Makanan khas suku Lampung berupa ikan sungai bakar yang dicampur dengan sambal terasi, tempoyak (durian fermentasi), dan aneka lalapan segar.",
        lokasi: "RM Seruit Bu Lin, Jl. Z.A. Pagar Alam, Bandar Lampung."
    },
    {
        id: 2,
        nama: "Kemplang",
        kategori: "cemilan",
        hargaTeks: "Rp 10.000 - Rp 20.000",
        gambar: "assets/images/kemplang.jpg",
        deskripsi: "Kemplang Lampung adalah kerupuk ikan khas dari Provinsi Lampung yang diolah dengan cara dipanggang, bukan digoreng dengan minyak.",
        lokasi: "Kemplang Ummi Lampung (Pecoh Raya, Bumi Waras)"
    },
    {
        id: 3,
        nama: "Gulai Taboh",
        kategori: "makanan",
        hargaTeks: "Rp 30.000 - Rp 40.000",
        gambar: "assets/images/gulai_taboh.jpg",
        deskripsi: "Gulai santan kaya rempah dengan isian ikan asap (tapa), kacang merah, rebung, dan aroma daun kemangi yang harum.",
        lokasi: "Rumah Makan Khas Pesisir Barat & Lampung Barat."
    },
    {
        id: 4,
        nama: "Keripik Pisang Cokelat",
        kategori: "oleh-oleh",
        hargaTeks: "Rp 15.000 - Rp 25.000",
        gambar: "assets/images/keripik_pisang.jpg",
        deskripsi: "Oleh-oleh paling hits! Pisang Kepok renyah yang dilumuri bubuk cokelat manis tebal nan gurih.",
        lokasi: "Sentra Keripik Pisang Gang PU, Kedaton, Bandar Lampung."
    },
    {
        id: 5,
        nama: "Sekubal Ketan",
        kategori: "makanan",
        hargaTeks: "Rp 20.000 - Rp 30.000",
        gambar: "assets/images/sekubal.jpg",
        deskripsi: "Olahan beras ketan dan santan kental yang dikukus dalam bungkus daun pisang. Sangat lezat dimakan bersama rendang.",
        lokasi: "Pasar Tradisional Teluk Betung & Toko Oleh-Oleh Yen Yen."
    },
    {
        id: 6,
        nama: "Kopi Robusta Lampung",
        kategori: "oleh-oleh",
        hargaTeks: "Rp 20.000 - Rp 45.000",
        gambar: "assets/images/kopi_robusta.jpg",
        deskripsi: "Biji kopi hitam Robusta asli petik merah dengan aroma khas berkarakter kuat dan mantap.",
        lokasi: "Kopi Cap Bola Dunia, Teluk Betung."
    }
];

let kategoriAktif = 'semua';

// RENDER KATALOG
function tampilkanKatalog(data) {
    const wadah = document.getElementById('wadahKatalog');
    const pesanKosong = document.getElementById('pesanKosong');
    
    wadah.innerHTML = '';

    if (data.length === 0) {
        pesanKosong.classList.remove('d-none');
        return;
    } else {
        pesanKosong.classList.add('d-none');
    }

    data.forEach(item => {
        const kartuHTML = `
            <div class="col-sm-6 col-md-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${item.gambar}" class="card-img-top" alt="${item.nama}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <span class="badge bg-dark text-warning mb-2">${item.kategori.toUpperCase()}</span>
                            <h5 class="card-title fw-bold text-dark">${item.nama}</h5>
                            <p class="card-text text-muted small mb-2">${item.deskripsi}</p>
                        </div>
                        <div class="mt-3 pt-2 border-top">
                            <p class="mb-1 text-secondary" style="font-size: 0.78rem;">
                                <i class="fa-solid fa-location-dot text-dark me-1"></i> <strong>Lokasi:</strong> ${item.lokasi}
                            </p>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <span class="fw-bold text-dark small">${item.hargaTeks}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        wadah.innerHTML += kartuHTML;
    });
}

// CARI MAKANAN
function cariMakanan() {
    const kataKunci = document.getElementById('inputCari').value.toLowerCase();
    
    const hasilFilter = daftarKuliner.filter(item => {
        const cocokKategori = (kategoriAktif === 'semua') || (item.kategori === kategoriAktif);
        const cocokNama = item.nama.toLowerCase().includes(kataKunci) || item.deskripsi.toLowerCase().includes(kataKunci) || item.lokasi.toLowerCase().includes(kataKunci);
        return cocokKategori && cocokNama;
    });

    tampilkanKatalog(hasilFilter);
}

// FILTER KATEGORI
function filterKategori(kategori, elemenTombol) {
    kategoriAktif = kategori;

    const semuaTombol = document.querySelectorAll('.btn-group .btn');
    semuaTombol.forEach(btn => {
        btn.classList.remove('active', 'text-warning', 'fw-bold');
    });
    
    elemenTombol.classList.add('active', 'text-warning', 'fw-bold');
    cariMakanan();
}

// AMBIL & SIMPAN REVIEW DENGAN LOCALSTORAGE
const defaultReview = [
    { nama: "arion", kuliner: "Seruit Lampung", rating: "⭐⭐⭐⭐⭐", ulasan: "Sumpah sambel tempoyak di sini nampol banget rasanya! Ikan bakarnya empuk dan gak amis.", waktu: "Baru saja" },
    { nama: "jarvis", kuliner: "Sekubal Ketan", rating: "⭐⭐⭐⭐", ulasan: "Tekstur ketannya padat dan gurih santannya terasa banget. Cocok dicocol sambal.", waktu: "Kemarin" }
];

function muatReview() {
    const dataLokal = localStorage.getItem('reviewLampungFoodies');
    let dataReview = dataLokal ? JSON.parse(dataLokal) : defaultReview;

    const wadah = document.getElementById('daftarReview');
    wadah.innerHTML = '';

    dataReview.forEach(item => {
        const html = `
            <div class="card p-3 border-0 shadow-sm rounded-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="fw-bold mb-0 text-dark">${item.nama}</h6>
                    <span class="text-warning fs-6">${item.rating}</span>
                </div>
                <small class="text-dark fw-bold mb-2">${item.kuliner}</small>
                <p class="text-secondary small mb-2">"${item.ulasan}"</p>
                <small class="text-muted" style="font-size: 0.75rem;">${item.waktu}</small>
            </div>
        `;
        wadah.innerHTML += html;
    });
}

function tambahReview(event) {
    event.preventDefault();
    
    const nama = document.getElementById('inputNama').value;
    const kuliner = document.getElementById('inputKuliner').value;
    const rating = document.getElementById('inputRating').value;
    const ulasan = document.getElementById('inputUlasan').value;
    
    const dataLokal = localStorage.getItem('reviewLampungFoodies');
    let dataReview = dataLokal ? JSON.parse(dataLokal) : defaultReview;

    const reviewBaru = {
        nama: nama,
        kuliner: kuliner,
        rating: rating,
        ulasan: ulasan,
        waktu: "Baru saja"
    };

    dataReview.unshift(reviewBaru);
    localStorage.setItem('reviewLampungFoodies', JSON.stringify(dataReview));

    muatReview();
    document.getElementById('formReview').reset();
}

window.onload = function() {
    tampilkanKatalog(daftarKuliner);
    muatReview();
};

