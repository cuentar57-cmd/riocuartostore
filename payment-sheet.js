/* iPhone Club: opciones de pago expandibles dentro de la ficha de producto. */
(function () {
  'use strict';
  if (typeof window.openDetail !== 'function') return;
  const originalOpenDetail = window.openDetail;
  const formatARS = value => new Intl.NumberFormat('es-AR', {
    style: 'currency', currency: 'ARS', maximumFractionDigits: 0
  }).format(value);
  const formatUSD = value => 'USD ' + Number(value).toLocaleString('es-AR', {
    maximumFractionDigits: 2
  });


  const paymentIcons = {"wallet":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"15\" rx=\"3\"/><path d=\"M3 9h18M21 11h-6a2 2 0 0 0 0 4h6\"/><path d=\"M15.5 13h.1\"/></svg>","card":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2.5\"/><path d=\"M3 9h18M6 15h4m3 0h2\"/></svg>","cash":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><rect x=\"2.5\" y=\"5.5\" width=\"19\" height=\"13\" rx=\"2\"/><circle cx=\"12\" cy=\"12\" r=\"2.5\"/><path d=\"M5.5 12h1m11 0h1\"/></svg>","dollar":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 2v20m5-15H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6\"/></svg>","chat":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20.5 11.5a8.5 8.5 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 20.5l1.4-5.1a8.5 8.5 0 1 1 16.1-3.9Z\"/><path d=\"M8.3 8.1c.4 3.9 3.6 7.1 7.5 7.5l1.1-1.9-2.4-1.2-1.1 1.1a7 7 0 0 1-3-3l1.1-1.1-1.2-2.4-2 .9Z\"/></svg>","chevron":"<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\" focusable=\"false\"><path d=\"m6 9 6 6 6-6\"/></svg>"};
  function paymentIcon(name) {
    const el = document.createElement('span');
    el.className = 'ic-payment-icon';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = paymentIcons[name] || paymentIcons.card;
    return el;
  }

  function getInstallmentOptions(product) {
    const specs = product && product.specs ? product.specs : {};
    return [3, 6, 9, 12, 18].map(count => {
      const re = new RegExp('^' + count + '\\s+cuotas?\\s+de\\s*\\(ARS\\)$', 'i');
      const key = Object.keys(specs).find(item => re.test(item.trim()));
      const value = key ? Number(String(specs[key]).replace(/[$\s]/g, '').replace(/,/g, '')) : 0;
      return Number.isFinite(value) && value > 0
        ? {count, amount: Math.round(value)}
        : null;
    }).filter(Boolean);
  }

  function renderInlinePayments(id) {
    if (typeof products === 'undefined') return;
    const product = products[id];
    const root = document.getElementById('installmentsBox');
    if (!product || !root) return;
    root.replaceChildren();
    const meta = typeof getDetailMeta === 'function'
      ? getDetailMeta(product)
      : {capacity:'',color:'',battery:'',isSealed:product.tag === 'Sellado'};
    const ars = Number(product.price) || 0;
    const usd = Number(product.usd) || 0;
    const installments = getInstallmentOptions(product);
    let selected = null;

    function updateWhatsapp() {
      const description = [
        product.name, meta.capacity, meta.color,
        !meta.isSealed && meta.battery ? 'Batería ' + meta.battery : ''
      ].filter(Boolean).join(' · ');
      const payment = selected
        ? 'Me interesa: ' + selected.label + ' — ' + selected.amount
        : 'Quiero consultar las formas de pago disponibles';
      const message = 'Hola, quiero consultar por ' + description + '.\n' +
        payment + '.\n¿Me confirman precio final, disponibilidad y condiciones de pago?';
      const link = 'https://wa.me/5493584015415?text=' + encodeURIComponent(message);
      const detailLink = document.getElementById('detailWhatsApp');
      const stickyLink = document.getElementById('detailStickyContact');
      if (detailLink) detailLink.href = link;
      if (stickyLink) stickyLink.href = link;
      whatsapp.href = link;
      selection.textContent = selected
        ? selected.label + ' · ' + selected.amount
        : 'Tocá una forma de pago para consultarla';
    }

    function makeRow(container, key, label, amount) {
      const option = document.createElement('label');
      option.className = 'ic-inline-pay-choice';
      const content = document.createElement('span');
      content.className = 'ic-inline-pay-label';
      const title = document.createElement('span');
      title.textContent = label;
      const price = document.createElement('strong');
      price.textContent = amount;
      const method = document.createElement('span');
      method.className = 'ic-payment-method';
      method.append(paymentIcon(key === 'pesos' ? 'cash' : key === 'dolares' ? 'dollar' : 'card'), title);
      content.append(method, price);
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'icInlinePaymentOption';
      radio.value = key;
      radio.setAttribute('aria-label', label + ', ' + amount);
      radio.addEventListener('change', () => {
        selected = {label, amount};
        updateWhatsapp();
      });
      option.append(content, radio);
      container.appendChild(option);
    }

    const head = document.createElement('div');
    head.className = 'ic-inline-pay-heading';
    const headIcon = paymentIcon('wallet');
    head.append(headIcon, document.createTextNode('Formas de pago'));
    const intro = document.createElement('p');
    intro.className = 'ic-inline-pay-note';
    intro.textContent = 'Elegí una opción y consultá sus condiciones por WhatsApp.';
    const prices = document.createElement('div');
    prices.className = 'ic-inline-pay-options';
    if (ars > 0) makeRow(prices, 'pesos', 'Efectivo o transferencia (a confirmar)', formatARS(ars));
    if (usd > 0) makeRow(prices, 'dolares', 'Precio en dólares', formatUSD(usd));
    if (ars <= 0) {
      const note = document.createElement('p');
      note.className = 'ic-inline-pay-note';
      note.style.marginTop = '10px';
      note.textContent = usd > 0
        ? 'El precio en pesos no está cargado: consultá la cotización vigente.'
        : 'Consultá el precio del equipo.';
      prices.appendChild(note);
    }
    root.append(head, intro, prices);

    if (installments.length) {
      const creditTitle = document.createElement('div');
      creditTitle.className = 'ic-inline-pay-credit-title';
      const icon = paymentIcon('card');
      creditTitle.append(icon, document.createTextNode('Opciones en cuotas'));
      const creditNote = document.createElement('p');
      creditNote.className = 'ic-inline-pay-note';
      creditNote.textContent = 'Valores por cuota cargados en el catálogo. Tarjetas, intereses y condiciones a confirmar.';
      const first = document.createElement('div');
      first.className = 'ic-inline-pay-options';
      const extra = document.createElement('div');
      extra.className = 'ic-inline-pay-options ic-inline-pay-extra';
      extra.id = 'icInlinePayExtra';
      extra.hidden = true;
      installments.forEach((plan, index) => {
        makeRow(index < 2 ? first : extra, 'cuotas-' + plan.count,
          plan.count + ' cuotas de', formatARS(plan.amount));
      });
      root.append(creditTitle, creditNote, first);
      if (installments.length > 2) {
        const more = document.createElement('button');
        more.className = 'ic-inline-pay-more';
        more.type = 'button';
        more.setAttribute('aria-controls', 'icInlinePayExtra');
        more.setAttribute('aria-expanded', 'false');
        more.textContent = 'Ver más cuotas (' + (installments.length - 2) + ')';
        more.addEventListener('click', () => {
          extra.hidden = !extra.hidden;
          more.setAttribute('aria-expanded', String(!extra.hidden));
          more.textContent = extra.hidden
            ? 'Ver más cuotas (' + (installments.length - 2) + ')'
            : 'Ver menos cuotas';
        });
        root.append(more, extra);
      }
    }

    const selection = document.createElement('p');
    selection.className = 'ic-inline-pay-status';
    const whatsapp = document.createElement('a');
    whatsapp.className = 'ic-inline-pay-wa';
    whatsapp.append(paymentIcon('chat'), document.createTextNode('Consultar por WhatsApp'));
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener';
    const disclaimer = document.createElement('p');
    disclaimer.className = 'ic-inline-pay-fineprint';
    disclaimer.textContent = 'Precios, financiación, medios de pago y disponibilidad sujetos a confirmación con el local.';
    root.append(selection, whatsapp, disclaimer);
    updateWhatsapp();

    const published = ars > 0 ? formatARS(ars) : (usd > 0 ? formatUSD(usd) : 'Consultar');
    const detailPrice = document.getElementById('detailPrice');
    const stickyPrice = document.getElementById('detailStickyPrice');
    const otherPrice = document.getElementById('detailUsd');
    const stickyOther = document.getElementById('detailStickyUsd');
    const priceNote = document.getElementById('detailPriceNote');
    if (detailPrice) detailPrice.textContent = published;
    if (stickyPrice) stickyPrice.textContent = published;
    if (otherPrice) otherPrice.textContent = ars > 0 && usd > 0 ? formatUSD(usd) : '';
    if (stickyOther) stickyOther.textContent = ars > 0 && usd > 0 ? formatUSD(usd) : '';
    if (priceNote) priceNote.textContent = ars > 0
      ? 'Precio en pesos publicado. Confirmá su vigencia.'
      : 'Precio en dólares publicado. Cotización en pesos a consultar.';
    const addButton = document.getElementById('detailAddBtn');
    if (addButton) addButton.hidden = ars <= 0;

    // Las cuotas tienen su propia sección y no se repiten en especificaciones.
    const specs = document.getElementById('detailSpecs');
    if (specs) {
      [...specs.querySelectorAll('.spec-card')].forEach(card => {
        const label = card.querySelector('span');
        if (label && /^\d+\s+cuotas?\s+de\s*\(ARS\)$/i.test(label.textContent.trim())) card.remove();
      });
      if (!specs.children.length) {
        specs.style.display = 'none';
        const sectionTitle = document.getElementById('detailSpecsHeading');
        if (sectionTitle) sectionTitle.style.display = 'none';
      }
    }
  }

  window.openDetail = function (id) {
    originalOpenDetail.call(this, id);
    renderInlinePayments(id);
  };
})();
