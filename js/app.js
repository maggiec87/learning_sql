/* ============================================================
 * app.js — 按页面（body[data-page]）渲染与交互
 * 依赖：site.js（window.Site）；practice 页额外依赖 sql-wasm.js / db.js / questions.js
 * ============================================================ */
(function () {
  'use strict';

  var page = document.body.getAttribute('data-page');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = window.Site.escapeHtml;

  /* ===================== 训练场引擎 ===================== */
  var DB = null, SQL = null, pendingRun = null;

  function setStatus(msg) { var m = $('#engineStatus'); if (m) m.textContent = msg; }

  function showEngineError(err) {
    var area = $('#resultArea');
    if (!area) return;
    area.innerHTML = '<div class="err-box">⚠️ SQL 引擎加载失败：' + esc(err && err.message ? err.message : err) +
      '<br><br>请确认：<br>' +
      '1）通过 <b>http://</b> 本地服务器打开（浏览器禁止 file:// 直接加载 WebAssembly）；<br>' +
      '2）手机访问请用电脑的<b>局域网 IP</b>，例如 <b>http://192.168.x.x:8124/</b>，不要用 127.0.0.1；<br>' +
      '3）电脑防火墙放行该端口。<br><br>' +
      '<button class="btn" id="retryBtn">🔁 重试</button></div>';
    var rb = $('#retryBtn');
    if (rb) rb.addEventListener('click', initEngine);
  }

  function initEngine() {
    setStatus('正在加载 SQL 引擎…');
    var locateFile = function (f) { return new URL('lib/' + f, location.href).href; };
    return initSqlJs({ locateFile: locateFile })
      .then(function (sql) {
        SQL = sql;
        rebuildDB();
        setStatus('');
        if (pendingRun) { runQuery(pendingRun); pendingRun = null; }
      })
      .catch(function (err) { setStatus(''); showEngineError(err); });
  }

  function rebuildDB() {
    DB = new SQL.Database();
    window.SampleDB.buildDatabase(DB);
    renderSchema();
  }

  function runQuery(sql) {
    var area = $('#resultArea');
    var meta = $('#resultMeta');
    if (!DB) { area.innerHTML = '<div class="err-box">数据库尚未就绪，请稍候。</div>'; return; }
    var trimmed = (sql || '').trim();
    if (!trimmed) { area.innerHTML = '<div class="placeholder">请输入 SQL 后再运行。</div>'; if (meta) meta.textContent = ''; return; }
    try {
      var results = DB.exec(trimmed);
      if (meta) meta.textContent = '';
      if (!results || results.length === 0) {
        area.innerHTML = '<div class="ok-box">✅ 语句已成功执行，没有返回结果集（例如 CREATE / UPDATE / DELETE 等）。</div>';
        return;
      }
      var html = '';
      results.forEach(function (r, i) {
        html += '<div style="margin-bottom:14px">';
        if (results.length > 1) html += '<div class="result-meta" style="margin-bottom:6px">结果集 ' + (i + 1) + '</div>';
        html += '<div class="tbl-scroll"><table class="result-tbl"><thead><tr>';
        r.columns.forEach(function (c) { html += '<th>' + esc(c) + '</th>'; });
        html += '</tr></thead><tbody>';
        r.values.forEach(function (row) {
          html += '<tr>';
          row.forEach(function (v) { html += '<td>' + (v === null ? '<i style="color:#bbb">NULL</i>' : esc(String(v))) + '</td>'; });
          html += '</tr>';
        });
        html += '</tbody></table></div>';
        html += '<div class="result-meta" style="margin-top:6px">' + r.values.length + ' 行 × ' + r.columns.length + ' 列</div>';
        html += '</div>';
      });
      area.innerHTML = html;
    } catch (e) {
      area.innerHTML = '<div class="err-box">❌ 执行出错：\n' + esc(e.message || String(e)) + '</div>';
    }
  }

  function renderSchema() {
    var box = $('#schemaInfo');
    if (!box) return;
    var html = '';
    window.SampleDB.schemaInfo.forEach(function (t) {
      html += '<div style="margin-bottom:8px"><b>' + t.table + '</b> — ' + t.note + '<br><code>(' +
        t.columns.join(', ') + ')</code></div>';
    });
    box.innerHTML = html;
  }

  function bindPractice() {
    $('#runBtn').addEventListener('click', function () { runQuery($('#sqlInput').value); });
    $('#clearBtn').addEventListener('click', function () { $('#sqlInput').value = ''; $('#sqlInput').focus(); });
    $('#resetBtn').addEventListener('click', function () {
      rebuildDB();
      $('#resultArea').innerHTML = '<div class="ok-box">🔄 数据库已重置为初始示例数据。</div>';
      var m = $('#resultMeta'); if (m) m.textContent = '';
    });
    $$('.editor-quick .chip').forEach(function (c) {
      c.addEventListener('click', function () { var ta = $('#sqlInput'); ta.value = c.dataset.q; runQuery(ta.value); });
    });
    var ta = $('#sqlInput');
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runQuery(ta.value); }
    });
  }

  // 题库 → 训练场：保留题目，编辑器留空，先自行思考
  function setupQuestionMode(q) {
    var panel = $('#questionPanel');
    panel.hidden = false;
    panel.innerHTML =
      '<div class="qm-head">' +
        '<span class="qm-no"># ' + q.id + '</span>' +
        '<span class="q-cat">' + esc(q.category) + '</span>' +
        '<span class="badge ' + q.difficulty + '">' + q.difficulty + '</span>' +
      '</div>' +
      '<div class="qm-q">' + esc(q.question) + '</div>' +
      '<div class="qm-actions">' +
        '<button class="btn small" id="qmHint">💡 显示提示</button>' +
        '<button class="btn small primary" id="qmAnswer">✅ 显示答案</button>' +
        '<button class="btn small" id="qmBlank">↺ 清空编辑器</button>' +
      '</div>' +
      '<div class="qm-hint" id="qmHintBox" hidden>' + esc(q.hint) + '</div>';

    var ta = $('#sqlInput');
    ta.value = '';
    ta.placeholder = '请在此自行写出你的 SQL，然后点「运行」。卡住了再点上方「显示答案」。';

    var hintBtn = $('#qmHint'), hintBox = $('#qmHintBox');
    hintBtn.addEventListener('click', function () {
      hintBox.hidden = !hintBox.hidden;
      hintBtn.textContent = hintBox.hidden ? '💡 显示提示' : '🙈 隐藏提示';
    });
    var ansBtn = $('#qmAnswer');
    ansBtn.addEventListener('click', function () {
      ta.value = q.answer;          // 仅填入答案，不自动运行
      ta.focus();
      ansBtn.textContent = '答案已填入，点「运行」执行 ▶';
      ansBtn.disabled = true;
    });
    $('#qmBlank').addEventListener('click', function () {
      ta.value = ''; ta.focus();
      ansBtn.disabled = false; ansBtn.textContent = '✅ 显示答案';
    });
  }

  /* ===================== 教程 ===================== */
  function renderTutorial() {
    var side = $('#tutSide'), main = $('#tutMain');
    window.SQL_TUTORIAL.forEach(function (sec, idx) {
      var b = document.createElement('button');
      b.textContent = sec.title; b.dataset.idx = idx;
      if (idx === 0) b.classList.add('active');
      b.addEventListener('click', function () { showTut(idx); });
      side.appendChild(b);
    });
    function showTut(idx) {
      var sec = window.SQL_TUTORIAL[idx];
      $$('#tutSide button').forEach(function (b) { b.classList.toggle('active', +b.dataset.idx === idx); });
      var html = '<h3>' + sec.title + '</h3>' + sec.html;
      if (sec.example) {
        html += '<div class="tut-example-head"><b style="font-size:14px">▎可运行示例</b>' +
          '<a class="btn small" href="practice.html?sql=' + encodeURIComponent(sec.example) + '">⚡ 在训练场试一试</a></div>' +
          '<pre><code>' + esc(sec.example) + '</code></pre>';
      }
      if (sec.tip) html += '<div class="tut-tip">💡 ' + esc(sec.tip) + '</div>';
      main.innerHTML = html;
    }
    showTut(0);
  }

  /* ===================== 速查表 ===================== */
  function renderCheatsheet() {
    var grid = $('#cheatGrid');
    grid.innerHTML = '';
    window.SQL_CHEATSHEET.forEach(function (grp) {
      var card = document.createElement('div');
      card.className = 'cheat-card';
      var html = '<h3>' + grp.group + '</h3>';
      grp.items.forEach(function (it) {
        html += '<div class="cheat-row">' +
          '<span class="cheat-syntax">' + esc(it.syntax) + '</span>' +
          '<span class="cheat-desc">' + esc(it.desc) + '</span>' +
          '<button class="copy-btn" data-copy="' + encodeURIComponent(it.syntax) + '">复制</button>' +
          '</div>';
      });
      card.innerHTML = html;
      grid.appendChild(card);
    });
    $$('#cheatGrid .copy-btn').forEach(function (b) {
      b.addEventListener('click', function () { window.Site.copyText(decodeURIComponent(b.dataset.copy), b); });
    });
  }

  /* ===================== 题库 ===================== */
  var qFilterDiff = '全部', qFilterCat = '全部';
  function renderQuestionFilters() {
    var diffs = ['全部', '基础入门', '进阶实战'];
    var cats = ['全部'].concat(Array.from(new Set(window.SQL_QUESTIONS.map(function (q) { return q.category; }))));
    var box = $('#qFilters');
    box.innerHTML = '';
    var dWrap = document.createElement('div'); dWrap.className = 'filter-row';
    dWrap.innerHTML = '<span class="filter-label">难度：</span>';
    diffs.forEach(function (d) {
      var b = document.createElement('button'); b.textContent = d; b.dataset.diff = d;
      if (d === qFilterDiff) b.classList.add('active');
      b.addEventListener('click', function () { qFilterDiff = d; renderQuestionFilters(); renderQuestions(); });
      dWrap.appendChild(b);
    });
    box.appendChild(dWrap);
    var cWrap = document.createElement('div'); cWrap.className = 'filter-row';
    cWrap.innerHTML = '<span class="filter-label">分类：</span>';
    cats.forEach(function (c) {
      var b = document.createElement('button'); b.textContent = c; b.dataset.cat = c;
      if (c === qFilterCat) b.classList.add('active');
      b.addEventListener('click', function () { qFilterCat = c; renderQuestionFilters(); renderQuestions(); });
      cWrap.appendChild(b);
    });
    box.appendChild(cWrap);
  }
  function renderQuestions() {
    var list = $('#qList'), stats = $('#qStats');
    var filtered = window.SQL_QUESTIONS.filter(function (q) {
      return (qFilterDiff === '全部' || q.difficulty === qFilterDiff) &&
             (qFilterCat === '全部' || q.category === qFilterCat);
    });
    stats.textContent = '共 ' + filtered.length + ' 题（总题库 ' + window.SQL_QUESTIONS.length + ' 题）';
    list.innerHTML = '';
    filtered.forEach(function (q) {
      var card = document.createElement('div');
      card.className = 'q-card';
      card.innerHTML =
        '<div class="q-top"><span class="q-no"># ' + q.id + '</span>' +
          '<span class="q-cat">' + esc(q.category) + '</span>' +
          '<span class="badge ' + q.difficulty + '">' + q.difficulty + '</span></div>' +
        '<div class="q-q">' + esc(q.question) + '</div>' +
        '<div class="q-actions">' +
          '<button class="btn small" data-act="toggle">显示提示 / 答案</button>' +
          (q.requiresDB ? '<a class="btn small primary" href="practice.html?q=' + q.id + '">⚡ 在训练场练习</a>' : '') +
        '</div>' +
        '<div class="q-body"><div class="lbl">💡 提示</div><div>' + esc(q.hint) + '</div>' +
          '<div class="lbl">✅ 参考答案</div><pre><code>' + esc(q.answer) + '</code></pre></div>';
      var toggle = card.querySelector('[data-act="toggle"]');
      toggle.addEventListener('click', function () {
        var body = card.querySelector('.q-body');
        body.classList.toggle('open');
        toggle.textContent = body.classList.contains('open') ? '隐藏提示 / 答案' : '显示提示 / 答案';
      });
      list.appendChild(card);
    });
  }

  /* ===================== 启动 ===================== */
  function boot() {
    if (page === 'tutorial') {
      renderTutorial();
    } else if (page === 'cheatsheet') {
      renderCheatsheet();
    } else if (page === 'questions') {
      renderQuestionFilters();
      renderQuestions();
    } else if (page === 'practice') {
      bindPractice();
      var qid = window.Site.getParam('q');
      var sql = window.Site.getParam('sql');
      var ta = $('#sqlInput');
      if (qid) {
        var q = window.SQL_QUESTIONS.filter(function (x) { return String(x.id) === String(qid); })[0];
        if (q) { setupQuestionMode(q); }      // 编辑器留空，先自行思考
        else if (ta) { ta.value = 'SELECT * FROM books LIMIT 10;'; }
      } else if (sql) {
        pendingRun = decodeURIComponent(sql);  // 教程示例：预填并运行
        if (ta) ta.value = pendingRun;
      } else if (ta) {
        ta.value = 'SELECT b.title AS 书名, a.name AS 作者\nFROM books b\nJOIN authors a ON b.author_id = a.author_id\nORDER BY b.price DESC\nLIMIT 10;';
      }
      initEngine();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
