const promoButton = document.getElementById("promoButton");

if (promoButton) {
  promoButton.addEventListener("click", function () {
    promoButton.textContent = "Promo hari ini: tanyakan via WhatsApp Morning Haven";
  });
}