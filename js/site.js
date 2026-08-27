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

  /* ============================================================
   * 全网搜索：跨教程 / 速查表 / 题库；数据按需懒加载
   * ============================================================ */
  function initSearch() {
    var esc = window.Site.escapeHtml;
    // 1) 顶栏搜索按钮（插在导航之后）
    var nav = document.getElementById('nav');
    if (nav) {
      var btn = document.createElement('button');
      btn.id = 'searchToggle';
      btn.className = 'search-toggle';
      btn.setAttribute('aria-label', '搜索');
      btn.title = '搜索教程 / 速查表 / 题库';
      btn.textContent = '🔍';
      nav.insertAdjacentElement('afterend', btn);
    }

    // 2) 搜索弹层
    var modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.className = 'search-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="search-overlay" id="searchOverlay"></div>' +
      '<div class="search-panel" role="dialog" aria-modal="true">' +
        '<div class="search-bar">' +
          '<input id="searchInput" type="search" placeholder="搜索教程 / 速查表 / 题库…" autocomplete="off" />' +
          '<button id="searchClose" class="search-close" aria-label="关闭">✕</button>' +
        '</div>' +
        '<div id="searchResults" class="search-results"></div>' +
      '</div>';
    document.body.appendChild(modal);

    var input = document.getElementById('searchInput');
    var results = document.getElementById('searchResults');
    var overlay = document.getElementById('searchOverlay');
    var closeBtn = document.getElementById('searchClose');

    function ensureData(cb) {
      var need = [
        ['SQL_TUTORIAL', 'js/tutorial.js'],
        ['SQL_CHEATSHEET', 'js/cheatsheet.js'],
        ['SQL_QUESTIONS', 'js/questions.js']
      ].filter(function (n) { return !window[n[0]]; });
      if (!need.length) { cb(); return; }
      var i = 0;
      (function loadNext() {
        if (i >= need.length) { cb(); return; }
        var s = document.createElement('script');
        s.src = need[i][1];
        s.onload = function () { i++; loadNext(); };
        s.onerror = function () { i++; loadNext(); };
        document.body.appendChild(s);
      })();
    }

    function stripHtml(h) { var d = document.createElement('div'); d.innerHTML = h || ''; return d.textContent || ''; }

    function doSearch() {
      var q = (input.value || '').trim().toLowerCase();
      if (!q) { results.innerHTML = '<div class="search-empty">输入关键词，跨教程 / 速查表 / 题库实时搜索。</div>'; return; }
      var tut = [], cheat = [], ques = [];
      if (window.SQL_TUTORIAL) window.SQL_TUTORIAL.forEach(function (sec, idx) {
        var t = (sec.title + ' ' + stripHtml(sec.html) + ' ' + (sec.example || '')).toLowerCase();
        if (t.indexOf(q) >= 0) tut.push({ idx: idx, title: sec.title });
      });
      if (window.SQL_CHEATSHEET) window.SQL_CHEATSHEET.forEach(function (grp) {
        grp.items.forEach(function (it) {
          var t = (grp.group + ' ' + it.syntax + ' ' + it.desc).toLowerCase();
          if (t.indexOf(q) >= 0) cheat.push({ group: grp.group, syntax: it.syntax, desc: it.desc });
        });
      });
      if (window.SQL_QUESTIONS) window.SQL_QUESTIONS.forEach(function (x) {
        var t = (x.id + ' ' + (x.category || '') + ' ' + x.question + ' ' + (x.hint || '') + ' ' + (x.answer || '')).toLowerCase();
        if (t.indexOf(q) >= 0) ques.push({ id: x.id, difficulty: x.difficulty, category: x.category, question: x.question });
      });

      if (!tut.length && !cheat.length && !ques.length) {
        results.innerHTML = '<div class="search-empty">没找到与「' + esc(q) + '」相关的内容。</div>';
        return;
      }
      var html = '';
      if (tut.length) {
        html += '<div class="search-group"><div class="search-group-h">📘 教程（' + tut.length + '）</div>';
        tut.slice(0, 20).forEach(function (r) {
          html += '<a class="search-item" href="tutorial.html#sec-' + r.idx + '"><span class="si-type tut">教程</span>' + esc(r.title) + '</a>';
        });
        if (tut.length > 20) html += '<div class="search-more">…还有 ' + (tut.length - 20) + ' 条</div>';
        html += '</div>';
      }
      if (cheat.length) {
        html += '<div class="search-group"><div class="search-group-h">📋 速查表（' + cheat.length + '）</div>';
        cheat.slice(0, 20).forEach(function (r) {
          html += '<a class="search-item" href="cheatsheet.html?g=' + encodeURIComponent(r.group) + '">' +
            '<span class="si-type cheat">速查</span><code>' + esc(r.syntax) + '</code>' +
            '<span class="si-desc">' + esc(r.desc) + '</span></a>';
        });
        if (cheat.length > 20) html += '<div class="search-more">…还有 ' + (cheat.length - 20) + ' 条</div>';
        html += '</div>';
      }
      if (ques.length) {
        html += '<div class="search-group"><div class="search-group-h">🧩 题库（' + ques.length + '）</div>';
        ques.slice(0, 20).forEach(function (r) {
          html += '<a class="search-item" href="questions.html#q-' + r.id + '">' +
            '<span class="si-type q">#' + r.id + '</span>' + esc(r.question) + '</a>';
        });
        if (ques.length > 20) html += '<div class="search-more">…还有 ' + (ques.length - 20) + ' 条</div>';
        html += '</div>';
      }
      results.innerHTML = html;
    }

    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { ensureData(doSearch); }, 120);
    });

    function openModal() {
      modal.hidden = false;
      setTimeout(function () { input.focus(); }, 50);
      ensureData(function () {
        if (input.value) doSearch();
        else results.innerHTML = '<div class="search-empty">输入关键词，跨教程 / 速查表 / 题库实时搜索。</div>';
      });
    }
    function closeModal() { modal.hidden = true; input.value = ''; results.innerHTML = ''; }

    if (btn) btn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { initNav(); initSearch(); });
  } else {
    initNav();
    initSearch();
  }
})();
