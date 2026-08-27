/* ============================================================
 * tutorial.js — SQL 完整教程（结构化内容）
 * 每节：title / level / html（讲解，支持 HTML）/ example（可运行 SQL）/ tip
 * example 可在「训练场」一键加载运行。
 * ============================================================ */

window.SQL_TUTORIAL = [
  {
    id: 'intro',
    title: '1. SQL 是什么',
    level: '入门',
    html: `<p><b>SQL（Structured Query Language，结构化查询语言）</b>是用来与关系型数据库"对话"的标准语言。无论你是查询、新增、修改还是删除数据，几乎都靠它。</p>
    <p>常见的关系型数据库：<b>MySQL、PostgreSQL、SQLite、SQL Server、Oracle</b>。它们的核心 SQL 语法高度一致，本教程以 <b>SQLite</b> 为运行环境（内置在网页中，无需安装），你写的每一条语句都能立即运行看结果。</p>
    <p>SQL 语句通常以分号 <code>;</code> 结尾，关键字不区分大小写（习惯大写），但表名/列名通常区分。</p>
    <ul>
      <li><b>DQL</b>：数据查询（SELECT）—— 用得最多</li>
      <li><b>DML</b>：数据操作（INSERT / UPDATE / DELETE）</li>
      <li><b>DDL</b>：数据定义（CREATE / ALTER / DROP）</li>
      <li><b>DCL</b>：权限控制（GRANT / REVOKE）</li>
    </ul>
    <p>本教程聚焦最常用的 <b>查询（SELECT）</b>，配合本站的"训练场"边学边练。</p>`,
    example: '',
    tip: '提示：本站示例数据库是一家"网上书店"，包含 图书 / 作者 / 分类 / 客户 / 订单 / 订单明细 六张表，后面的示例都基于它。'
  },
  {
    id: 'select',
    title: '2. SELECT 与 FROM：从哪查、查什么',
    level: '入门',
    html: `<p>最基础的查询由两部分组成：</p>
    <ul>
      <li><code>SELECT</code>：指定要返回的列（用 <code>*</code> 表示所有列）</li>
      <li><code>FROM</code>：指定数据来自哪张表</li>
    </ul>
    <p>你也可以在 <code>SELECT</code> 中直接写算术表达式，数据库会为每一行计算。</p>`,
    example: `SELECT title, price, price * 0.9 AS 折扣价
FROM books;`,
    tip: 'AS 用来给列起别名，让结果更易读。'
  },
  {
    id: 'distinct',
    title: '3. DISTINCT 去重与别名',
    level: '入门',
    html: `<p>当结果中出现重复值时，用 <code>DISTINCT</code> 去除重复行。</p>
    <p>别名（<code>AS</code>）不仅可以用于列，也常用于让中文列名更直观。</p>`,
    example: `SELECT DISTINCT category_id
FROM books;

SELECT name AS 分类名称
FROM categories;`,
    tip: 'DISTINCT 作用于 SELECT 后的所有列组合，而不是单独某一列。'
  },
  {
    id: 'where',
    title: '4. WHERE：过滤行',
    level: '入门',
    html: `<p><code>WHERE</code> 放在 <code>FROM</code> 之后，用来筛选"满足条件的行"。常见比较：<code>=</code> <code>&lt;&gt;</code> <code>&gt;</code> <code>&gt;=</code> <code>&lt;</code> <code>&lt;=</code>。</p>
    <p>文本值用单引号括起来，如 <code>'计算机'</code>；数字和日期（本库日期为文本 YYYY-MM-DD）直接写。</p>`,
    example: `SELECT title, price
FROM books
WHERE price > 80;

SELECT title
FROM books
WHERE category_id = 1;`,
    tip: "不等于在 SQLite 中写作 <> 或 !=；文本比较区分大小写（对中文无影响）。"
  },
  {
    id: 'between-in-like',
    title: '5. BETWEEN、IN 与 LIKE',
    level: '入门',
    html: `<ul>
      <li><code>BETWEEN a AND b</code>：取区间，<b>包含</b>两边界</li>
      <li><code>IN (...)</code>：值属于给定集合</li>
      <li><code>LIKE</code>：模糊匹配，<code>%</code> 匹配任意多个字符，<code>_</code> 匹配单个字符</li>
    </ul>`,
    example: `SELECT title, price
FROM books
WHERE price BETWEEN 30 AND 60;

SELECT title
FROM books
WHERE category_id IN (1, 2);

SELECT title
FROM books
WHERE title LIKE '%简史%';`,
    tip: "反义写法：NOT BETWEEN、NOT IN、NOT LIKE。"
  },
  {
    id: 'logic',
    title: '6. AND / OR / NOT：组合条件',
    level: '入门',
    html: `<p>用逻辑运算符把多个条件组合起来：</p>
    <ul>
      <li><code>AND</code>：全部满足</li>
      <li><code>OR</code>：满足其一</li>
      <li><code>NOT</code>：取反</li>
    </ul>
    <p>⚠️ <code>AND</code> 优先级高于 <code>OR</code>，复杂条件建议用括号 <code>()</code> 明确意图。</p>`,
    example: `SELECT title, price, stock
FROM books
WHERE price > 50 AND stock > 100;

SELECT title, category_id
FROM books
WHERE category_id = 1 OR category_id = 2;

SELECT title
FROM books
WHERE NOT (price > 100);`,
    tip: '不确定优先级时，一律加括号，可读性也更好。'
  },
  {
    id: 'order',
    title: '7. ORDER BY：排序',
    level: '入门',
    html: `<p><code>ORDER BY</code> 决定结果的排列顺序：</p>
    <ul>
      <li><code>ASC</code> 升序（默认，可省略）</li>
      <li><code>DESC</code> 降序</li>
    </ul>
    <p>可按多列排序，每列单独指定方向。</p>`,
    example: `SELECT title, price
FROM books
ORDER BY price DESC;

SELECT title, price, stock
FROM books
ORDER BY price DESC, stock ASC;`,
    tip: 'NULL 值在升序中通常排最前（SQLite 默认如此）。'
  },
  {
    id: 'limit',
    title: '8. LIMIT：取前 N 行',
    level: '入门',
    html: `<p><code>LIMIT n</code> 限制返回的行数，常与 <code>ORDER BY</code> 配合实现"排行榜""前 N 名"等需求。</p>
    <p>分页写法：<code>LIMIT 每页条数 OFFSET 跳过条数</code>。</p>`,
    example: `SELECT title, price
FROM books
ORDER BY price DESC
LIMIT 5;

SELECT title
FROM books
ORDER BY book_id
LIMIT 5 OFFSET 10;`,
    tip: '不同数据库分页语法不同：SQL Server 用 TOP，MySQL/PostgreSQL/SQLite 用 LIMIT。'
  },
  {
    id: 'agg',
    title: '9. 聚合函数：汇总统计',
    level: '进阶',
    html: `<p>聚合函数把<b>多行</b>压缩成<b>一个</b>汇总值：</p>
    <ul>
      <li><code>COUNT(*)</code> 计数；<code>COUNT(列)</code> 忽略 NULL</li>
      <li><code>SUM(列)</code> 求和</li>
      <li><code>AVG(列)</code> 平均</li>
      <li><code>MIN / MAX</code> 最小 / 最大</li>
    </ul>
    <p>聚合常与 <code>ROUND(值, n)</code> 配合控制小数位。</p>`,
    example: `SELECT
  COUNT(*) AS 图书总数,
  ROUND(AVG(price), 2) AS 平均价,
  MAX(price) AS 最高价,
  MIN(price) AS 最低价,
  SUM(stock) AS 总库存
FROM books;`,
    tip: '聚合函数不能直接用在 WHERE 里——那是 HAVING 的职责（见下节）。'
  },
  {
    id: 'group',
    title: '10. GROUP BY 与 HAVING：分组统计',
    level: '进阶',
    html: `<p><code>GROUP BY 列</code> 把相同值的行归为一组，再对每组做聚合。</p>
    <p>执行顺序：<code>WHERE</code>（分组前过滤行）→ <code>GROUP BY</code> → <code>HAVING</code>（分组后过滤组）。</p>
    <p><code>HAVING</code> 可以使用聚合函数，而 <code>WHERE</code> 不行。</p>`,
    example: `SELECT category_id, COUNT(*) AS 图书数, ROUND(AVG(price),2) AS 平均价
FROM books
GROUP BY category_id;

SELECT category_id, COUNT(*) AS 图书数
FROM books
GROUP BY category_id
HAVING COUNT(*) > 3;`,
    tip: 'SELECT 中出现的非聚合列，通常都要出现在 GROUP BY 中。'
  },
  {
    id: 'join',
    title: '11. JOIN：多表连接',
    level: '进阶',
    html: `<p>真实数据分散在多张表，靠"外键"关联。<code>JOIN</code> 把多张表按关联条件拼到一起：</p>
    <ul>
      <li><code>INNER JOIN</code>：只返回两表<b>都匹配</b>的行</li>
      <li><code>LEFT JOIN</code>：保留<b>左表全部</b>，右表无匹配补 NULL</li>
      <li><code>RIGHT JOIN</code>：保留<b>右表全部</b></li>
    </ul>
    <p>连接条件写在 <code>ON</code> 之后，通常是两张表的外键相等。</p>`,
    example: `SELECT b.title, a.name AS 作者, c.name AS 分类
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN categories c ON b.category_id = c.category_id;

SELECT cu.name, COUNT(o.order_id) AS 订单数
FROM customers cu
LEFT JOIN orders o ON cu.customer_id = o.customer_id
GROUP BY cu.customer_id;`,
    tip: '给表起短别名（如 b / a / c）能让 SQL 更简洁。LEFT JOIN 是找"缺失数据"的利器（IS NULL）。'
  },
  {
    id: 'subquery',
    title: '12. 子查询',
    level: '高级',
    html: `<p>把一个 <code>SELECT</code> 嵌套进另一个查询里，就是子查询。常见用法：</p>
    <ul>
      <li><b>标量子查询</b>：返回单个值，用于 <code>WHERE 列 = (SELECT …)</code></li>
      <li><b>集合子查询</b>：返回一列值，用于 <code>WHERE 列 IN (SELECT …)</code></li>
      <li><b>EXISTS</b>：判断是否存在匹配行</li>
      <li><b>派生表</b>：把子查询结果当临时表放在 <code>FROM</code> 里</li>
      <li><b>相关子查询</b>：子查询引用外层列，逐行计算</li>
    </ul>`,
    example: `SELECT title, price
FROM books
WHERE price > (SELECT AVG(price) FROM books);

SELECT name
FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM orders
);

SELECT title
FROM books b1
WHERE price > (
  SELECT AVG(price) FROM books b2
  WHERE b2.category_id = b1.category_id
);`,
    tip: '子查询可读性强，但大数据量时性能可能不如 JOIN，实际中要多测试。'
  },
  {
    id: 'window',
    title: '13. 窗口函数',
    level: '高级',
    html: `<p>窗口函数在不"折叠"行的前提下，对一组相关行做计算（相比 GROUP BY 会压缩行）。语法：<code>函数() OVER (PARTITION BY 分组 ORDER BY 排序)</code>。</p>
    <ul>
      <li><code>ROW_NUMBER()</code>：连续序号，不并列</li>
      <li><code>RANK()</code>：并列跳号</li>
      <li><code>DENSE_RANK()</code>：并列不跳号</li>
      <li><code>SUM() OVER (...)</code>：分组内累计/滑动聚合</li>
      <li><code>LAG() / LEAD()</code>：取上一行 / 下一行的值</li>
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
    tip: '窗口函数是现代 SQL 面试高频考点，常用于"分组取 Top N""同比环比"等场景。'
  },
  {
    id: 'ddl-dml',
    title: '14. 视图、索引与增删改简介',
    level: '高级',
    html: `<p>除了查询，SQL 还能定义结构与修改数据：</p>
    <ul>
      <li><b>视图（VIEW）</b>：把一条常用查询保存为"虚拟表"，简化复杂查询</li>
      <li><b>索引（INDEX）</b>：为列建立有序结构，加速查找，但会拖慢写入</li>
      <li><b>INSERT / UPDATE / DELETE</b>：增、改、删数据（务必带 WHERE，否则影响全表！）</li>
      <li><b>事务</b>：BEGIN / COMMIT / ROLLBACK 保证一组操作要么全成、要么全败</li>
    </ul>
    <p>本站"训练场"默认处于只读查询环境，专注 SELECT；理解 DDL/DML 概念即可应对绝大多数分析场景。</p>`,
    example: `-- 建视图：保存"每本书销量"查询
CREATE VIEW book_sales AS
SELECT b.book_id, b.title, SUM(oi.quantity) AS 总销量
FROM books b
LEFT JOIN order_items oi ON b.book_id = oi.book_id
GROUP BY b.book_id;

-- 建索引：加速按价格查询
CREATE INDEX idx_books_price ON books(price);

-- 修改数据（谨慎！）
-- UPDATE books SET price = price * 0.9 WHERE category_id = 1;
-- DELETE FROM orders WHERE status = '已取消';`,
    tip: '索引不是越多越好：写多读少的表要克制建索引；优先建在高频过滤、区分度高的列上。'
  }
];
