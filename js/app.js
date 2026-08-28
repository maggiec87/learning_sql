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
  var DB = null, SQL = null, pendingRun = null, currentQid = null;

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
    // 题目模式下，每次运行都计入练习次数
    function doRun() {
      if (currentQid) {
        var n = window.Site.bumpPractice(currentQid);
        var badge = $('#qmCount');
        if (badge) badge.textContent = '📈 已练习 ' + n + ' 次';
      }
      runQuery($('#sqlInput').value);
    }
    $('#runBtn').addEventListener('click', doRun);
    $('#clearBtn').addEventListener('click', function () { $('#sqlInput').value = ''; $('#sqlInput').focus(); });
    $('#resetBtn').addEventListener('click', function () {
      rebuildDB();
      $('#resultArea').innerHTML = '<div class="ok-box">🔄 数据库已重置为初始示例数据。</div>';
      var m = $('#resultMeta'); if (m) m.textContent = '';
    });
    $$('.editor-quick .chip').forEach(function (c) {
      c.addEventListener('click', function () { var ta = $('#sqlInput'); ta.value = c.dataset.q; doRun(); });
    });
    var ta = $('#sqlInput');
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); doRun(); }
    });
    // 快捷键 Alt+R：题目模式下返回题库并定位该题
    document.addEventListener('keydown', function (e) {
      if (e.altKey && (e.key === 'r' || e.key === 'R') && currentQid) {
        e.preventDefault();
        location.href = 'questions.html#q-' + currentQid;
      }
    });
  }

  // 题库 → 训练场：保留题目，编辑器留空，先自行思考
  function setupQuestionMode(q) {
    var panel = $('#questionPanel');
    panel.hidden = false;
    var cnt = window.Site.getPracticeCount(q.id);
    panel.innerHTML =
      '<div class="qm-head">' +
        '<span class="qm-no"># ' + q.id + '</span>' +
        '<span class="q-cat">' + esc(q.category) + '</span>' +
        '<span class="badge ' + q.difficulty + '">' + q.difficulty + '</span>' +
      '</div>' +
      '<div class="qm-q">' + esc(q.question) + '</div>' +
      '<div class="qm-count" id="qmCount">📈 已练习 ' + cnt + ' 次</div>' +
      '<div class="qm-actions">' +
        '<button class="btn small" id="qmHint">💡 显示提示</button>' +
        '<button class="btn small primary" id="qmAnswer">✅ 显示答案</button>' +
        '<button class="btn small" id="qmBlank">↺ 清空编辑器</button>' +
        '<a class="btn small" href="notes.html?ctx=' + encodeURIComponent('题目 #' + q.id + '：' + q.question) + '">📝 记笔记</a>' +
        '<a class="btn small back" href="questions.html#q-' + q.id + '" title="快捷键：Alt+R">⤴ 返回题库</a>' +
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
  // 8 大组成部分分组（id 顺序与 tutorial.js 一致）
  var TUT_PARTS = [
    { name: '① 入门基础', ids: ['note','syntax','select','distinct','where','order','insert','null','update','delete','limit','operators'] },
    { name: '② 聚合函数', ids: ['agg-overview','count','sum-avg','min-max'] },
    { name: '③ 过滤与匹配', ids: ['like','in','between','alias'] },
    { name: '④ 多表连接', ids: ['join-overview','inner-join','left-join','right-join','full-join','self-join','union'] },
    { name: '⑤ 分组与条件', ids: ['group-by','having','exists','any-all','select-into','insert-select','case','null-func','comments'] },
    { name: '⑥ 表结构与约束', ids: ['create-db','create-table','drop-table','alter-table','constraints','fk','index','autoinc'] },
    { name: '⑦ 日期 · 视图 · 安全', ids: ['dates','views','sqli','proc'] },
    { name: '⑧ 进阶专题', ids: ['subquery','window','cte','func-ref','next'] }
  ];
  function renderTutorial() {
    var side = $('#tutSide'), main = $('#tutMain');
    var list = window.SQL_TUTORIAL;
    var idxMap = {};
    list.forEach(function (s, i) { idxMap[s.id] = i; });

    // ---- 目录（左侧固定 / 移动端抽屉）----
    side.innerHTML = '';
    var dh = document.createElement('div');
    dh.className = 'tut-drawer-head';
    dh.innerHTML = '<span class="tdh-title">📑 目录</span><button class="tdh-close" id="tocClose" aria-label="关闭目录">✕</button>';
    side.appendChild(dh);
    var dhClose = document.getElementById('tocClose');
    if (dhClose) dhClose.addEventListener('click', function () { side.classList.remove('open'); });
    TUT_PARTS.forEach(function (part) {
      var ph = document.createElement('div');
      ph.className = 'tut-part';
      ph.textContent = part.name;
      side.appendChild(ph);
      part.ids.forEach(function (id) {
        var i = idxMap[id];
        if (i === undefined) return;
        var b = document.createElement('button');
        b.textContent = list[i].title;
        b.dataset.idx = i;
        b.className = 'tut-toc-btn';
        b.addEventListener('click', function () {
          var sec = document.getElementById('sec-' + i);
          if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth <= 760) side.classList.remove('open');
          if (history.replaceState) history.replaceState(null, '', '#sec-' + i);
        });
        side.appendChild(b);
      });
    });

    // ---- 整篇连续内容 ----
    var html = '';
    list.forEach(function (sec, i) {
      var prev = i > 0 ? list[i - 1] : null;
      var next = i < list.length - 1 ? list[i + 1] : null;
      html += '<section class="tut-sec" id="sec-' + i + '">';
      html += '<h3>' + esc(sec.title) + '</h3>' + sec.html;
      if (sec.example) {
        html += '<div class="tut-example-head"><b style="font-size:14px">▎可运行示例</b>' +
          '<a class="btn small" href="practice.html?sql=' + encodeURIComponent(sec.example) + '">⚡ 在训练场试一试</a></div>' +
          '<pre><code>' + esc(sec.example) + '</code></pre>';
      }
      if (sec.tip) html += '<div class="tut-tip">💡 ' + esc(sec.tip) + '</div>';
      html += '<div class="tut-note"><a class="btn small" href="notes.html?ctx=' +
        encodeURIComponent('教程 · ' + sec.title) + '">📝 记笔记（关联本节）</a></div>';
      html += '<div class="tut-nav">';
      if (prev) html += '<a class="btn small" href="#sec-' + (i - 1) + '" data-go="' + (i - 1) + '">← ' + esc(prev.title) + '</a>';
      else html += '<span></span>';
      if (next) html += '<a class="btn small" href="#sec-' + (i + 1) + '" data-go="' + (i + 1) + '">' + esc(next.title) + ' →</a>';
      else html += '<a class="btn small" href="questions.html">🧩 去题库练习 →</a>';
      html += '</div>';
      html += '</section>';
    });
    main.innerHTML = html;

    // 上一节 / 下一节按钮：平滑滚动
    $$('#tutMain .tut-nav a[data-go]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var sec = document.getElementById('sec-' + a.dataset.go);
        if (sec) {
          sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (history.replaceState) history.replaceState(null, '', '#sec-' + a.dataset.go);
        }
      });
    });

    // 滚动时高亮当前章节（scrollspy）
    var tocBtns = $$('#tutSide .tut-toc-btn');
    function setActive(idx) { tocBtns.forEach(function (b) { b.classList.toggle('active', +b.dataset.idx === idx); }); }
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setActive(+en.target.id.slice(4)); });
      }, { rootMargin: '-70px 0px -60% 0px', threshold: 0 });
      $$('#tutMain .tut-sec').forEach(function (s) { obs.observe(s); });
    }

    // 深链定位
    var startIdx = 0;
    if (location.hash.indexOf('#sec-') === 0) {
      var h = parseInt(location.hash.slice(5), 10);
      if (!isNaN(h) && list[h]) startIdx = h;
    }
    if (startIdx > 0) { var t = document.getElementById('sec-' + startIdx); if (t) t.scrollIntoView(); }
    setActive(startIdx);

    var tog = $('#tocToggle');
    if (tog) tog.addEventListener('click', function () { side.classList.toggle('open'); });
  }

  /* ===================== 速查表 ===================== */
  var csFilter = '全部';
  function renderCheatsheet() {
    var grid = $('#cheatGrid');
    var box = $('#cheatFilters');
    var g = window.Site.getParam('g');
    if (g) csFilter = g;
    // 顶部分类筛选（题库式）
    if (box) {
      var cats = ['全部'].concat(window.SQL_CHEATSHEET.map(function (grp) { return grp.group; }));
      box.innerHTML = '';
      var row = document.createElement('div'); row.className = 'filter-row';
      row.innerHTML = '<span class="filter-label">分类：</span>';
      cats.forEach(function (c) {
        var b = document.createElement('button'); b.textContent = c; b.dataset.cat = c;
        if (c === csFilter) b.classList.add('active');
        b.addEventListener('click', function () { csFilter = c; renderCheatsheet(); });
        row.appendChild(b);
      });
      box.appendChild(row);
    }

    grid.innerHTML = '';
    window.SQL_CHEATSHEET.forEach(function (grp) {
      if (csFilter !== '全部' && grp.group !== csFilter) return;
      grp.items.forEach(function (it) {
        var card = document.createElement('div');
        card.className = 'cheat-card';
        card.innerHTML =
          '<div class="cheat-card-head"><span class="cheat-group">' + esc(grp.group) + '</span></div>' +
          '<pre class="cheat-syntax">' + esc(it.syntax) + '</pre>' +
          '<div class="cheat-meta">' +
            '<span class="cheat-desc">' + esc(it.desc) + '</span>' +
            '<span class="cheat-links">' +
              '<a class="cheat-note" href="notes.html?ctx=' + encodeURIComponent('速查 · ' + grp.group + '：' + it.syntax) + '">📝</a>' +
              '<button class="copy-btn" data-copy="' + encodeURIComponent(it.syntax) + '">复制</button>' +
            '</span>' +
          '</div>';
        grid.appendChild(card);
      });
    });
    if (!grid.children.length) {
      grid.innerHTML = '<div class="search-empty">该分类下暂无内容。</div>';
    }
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
    var total = window.Site.getTotalPractice();
    stats.textContent = '共 ' + filtered.length + ' 题（总题库 ' + window.SQL_QUESTIONS.length + ' 题）' +
      (total ? ' · 累计练习 ' + total + ' 次' : '');
    list.innerHTML = '';
    filtered.forEach(function (q) {
      var card = document.createElement('div');
      card.className = 'q-card';
      card.id = 'q-card-' + q.id;
      var cnt = window.Site.getPracticeCount(q.id);
      card.innerHTML =
        '<div class="q-top"><span class="q-no"># ' + q.id + '</span>' +
          '<span class="q-cat">' + esc(q.category) + '</span>' +
          (cnt > 0 ? '<span class="q-prac">已练 ' + cnt + ' 次</span>' : '') +
          '<span class="badge ' + q.difficulty + '">' + q.difficulty + '</span></div>' +
        '<div class="q-q">' + esc(q.question) + '</div>' +
        '<div class="q-actions">' +
          '<button class="btn small" data-act="toggle">显示提示 / 答案</button>' +
          (q.requiresDB ? '<a class="btn small primary" href="practice.html?q=' + q.id + '">⚡ 在训练场练习</a>' : '') +
          '<a class="btn small" href="notes.html?ctx=' + encodeURIComponent('题目 #' + q.id + '：' + q.question) + '">📝 记笔记</a>' +
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

  /* ===================== 笔记 ===================== */
  function renderNotes() {
    var listEl = $('#noteList');
    var titleEl = $('#noteTitle');
    var ctxEl = $('#noteCtx');
    var contentEl = $('#noteContent');
    var saveBtn = $('#noteSave');
    var newBtn = $('#noteNew');
    var filterEl = $('#noteFilter');
    var countEl = $('#noteCount');
    var exportBtn = $('#noteExport');
    var clearBtn = $('#noteClear');
    var editingId = null;

    function load() { return window.Site.storeGet(window.Site.NOTES_KEY, []); }
    function save(arr) { window.Site.storeSet(window.Site.NOTES_KEY, arr); }
    function fmt(ts) {
      var d = new Date(ts);
      var p = function (n) { return (n < 10 ? '0' : '') + n; };
      return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }

    function resetComposer() {
      editingId = null; titleEl.value = ''; ctxEl.value = ''; contentEl.value = '';
      saveBtn.textContent = '💾 保存笔记'; newBtn.style.display = 'none';
    }

    function renderList() {
      var notes = load();
      var kw = (filterEl.value || '').trim().toLowerCase();
      var view = notes.filter(function (n) {
        if (!kw) return true;
        return (n.title + ' ' + n.content + ' ' + (n.ctx || '')).toLowerCase().indexOf(kw) >= 0;
      });
      countEl.textContent = '共 ' + notes.length + ' 条' + (kw ? '（匹配 ' + view.length + ' 条）' : '');
      if (!view.length) {
        listEl.innerHTML = '<div class="search-empty">' + (notes.length ? '没有匹配的笔记。' : '还没有笔记，写下第一条吧 👇') + '</div>';
        return;
      }
      listEl.innerHTML = '';
      view.forEach(function (n) {
        var card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML =
          '<div class="note-head"><span class="note-title">' + esc(n.title) + '</span>' +
            '<span class="note-time">' + fmt(n.updated) + '</span></div>' +
          (n.ctx ? '<div class="note-ctx">🔗 ' + esc(n.ctx) + '</div>' : '') +
          '<div class="note-content">' + esc(n.content) + '</div>' +
          '<div class="note-actions">' +
            '<button class="btn small" data-act="edit" data-id="' + n.id + '">✏️ 编辑</button>' +
            '<button class="btn small" data-act="del" data-id="' + n.id + '">🗑️ 删除</button>' +
          '</div>';
        listEl.appendChild(card);
      });
    }

    // 从其他页面带 ?ctx= 进来，预填关联上下文
    var ctx = window.Site.getParam('ctx');
    if (ctx) { ctxEl.value = ctx; setTimeout(function () { contentEl.focus(); }, 60); }

    saveBtn.addEventListener('click', function () {
      var title = titleEl.value.trim();
      var content = contentEl.value.trim();
      if (!title && !content) { contentEl.focus(); return; }
      var notes = load();
      var now = Date.now();
      if (editingId) {
        var t = notes.filter(function (x) { return x.id === editingId; })[0];
        if (t) { t.title = title || '未命名笔记'; t.content = content; t.ctx = ctxEl.value.trim(); t.updated = now; }
      } else {
        notes.unshift({ id: 'n' + now + '_' + Math.floor(Math.random() * 1000), title: title || '未命名笔记', content: content, ctx: ctxEl.value.trim(), updated: now });
      }
      save(notes); resetComposer(); renderList();
    });
    newBtn.addEventListener('click', resetComposer);
    filterEl.addEventListener('input', renderList);
    clearBtn.addEventListener('click', function () {
      if (!load().length) return;
      if (confirm('确定要清空全部笔记吗？此操作不可恢复。')) { save([]); resetComposer(); renderList(); }
    });
    exportBtn.addEventListener('click', function () {
      var notes = load();
      var blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'sql-notes-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    });
    listEl.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-act]');
      if (!btn) return;
      var id = btn.dataset.id;
      var notes = load();
      if (btn.dataset.act === 'del') {
        if (confirm('删除这条笔记？')) { save(notes.filter(function (x) { return x.id !== id; })); renderList(); }
      } else if (btn.dataset.act === 'edit') {
        var t = notes.filter(function (x) { return x.id === id; })[0];
        if (t) {
          editingId = id; titleEl.value = t.title; ctxEl.value = t.ctx || ''; contentEl.value = t.content;
          saveBtn.textContent = '💾 更新笔记'; newBtn.style.display = '';
          titleEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); contentEl.focus();
        }
      }
    });
    renderList();
  }

  /* ===================== 启动 ===================== */
  function boot() {
    if (page === 'notes') {
      renderNotes();
    } else if (page === 'tutorial') {
      renderTutorial();
    } else if (page === 'cheatsheet') {
      renderCheatsheet();
    } else if (page === 'questions') {
      // 从搜索/深链进来时，先重置筛选再打开对应题目
      if (location.hash.indexOf('#q-') === 0) {
        qFilterDiff = '全部'; qFilterCat = '全部';
        renderQuestionFilters();
        renderQuestions();
        var qid = location.hash.slice(3);
        var card = document.getElementById('q-card-' + qid);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          var tog = card.querySelector('[data-act="toggle"]');
          if (tog) tog.click();
        }
      } else {
        renderQuestionFilters();
        renderQuestions();
      }
    } else if (page === 'practice') {
      bindPractice();
      var qid = window.Site.getParam('q');
      var sql = window.Site.getParam('sql');
      var ta = $('#sqlInput');
      if (qid) {
        var q = window.SQL_QUESTIONS.filter(function (x) { return String(x.id) === String(qid); })[0];
        if (q) { currentQid = String(q.id); setupQuestionMode(q); }      // 编辑器留空，先自行思考
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
