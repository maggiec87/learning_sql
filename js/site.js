/* ============================================================
 * site.js — 各页面共享：移动端导航、当前页高亮、通用工具
 * ============================================================ */
(function () {
  'use strict';

  // 移动端菜单开合
  function initNav() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.getElementById('nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
      });
      // 点击导航项后（移动端）收起菜单
      Array.prototype.forEach.call(nav.querySelectorAll('a'), function (a) {
        a.addEventListener('click', function () { nav.classList.remove('open'); });
      });
    }
    // 高亮当前页
    var page = document.body.getAttribute('data-page');
    if (page && nav) {
      var link = nav.querySelector('[data-nav="' + page + '"]');
      if (link) link.classList.add('active');
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function copyText(text, btn) {
    var done = function () {
      var old = btn.textContent; btn.textContent = '已复制';
      setTimeout(function () { btn.textContent = old; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // 查询参数
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  window.Site = {
    initNav: initNav,
    escapeHtml: escapeHtml,
    copyText: copyText,
    getParam: getParam
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
