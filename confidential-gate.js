(function () {
  var STORAGE_KEY = 'echotribe_accepted_preview';

  if (localStorage.getItem(STORAGE_KEY) === 'true') return;

  var style = document.createElement('style');
  style.textContent = [
    '#et-gate-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(20,6,14,0.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:20px;}',
    '#et-gate-box{background:#fff;border-radius:16px;max-width:560px;width:100%;padding:40px 44px;box-shadow:0 8px 48px rgba(20,6,14,0.22);font-family:"Manrope",system-ui,sans-serif;color:#4a2135;}',
    '#et-gate-box .et-eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b7004d;margin-bottom:14px;}',
    '#et-gate-box h2{font-family:"Newsreader","Georgia",serif;font-size:26px;font-weight:700;line-height:1.2;margin-bottom:18px;color:#2a0d1e;}',
    '#et-gate-box p.et-intro{font-size:14px;line-height:1.65;color:rgba(74,33,53,0.8);margin-bottom:18px;}',
    '#et-gate-box ul.et-terms{margin:0 0 24px 0;padding:0;list-style:none;}',
    '#et-gate-box ul.et-terms li{font-size:13.5px;line-height:1.6;color:rgba(74,33,53,0.8);padding:6px 0 6px 22px;position:relative;border-bottom:1px solid rgba(74,33,53,0.07);}',
    '#et-gate-box ul.et-terms li:last-child{border-bottom:none;}',
    '#et-gate-box ul.et-terms li::before{content:"";position:absolute;left:0;top:13px;width:8px;height:8px;border-radius:50%;background:#b7004d;}',
    '#et-gate-checkbox-row{display:flex;align-items:flex-start;gap:10px;margin-bottom:24px;}',
    '#et-gate-checkbox{width:18px;height:18px;flex-shrink:0;accent-color:#b7004d;margin-top:2px;cursor:pointer;}',
    '#et-gate-checkbox-row label{font-size:13px;line-height:1.55;color:rgba(74,33,53,0.85);cursor:pointer;}',
    '#et-gate-btn{width:100%;padding:14px 0;background:#b7004d;color:#fff;font-family:"Manrope",system-ui,sans-serif;font-size:15px;font-weight:700;border:none;border-radius:10px;cursor:pointer;opacity:.45;pointer-events:none;transition:opacity .2s,background .2s;}',
    '#et-gate-btn.et-ready{opacity:1;pointer-events:all;}',
    '#et-gate-btn.et-ready:hover{background:#8f003b;}',
    '@media(max-width:600px){#et-gate-box{padding:30px 22px;}#et-gate-box h2{font-size:21px;}}'
  ].join('');
  document.head.appendChild(style);

  var overlay = document.createElement('div');
  overlay.id = 'et-gate-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'et-gate-title');

  overlay.innerHTML = [
    '<div id="et-gate-box">',
    '  <div class="et-eyebrow">Confidential Preview Access</div>',
    '  <h2 id="et-gate-title">Before you continue</h2>',
    '  <p class="et-intro">This site contains confidential and proprietary information about EchoTribe&rsquo;s products, systems, and business model. By continuing, you agree to:</p>',
    '  <ul class="et-terms">',
    '    <li>Keep all materials confidential and not share them without written permission</li>',
    '    <li>Not copy, scrape, reverse-engineer, or use this information to build a competing product or service</li>',
    '    <li>Review and accept the Terms of Use and Privacy Policy</li>',
    '    <li>Acknowledge that third-party marks remain the property of their respective owners</li>',
    '  </ul>',
    '  <div id="et-gate-checkbox-row">',
    '    <input type="checkbox" id="et-gate-checkbox" />',
    '    <label for="et-gate-checkbox">I have read and agree to the Terms of Use, Privacy Policy, and Confidential Preview Terms.</label>',
    '  </div>',
    '  <button id="et-gate-btn" disabled>Accept and Continue</button>',
    '</div>'
  ].join('');

  document.body.appendChild(overlay);

  var checkbox = document.getElementById('et-gate-checkbox');
  var btn = document.getElementById('et-gate-btn');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      btn.classList.add('et-ready');
      btn.disabled = false;
    } else {
      btn.classList.remove('et-ready');
      btn.disabled = true;
    }
  });

  btn.addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, 'true');
    overlay.style.transition = 'opacity .3s';
    overlay.style.opacity = '0';
    setTimeout(function () { overlay.remove(); style.remove(); }, 320);
  });
})();
