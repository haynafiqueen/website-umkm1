"use strict";

console.log("P11 JavaScript aktif");

// ===============================
// DATA PRODUK MORNING HAVEN
// ===============================
const dataProduk = [
  {
    nama: "Kopi Vanila Latte",
    kategori: "Kopi",
    harga: 20000,
    stok: 20,
    ukuran: "Gelas",
    deskripsi: "Paduan espresso premium dengan susu vanila yang creamy.",
    unggulan: true,
    diskonPersen: 10
  },
  {
    nama: "Americano Arabica",
    kategori: "Kopi",
    harga: 25000,
    stok: 15,
    ukuran: "Gelas",
    deskripsi: "Diseduh dingin 13 jam, rasa arabica manis alami.",
    unggulan: false,
    diskonPersen: 0
  },
  {
    nama: "Caramel Macchiato",
    kategori: "Kopi",
    harga: 27000,
    stok: 12,
    ukuran: "Gelas",
    deskripsi: "Manisnya caramel dan pahitnya espresso dalam satu cangkir.",
    unggulan: false,
    diskonPersen: 10
  },
  {
    nama: "Lotus Latte",
    kategori: "Kopi",
    harga: 28000,
    stok: 4,
    ukuran: "Gelas",
    deskripsi: "Lotus latte yang manisnya pas, gurih, dan creamy.",
    unggulan: false,
    diskonPersen: 0
  },
  {
    nama: "Paket Seduh",
    kategori: "Bundling",
    harga: 125000,
    stok: 10,
    ukuran: "Paket",
    deskripsi: "Paket kopi pilihan untuk menikmati kopi bersama.",
    unggulan: false,
    diskonPersen: 0
  },
  {
    nama: "Paket Dine In",
    kategori: "Bundling",
    harga: 75000,
    stok: 8,
    ukuran: "Paket",
    deskripsi: "Paket menu kopi untuk menikmati suasana kedai.",
    unggulan: false,
    diskonPersen: 10
  }
];

console.log("Data Produk Morning Haven");
console.table(dataProduk);


// ===============================
// FORMAT HARGA RUPIAH
// ===============================
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(nilai);
}


// ===============================
// STATUS STOK PRODUK
// ===============================
function statusStok(stok) {
  if (stok <= 0) {
    return {
      label: "Stok habis",
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


// ===============================
// LABEL KATEGORI
// ===============================
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Kopi racikan kedai";

    case "Bundling":
      return "Paket Bundling";

    default:
      return "Menu Morning Haven";
  }
}


// ===============================
// HITUNG HARGA PROMO
// ===============================
function hitungHargaPromo(produk) {
  return Math.round(
    produk.harga * (1 - produk.diskonPersen / 100)
  );
}


// ===============================
// ELEMEN HTML PRODUK
// ===============================
const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");
const produkUnggulanEl = document.querySelector("#produk-unggulan");


// ===============================
// MEMBUAT KARTU PRODUK
// ===============================
function buatElemenProduk(produk) {
  const status = statusStok(produk.stok);
  const adaDiskon = produk.diskonPersen > 0;

  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = labelKategori(produk.kategori);

  const price = document.createElement("p");
  price.classList.add("price");

  if (adaDiskon) {
    const hargaNormal = document.createElement("del");
    hargaNormal.classList.add("price-normal");
    hargaNormal.textContent = formatRupiah(produk.harga);

    price.append(hargaNormal);
  }

  const hargaPromo = document.createElement("span");
  hargaPromo.classList.add("price-promo");
  hargaPromo.textContent = formatRupiah(hitungHargaPromo(produk));

  price.append(hargaPromo);

  if (adaDiskon) {
    const badge = document.createElement("span");
    badge.classList.add("discount-badge");
    badge.textContent = `-${produk.diskonPersen}%`;

    price.append(badge);
  }

  const stock = document.createElement("span");
  stock.classList.add("stock-badge");

  stock.textContent = status.label;

  // Tombol sembunyikan kartu
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();

    if (produkStatus) {
      produkStatus.textContent =
        "Satu kartu disembunyikan dari tampilan sementara.";
    }
  });

  card.append(
  title,
  category,
  price,
  removeButton
);

  return card;
}


// ===============================
// EMPTY STATE
// ===============================
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");

  empty.textContent =
    `Belum ada produk pada kategori ${kategori}.`;

  return empty;
}


// ===============================
// RENDER PRODUK DAN FILTER
// ===============================
function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  console.log("Render kategori:", kategoriAktif);

  const produkTampil = kategoriAktif === "Semua"
    ? dataProduk
    : dataProduk.filter(
        (produk) => produk.kategori === kategoriAktif
      );

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));

    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent =
    `${produkTampil.length} produk ditampilkan.`;
}


// ===============================
// PRODUK UNGGULAN
// ===============================
function renderUnggulan() {
  if (!produkUnggulanEl) {
    return;
  }

  const unggulan = dataProduk.find(
    (produk) => produk.unggulan === true
  );

  produkUnggulanEl.textContent = unggulan
    ? `Produk unggulan: ${unggulan.nama}`
    : "Belum ada produk unggulan.";
}


// ===============================
// HITUNG TOTAL STOK
// ===============================
function hitungTotalStok(daftarProduk) {
  let total = 0;

  for (const produk of daftarProduk) {
    total = total + produk.stok;
  }

  return total;
}


// ===============================
// MEMBUAT KARTU PRODUK DETAIL
// ===============================
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);
  const kategori = labelKategori(produk.kategori);

  // Ganti nomor ini dengan nomor WhatsApp Morning Haven
  // Gunakan format 62xxxxxxxxxx tanpa tanda + atau spasi
  const nomorWhatsApp = "082314117776";

  const pesanWhatsApp =
    `Halo Morning Haven, saya ingin bertanya tentang ${produk.nama}. Apakah produk ini masih tersedia?`;

  const linkWhatsApp =
    `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesanWhatsApp)}`;

  return `
    <article class="product-card js-product-card">
      <h3>${produk.nama}</h3>

      <p class="product-detail">
        ${kategori} · ${produk.ukuran}
      </p>

      <p>${produk.deskripsi}</p>

      <p class="price">
        ${
          produk.diskonPersen > 0
            ? `
              <del class="price-normal">
                ${formatRupiah(produk.harga)}
              </del>

              <span class="price-promo">
                ${formatRupiah(hitungHargaPromo(produk))}
              </span>

              <span class="discount-badge">
                -${produk.diskonPersen}%
              </span>
            `
            : formatRupiah(produk.harga)
        }
      </p>

      <p class="stock-badge ${status.className}">
        ${status.label}
      </p>

      <p class="product-detail">
        ${labelAksi}
      </p>

      <div class="product-actions">

  <a
    href="${linkWhatsApp}"
    class="tanya-produk"
    target="_blank"
    rel="noopener"
  >
    Tanya Produk
  </a>

  <a
    href="#tabel-harga"
    class="lihat-tabel-harga"
  >
    Lihat Tabel Harga
  </a>

</div>
    </article>
  `;
}


// ===============================
// MEMBUAT BARIS TABEL PRODUK
// ===============================
function buatBarisTabel(produk) {
  const status = statusStok(produk.stok);

  return `
    <tr>
      <td>${produk.nama}</td>
      <td>${produk.ukuran}</td>
      <td>${status.label} (${produk.stok})</td>
      <td>${produk.deskripsi}</td>
      <td>
        ${
          produk.diskonPersen > 0
            ? formatRupiah(hitungHargaPromo(produk))
            : formatRupiah(produk.harga)
        }
      </td>
    </tr>
  `;
}


// ===============================
// RENDER DAFTAR DAN TABEL PRODUK
// ===============================
function renderDetailProduk() {
  const productList = document.querySelector("#product-list");
  const productTableBody = document.querySelector("#product-table-body");
  const productSummary = document.querySelector("#product-summary");
  const productHighlight = document.querySelector("#product-highlight");

  if (!productList || !productTableBody) {
    return;
  }

  const produkTersedia = dataProduk.filter(
    (produk) => produk.stok > 0
  );

  const produkUnggulan = dataProduk.find(
    (produk) => produk.unggulan === true
  );

  const kartuMarkup = produkTersedia
    .map(buatKartuProduk)
    .join("");

  const barisMarkup = dataProduk
    .map(buatBarisTabel)
    .join("");

  productList.innerHTML = kartuMarkup;
  productTableBody.innerHTML = barisMarkup;

  if (productSummary) {
    productSummary.textContent =
      `${produkTersedia.length} produk tersedia dari ` +
      `${dataProduk.length} data, total stok ` +
      `${hitungTotalStok(dataProduk)} item.`;
  }

  if (productHighlight) {
    productHighlight.textContent = produkUnggulan
      ? `Produk unggulan: ${produkUnggulan.nama}`
      : "Belum ada produk unggulan.";
  }
}

// ===============================
// EVENT TOMBOL FILTER
// ===============================
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => {
      item.classList.remove("is-active");
    });

    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

// ===============================
// MENJALANKAN PROGRAM
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  renderProduk();
  renderUnggulan();
  renderDetailProduk();
});