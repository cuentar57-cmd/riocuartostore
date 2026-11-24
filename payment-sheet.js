/* iPhone Club Rio Cuarto - Product-specific payment options sourced from Supabase */
(function () {
  'use strict';
  const host = document.createElement('div');
  host.innerHTML = '<div id="icPaymentOverlay" class="ic-pay-overlay" hidden>' +
    '<section class="ic-pay-sheet" role="dialog" aria-modal="true" aria-labelledby="icPayTitle" aria-describedby="icPaySubtitle">' +
    '<header class="ic-pay-head"><div class="ic-pay-handle" aria-hidden="true"></div>' +
    '<p class="ic-pay-eyebrow">iPhone Club · Río Cuarto</p><h2 id="icPayTitle" class="ic-pay-title">Formas de pago</h2>' +
    '<p id="icPaySubtitle" class="ic-pay-subtitle"></p><button type="button" class="ic-pay-close" id="icPayClose" aria-label="Cerrar">×</button></header>' +
    '<div class="ic-pay-body"><h3 class="ic-pay-section-title"><span class="ic-pay-icon" aria-hidden="true">◈</span> Precio publicado</h3><div class="ic-pay-options" id="icPayCash"></div>' +
    '<div class="ic-pay-credit" id="icPayCredit" hidden><h3 class="ic-pay-section-title"><span class="ic-pay-icon" aria-hidden="true">▤</span> Opciones en cuotas</h3>' +
    '<p class="ic-pay-note">Importes por cuota cargados en el catálogo. Tarjetas aceptadas, financiación y condiciones sujetos a confirmación.</p>' +
    '<div class="ic-pay-options" id="icPayFirst"></div><div class="ic-pay-options ic-pay-more" id="icPayExtra" hidden></div>' +
    '<button id="icPayMore" type="button" class="ic-pay-more-button" hidden></button></div>' +
    '<div id="icPayPerks" class="ic-pay-perks" hidden><ul id="icPayPerksList"></ul></div>' +
    '<p class="ic-pay-disclaimer">Precios, medios de pago, financiación, garantía, disponibilidad y entrega sujetos a confirmación con el local. Esta consulta no implica una compra.</p></div>' +
    '<footer class="ic-pay-footer"><p class="ic-pay-selected" id="icPaySelected">Seleccioná una opción para consultar</p>' +
    '<a class="ic-pay-wa" id="icPayWhatsapp" target="_blank" rel="noopener" href="https://wa.me/5493584015415"><span aria-hidden="true">✆</span> Consultar por WhatsApp</a>' +
    '</footer></section></div>';
  const overlay = host.firstElementChild;
  if (!overlay) return;
  document.body.appendChild(overlay);
  const moneyARS = n => new Intl.NumberFormat('es-AR', {style:'currency',currency:'ARS',maximumFractionDigits:0}).format(n);
  const moneyUSD = n => 'USD ' + Number(n).toLocaleString('es-AR',{maximumFractionDigits:2});
  let activeProduct = null;
  let selected = null;
  let returnFocus = null;

  function installmentRows(p) {
    const specs = p && p.specs ? p.specs : {};
    return [3,6,9,12,18].map(count => {
      const keys = Object.keys(specs);
      const needle = new RegExp('^' + count + '\\s+cuotas?\\s+de\\s*\\(ARS\\)$', 'i');
      const key = keys.find(k => needle.test(k.trim()));
      const amount = key ? Number(String(specs[key]).replace(/[$\s]/g,'').replace(/,/g,'')) : 0;
      return Number.isFinite(amount) && amount > 0 ? {count,amount:Math.round(amount)} : null;
    }).filter(Boolean);
  }

  function createOption(target, key, label, value) {
    const row = document.createElement('label');
    row.className = 'ic-pay-option';
    const text = document.createElement('span');
    text.className = 'ic-pay-option-label';
    const title = document.createElement('span'); title.textContent = label;
    const amount = document.createElement('strong'); amount.textContent = value;
    text.append(title,amount);
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'icPayment'; input.value = key;
    input.setAttribute('aria-label',label + ', ' + value);
    input.addEventListener('change', () => {
      selected = {label,value};
      updateWhatsApp();
    });
    row.append(text,input);
    target.appendChild(row);
  }

  function updateWhatsApp() {
    if (!activeProduct) return;
    const p = activeProduct;
    const meta = typeof getDetailMeta === 'function'
      ? getDetailMeta(p)
      : {capacity:'',color:'',battery:'',isSealed:p.tag === 'Sellado'};
    const description = [p.name,meta.capacity,meta.color,!meta.isSealed && meta.battery ? 'Batería ' + meta.battery : ''].filter(Boolean).join(' · ');
    const choice = selected
      ? 'Me interesa esta forma de pago: ' + selected.label + ' — ' + selected.value
      : 'Quisiera conocer las formas de pago';
    const message = 'Hola, quiero consultar por ' + description + '.\n' + choice + '.\n¿Me confirmás precio final, disponibilidad y condiciones?';
    document.getElementById('icPayWhatsapp').href = 'https://wa.me/5493584015415?text=' + encodeURIComponent(message);
    document.getElementById('icPaySelected').textContent = selected
      ? selected.label + ' · ' + selected.value
      : 'Seleccioná la opción que te interesa';
  }

  function open(id) {
    if (typeof products === 'undefined') return;
    const p = products[id];
    if (!p) return;
    activeProduct = p; selected = null; returnFocus = document.activeElement;
    const meta = typeof getDetailMeta === 'function'
      ? getDetailMeta(p)
      : {capacity:'',color:'',battery:'',isSealed:p.tag === 'Sellado'};
    document.getElementById('icPayTitle').textContent = [p.name,meta.capacity].filter(Boolean).join(' · ');
    document.getElementById('icPaySubtitle').textContent = [meta.isSealed ? 'Sellado' : 'Seminuevo',meta.color,!meta.isSealed && meta.battery ? 'Batería ' + meta.battery : ''].filter(Boolean).join(' · ');
    const cash = document.getElementById('icPayCash');
    const first = document.getElementById('icPayFirst');
    const extra = document.getElementById('icPayExtra');
    cash.replaceChildren(); first.replaceChildren(); extra.replaceChildren();
    const ars = Number(p.price) || 0, usd = Number(p.usd) || 0;
    if (ars > 0) createOption(cash,'ars','Efectivo o transferencia · confirmar',moneyARS(ars));
    if (usd > 0) createOption(cash,'usd','Precio en dólares',moneyUSD(usd));
    if (ars <= 0) {
      const note = document.createElement('p'); note.className='ic-pay-note';
      note.textContent = usd > 0
        ? 'El catálogo no tiene un precio en pesos confirmado para este equipo. Consultá su cotización.'
        : 'Consultá el precio del equipo.';
      cash.appendChild(note);
    }
    const plans = installmentRows(p);
    document.getElementById('icPayCredit').hidden = plans.length === 0;
    plans.forEach((x,i) => createOption(i < 2 ? first : extra,'cuotas-' + x.count,x.count + ' cuotas de',moneyARS(x.amount)));
    const more = document.getElementById('icPayMore');
    more.hidden = plans.length <= 2; extra.hidden = true;
    if (plans.length > 2) {
      more.textContent = 'Ver más cuotas (' + (plans.length - 2) + ')';
      more.onclick = () => {
        extra.hidden = !extra.hidden;
        more.textContent = extra.hidden
          ? 'Ver más cuotas (' + (plans.length - 2) + ')'
          : 'Ver menos cuotas';
      };
    }
    const perks = document.getElementById('icPayPerks');
    const list = document.getElementById('icPayPerksList');
    list.replaceChildren();
    (Array.isArray(p.benefits) ? p.benefits : []).filter(Boolean).forEach(value => {
      const li = document.createElement('li'); li.textContent = String(value); list.appendChild(li);
    });
    perks.hidden = list.childElementCount === 0;
    updateWhatsApp();
    overlay.hidden = false;
    document.body.classList.add('ic-pay-lock');
    document.getElementById('icPayClose').focus({preventScroll:true});
  }

  function close() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove('ic-pay-lock');
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true});
    returnFocus = null; activeProduct = null;
  }

  function enhance(id) {
    if (typeof products === 'undefined') return;
    const p = products[id];
    if (!p) return;
    const payment = document.getElementById('installmentsBox');
    if (payment) {
      payment.replaceChildren();
      const title = document.createElement('div'); title.className = 'detail-payment-title';
      const icon = document.createElement('span'); icon.textContent = '▤';
      title.append(icon,document.createTextNode('Formas de pago y cuotas'));
      const preview = document.createElement('p'); preview.className = 'detail-payment-copy';
      const plans = installmentRows(p);
      preview.textContent = plans.length
        ? 'En pesos y dólares. Hasta ' + Math.max(...plans.map(x => x.count)) + ' cuotas publicadas; condiciones a confirmar.'
        : 'Precio en ' + (Number(p.price) > 0 ? 'pesos y dólares' : 'dólares') + '. Consultá los medios de pago.';
      const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'ic-pay-open';
      btn.textContent = 'Ver todas las formas de pago  ›';
      btn.addEventListener('click', () => open(id));
      payment.append(title,preview,btn);
    }
    const ars = Number(p.price) || 0;
    const usd = Number(p.usd) || 0;
    const displayed = ars > 0 ? moneyARS(ars) : usd > 0 ? moneyUSD(usd) : 'Consultar precio';
    const price = document.getElementById('detailPrice');
    if (price) price.textContent = displayed;
    const sticky = document.getElementById('detailStickyPrice');
    if (sticky) sticky.textContent = displayed;
    const usdSecondary = document.getElementById('detailUsd');
    if (usdSecondary) usdSecondary.textContent = ars > 0 && usd > 0 ? moneyUSD(usd) : '';
    const stickyUsd = document.getElementById('detailStickyUsd');
    if (stickyUsd) stickyUsd.textContent = ars > 0 && usd > 0 ? moneyUSD(usd) : '';
    const note = document.getElementById('detailPriceNote');
    if (note) note.textContent = ars > 0 ? 'Precio en pesos publicado. Confirmá vigencia.' : 'Precio en dólares publicado. Pesos a consultar.';
    const cartButton = document.getElementById('detailAddBtn');
    if (cartButton && ars <= 0) {
      cartButton.textContent = 'Consultar precio en pesos';
      cartButton.onclick = () => open(id);
    }
    const specs = document.getElementById('detailSpecs');
    if (specs) {
      [...specs.querySelectorAll('.spec-card')].forEach(card => {
        const label = card.querySelector('span');
        if (label && /^\d+\s+cuotas?\s+de\s*\(ARS\)$/i.test(label.textContent.trim())) card.remove();
      });
      if (!specs.children.length) {
        specs.style.display = 'none';
        const heading = document.getElementById('detailSpecsHeading');
        if (heading) heading.style.display = 'none';
      }
    }
  }

  if (typeof openDetail === 'function') {
    const original = openDetail;
    window.openDetail = function(id) {
      close();
      original.call(this,id);
      enhance(id);
    };
  } else console.error('No se encontró la función de detalle para vincular las formas de pago');

  document.getElementById('icPayClose').addEventListener('click',close);
  overlay.addEventListener('click',event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown',event => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key === 'Tab') {
      const elements = [...overlay.querySelectorAll('button,a[href],input:not([disabled])')].filter(x => x.offsetParent !== null);
      if (!elements.length) return;
      const first = elements[0], last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });
})();
