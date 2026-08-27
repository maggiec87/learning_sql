/* ============================================================
 * app.js — 页面交互与主逻辑
 * 依赖：sql-wasm.js, db.js, tutorial.js, cheatsheet.js, questions.js
 * ============================================================ */

(function () {
  'use strict';

  // ---------- 全局状态 ----------
  let DB = null;          // sql.js 数据库实例
  let SQL = null;
  let currentTut = 0;

  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // ---------- 初始化 SQL 引擎 ----------
  function initEngine() {
    return initSqlJs({ locateFile: function (file) { return 'lib/' + file; } })
      .then(function (sql) {
        SQL = sql;
        rebuildDB();
      })
      .catch(function (err) {
        const area = $('#resultArea');
        if (area) {
          area.innerHTML = '<div class="err-box">SQL 引擎加载失败：' + (err && err.message ? err.message : err) +
            '<br>请通过本地服务器（http://）打开本页面，浏览器不允许 file:// 直接加载 WebAssembly。</div>';
        }
      });
  }

  function rebuildDB() {
    DB = new SQL.Database();
    window.SampleDB.buildDatabase(DB);
    renderSchema();
  }

  // ---------- 运行查询 ----------
  function runQuery(sql) {
    const area = $('#resultArea');
    const meta = $('#resultMeta');
    if (!DB) {
      area.innerHTML = '<div class="err-box">数据库尚未就绪，请稍候。</div>';
      return;
    }
    const trimmed = (sql || '').trim();
    if (!trimmed) {
      area.innerHTML = '<div class="placeholder">请输入 SQL 后再运行。</div>';
      meta.textContent = '';
      return;
    }
    try {
      const results = DB.exec(trimmed);
      meta.textContent = '';
      if (!results || results.length === 0) {
        area.innerHTML = '<div class="ok-box">✅ 语句已成功执行，没有返回结果集（例如 CREATE / UPDATE / DELETE 等）。</div>';
        return;
      }
      let html = '';
      results.forEach(function (r, i) {
        html += '<div style="margin-bottom:14px">';
        if (results.length > 1) html += '<div class="result-meta" style="margin-bottom:6px">结果集 ' + (i + 1) + '</div>';
        html += '<table class="result-tbl"><thead><tr>';
        r.columns.forEach(function (c) { html += '<th>' + escapeHtml(c) + '</th>'; });
        html += '</tr></thead><tbody>';
        r.values.forEach(function (row) {
          html += '<tr>';
          row.forEach(function (v) { html += '<td>' + (v === null ? '<i style="color:#bbb">NULL</i>' : escapeHtml(String(v))) + '</td>'; });
          html += '</tr>';
        });
        html += '</tbody></table>';
        html += '<div class="result-meta" style="margin-top:6px">' + r.values.length + ' 行 × ' + r.columns.length + ' 列</div>';
        html += '</div>';
      });
      area.innerHTML = html;
    } catch (e) {
      area.innerHTML = '<div class="err-box">❌ 执行出错：\n' + escapeHtml(e.message || String(e)) + '</div>';
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------- 渲染：数据库结构 ----------
  function renderSchema() {
    const box = $('#schemaInfo');
    if (!box) return;
    let html = '';
    window.SampleDB.schemaInfo.forEach(function (t) {
      html += '<div style="margin-bottom:8px"><b>' + t.table + '</b> — ' + t.note + '<br><code>(' +
        t.columns.join(', ') + ')</code></div>';
    });
    box.innerHTML = html;
  }

  // ---------- 切换标签 ----------
  function switchTab(target) {
    $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.target === target); });
    $$('.panel').forEach(function (p) { p.classList.toggle('active', p.id === target); });
    if (target === 'practice') {
      // 聚焦编辑器
      const ta = $('#sqlInput');
      if (ta) setTimeout(function () { ta.focus(); }, 50);
    }
  }

  // ---------- 训练场：设置 SQL 并切换 ----------
  function loadToPractice(sql, autoRun) {
    const ta = $('#sqlInput');
    if (ta) ta.value = sql;
    switchTab('practice');
    if (autoRun) { setTimeout(function () { runQuery(sql); }, 80); }
  }

  // ---------- 渲染：教程 ----------
  function renderTutorial() {
    const side = $('#tutSide');
    const main = $('#tutMain');
    side.innerHTML = '';
    window.SQL_TUTORIAL.forEach(function (sec, idx) {
      const b = document.createElement('button');
      b.textContent = sec.title;
      b.dataset.idx = idx;
      if (idx === currentTut) b.classList.add('active');
      b.addEventListener('click', function () { showTut(idx); });
      side.appendChild(b);
    });
    showTut(currentTut);
  }

  function showTut(idx) {
    currentTut = idx;
    const sec = window.SQL_TUTORIAL[idx];
    const main = $('#tutMain');
    $$('#tutSide button').forEach(function (b) { b.classList.toggle('active', +b.dataset.idx === idx); });
    let html = '<h3>' + sec.title + '</h3>' + sec.html;
    if (sec.example) {
      html += '<div class="tut-example-head"><b style="font-size:14px">▎可运行示例</b>' +
        '<button class="btn small" data-ex="' + encodeURIComponent(sec.example) + '">⚡ 在训练场试一试</button></div>';
      html += '<pre><code>' + escapeHtml(sec.example) + '</code></pre>';
    }
    if (sec.tip) html += '<div class="tut-tip">💡 ' + escapeHtml(sec.tip) + '</div>';
    main.innerHTML = html;
    const exBtn = main.querySelector('[data-ex]');
    if (exBtn) exBtn.addEventListener('click', function () {
      loadToPractice(decodeURIComponent(exBtn.dataset.ex), true);
    });
  }

  // ---------- 渲染：速查表 ----------
  function renderCheatsheet() {
    const grid = $('#cheatGrid');
    grid.innerHTML = '';
    window.SQL_CHEATSHEET.forEach(function (grp) {
      const card = document.createElement('div');
      card.className = 'cheat-card';
      let html = '<h3>' + grp.group + '</h3>';
      grp.items.forEach(function (it) {
        html += '<div class="cheat-row">' +
          '<span class="cheat-syntax">' + escapeHtml(it.syntax) + '</span>' +
          '<span class="cheat-desc">' + escapeHtml(it.desc) + '</span>' +
          '<button class="copy-btn" data-copy="' + encodeURIComponent(it.syntax) + '">复制</button>' +
          '</div>';
      });
      card.innerHTML = html;
      grid.appendChild(card);
    });
    $$('#cheatGrid .copy-btn').forEach(function (b) {
      b.addEventListener('click', function () { copyText(decodeURIComponent(b.dataset.copy), b); });
    });
  }

  function copyText(text, btn) {
    const done = function () {
      const old = btn.textContent; btn.textContent = '已复制';
      setTimeout(function () { btn.textContent = old; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  // ---------- 渲染：题库 ----------
  let qFilterDiff = '全部';
  let qFilterCat = '全部';

  function renderQuestionFilters() {
    const diffs = ['全部', '入门', '进阶', '高级'];
    const cats = ['全部'].concat(Array.from(new Set(window.SQL_QUESTIONS.map(function (q) { return q.category; }))));
    const box = $('#qFilters');
    box.innerHTML = '';
    // 难度
    const dWrap = document.createElement('div'); dWrap.style.display = 'flex'; dWrap.style.gap = '6px'; dWrap.style.flexWrap = 'wrap';
    dWrap.innerHTML = '<span style="font-size:12.5px;color:var(--muted);align-self:center">难度：</span>';
    diffs.forEach(function (d) {
      const b = document.createElement('button');
      b.textContent = d; b.dataset.diff = d;
      if (d === qFilterDiff) b.classList.add('active');
      b.addEventListener('click', function () { qFilterDiff = d; renderQuestionFilters(); renderQuestions(); });
      dWrap.appendChild(b);
    });
    box.appendChild(dWrap);
    // 分类
    const cWrap = document.createElement('div'); cWrap.style.display = 'flex'; cWrap.style.gap = '6px'; cWrap.style.flexWrap = 'wrap'; cWrap.style.marginTop = '8px';
    cWrap.innerHTML = '<span style="font-size:12.5px;color:var(--muted);align-self:center">分类：</span>';
    cats.forEach(function (c) {
      const b = document.createElement('button');
      b.textContent = c; b.dataset.cat = c;
      if (c === qFilterCat) b.classList.add('active');
      b.addEventListener('click', function () { qFilterCat = c; renderQuestionFilters(); renderQuestions(); });
      cWrap.appendChild(b);
    });
    box.appendChild(cWrap);
  }

  function renderQuestions() {
    const list = $('#qList');
    const stats = $('#qStats');
    const filtered = window.SQL_QUESTIONS.filter(function (q) {
      return (qFilterDiff === '全部' || q.difficulty === qFilterDiff) &&
             (qFilterCat === '全部' || q.category === qFilterCat);
    });
    stats.textContent = '共 ' + filtered.length + ' 题（总题库 ' + window.SQL_QUESTIONS.length + ' 题）';
    list.innerHTML = '';
    filtered.forEach(function (q) {
      const card = document.createElement('div');
      card.className = 'q-card';
      card.innerHTML =
        '<div class="q-top">' +
          '<span class="q-no">#' + q.id + '</span>' +
          '<span class="q-cat">' + q.category + '</span>' +
          '<span class="badge ' + q.difficulty + '">' + q.difficulty + '</span>' +
        '</div>' +
        '<div class="q-q">' + escapeHtml(q.question) + '</div>' +
        '<div class="q-actions">' +
          '<button class="btn small" data-act="toggle">显示提示 / 答案</button>' +
          (q.requiresDB ? '<button class="btn small primary" data-act="practice">⚡ 加载到训练场</button>' : '') +
        '</div>' +
        '<div class="q-body">' +
          '<div class="lbl">💡 提示</div><div>' + escapeHtml(q.hint) + '</div>' +
          '<div class="lbl">✅ 参考答案</div>' +
          '<pre><code>' + escapeHtml(q.answer) + '</code></pre>' +
        '</div>';
      const toggle = card.querySelector('[data-act="toggle"]');
      toggle.addEventListener('click', function () {
        const body = card.querySelector('.q-body');
        body.classList.toggle('open');
        toggle.textContent = body.classList.contains('open') ? '隐藏提示 / 答案' : '显示提示 / 答案';
      });
      const prac = card.querySelector('[data-act="practice"]');
      if (prac) prac.addEventListener('click', function () { loadToPractice(q.answer, true); });
      list.appendChild(card);
    });
  }

  // ---------- 训练场事件绑定 ----------
  function bindPractice() {
    $('#runBtn').addEventListener('click', function () { runQuery($('#sqlInput').value); });
    $('#clearBtn').addEventListener('click', function () { $('#sqlInput').value = ''; $('#sqlInput').focus(); });
    $('#resetBtn').addEventListener('click', function () {
      rebuildDB();
      $('#resultArea').innerHTML = '<div class="ok-box">🔄 数据库已重置为初始示例数据。</div>';
      $('#resultMeta').textContent = '';
    });
    $$('.editor-quick .chip').forEach(function (c) {
      c.addEventListener('click', function () { loadToPractice(c.dataset.q, true); });
    });
    const ta = $('#sqlInput');
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault(); runQuery(ta.value);
      }
    });
    // 默认内容
    ta.value = 'SELECT b.title AS 书名, a.name AS 作者, c.name AS 分类, b.price AS 价格\nFROM books b\nJOIN authors a ON b.author_id = a.author_id\nJOIN categories c ON b.category_id = c.category_id\nORDER BY b.price DESC\nLIMIT 10;';
  }

  // ---------- 启动 ----------
  function boot() {
    // 标签切换
    $$('#tabs .tab').forEach(function (t) {
      t.addEventListener('click', function () { switchTab(t.dataset.target); });
    });
    renderTutorial();
    renderCheatsheet();
    renderQuestionFilters();
    renderQuestions();
    bindPractice();
    initEngine().then(function () {
      // 引擎就绪后给个欢迎查询
      runQuery($('#sqlInput').value);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
