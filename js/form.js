const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview-form");

if (form && preview) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    preview.textContent = [
      `Nama             : ${data.get("nama")}`,
      `Email            : ${data.get("email")}`,
      `WhatsApp         : ${data.get("whatsapp")}`,
      `Waktu kunjungan  : ${data.get("waktu")}`,
      `Menu             : ${data.get("paket")}`,
      `Topik            : ${data.get("topik")}`,
      `Metode kontak    : ${data.get("metode") || "-"}`,
      `Pesan            : ${data.get("pesan")}`
    ].join("\n");
  });
}