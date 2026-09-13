const promoButton = document.querySelector('.promo-button');
const promoText = document.querySelector('.promo-text');

promoButton.addEventListener('click', () => {
    promoText.style.display = 'block';
    promoButton.textContent = "Beli 2 Gratis 1, khusus hari ini!";
});