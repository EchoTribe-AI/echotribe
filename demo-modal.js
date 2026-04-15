(function () {
  var FONT_URL = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
  if (!document.querySelector('link[href*="Outfit"]')) {
    var fl = document.createElement('link');
    fl.rel = 'stylesheet'; fl.href = FONT_URL;
    document.head.appendChild(fl);
  }

  var style = document.createElement('style');
  style.textContent = `
    #dm-overlay {
      position: fixed; inset: 0; z-index: 99998;
      display: flex; align-items: center; justify-content: center;
      background: rgba(20,6,14,0.65); backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px); padding: 20px;
      opacity: 0; transition: opacity 0.25s ease;
    }
    #dm-overlay.dm-visible { opacity: 1; }
    #dm-box {
      background: #fff; border-radius: 20px; max-width: 540px; width: 100%;
      padding: 44px 48px; box-shadow: 0 12px 60px rgba(20,6,14,0.22);
      font-family: 'Inter', system-ui, sans-serif; color: #0F1020;
      transform: translateY(20px); transition: transform 0.3s ease;
      max-height: 90vh; overflow-y: auto;
    }
    #dm-overlay.dm-visible #dm-box { transform: translateY(0); }
    #dm-close {
      position: absolute; top: 16px; right: 18px;
      background: none; border: none; cursor: pointer;
      color: rgba(15,16,32,0.35); font-size: 22px; line-height: 1;
      transition: color 0.15s; padding: 4px 8px;
    }
    #dm-close:hover { color: #0F1020; }
    #dm-box { position: relative; }
    .dm-eyebrow {
      font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500;
      text-transform: uppercase; letter-spacing: 0.14em; color: #b7004d;
      background: #fce7ef; padding: 5px 12px; border-radius: 100px;
      display: inline-block; margin-bottom: 16px;
    }
    #dm-box h2 {
      font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700;
      line-height: 1.15; color: #0F1020; margin-bottom: 8px;
    }
    .dm-sub {
      font-size: 14px; line-height: 1.65; color: rgba(15,16,32,0.6);
      margin-bottom: 28px;
    }
    .dm-field { margin-bottom: 18px; }
    .dm-label {
      display: block; font-size: 12px; font-weight: 600; color: #0F1020;
      margin-bottom: 7px; letter-spacing: 0.01em;
    }
    .dm-input {
      width: 100%; padding: 11px 14px; border: 1.5px solid #E8E6E1;
      border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 14px;
      color: #0F1020; background: #FAFAF9; outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .dm-input:focus {
      border-color: #b7004d; background: #fff;
      box-shadow: 0 0 0 3px rgba(183,0,77,0.08);
    }
    .dm-use-cases {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin-top: 4px;
    }
    .dm-use-case {
      border: 1.5px solid #E8E6E1; border-radius: 12px; padding: 12px 14px;
      cursor: pointer; transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
      display: flex; align-items: flex-start; gap: 10px;
      background: #FAFAF9;
    }
    .dm-use-case:hover { border-color: #b7004d; background: #fff; }
    .dm-use-case.dm-selected {
      border-color: #b7004d; background: #fce7ef;
      box-shadow: 0 0 0 3px rgba(183,0,77,0.08);
    }
    .dm-uc-icon {
      font-size: 18px; flex-shrink: 0; margin-top: 1px;
    }
    .dm-uc-name {
      font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
      color: #0F1020; line-height: 1.2;
    }
    .dm-uc-desc {
      font-size: 11px; color: rgba(15,16,32,0.5); margin-top: 2px; line-height: 1.4;
    }
    .dm-use-case input[type="radio"] { display: none; }
    #dm-submit {
      width: 100%; margin-top: 24px; padding: 14px 0;
      background: #b7004d; color: #fff;
      font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
      border: none; border-radius: 12px; cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, opacity 0.2s;
      opacity: 0.45; pointer-events: none;
    }
    #dm-submit.dm-ready { opacity: 1; pointer-events: all; }
    #dm-submit.dm-ready:hover {
      background: #8f003b; box-shadow: 0 4px 18px rgba(183,0,77,0.3);
    }
    /* Success state */
    #dm-success {
      display: none; text-align: center; padding: 12px 0 4px;
    }
    #dm-success .dm-success-icon {
      font-size: 48px; margin-bottom: 16px; display: block;
    }
    #dm-success h3 {
      font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700;
      color: #0F1020; margin-bottom: 10px;
    }
    #dm-success p {
      font-size: 14px; line-height: 1.65; color: rgba(15,16,32,0.6); max-width: 360px; margin: 0 auto;
    }
    @media (max-width: 600px) {
      #dm-box { padding: 30px 22px; }
      #dm-box h2 { font-size: 22px; }
      .dm-use-cases { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);

  var USE_CASES = [
    { id: 'signal',  icon: '📡', name: 'EchoSignal',  desc: 'Social & audience intelligence' },
    { id: 'route',   icon: '🗺️', name: 'EchoRoute',   desc: 'Media planning & buying' },
    { id: 'shop',    icon: '🛍️', name: 'EchoShop',    desc: 'Commerce & retail media' },
    { id: 'boost',   icon: '⚡', name: 'EchoBoost',   desc: 'Performance creative' },
    { id: 'agent',   icon: '🤖', name: 'EchoAgent',   desc: 'AI workflow automation' },
    { id: 'all',     icon: '✨', name: 'Full Stack',   desc: 'Show me everything' },
  ];

  function buildModal() {
    var overlay = document.createElement('div');
    overlay.id = 'dm-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'dm-title');

    var ucHTML = USE_CASES.map(function (uc) {
      return '<label class="dm-use-case" data-id="' + uc.id + '">' +
        '<input type="radio" name="dm-usecase" value="' + uc.id + '">' +
        '<span class="dm-uc-icon">' + uc.icon + '</span>' +
        '<span><span class="dm-uc-name">' + uc.name + '</span>' +
        '<span class="dm-uc-desc">' + uc.desc + '</span></span>' +
        '</label>';
    }).join('');

    overlay.innerHTML =
      '<div id="dm-box">' +
        '<button id="dm-close" aria-label="Close">&times;</button>' +
        '<span class="dm-eyebrow">Request a Demo</span>' +
        '<h2 id="dm-title">See EchoTribe in action</h2>' +
        '<p class="dm-sub">Tell us about yourself and which product excites you most — we\'ll tailor your demo experience.</p>' +

        '<div id="dm-form">' +
          '<div class="dm-field">' +
            '<label class="dm-label" for="dm-name">Your name</label>' +
            '<input class="dm-input" type="text" id="dm-name" placeholder="Jane Smith" autocomplete="name">' +
          '</div>' +
          '<div class="dm-field">' +
            '<label class="dm-label" for="dm-email">Work email</label>' +
            '<input class="dm-input" type="email" id="dm-email" placeholder="jane@company.com" autocomplete="email">' +
          '</div>' +
          '<div class="dm-field">' +
            '<label class="dm-label">What are you most excited to see?</label>' +
            '<div class="dm-use-cases">' + ucHTML + '</div>' +
          '</div>' +
          '<button id="dm-submit">Request Demo &rarr;</button>' +
        '</div>' +

        '<div id="dm-success">' +
          '<span class="dm-success-icon">🎉</span>' +
          '<h3>You\'re on the list!</h3>' +
          '<p>Thanks — we\'ll be in touch shortly to schedule your personalised demo. Check your inbox!</p>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);

    var nameEl   = overlay.querySelector('#dm-name');
    var emailEl  = overlay.querySelector('#dm-email');
    var submitEl = overlay.querySelector('#dm-submit');
    var formEl   = overlay.querySelector('#dm-form');
    var successEl = overlay.querySelector('#dm-success');
    var selected  = null;

    function validate() {
      var ok = nameEl.value.trim().length > 0 &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim()) &&
               selected !== null;
      submitEl.classList.toggle('dm-ready', ok);
    }

    nameEl.addEventListener('input', validate);
    emailEl.addEventListener('input', validate);

    overlay.querySelectorAll('.dm-use-case').forEach(function (card) {
      card.addEventListener('click', function () {
        overlay.querySelectorAll('.dm-use-case').forEach(function (c) { c.classList.remove('dm-selected'); });
        card.classList.add('dm-selected');
        card.querySelector('input[type="radio"]').checked = true;
        selected = card.dataset.id;
        validate();
      });
    });

    submitEl.addEventListener('click', function () {
      var payload = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        usecase: selected,
        ts: new Date().toISOString()
      };
      try {
        var leads = JSON.parse(localStorage.getItem('echotribe_demo_leads') || '[]');
        leads.push(payload);
        localStorage.setItem('echotribe_demo_leads', JSON.stringify(leads));
      } catch(e) {}
      formEl.style.display = 'none';
      successEl.style.display = 'block';
    });

    overlay.querySelector('#dm-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    return overlay;
  }

  var modal = null;

  function openModal() {
    if (!modal) modal = buildModal();
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      modal.style.display = 'flex';
      requestAnimationFrame(function () { modal.classList.add('dm-visible'); });
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('dm-visible');
    setTimeout(function () {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 250);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a.nav-cta, a[href="#demo"], .demo-trigger');
    if (link) {
      e.preventDefault();
      openModal();
    }
  });

  window.echoTribeDemo = { open: openModal, close: closeModal };
})();
