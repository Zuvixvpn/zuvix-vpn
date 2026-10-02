const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

const plans = [...document.querySelectorAll(".plan")];
const continueBtn = document.getElementById("continue");
const price = document.getElementById("selectedPrice");
const promo = document.getElementById("promo");
const promoBtn = document.getElementById("promoBtn");
const promoMsg = document.getElementById("promoMsg");

let selected = null;

plans.forEach(p => {
  p.addEventListener("click", () => {
    plans.forEach(x => x.classList.remove("selected"));
    p.classList.add("selected");
    selected = {months: p.dataset.months, price: p.dataset.price};
    price.textContent = selected.price + " ₽";
    continueBtn.disabled = false;
    tg?.HapticFeedback?.selectionChanged();
  });
});

continueBtn.addEventListener("click", () => {
  if (!selected) return;
  // Оплата специально не подключена.
  promoMsg.textContent = "Тариф выбран. Здесь позже можно подключить оплату.";
  tg?.HapticFeedback?.notificationOccurred("success");
});

promoBtn.addEventListener("click", () => {
  const code = promo.value.trim().toUpperCase();
  const allowed = [
    "ZUVIX30-01","ZUVIX30-02","ZUVIX30-03","ZUVIX30-04","ZUVIX30-05",
    "ZUVIX30-06","ZUVIX30-07","ZUVIX30-08","ZUVIX30-09","ZUVIX30-10"
  ];
  if (allowed.includes(code)) {
    promoMsg.textContent = "✓ Промокод принят — 30 дней бесплатно.";
    tg?.HapticFeedback?.notificationOccurred("success");
  } else {
    promoMsg.textContent = "Промокод не найден.";
  }
});
