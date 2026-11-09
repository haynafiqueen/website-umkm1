"use strict";

const dataProduk = [
  { nama: "Kopi Vanila Latte", kategori: "Kopi", harga: 20000, stok: 20, ukuran: "Gelas", deskripsi: "Paduan espresso premium dengan susu vanila yang creamy.", unggulan: true, diskonPersen: 10 },
  { nama: "Americano Arabica", kategori: "Kopi", harga: 25000, stok: 15, ukuran: "Gelas", deskripsi: "Diseduh dingin 13 jam, rasa arabica manis alami.", unggulan: false },
  { nama: "Caramel Macchiato", kategori: "Kopi", harga: 27000, stok: 12, ukuran: "Gelas", deskripsi: "Manisnya caramel dan pahitnya espresso dalam satu cangkir.", unggulan: false, diskonPersen: 10 },
  { nama: "Lotus Latte", kategori: "Kopi", harga: 28000, stok: 4, ukuran: "Gelas", deskripsi: "Lotus latte yang manisnya pas, gurih, dan creamy.", unggulan: false }
];

console.log("Data Produk Morning Haven");
console.table(dataProduk);

function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}

function hitungHargaPromo(produk) {
  const diskon = produk.diskonPersen;

  if (typeof diskon !== "number" || !Number.isFinite(diskon)) {
    return produk.harga;
  }
  if (diskon <= 0 || diskon > 100) {
    return produk.harga;
  }

  const potongan = (produk.harga * diskon) / 100;
  return Math.round(produk.harga - potongan);
}

function buatHtmlHarga(produk) {
  // Tampilkan hanya harga akhir (setelah diskon, jika ada)
  return formatRupiah(hitungHargaPromo(produk));
}

// Versi kartu: harga normal dicoret + harga promo + badge diskon
function buatHtmlHargaKartu(produk) {
  const hargaPromo = hitungHargaPromo(produk);

  if (hargaPromo >= produk.harga) {
    return formatRupiah(produk.harga);
  }

  return `
    <del class="price-normal">${formatRupiah(produk.harga)}</del>
    <span class="price-promo">${formatRupiah(hargaPromo)}</span>
    <span class="discount-badge">${produk.diskonPersen}%</span>
  `;
}

function statusStok(stok) {
  if (stok <= 0) {
    return { label: "Stok habis", className: "empty" };
  }
  if (stok <= 5) {
    return { label: "Stok terbatas", className: "warning" };
  }
  return { label: "Tersedia", className: "" };
}
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Kopi racikan kedai";
    default:
      return "Menu Morning Haven";
  }
}


function buatKartuProduk(produk) {
  const status = statusStok(produk.stok); // scope lokal
  const kategori = labelKategori(produk.kategori);
  const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi kami";

  return `
    <article class="product-card js-product-card">
      <h3>${produk.nama}</h3>
      <p class="product-detail">${kategori} · ${produk.ukuran}</p>
      <p>${produk.deskripsi}</p>
      <p class="price">${buatHtmlHargaKartu(produk)}</p>
      <p class="stock-badge ${status.className}">${status.label}</p>
      <p class="product-detail">${labelAksi}</p>
    </article>
  `;
}

function buatBarisTabel(produk) {
  const status = statusStok(produk.stok);

  return `
    <tr>
      <td>${produk.nama}</td>
      <td>${produk.ukuran}</td>
      <td>${status.label} (${produk.stok})</td>
      <td>${produk.deskripsi}</td>
      <td>${buatHtmlHarga(produk)}</td>
    </tr>
  `;
}

function hitungTotalStok(daftarProduk) {
  let total = 0;
  for (const produk of daftarProduk) {
    total = total + produk.stok;
  }
  return total;
}

function renderProduk() {
  const productList = document.querySelector("#product-list");
  const productTableBody = document.querySelector("#product-table-body");
  const productSummary = document.querySelector("#product-summary");
  const productHighlight = document.querySelector("#product-highlight");

  
  if (!productList || !productTableBody) {
    return;
  }

  const produkTersedia = dataProduk.filter((produk) => produk.stok > 0);
  // find: satu produk unggulan pertama (bisa undefined)
  const produkUnggulan = dataProduk.find((produk) => produk.unggulan === true);
  
  const kartuMarkup = produkTersedia.map(buatKartuProduk).join("");
  const barisMarkup = dataProduk.map(buatBarisTabel).join("");


  productList.innerHTML = kartuMarkup;
  productTableBody.innerHTML = barisMarkup;

  if (productSummary) {
    productSummary.textContent =
      `${produkTersedia.length} produk tersedia dari ${dataProduk.length} data, total stok ${hitungTotalStok(dataProduk)} item.`;
  }

  if (productHighlight) {
    productHighlight.textContent = produkUnggulan
      ? `Produk unggulan: ${produkUnggulan.nama}`
      : "Belum ada produk unggulan.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderProduk();
});