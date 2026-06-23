
function rebuyinjectInstallments() {
  const slot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');
  const source = document.getElementById('shopify-installments-prerendered');
  if (!slot || !source) return;
  if (slot.querySelector('.installment')) return;

  const clone = source.cloneNode(true);
  clone.style.display = 'block';
  clone.id = '';
  slot.appendChild(clone);

  setTimeout(rebuystyleInstallments, 200);
  setTimeout(rebuystyleInstallments, 600);
}

function rebuystyleInstallments() {
  const slot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');
  if (!slot) return;

  slot.querySelectorAll('shopify-payment-terms').forEach(function(host) {
    if (!host.shadowRoot) return;
    if (host.shadowRoot.querySelector('#rebuy-installments-style')) return;

    host.shadowRoot.querySelectorAll('.font-bold').forEach(function(el) {
      el.classList.remove('font-bold');
    });

    const style = document.createElement('style');
    style.id = 'rebuy-installments-style';
    style.textContent = `
      p {
        color: #ffffff;
        fill: #ffffff;
        text-align: center;
        font-family: var(--font-body-family);
      }
      .text-purple-primary {
        color: #ffffff !important;
      }
    `;
    host.shadowRoot.appendChild(style);
  });
}


function stylePDPInstallments() {
  const rebuySlot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');

  document.querySelectorAll('shopify-payment-terms').forEach(function(host) {
    if (rebuySlot && rebuySlot.contains(host)) return;
    if (!host.shadowRoot) return;
    if (host.shadowRoot.querySelector('#pdp-installments-style')) return;

    host.shadowRoot.querySelectorAll('.font-bold').forEach(function(el) {
      el.classList.remove('font-bold');
    });

    const style = document.createElement('style');
    style.id = 'pdp-installments-style';
    style.textContent = `
      p {
        font-family: var(--font-body-family);
        line-height: 15px;
      }
    `;
    host.shadowRoot.appendChild(style);
  });
}


document.addEventListener('rebuy:cart.ready', rebuyinjectInstallments);
document.addEventListener('rebuy:cart.open', rebuyinjectInstallments);
document.addEventListener('rebuy:cart.change', rebuyinjectInstallments);

document.addEventListener('rebuy:cart.open', function() {
  setTimeout(rebuystyleInstallments, 300);
  setTimeout(rebuystyleInstallments, 700);
});


document.addEventListener('DOMContentLoaded', function() {
  setTimeout(stylePDPInstallments, 500);
});
