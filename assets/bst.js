// function injectInstallments() {
//   var slot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');
//   var source = document.getElementById('shopify-installments-prerendered');

//   if (!slot || slot.querySelector('.installment')) return;

//   if (source) {
//     var clone = source.cloneNode(true);
//     clone.style.display = 'block';
//     clone.id = '';
//     slot.appendChild(clone);
//   }
// }

// document.addEventListener('rebuy:cart.ready', injectInstallments);
// document.addEventListener('rebuy:cart.open', injectInstallments);
// document.addEventListener('rebuy:cart.change', injectInstallments);

// var observer = new MutationObserver(function() {
//   injectInstallments();
// });

// observer.observe(document.body, {
//   childList: true,
//   subtree: true
// });



function injectInstallments() {
  const slot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');
  const source = document.getElementById('shopify-installments-prerendered');
  if (!slot || slot.querySelector('.installment')) return;
  if (source) {
    const clone = source.cloneNode(true);
    clone.style.display = 'block';
    clone.id = '';
    slot.appendChild(clone);
    setTimeout(styleInstallments, 100);
    setTimeout(styleInstallments, 300);
    setTimeout(styleInstallments, 600);
    setTimeout(styleInstallments, 1000);
  }
}

function styleInstallments() {
  // Only target shopify-payment-terms INSIDE rebuy cart slot
  const slot = document.querySelector('[data-rebuy-cart-additional-checkout-buttons]');
  if (!slot) return;

  const hosts = slot.querySelectorAll('shopify-payment-terms');
  hosts.forEach(function(host) {
    if (!host.shadowRoot) return;
    const old = host.shadowRoot.querySelector('#rebuy-installments-style');
    if (old) old.remove();
    const style = document.createElement('style');
    style.id = 'rebuy-installments-style';
    style.textContent = `
      div, p, span, a, strong, b {
        color: #ffffff !important;
        fill: #ffffff !important;
        text-align:center!important;
      }
      .text-purple-primary {
        color: #ffffff !important;
      }
  
    `;
    host.shadowRoot.appendChild(style);
  });
}

document.addEventListener('rebuy:cart.ready', injectInstallments);
document.addEventListener('rebuy:cart.open', injectInstallments);
document.addEventListener('rebuy:cart.change', injectInstallments);

document.addEventListener('rebuy:cart.open', function() {
  setTimeout(styleInstallments, 100);
  setTimeout(styleInstallments, 300);
  setTimeout(styleInstallments, 600);
});

const observer = new MutationObserver(function() {
  injectInstallments();
  styleInstallments();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});