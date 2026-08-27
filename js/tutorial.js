/* ============================================================
 * tutorial.js — SQL 完整教程（结构化内容，基于本站的"网上书店"示例库）
 * 内容改编并扩充自《全套 SQL 教程（W3Schools 顺序 · 中文实战版）》，
 * 全部示例已适配本站数据库（authors 表 + author_id、book_id/category_id 主键）。
 * 每节：id / title / level / html（讲解，支持 HTML）/ example（可运行 SQL）/ tip
 * example 可在「训练场」一键加载运行。
 * ============================================================ */

window.SQL_TUTORIAL = [
  /* ============ 先读：W3Schools 与本站 SQLite 的差异 ============ */
  {
    id: 'note',
    title: '0. 先读：W3Schools 与本站 SQLite 的 5 处差异',
    level: '入门',
    html: `<p>本教程按 <a href="https://www.w3schools.com/sql" target="_blank" rel="noopener">W3Schools SQL</a> 的话题顺序编排，但本站运行环境是 <b>SQLite</b>（通过 sql.js 在浏览器内执行）。W3Schools 以 MySQL / SQL Server 为准，下面这些地方写法不同，<b>以本教程的"SQLite 写法"为准</b>：</p>
    <table class="tut-table">
      <thead><tr><th>W3Schools 写法</th><th>在本站 SQLite 里改成</th></tr></thead>
      <tbody>
        <tr><td><code>SELECT TOP 3 *</code></td><td><code>SELECT * LIMIT 3</code></td></tr>
        <tr><td><code>RIGHT JOIN</code> / <code>FULL JOIN</code></td><td>SQLite 不支持，改用 <code>LEFT JOIN</code>（左右表互换）</td></tr>
        <tr><td><code>SELECT * INTO 新表</code></td><td><code>CREATE TABLE 新表 AS SELECT *</code></td></tr>
        <tr><td><code>ISNULL(x,0)</code></td><td><code>IFNULL(x,0)</code> 或 <code>COALESCE(x,0)</code></td></tr>
        <tr><td><code>IDENTITY(1,1)</code> / <code>AUTO_INCREMENT</code></td><td><code>INTEGER PRIMARY KEY AUTOINCREMENT</code></td></tr>
        <tr><td><code>CREATE DATABASE</code> / <code>DROP DATABASE</code></td><td>SQLite 数据库就是一个文件，直接新建/删除文件即可</td></tr>
      </tbody>
    </table>
    <p>其余绝大多数语法（SELECT、WHERE、JOIN、GROUP BY、INSERT、UPDATE、DELETE、约束、视图、日期函数等）三种数据库通用。</p>
    <p>本站示例库是一家"网上书店"，含 6 张表：<b>categories（分类）、authors（作者）、books（图书）、customers（客户）、orders（订单）、order_items（订单明细）</b>。每节的示例都能在右侧「训练场」直接运行——点示例下方的 <b>⚡ 在训练场试一试</b> 即可。</p>`,
    example: `SELECT name AS 分类 FROM categories;`,
    tip: '建议每一条 SQL 都亲手敲一遍、改改参数看结果变化。想恢复初始数据，点训练场的「↻ 重置数据库」。'
  },

  /* ============ 第一部分：基础查询 ============ */
  {
    id: 'syntax',
    title: '1. SQL 语法（Syntax）',
    level: '入门',
    html: `<p>SQL 不区分大小写，<code>SELECT</code> 和 <code>select</code> 一样；但<b>字符串值必须加单引号</b>，如 <code>'三体'</code>。每条语句通常以分号 <code>;</code> 结尾。</p>
    <p>一条查询最基本的结构：</p>`,
    example: `SELECT title, price
FROM books
WHERE price > 50
LIMIT 5;`,
    tip: '把 列名 / 表名 / 条件 换成真实的即可；表名、列名本站 SQLite 默认不区分大小写，但写规范些总没错。'
  },
  {
    id: 'select',
    title: '2. SELECT 与 FROM：从哪查、查什么',
    level: '入门',
    html: `<ul>
      <li><code>SELECT</code>：指定要返回的列（用 <code>*</code> 表示所有列）</li>
      <li><code>FROM</code>：指定数据来自哪张表</li>
      <li><code>AS</code>：给列或表起别名，让结果更易读</li>
    </ul>
    <p>你也可以在 <code>SELECT</code> 中直接写算术表达式，数据库会为每一行计算。</p>`,
    example: `SELECT title, price, price * 0.9 AS 折扣价
FROM books;

SELECT b.title, a.name AS 作者
FROM books b
JOIN authors a ON b.author_id = a.author_id
LIMIT 10;`,
    tip: '给表起短别名（如 b / a / c）能让多表 SQL 更简洁。'
  },
  {
    id: 'distinct',
    title: '3. SELECT DISTINCT：去重',
    level: '入门',
    html: `<p>当结果中出现重复值时，用 <code>DISTINCT</code> 去除重复行。它作用于 SELECT 后的<b>所有列组合</b>，而不是单独某一列。</p>`,
    example: `SELECT DISTINCT category_id FROM books;

SELECT DISTINCT a.name AS 作者
FROM books b
JOIN authors a ON b.author_id = a.author_id;`,
    tip: '想看「有哪些不同的作者」，用 DISTINCT + JOIN authors 比 DISTINCT author_id 更直观。'
  },
  {
    id: 'where',
    title: '4. WHERE：条件过滤',
    level: '入门',
    html: `<p><code>WHERE</code> 放在 <code>FROM</code> 之后，用来筛选"满足条件的行"。常见比较：<code>=</code> <code>&lt;&gt;</code> <code>&gt;</code> <code>&gt;=</code> <code>&lt;</code> <code>&lt;=</code>。</p>
    <p>文本值用单引号括起来；数字和日期（本站日期为文本 <code>YYYY-MM-DD</code>）直接写。</p>`,
    example: `SELECT title, price FROM books WHERE price > 80;
SELECT title FROM books WHERE category_id = 1;
SELECT title, stock FROM books WHERE stock < 50;`,
    tip: "不等于写作 <> 或 !=；文本比较区分大小写（对中文无影响）。"
  },
  {
    id: 'order',
    title: '5. ORDER BY：排序',
    level: '入门',
    html: `<ul>
      <li><code>ASC</code> 升序（默认，可省略）</li>
      <li><code>DESC</code> 降序</li>
    </ul>
    <p>可按多列排序，每列单独指定方向；NULL 在升序中通常排最前。</p>`,
    example: `SELECT title, price FROM books ORDER BY price DESC;
SELECT title, price, stock FROM books ORDER BY price DESC, stock ASC;
SELECT title, publish_year FROM books ORDER BY publish_year;`,
    tip: '排序常与 LIMIT 配合做"排行榜""前 N 名"。'
  },
  {
    id: 'insert',
    title: '6. INSERT INTO：插入数据',
    level: '入门',
    html: `<p>向表里新增一行。写法是 <code>INSERT INTO 表 (列1, 列2, …) VALUES (值1, 值2, …)</code>。</p>
    <p>⭐ 职业习惯：插入前先用 <code>SELECT</code> 确认没有重复。本站"训练场"执行后数据会改变，想恢复点「↻ 重置数据库」。</p>`,
    example: `CREATE TABLE IF NOT EXISTS tmp_demo (
  id INTEGER PRIMARY KEY,
  title TEXT,
  price REAL
);
INSERT INTO tmp_demo (id, title, price) VALUES (1, '克苏鲁神话', 55.0);
SELECT * FROM tmp_demo;
DROP TABLE tmp_demo;`,
    tip: '练习库随便试，\u201c重置数据库\u201d一键恢复初始状态。'
  },
  {
    id: 'null',
    title: '7. NULL 值：缺失数据怎么处理',
    level: '入门',
    html: `<p><code>NULL</code> 表示"没有值"。<b>不能用 <code>= NULL</code> 判断</b>，必须用 <code>IS NULL</code> / <code>IS NOT NULL</code>。</p>
    <p>本站图书都有库存（stock 不为 NULL），所以单表查 <code>stock IS NULL</code> 会是空。但多表连接时，没匹配上的那一侧就会出现 NULL——这正是"找缺失数据"的利器：</p>`,
    example: `-- 找出从未被购买过的图书（order_items 里没有匹配的明细）
SELECT b.title
FROM books b
LEFT JOIN order_items oi ON b.book_id = oi.book_id
WHERE oi.book_id IS NULL;

-- 单表演示语法（本库暂无 NULL 库存，结果为空是正常的）
SELECT title, stock FROM books WHERE stock IS NULL;`,
    tip: '记牢：判断"是否为空"用 IS NULL；判断"等于某个值"才用 =。'
  },
  {
    id: 'update',
    title: '8. UPDATE：更新数据',
    level: '入门',
    html: `<p>修改已有行：<code>UPDATE 表 SET 列=新值 WHERE 条件</code>。</p>
    <p>⭐ <b>无 WHERE 不动手</b>：先 <code>SELECT</code> 同样的 WHERE 验一遍，确认影响范围，再执行 UPDATE。</p>`,
    example: `CREATE TABLE IF NOT EXISTS tmp_demo (
  id INTEGER PRIMARY KEY,
  price REAL
);
INSERT INTO tmp_demo VALUES (1, 50.0), (2, 60.0);
UPDATE tmp_demo SET price = price * 1.1 WHERE id = 1;
SELECT * FROM tmp_demo;
DROP TABLE tmp_demo;`,
    tip: '不带 WHERE 的 UPDATE 会改掉整张表——练习库可重置，正式库务必谨慎。'
  },
  {
    id: 'delete',
    title: '9. DELETE：删除数据',
    level: '入门',
    html: `<p>删除行：<code>DELETE FROM 表 WHERE 条件</code>。</p>
    <p>⭐ 不带 <code>WHERE</code> 会清空整张表。</p>`,
    example: `CREATE TABLE IF NOT EXISTS tmp_demo (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO tmp_demo VALUES (1, '甲'), (2, '乙');
DELETE FROM tmp_demo WHERE id = 2;
SELECT * FROM tmp_demo;
DROP TABLE tmp_demo;`,
    tip: '删之前先 SELECT 同样的条件确认要删的就是这些行。'
  },
  {
    id: 'limit',
    title: '10. LIMIT / OFFSET：取前 N 行与分页',
    level: '入门',
    html: `<p>W3Schools 用 <code>SELECT TOP 3</code>（SQL Server）或 <code>LIMIT</code>（MySQL）。<b>SQLite 用 <code>LIMIT</code></b>。</p>
    <p>分页写法：<code>LIMIT 每页条数 OFFSET 跳过条数</code>。</p>`,
    example: `SELECT title, price FROM books ORDER BY price DESC LIMIT 3;
SELECT title FROM books ORDER BY book_id LIMIT 5 OFFSET 10;`,
    tip: '不同数据库分页语法不同：SQL Server 用 TOP，MySQL/PostgreSQL/SQLite 用 LIMIT。'
  },
  {
    id: 'operators',
    title: '11. 运算符（Operators）',
    level: '入门',
    html: `<ul>
      <li>算术：<code>+ - * / %</code></li>
      <li>比较：<code>= &lt;&gt; &gt; &lt; &gt;= &lt;=</code></li>
      <li>逻辑：<code>AND OR NOT</code></li>
      <li>字符串拼接：SQLite 用 <code>||</code>（不是 <code>+</code>）</li>
    </ul>`,
    example: `SELECT '书：' || title AS 书名 FROM books LIMIT 5;
SELECT title, price, price + 10 AS 涨价后 FROM books LIMIT 5;`,
    tip: '想拼接字符串用 ||；用 + 在 SQLite 里会做数值相加而非拼接。'
  },

  /* ============ 第二部分：聚合函数 ============ */
  {
    id: 'agg-overview',
    title: '12. 聚合函数总览',
    level: '进阶',
    html: `<p>聚合函数把<b>多行</b>"压缩"成一个汇总值：</p>
    <ul>
      <li><code>COUNT(*)</code> 计数（含 NULL 行）；<code>COUNT(列)</code> 忽略 NULL</li>
      <li><code>SUM(列)</code> 求和</li>
      <li><code>AVG(列)</code> 平均</li>
      <li><code>MIN / MAX</code> 最小 / 最大</li>
    </ul>`,
    example: `SELECT
  COUNT(*) AS 图书总数,
  ROUND(AVG(price), 2) AS 平均价,
  MAX(price) AS 最高价,
  MIN(price) AS 最低价,
  SUM(stock) AS 总库存
FROM books;`,
    tip: '聚合函数不能直接用在 WHERE 里——那是 HAVING 的职责。'
  },
  {
    id: 'count',
    title: '13. COUNT：计数',
    level: '进阶',
    html: `<p><code>COUNT(*)</code> 数行数；<code>COUNT(DISTINCT 列)</code> 数"去重后"的行数。</p>`,
    example: `SELECT COUNT(*) AS 图书总数 FROM books;
SELECT COUNT(DISTINCT author_id) AS 作者数 FROM books;
SELECT COUNT(DISTINCT customer_id) AS 下单客户数 FROM orders;`,
    tip: '统计"不同值的数量"时记得用 COUNT(DISTINCT …)。'
  },
  {
    id: 'sum-avg',
    title: '14. SUM 与 AVG：求和、平均',
    level: '进阶',
    html: `<p><code>SUM</code> 把数值列加起来；<code>AVG</code> 求算术平均。常配合 <code>ROUND(值, n)</code> 控制小数位。</p>`,
    example: `SELECT SUM(quantity) AS 总销售册数 FROM order_items;
SELECT AVG(price) AS 平均价 FROM books;
SELECT ROUND(AVG(stock), 1) AS 平均库存 FROM books;`,
    tip: 'AVG 会自动忽略 NULL 值，计算的是"非 NULL 行的平均"。'
  },
  {
    id: 'min-max',
    title: '15. MIN 与 MAX：最小、最大',
    level: '进阶',
    html: `<p>取某列的最小 / 最大值，也可用于文本（按字典序）和日期（文本 YYYY-MM-DD 也按字典序）。</p>`,
    example: `SELECT MIN(price) AS 最低价 FROM books WHERE category_id = 1;
SELECT MAX(price) AS 最高价 FROM books;
SELECT MIN(order_date) AS 最早订单 FROM orders;`,
    tip: '文本/日期在 SQLite 里也是按字典序比较，所以 MIN/MAX 对它们同样有效。'
  },

  /* ============ 第三部分：字符串、范围与集合条件 ============ */
  {
    id: 'like',
    title: '16. LIKE：模糊匹配',
    level: '入门',
    html: `<p><code>%</code> 匹配任意长度任意字符，<code>_</code> 匹配单个字符。</p>
    <p>SQLite 默认不支持 <code>[字符清单]</code> 通配符，用 <code>IN</code> 替代更稳。</p>`,
    example: `SELECT title FROM books WHERE title LIKE '三体%';
SELECT title FROM books WHERE title LIKE '%简史%';
SELECT title FROM books WHERE title LIKE '七___';  -- 七 + 任意4字`,
    tip: '反义写法：NOT LIKE。想"包含某字"用 %词%。'
  },
  {
    id: 'in',
    title: '17. IN：在列表里',
    level: '入门',
    html: `<p><code>列 IN (值1, 值2, …)</code> 等价于多个 <code>=</code> 用 <code>OR</code> 连接，写法更简洁。</p>`,
    example: `SELECT title FROM books WHERE category_id IN (1, 2);
SELECT title FROM books WHERE author_id IN (1, 2);
SELECT * FROM orders WHERE status IN ('已完成', '已发货');`,
    tip: 'NOT IN 表示"不在列表里"，但列表含 NULL 时行为要小心。'
  },
  {
    id: 'between',
    title: '18. BETWEEN：范围',
    level: '入门',
    html: `<p><code>BETWEEN a AND b</code> 取闭区间，<b>包含</b>两端边界。</p>`,
    example: `SELECT title, price FROM books WHERE price BETWEEN 30 AND 60;
SELECT * FROM orders WHERE order_date BETWEEN '2023-05-01' AND '2023-06-30';`,
    tip: 'BETWEEN 对日期同样有效（本站日期是文本 YYYY-MM-DD，字典序即时间序）。'
  },
  {
    id: 'alias',
    title: '19. Aliases：别名（列与表）',
    level: '入门',
    html: `<p>给列或表起短名，多表连接时尤其好用。表别名写在 <code>FROM 表 别名</code> 后面。</p>`,
    example: `SELECT b.title, c.name AS 分类
FROM books b
JOIN categories c ON b.category_id = c.category_id
LIMIT 5;`,
    tip: 'AS 在列别名上可省略（SELECT price 价格），但表别名不能用 AS。'
  },

  /* ============ 第四部分：多表连接 ============ */
  {
    id: 'join-overview',
    title: '20. JOIN 总览：用外键拼表',
    level: '进阶',
    html: `<p>真实数据分散在多张表，靠"外键"关联。本站 <code>orders.customer_id</code> 指向 <code>customers.customer_id</code>，<code>books.author_id</code> 指向 <code>authors.author_id</code>。</p>
    <ul>
      <li><code>INNER JOIN</code>：只返回两表<b>都匹配</b>的行</li>
      <li><code>LEFT JOIN</code>：保留<b>左表全部</b>，右表无匹配补 NULL</li>
      <li><code>RIGHT JOIN</code>：保留<b>右表全部</b>（SQLite 不支持，用 LEFT JOIN 改写）</li>
    </ul>`,
    example: `SELECT b.title, a.name AS 作者, c.name AS 分类
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN categories c ON b.category_id = c.category_id
LIMIT 5;`,
    tip: '连接条件写在 ON 之后，通常是两张表的外键相等。'
  },
  {
    id: 'inner-join',
    title: '21. INNER JOIN：只保留匹配行',
    level: '进阶',
    html: `<p>最常用的连接。只返回两表都满足 <code>ON</code> 条件的行。</p>`,
    example: `SELECT o.order_id AS 订单号, c.name AS 客户, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
LIMIT 10;`,
    tip: 'INNER 可省略，直接写 JOIN 默认就是 INNER JOIN。'
  },
  {
    id: 'left-join',
    title: '22. LEFT JOIN：左表全保留（含找缺失数据）',
    level: '进阶',
    html: `<p>保留左表全部行，右表无匹配时补 NULL。它是<b>找"缺失数据"</b>的利器：左连接后筛 <code>右表主键 IS NULL</code>。</p>`,
    example: `-- 每位客户的订单数（含从未下单的客户，显示 0）
SELECT c.name, COUNT(o.order_id) AS 订单数
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id;

-- 从未下过单的客户
SELECT c.name FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;`,
    tip: '想找"没买过某类书 / 没下过单的人"，第一反应就是 LEFT JOIN + IS NULL。'
  },
  {
    id: 'right-join',
    title: '23. RIGHT JOIN：SQLite 不支持',
    level: '进阶',
    html: `<p>W3Schools 的 <code>RIGHT JOIN</code> 在 SQLite 里<b>不支持</b>。等价于"把 LEFT JOIN 的两张表顺序反过来"。</p>`,
    example: `-- 别的库想"所有订单 + 客户"用 RIGHT JOIN；SQLite 里改写成：
SELECT o.order_id, c.name
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
LIMIT 10;`,
    tip: '记住一个 LEFT JOIN 就够覆盖绝大多数需求，无需 RIGHT JOIN。'
  },
  {
    id: 'full-join',
    title: '24. FULL OUTER JOIN：SQLite 不支持',
    level: '进阶',
    html: `<p>别的库有 <code>FULL OUTER JOIN</code>（左右表都全保留，匹配不上填 NULL）。SQLite 没有原生支持，需要 <code>LEFT JOIN + UNION + 反向 LEFT JOIN</code> 组合，初学阶段暂时跳过。</p>`,
    example: `-- 仅演示思路（本站暂不要求掌握）：
-- SELECT ... FROM A LEFT JOIN B ...
-- UNION
-- SELECT ... FROM B LEFT JOIN A ...`,
    tip: '面试若被问到，答"SQLite 不支持，可用 LEFT JOIN UNION 反向 LEFT JOIN 模拟"即可。'
  },
  {
    id: 'self-join',
    title: '25. SELF JOIN：自己连自己',
    level: '进阶',
    html: `<p>同一张表当两张用，常用来找"同作者多本书""上下级关系"等。</p>`,
    example: `SELECT a.title AS 书1, b.title AS 书2, a.author_id
FROM books a
JOIN books b ON a.author_id = b.author_id AND a.book_id < b.book_id
LIMIT 10;`,
    tip: '自连接必须给同一张表起两个不同的别名，并用 a.id < b.id 避免重复配对。'
  },
  {
    id: 'union',
    title: '26. UNION / UNION ALL：合并结果集',
    level: '进阶',
    html: `<p>把两个查询的结果上下拼接，要求<b>列数一样</b>、对应列类型兼容。<code>UNION</code> 自动去重，<code>UNION ALL</code> 保留全部（含重复）。</p>`,
    example: `SELECT title FROM books WHERE price < 40
UNION
SELECT title FROM books WHERE author_id = 3
LIMIT 10;

SELECT title FROM books WHERE price < 40
UNION ALL
SELECT title FROM books WHERE author_id = 3
LIMIT 10;`,
    tip: 'UNION ALL 比 UNION 快（不去重）；需要去重时才用 UNION。'
  },

  /* ============ 第五部分：分组与子查询 ============ */
  {
    id: 'group-by',
    title: '27. GROUP BY：分组统计',
    level: '进阶',
    html: `<p><code>GROUP BY 列</code> 把相同值的行归为一组，再对每组做聚合。</p>
    <p>执行顺序：<code>WHERE</code>（分组前过滤行）→ <code>GROUP BY</code> → <code>HAVING</code>（分组后过滤组）。</p>`,
    example: `SELECT category_id, COUNT(*) AS 图书数, ROUND(AVG(price),2) AS 平均价
FROM books
GROUP BY category_id;`,
    tip: 'SELECT 中出现的非聚合列，通常都要出现在 GROUP BY 中。'
  },
  {
    id: 'having',
    title: '28. HAVING：分组后过滤',
    level: '进阶',
    html: `<p><code>WHERE</code> 在分组<b>前</b>过滤行，<code>HAVING</code> 在分组<b>后</b>过滤组；<code>HAVING</code> 可以使用聚合函数，而 <code>WHERE</code> 不行。</p>`,
    example: `SELECT category_id, COUNT(*) AS 图书数
FROM books
GROUP BY category_id
HAVING COUNT(*) > 3;`,
    tip: '想"筛分组结果"（比如只要数量>3的分类），用 HAVING。'
  },
  {
    id: 'exists',
    title: '29. EXISTS：存在性判断',
    level: '高级',
    html: `<p>判断"是否存在满足条件的行"。返回 true/false，常用于关联子查询。</p>`,
    example: `-- 有下过单的客户
SELECT name FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);`,
    tip: 'EXISTS 只要找到一行就返回，不需要取出数据，效率通常比 IN 子查询好。'
  },
  {
    id: 'any-all',
    title: '30. ANY / ALL：SQLite 改用 MAX / MIN',
    level: '高级',
    html: `<p>⚠️ <b>SQLite 不支持</b> <code>> ALL</code> / <code>> ANY</code> 这种比较（会报 <code>near "ALL": syntax error</code>）。改用 <code>MAX</code> / <code>MIN</code> 子查询，效果完全等价。</p>
    <p>记忆：<b>ALL → 比最大值；ANY → 比最小值</b>。</p>`,
    example: `-- 比"计算机类全部"都贵  ≡  price > ALL(...)
SELECT title, price FROM books
WHERE price > (SELECT MAX(price) FROM books WHERE category_id = 1);

-- 比"计算机类任意一本"贵  ≡  price > ANY(...)
SELECT title, price FROM books
WHERE price > (SELECT MIN(price) FROM books WHERE category_id = 1);`,
    tip: 'MySQL / SQL Server 才支持原生 > ALL / > ANY；SQLite 用 MAX/MIN 替代。'
  },
  {
    id: 'select-into',
    title: '31. SELECT INTO → CREATE TABLE AS',
    level: '进阶',
    html: `<p>W3Schools 的 <code>SELECT * INTO 新表 FROM 旧表</code>（SQL Server）在 SQLite 里不支持，改成 <code>CREATE TABLE 新表 AS SELECT …</code>。</p>`,
    example: `CREATE TABLE 计算机书 AS
  SELECT * FROM books WHERE category_id = 1;
SELECT COUNT(*) AS 计算机书数量 FROM 计算机书;
DROP TABLE 计算机书;`,
    tip: '验证完想清掉：DROP TABLE 计算机书;（或直接点「重置数据库」）。'
  },
  {
    id: 'insert-select',
    title: '32. INSERT INTO SELECT：把查询结果插入',
    level: '进阶',
    html: `<p>把一条 SELECT 的结果，整体插入到另一张表里（列数、顺序要对应）。</p>`,
    example: `CREATE TABLE 计算机书 (book_id INTEGER, title TEXT, price REAL);
INSERT INTO 计算机书
  SELECT book_id, title, price FROM books WHERE category_id = 1;
SELECT * FROM 计算机书;
DROP TABLE 计算机书;`,
    tip: '常用于"按条件备份数据"或"物化"一个查询结果。'
  },
  {
    id: 'case',
    title: '33. CASE：条件分支',
    level: '高级',
    html: `<p>像 SQL 里的 if-else，给每行打标签或做分段。结构是 <code>CASE WHEN 条件 THEN 值 ELSE 值 END</code>。</p>`,
    example: `SELECT title, price,
  CASE
    WHEN price > 100 THEN '贵'
    WHEN price > 50  THEN '中'
    ELSE '便宜'
  END AS 价格档位
FROM books;`,
    tip: 'CASE 可出现在 SELECT、ORDER BY、WHERE 等任意表达式位置。'
  },
  {
    id: 'null-func',
    title: '34. NULL 函数：IFNULL / COALESCE',
    level: '进阶',
    html: `<p>别的库用 <code>ISNULL(x,0)</code>，SQLite 用 <code>IFNULL(x,默认)</code> 或 <code>COALESCE(a,b,c…)</code>（返回第一个非 NULL 值）。</p>`,
    example: `-- 把 NULL 换成默认值
SELECT b.title, IFNULL(oi.quantity, 0) AS 购买量
FROM books b
LEFT JOIN order_items oi ON b.book_id = oi.book_id
LIMIT 10;

SELECT COALESCE(NULL, NULL, '默认值') AS 结果;`,
    tip: 'COALESCE 可接多个参数，取"第一个不是 NULL 的"；IFNULL 只接两个。'
  },
  {
    id: 'comments',
    title: '35. 注释（Comments）',
    level: '入门',
    html: `<p>单行用 <code>--</code>，多行用 <code>/* … */</code>。</p>`,
    example: `-- 这是单行注释
SELECT * FROM books;   -- 行尾也能写注释
/* 这是
   多行注释 */`,
    tip: '写复杂 SQL 时加注释，过两周你自己都看得懂。'
  },

  /* ============ 第六部分：DDL（表结构） ============ */
  {
    id: 'create-db',
    title: '36. CREATE / DROP DATABASE',
    level: '进阶',
    html: `<p>SQLite <b>没有</b>这两条命令——数据库就是一个文件。新建库 = 新建文件；删库 = 删文件。本站把整个库打包在网页里，无需这一步。</p>`,
    example: `-- SQLite 中无需执行；数据库即文件
SELECT 'SQLite 数据库就是一个文件' AS 提示;`,
    tip: 'MySQL/SQL Server 才有 CREATE/DROP DATABASE；迁移到那些库时再学。'
  },
  {
    id: 'create-table',
    title: '37. CREATE TABLE：建表',
    level: '进阶',
    html: `<p>定义一张表的列与类型。常见类型：<code>INTEGER</code>、<code>TEXT</code>、<code>REAL</code>（浮点）、<code>BLOB</code>。</p>`,
    example: `CREATE TABLE IF NOT EXISTS 测试表 (
    id   INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age  INTEGER
);
SELECT * FROM 测试表 LIMIT 1;
DROP TABLE 测试表;`,
    tip: 'PRIMARY KEY 唯一标识一行；NOT NULL 表示该列必须有值。'
  },
  {
    id: 'drop-table',
    title: '38. DROP TABLE：删表',
    level: '进阶',
    html: `<p>整张表（结构与数据）一起删除，不可恢复。</p>`,
    example: `CREATE TABLE IF NOT EXISTS 测试表 (id INTEGER);
DROP TABLE 测试表;`,
    tip: '生产环境删表前三思；本站练习可随时「重置数据库」恢复。'
  },
  {
    id: 'alter-table',
    title: '39. ALTER TABLE：改表',
    level: '进阶',
    html: `<p>SQLite 支持加列、改表名；<b>不支持</b>直接改列类型（需重建表）。</p>`,
    example: `CREATE TABLE IF NOT EXISTS 测试表 (id INTEGER PRIMARY KEY, name TEXT);
ALTER TABLE 测试表 ADD COLUMN email TEXT;
ALTER TABLE 测试表 RENAME TO 员工表;
DROP TABLE 员工表;`,
    tip: '改列类型在 SQLite 里要做"建新表→导数据→删旧表→重命名"，初学不用纠结。'
  },
  {
    id: 'constraints',
    title: '40. 约束（Constraints）总览',
    level: '进阶',
    html: `<p>约束保证数据质量，写在建表语句里。本站示例库已用上：<code>PRIMARY KEY</code>（主键）、<code>FOREIGN KEY</code>（外键）。</p>
    <ul>
      <li><code>NOT NULL</code>：必须有值</li>
      <li><code>UNIQUE</code>：值唯一</li>
      <li><code>PRIMARY KEY</code>：主键（唯一 + 非空）</li>
      <li><code>FOREIGN KEY</code>：外键，引用别的表</li>
      <li><code>CHECK</code>：满足某条件</li>
      <li><code>DEFAULT</code>：默认值</li>
    </ul>`,
    example: `CREATE TABLE IF NOT EXISTS 示例约束 (
    id    INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    age   INTEGER CHECK (age >= 0),
    city  TEXT DEFAULT '未知'
);
DROP TABLE 示例约束;`,
    tip: '约束在数据写入时自动校验，能挡掉大量脏数据。'
  },
  {
    id: 'fk',
    title: '41. FOREIGN KEY：外键',
    level: '进阶',
    html: `<p>指向另一张表的主键，保证引用合法。本站 <code>orders.customer_id</code> 就引用 <code>customers.customer_id</code>。</p>
    <p>⚠️ SQLite 默认<b>不强制</b>检查外键，需先 <code>PRAGMA foreign_keys = ON;</code> 才会真正拦截非法引用。练习阶段了解即可。</p>`,
    example: `PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS orders_demo (
    id         INTEGER PRIMARY KEY,
    customer_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
DROP TABLE orders_demo;`,
    tip: '外键让"订单引用了不存在的客户"这种错误在数据库层就被拦下。'
  },
  {
    id: 'index',
    title: '42. CREATE / DROP INDEX：索引',
    level: '高级',
    html: `<p>为列建立有序结构，加速按该列查询；代价是插入变慢、占空间。</p>`,
    example: `CREATE INDEX IF NOT EXISTS idx_books_price ON books(price);
SELECT * FROM books WHERE price > 100;
DROP INDEX IF EXISTS idx_books_price;`,
    tip: '索引不是越多越好：写多读少的表要克制；优先建在高频过滤、区分度高的列上。'
  },
  {
    id: 'autoinc',
    title: '43. AUTO INCREMENT：SQLite 写法',
    level: '进阶',
    html: `<p>让主键自动递增值。SQLite 用 <code>INTEGER PRIMARY KEY AUTOINCREMENT</code>。</p>`,
    example: `CREATE TABLE IF NOT EXISTS 日志 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    msg TEXT
);
INSERT INTO 日志 (msg) VALUES ('hello'), ('world');
SELECT * FROM 日志;
DROP TABLE 日志;`,
    tip: '普通 INTEGER PRIMARY KEY 也会自动分配行号，但 AUTOINCREMENT 保证不重用已删除的编号。'
  },

  /* ============ 第七部分：日期、视图、安全 ============ */
  {
    id: 'dates',
    title: '44. 日期（Dates）',
    level: '高级',
    html: `<p>SQLite 没有专门的日期类型，日期通常存成文本 <code>'YYYY-MM-DD'</code>。内置函数：<code>date()</code>、<code>strftime()</code>。</p>`,
    example: `SELECT order_date, strftime('%Y', order_date) AS 年份, strftime('%m', order_date) AS 月份
FROM orders
LIMIT 5;

SELECT * FROM orders WHERE order_date >= '2024-01-01';`,
    tip: "strftime('%Y-%m', x) 可按月分组；date('now') 取当前日期。"
  },
  {
    id: 'views',
    title: '45. 视图（Views）',
    level: '高级',
    html: `<p>视图是"存起来的查询"，像一个虚拟表，方便复用。建好后像查普通表一样用。</p>`,
    example: `CREATE VIEW IF NOT EXISTS 贵书 AS
  SELECT title, price FROM books WHERE price > 80;

SELECT * FROM 贵书 ORDER BY price DESC;
DROP VIEW IF EXISTS 贵书;`,
    tip: '视图不存数据，只存查询定义；底层表变了，视图结果随之变。'
  },
  {
    id: 'sqli',
    title: '46. SQL 注入与参数化查询',
    level: '高级',
    html: `<p><b>概念</b>：把用户输入直接拼进 SQL 字符串很危险（输入 <code>' OR '1'='1</code> 可能绕过条件）。<b>正确做法是用参数（占位符）</b>，让数据库把输入当纯数据。</p>
    <p>下面是在程序里（如 Python）连接数据库时的正确写法示例：</p>`,
    example: `-- 在网页里手写 SQL 没问题（数据是你自己的）。
-- 但写程序连数据库时，务必用参数化查询，例如 Python + SQLite：
--
-- name = input("输入作者名：")
-- cur = conn.execute("SELECT * FROM books WHERE author_id = ?", (aid,))
--
-- 永远用 ? 占位，绝不用字符串拼接用户输入`,
    tip: '练习阶段在训练场手写 SQL 是安全的；但以后写应用务必参数化，防 SQL 注入。'
  },
  {
    id: 'proc',
    title: '47. 存储过程（Stored Procedures）',
    level: '高级',
    html: `<p>SQLite <b>不支持</b>存储过程。MySQL / SQL Server 才有。初学阶段先不管它——业务逻辑写在你的程序代码里即可。</p>`,
    example: `SELECT 'SQLite 不支持存储过程，逻辑写在程序代码中' AS 提示;`,
    tip: '想做后端再学 MySQL/PostgreSQL 时自然会接触。'
  },

  /* ============ 第八部分：进阶实战专题 ============ */
  {
    id: 'subquery',
    title: '48. 子查询：嵌套 SELECT',
    level: '高级',
    html: `<p>把一个 SELECT 嵌套进另一个查询里。常见用法：</p>
    <ul>
      <li><b>标量子查询</b>：返回单个值，用于 <code>WHERE 列 = (SELECT …)</code></li>
      <li><b>集合子查询</b>：返回一列值，用于 <code>WHERE 列 IN (SELECT …)</code></li>
      <li><b>EXISTS</b>：判断是否存在匹配行</li>
      <li><b>派生表</b>：把子查询结果当临时表放在 FROM 里</li>
      <li><b>相关子查询</b>：子查询引用外层列，逐行计算</li>
    </ul>`,
    example: `SELECT title, price FROM books
WHERE price > (SELECT AVG(price) FROM books);

SELECT title, price, category_id FROM books b1
WHERE price > (
  SELECT AVG(price) FROM books b2
  WHERE b2.category_id = b1.category_id
);`,
    tip: '子查询可读性强，但大数据量时性能可能不如 JOIN，实际中要多测试。'
  },
  {
    id: 'window',
    title: '49. 窗口函数（Window Functions）',
    level: '高级',
    html: `<p>窗口函数在不"折叠"行的前提下，对一组相关行做计算（区别于 GROUP BY 会压缩行）。语法：<code>函数() OVER (PARTITION BY 分组 ORDER BY 排序)</code>。</p>
    <ul>
      <li><code>ROW_NUMBER()</code>：连续序号，不并列</li>
      <li><code>RANK()</code>：并列跳号</li>
      <li><code>DENSE_RANK()</code>：并列不跳号</li>
      <li><code>SUM() OVER (...)</code>：分组内累计 / 滑动聚合</li>
      <li><code>LAG() / LEAD()</code>：取上一行 / 下一行的值</li>
      <li><code>NTILE(n)</code>：把有序行均分为 n 组</li>
    </ul>`,
    example: `SELECT title, price,
       RANK() OVER (ORDER BY price DESC) AS 价格排名
FROM books;

SELECT title, category_id, price,
       RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS 分类内排名
FROM books;

SELECT book_id, stock,
       SUM(stock) OVER (ORDER BY book_id) AS 累计库存
FROM books;`,
    tip: '窗口函数是现代 SQL 面试高频考点，常用于"分组取 Top N""同比环比"。'
  },
  {
    id: 'cte',
    title: '50. CTE（WITH 子句）：公用表表达式',
    level: '高级',
    html: `<p>用 <code>WITH 名字 AS (子查询)</code> 给一段查询起个临时名字，后面可像表一样引用，常让复杂查询更清晰。也常用于"先算中间结果，再筛选"。</p>`,
    example: `WITH 销量 AS (
  SELECT book_id, SUM(quantity) AS 总销量
  FROM order_items
  GROUP BY book_id
)
SELECT b.title, 销量.总销量
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
ORDER BY 销量.总销量 DESC
LIMIT 5;`,
    tip: 'CTE 可读性好，还能"自引用"做递归（如组织架构树），进阶再学。'
  },
  {
    id: 'func-ref',
    title: '51. 常用函数速查（SQLite 版）',
    level: '入门',
    html: `<p>本站"速查表"有完整列表，这里给出最常用的：</p>
    <table class="tut-table">
      <thead><tr><th>类别</th><th>函数</th><th>作用 / 例子</th></tr></thead>
      <tbody>
        <tr><td>字符串</td><td><code>||</code></td><td>拼接 <code>'A' || 'B'</code> → AB</td></tr>
        <tr><td>字符串</td><td><code>LENGTH(x)</code></td><td>长度 <code>LENGTH('三体')</code> → 2</td></tr>
        <tr><td>字符串</td><td><code>UPPER/LOWER(x)</code></td><td>大小写</td></tr>
        <tr><td>字符串</td><td><code>SUBSTR(x,a,b)</code></td><td>截取 <code>SUBSTR('三体II',1,2)</code> → 三体</td></tr>
        <tr><td>字符串</td><td><code>REPLACE(x,a,b)</code></td><td>替换</td></tr>
        <tr><td>数值</td><td><code>ROUND(x,n)</code></td><td>四舍五入 <code>ROUND(3.14159,2)</code> → 3.14</td></tr>
        <tr><td>数值</td><td><code>ABS(x)</code></td><td>绝对值</td></tr>
        <tr><td>日期</td><td><code>date(x)</code></td><td>日期 <code>date('now')</code></td></tr>
        <tr><td>日期</td><td><code>strftime(fmt,x)</code></td><td>格式化 <code>strftime('%Y-%m', x)</code></td></tr>
        <tr><td>空值</td><td><code>IFNULL(x,d)</code></td><td>NULL 替换 <code>IFNULL(NULL,0)</code> → 0</td></tr>
        <tr><td>空值</td><td><code>COALESCE(a,b,c)</code></td><td>取第一个非空</td></tr>
      </tbody>
    </table>`,
    example: `SELECT title, LENGTH(title) AS 书名长度,
       UPPER(SUBSTR(title,1,1)) AS 首字母大写
FROM books LIMIT 5;`,
    tip: '函数点多，用到再查"速查表"即可，不用死记。'
  },
  {
    id: 'next',
    title: '52. 下一步怎么学',
    level: '入门',
    html: `<p>按这个顺序练，效果最好：</p>
    <ol>
      <li><b>按顺序敲一遍</b>：从话题 1 到 51，每条示例在「训练场」亲手跑。</li>
      <li><b>做练习</b>：先自己写「题库」里的题，再点开参考答案比对。</li>
      <li><b>学完这套后</b>：
        <ul>
          <li>想做数据分析 → 精通窗口函数、CTE、日期函数</li>
          <li>想做后端 → 装 MySQL/PostgreSQL，学索引优化、范式设计、ORM</li>
          <li>想准备面试 → 重点刷 JOIN、GROUP BY + HAVING、子查询手写题</li>
        </ul>
      </li>
    </ol>
    <p>唯一心法：<b>每一条 SQL 都亲手敲，改改参数看结果变不变。</b> 查不出来就 <code>SELECT *</code> 拆小逐步排查。</p>`,
    example: `SELECT '开始动手吧！' AS 行动;`,
    tip: '练得越多，SQL 越像说话一样自然。'
  }
];
