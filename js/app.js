"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
  {
    nama: "Kopi Vanila Latte",
    kategori: "Kopi",
    harga: 20000,
    stok: 60
  },
  {
    nama: "Americano Arabica",
    kategori: "Kopi",
    harga: 25000,
    stok: 50
  },
  {
    nama: "Caramel Macchiato",
    kategori: "Kopi",
    harga: 27000,
    stok: 40
  },
  {
    nama: "Lotus Latte",
    kategori: "Kopi",
    harga: 28000,
    stok: 100
  },
  {
    nama: "Paket Tester Pelanggan Baru",
    kategori: "Bundling",
    harga: 40000,
    stok: 40
  }
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
  if (stok === 0) {
    return {
      label: "Habis",
      className: "empty"
    };
  }

  if (stok <= 5) {
    return {
      label: "Stok terbatas",
      className: "warning"
    };
  }

  return {
    label: "Tersedia",
    className: ""
  };
}


function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";

    case "Bundling":
      return "Paket hemat";

    default:
      return "Produk UMKM";
  }
}

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);

    const labelAksi =
      produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p class="product-category">${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <p class="product-stock">Stok: ${produk.stok}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p class="product-action">${labelAksi}</p>
      </article>`;
  }

  grid.innerHTML = markup;
  ringkasan.textContent =`${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
  console.log("Produk Morning Haven berhasil ditampilkan.");
}

document.addEventListener("DOMContentLoaded", renderProduk);
