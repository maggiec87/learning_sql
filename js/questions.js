/* ============================================================
 * questions.js — SQL 题库（150 题）
 * 分类：基础入门（50 题） / 进阶实战（100 题）
 * 进阶实战含：连接、分组、子查询、窗口函数、CTE、日期、字符串、CASE、集合运算等实战场景
 * difficulty: '基础入门' | '进阶实战'
 * requiresDB: true 表示可在训练场中直接运行参考答案
 * ============================================================ */

window.SQL_QUESTIONS = [
  /* ====================== 一、基础入门（50 题） ====================== */
  { id: 1, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询 books 表中的所有列。',
    hint: '用 * 表示所有列。',
    answer: `SELECT * FROM books;` },
  { id: 2, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '只查询所有图书的书名（title）和价格（price）。',
    hint: '在 SELECT 后列出需要的列名，用逗号分隔。',
    answer: `SELECT title, price FROM books;` },
  { id: 3, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '为列起中文别名：把 title 显示为「书名」，price 显示为「价格」。',
    hint: '使用 AS 关键字。',
    answer: `SELECT title AS 书名, price AS 价格 FROM books;` },
  { id: 4, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询 customers 表中所有不重复的城市（city）。',
    hint: 'DISTINCT 用于去除重复行。',
    answer: `SELECT DISTINCT city FROM customers;` },
  { id: 5, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询 books 表中所有不同的分类编号（category_id）。',
    hint: '同样使用 DISTINCT。',
    answer: `SELECT DISTINCT category_id FROM books;` },
  { id: 6, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询每本书的书名、原价，以及打 9 折后的「折扣价」。',
    hint: '可以在 SELECT 中写算术表达式 price * 0.9。',
    answer: `SELECT title, price, price * 0.9 AS 折扣价 FROM books;` },
  { id: 7, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '查询图书的总数量（共有多少本不同的书）。',
    hint: 'COUNT(*) 统计行数。',
    answer: `SELECT COUNT(*) AS 图书总数 FROM books;` },
  { id: 8, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询所有作者的姓名（name）和国籍（country）。',
    hint: '从 authors 表查询。',
    answer: `SELECT name, country FROM authors;` },
  { id: 9, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询所有分类的名称（name）。',
    hint: '从 categories 表查询。',
    answer: `SELECT name FROM categories;` },
  { id: 10, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询客户姓名（name）与邮箱（email）。',
    hint: '从 customers 表查询。',
    answer: `SELECT name, email FROM customers;` },
  { id: 11, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询订单的下单日期（order_date）和状态（status），并起别名「下单日期」「状态」。',
    hint: '用 AS 起别名。',
    answer: `SELECT order_date AS 下单日期, status AS 状态 FROM orders;` },
  { id: 12, difficulty: '基础入门', category: '基础查询', requiresDB: true,
    question: '查询每本书的书名、库存（stock）和出版年份（publish_year）。',
    hint: '从 books 表选择三列。',
    answer: `SELECT title, stock, publish_year FROM books;` },
  { id: 13, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询价格（price）大于 100 元的图书。',
    hint: '使用 WHERE price > 100。',
    answer: `SELECT title, price FROM books WHERE price > 100;` },
  { id: 14, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询价格在 30 到 60 元之间（含边界）的图书。',
    hint: 'BETWEEN ... AND ... 包含两端。',
    answer: `SELECT title, price FROM books WHERE price BETWEEN 30 AND 60;` },
  { id: 15, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询分类编号（category_id）为 1（计算机）的所有图书。',
    hint: 'WHERE category_id = 1。',
    answer: `SELECT title, price FROM books WHERE category_id = 1;` },
  { id: 16, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询库存（stock）小于 50 本的图书。',
    hint: 'WHERE stock < 50。',
    answer: `SELECT title, stock FROM books WHERE stock < 50;` },
  { id: 17, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询书名中包含「简史」两个字的图书。',
    hint: "LIKE '%简史%' 表示包含。",
    answer: `SELECT title FROM books WHERE title LIKE '%简史%';` },
  { id: 18, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询来自「北京」或「上海」的客户。',
    hint: "IN ('北京','上海')。",
    answer: `SELECT name, city FROM customers WHERE city IN ('北京', '上海');` },
  { id: 19, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: "查询 2023 年及以后（order_date >= '2023-01-01'）的订单。",
    hint: '日期按文本比较，格式为 YYYY-MM-DD。',
    answer: `SELECT * FROM orders WHERE order_date >= '2023-01-01';` },
  { id: 20, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询状态（status）不是「已取消」的订单。',
    hint: "用 <> 或 != 表示不等于。",
    answer: `SELECT * FROM orders WHERE status <> '已取消';` },
  { id: 21, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询所有图书，按价格从高到低排序。',
    hint: 'ORDER BY price DESC。',
    answer: `SELECT title, price FROM books ORDER BY price DESC;` },
  { id: 22, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询所有图书，按出版年份从早到晚排序。',
    hint: 'ORDER BY publish_year ASC（ASC 可省略）。',
    answer: `SELECT title, publish_year FROM books ORDER BY publish_year ASC;` },
  { id: 23, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询图书，先按价格降序，价格相同时按库存升序。',
    hint: 'ORDER BY 可指定多列及各自的方向。',
    answer: `SELECT title, price, stock FROM books ORDER BY price DESC, stock ASC;` },
  { id: 24, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询价格最贵的前 5 本书。',
    hint: 'ORDER BY ... LIMIT 5。',
    answer: `SELECT title, price FROM books ORDER BY price DESC LIMIT 5;` },
  { id: 25, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询价格大于 50 且 库存大于 100 的图书。',
    hint: '用 AND 连接两个条件。',
    answer: `SELECT title, price, stock FROM books WHERE price > 50 AND stock > 100;` },
  { id: 26, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询分类为计算机(1)或文学小说(2)，且价格低于 50 的图书。',
    hint: '注意 AND 优先级高于 OR，可用括号明确。',
    answer: `SELECT title, category_id, price
FROM books
WHERE category_id IN (1, 2) AND price < 50;` },
  { id: 27, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询作者编号（author_id）为 1 或 2 的图书。',
    hint: 'IN (1, 2)。',
    answer: `SELECT title, author_id FROM books WHERE author_id IN (1, 2);` },
  { id: 28, difficulty: '基础入门', category: '过滤排序', requiresDB: true,
    question: '查询书名以「三」字开头的图书。',
    hint: "LIKE '三%'，% 匹配任意长度。",
    answer: `SELECT title FROM books WHERE title LIKE '三%';` },
  { id: 29, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '统计图书表总共有多少行。',
    hint: 'COUNT(*)。',
    answer: `SELECT COUNT(*) AS 总数 FROM books;` },
  { id: 30, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '计算所有图书的平均价格。',
    hint: 'AVG(price)。',
    answer: `SELECT AVG(price) AS 平均价格 FROM books;` },
  { id: 31, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '查询图书中的最高价格。',
    hint: 'MAX(price)。',
    answer: `SELECT MAX(price) AS 最高价 FROM books;` },
  { id: 32, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '查询图书中的最低价格。',
    hint: 'MIN(price)。',
    answer: `SELECT MIN(price) AS 最低价 FROM books;` },
  { id: 33, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '计算所有图书的库存总和。',
    hint: 'SUM(stock)。',
    answer: `SELECT SUM(stock) AS 总库存 FROM books;` },
  { id: 34, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '计算图书平均库存，结果保留 1 位小数。',
    hint: 'ROUND(AVG(stock), 1)。',
    answer: `SELECT ROUND(AVG(stock), 1) AS 平均库存 FROM books;` },
  { id: 35, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '统计状态为「已完成」的订单数量。',
    hint: 'WHERE 先过滤，再 COUNT。',
    answer: `SELECT COUNT(*) AS 已完成订单数
FROM orders
WHERE status = '已完成';` },
  { id: 36, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '统计订单明细（order_items）中所有图书的销售总册数。',
    hint: 'SUM(quantity)。',
    answer: `SELECT SUM(quantity) AS 总销售册数 FROM order_items;` },
  { id: 37, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '计算订单明细中每条购买记录的平均购买数量。',
    hint: 'AVG(quantity)。',
    answer: `SELECT AVG(quantity) AS 平均购买数量 FROM order_items;` },
  { id: 38, difficulty: '基础入门', category: '聚合函数', requiresDB: true,
    question: '统计下过订单的不同客户数量。',
    hint: 'COUNT(DISTINCT customer_id)。',
    answer: `SELECT COUNT(DISTINCT customer_id) AS 下单客户数
FROM orders;` },
  { id: 39, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '统计每个分类（category_id）下分别有多少本图书。',
    hint: 'GROUP BY category_id。',
    answer: `SELECT category_id, COUNT(*) AS 图书数
FROM books
GROUP BY category_id;` },
  { id: 40, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '统计每个城市（city）分别有多少名客户。',
    hint: 'GROUP BY city。',
    answer: `SELECT city, COUNT(*) AS 客户数
FROM customers
GROUP BY city;` },
  { id: 41, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '计算每个分类的平均图书价格。',
    hint: 'GROUP BY 后使用 AVG。',
    answer: `SELECT category_id, AVG(price) AS 平均价
FROM books
GROUP BY category_id;` },
  { id: 42, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '统计每位作者（author_id）各写了多少本书。',
    hint: 'GROUP BY author_id。',
    answer: `SELECT author_id, COUNT(*) AS 著作数
FROM books
GROUP BY author_id;` },
  { id: 43, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '按出版年份（publish_year）统计每年出版了多少本书。',
    hint: 'GROUP BY publish_year。',
    answer: `SELECT publish_year, COUNT(*) AS 出版数
FROM books
GROUP BY publish_year
ORDER BY publish_year;` },
  { id: 44, difficulty: '基础入门', category: '分组统计', requiresDB: true,
    question: '计算每个分类的图书总库存。',
    hint: 'GROUP BY category_id，SUM(stock)。',
    answer: `SELECT category_id, SUM(stock) AS 分类总库存
FROM books
GROUP BY category_id;` },
  { id: 45, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询每本书的书名和对应的作者姓名（连接 books 与 authors）。',
    hint: 'books.author_id = authors.author_id。',
    answer: `SELECT b.title, a.name AS 作者
FROM books b
JOIN authors a ON b.author_id = a.author_id;` },
  { id: 46, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询每本书的书名和对应的分类名称（连接 books 与 categories）。',
    hint: 'books.category_id = categories.category_id。',
    answer: `SELECT b.title, c.name AS 分类
FROM books b
JOIN categories c ON b.category_id = c.category_id;` },
  { id: 47, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询每笔订单的编号、下单日期和对应客户姓名。',
    hint: 'orders 连接 customers。',
    answer: `SELECT o.order_id, o.order_date, cu.name AS 客户
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id;` },
  { id: 48, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询订单明细中每条记录对应的书名。',
    hint: 'order_items 连接 books。',
    answer: `SELECT oi.order_item_id, b.title, oi.quantity
FROM order_items oi
JOIN books b ON oi.book_id = b.book_id;` },
  { id: 49, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询作者「刘慈欣」写的所有书及其价格。',
    hint: 'authors 连接 books，过滤作者姓名。',
    answer: `SELECT b.title, b.price
FROM books b
JOIN authors a ON b.author_id = a.author_id
WHERE a.name = '刘慈欣';` },
  { id: 50, difficulty: '基础入门', category: '多表连接', requiresDB: true,
    question: '查询「计算机」分类下的所有图书。',
    hint: 'books 连接 categories，过滤分类名称。',
    answer: `SELECT b.title, b.price
FROM books b
JOIN categories c ON b.category_id = c.category_id
WHERE c.name = '计算机';` },

  /* ====================== 二、进阶实战（100 题） ====================== */
  { id: 51, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '统计每种订单状态（status）各有多少笔订单。',
    hint: 'GROUP BY status。',
    answer: `SELECT status, COUNT(*) AS 订单数
FROM orders
GROUP BY status;` },
  { id: 52, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '找出图书数量超过 3 本的分类（显示分类编号与数量）。',
    hint: '对聚合结果过滤用 HAVING。',
    answer: `SELECT category_id, COUNT(*) AS 图书数
FROM books
GROUP BY category_id
HAVING COUNT(*) > 3;` },
  { id: 53, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '找出平均价格高于 60 元的分类。',
    hint: 'HAVING AVG(price) > 60。',
    answer: `SELECT category_id, AVG(price) AS 平均价
FROM books
GROUP BY category_id
HAVING AVG(price) > 60;` },
  { id: 54, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '找出客户数量超过 2 人的城市。',
    hint: 'HAVING COUNT(*) > 2。',
    answer: `SELECT city, COUNT(*) AS 客户数
FROM customers
GROUP BY city
HAVING COUNT(*) > 2;` },
  { id: 55, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '统计 2023 年各订单状态的订单数量。',
    hint: '先 WHERE 过滤年份，再 GROUP BY。',
    answer: `SELECT status, COUNT(*) AS 订单数
FROM orders
WHERE order_date >= '2023-01-01' AND order_date < '2024-01-01'
GROUP BY status;` },
  { id: 56, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '统计每位客户（customer_id）分别下过多少笔订单。',
    hint: 'GROUP BY customer_id。',
    answer: `SELECT customer_id, COUNT(*) AS 订单数
FROM orders
GROUP BY customer_id;` },
  { id: 57, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '计算每个订单（order_id）的金额合计（quantity * unit_price 求和）。',
    hint: 'GROUP BY order_id，SUM(quantity*unit_price)。',
    answer: `SELECT order_id, SUM(quantity * unit_price) AS 订单金额
FROM order_items
GROUP BY order_id;` },
  { id: 58, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '按总销售册数排序，找出销量前 3 的图书（book_id 与总销量）。',
    hint: 'GROUP BY book_id，ORDER BY 总销量 DESC，LIMIT 3。',
    answer: `SELECT book_id, SUM(quantity) AS 总销量
FROM order_items
GROUP BY book_id
ORDER BY 总销量 DESC
LIMIT 3;` },
  { id: 59, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询每本书的书名、作者姓名和分类名称（三表连接）。',
    hint: 'books 同时连接 authors 与 categories。',
    answer: `SELECT b.title, a.name AS 作者, c.name AS 分类
FROM books b
JOIN authors a ON b.author_id = a.author_id
JOIN categories c ON b.category_id = c.category_id;` },
  { id: 60, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询所有客户及其订单数量，包括从未下过单的客户（显示为 0）。',
    hint: 'customers LEFT JOIN orders。',
    answer: `SELECT cu.name, COUNT(o.order_id) AS 订单数
FROM customers cu
LEFT JOIN orders o ON cu.customer_id = o.customer_id
GROUP BY cu.customer_id;` },
  { id: 61, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询客户「张伟」下过的所有订单。',
    hint: '先按姓名找到 customer_id，再关联订单。',
    answer: `SELECT o.*
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id
WHERE cu.name = '张伟';` },
  { id: 62, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询来自「北京」的客户所下的订单。',
    hint: "customers.city = '北京' 后连接 orders。",
    answer: `SELECT o.order_id, o.order_date, cu.name
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id
WHERE cu.city = '北京';` },
  { id: 63, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询订单明细，显示订单日期、客户姓名和书名。',
    hint: 'order_items → orders → customers，以及 order_items → books。',
    answer: `SELECT o.order_date, cu.name AS 客户, b.title AS 书名, oi.quantity
FROM order_items oi
JOIN orders o ON oi.order_id = o.order_id
JOIN customers cu ON o.customer_id = cu.customer_id
JOIN books b ON oi.book_id = b.book_id;` },
  { id: 64, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询每笔订单包含的书名列表（订单编号 + 书名，多行展示）。',
    hint: 'orders 连接 order_items 连接 books。',
    answer: `SELECT o.order_id, b.title, oi.quantity
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN books b ON oi.book_id = b.book_id
ORDER BY o.order_id;` },
  { id: 65, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询状态为「已发货」的订单，显示客户姓名与所购书名。',
    hint: 'orders 过滤状态，再连接客户与明细/图书。',
    answer: `SELECT cu.name AS 客户, b.title AS 书名, oi.quantity
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN books b ON oi.book_id = b.book_id
WHERE o.status = '已发货'
ORDER BY o.order_id;` },
  { id: 66, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询每本书的书名及其被购买的总数量（未被购买的书显示为 0）。',
    hint: 'books LEFT JOIN order_items，SUM(quantity)。',
    answer: `SELECT b.title, COALESCE(SUM(oi.quantity), 0) AS 总销量
FROM books b
LEFT JOIN order_items oi ON b.book_id = oi.book_id
GROUP BY b.book_id;` },
  { id: 67, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '计算每位客户的消费总额（含客户姓名）。',
    hint: 'customers → orders → order_items，SUM(quantity*unit_price)。',
    answer: `SELECT cu.name AS 客户, SUM(oi.quantity * oi.unit_price) AS 消费总额
FROM customers cu
JOIN orders o ON cu.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY cu.customer_id
ORDER BY 消费总额 DESC;` },
  { id: 68, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询购买过《三体》的所有客户姓名。',
    hint: 'books 找到《三体》book_id，再经明细/订单找到客户。',
    answer: `SELECT DISTINCT cu.name
FROM customers cu
JOIN orders o ON cu.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN books b ON oi.book_id = b.book_id
WHERE b.title = '三体';` },
  { id: 69, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '找出从未被购买过的图书。',
    hint: 'books LEFT JOIN order_items，筛选 book_id IS NULL。',
    answer: `SELECT b.title
FROM books b
LEFT JOIN order_items oi ON b.book_id = oi.book_id
WHERE oi.book_id IS NULL;` },
  { id: 70, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询每位客户的下单次数（含从未下单的客户，显示 0）。',
    hint: 'customers LEFT JOIN orders 后 GROUP BY。',
    answer: `SELECT cu.name, COUNT(o.order_id) AS 下单次数
FROM customers cu
LEFT JOIN orders o ON cu.customer_id = o.customer_id
GROUP BY cu.customer_id;` },
  { id: 71, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询销量排名前 5 的图书（书名 + 总销量）。',
    hint: 'books 连接 order_items 分组求和后排序取前 5。',
    answer: `SELECT b.title, SUM(oi.quantity) AS 总销量
FROM books b
JOIN order_items oi ON b.book_id = oi.book_id
GROUP BY b.book_id
ORDER BY 总销量 DESC
LIMIT 5;` },
  { id: 72, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询上海客户在 2023 年下的订单（显示客户名、订单日期、状态）。',
    hint: '多条件过滤 + 连接。',
    answer: `SELECT cu.name, o.order_date, o.status
FROM orders o
JOIN customers cu ON o.customer_id = cu.customer_id
WHERE cu.city = '上海'
  AND o.order_date >= '2023-01-01' AND o.order_date < '2024-01-01'
ORDER BY o.order_date;` },
  { id: 73, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格高于全部图书平均价格的图书。',
    hint: 'WHERE price > (SELECT AVG(price) FROM books)。',
    answer: `SELECT title, price
FROM books
WHERE price > (SELECT AVG(price) FROM books);` },
  { id: 74, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询库存高于「计算机」分类平均库存的图书。',
    hint: '子查询算计算机分类平均库存。',
    answer: `SELECT title, stock
FROM books
WHERE stock > (
  SELECT AVG(stock)
  FROM books
  WHERE category_id = 1
);` },
  { id: 75, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询购买过《三体》的客户姓名（用 IN 子查询）。',
    hint: '子查询返回买过《三体》的 customer_id。',
    answer: `SELECT name
FROM customers
WHERE customer_id IN (
  SELECT o.customer_id
  FROM orders o
  JOIN order_items oi ON o.order_id = oi.order_id
  JOIN books b ON oi.book_id = b.book_id
  WHERE b.title = '三体'
);` },
  { id: 76, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询从未下过单的客户（用 NOT EXISTS 或 NOT IN）。',
    hint: '关联子查询检查是否存在该客户的订单。',
    answer: `SELECT name
FROM customers cu
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = cu.customer_id
);` },
  { id: 77, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格等于最高价的图书（用子查询求 MAX）。',
    hint: 'WHERE price = (SELECT MAX(price) FROM books)。',
    answer: `SELECT title, price
FROM books
WHERE price = (SELECT MAX(price) FROM books);` },
  { id: 78, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格高于其所属分类平均价格的图书（相关子查询）。',
    hint: '子查询按外部行的 category_id 求平均。',
    answer: `SELECT title, price, category_id
FROM books b1
WHERE price > (
  SELECT AVG(price)
  FROM books b2
  WHERE b2.category_id = b1.category_id
);` },
  { id: 79, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询金额高于平均订单金额的订单（订单金额取自 order_items 汇总）。',
    hint: '先算每单金额，再与平均金额比较。可用派生表。',
    answer: `SELECT order_id, 订单金额
FROM (
  SELECT order_id, SUM(quantity * unit_price) AS 订单金额
  FROM order_items
  GROUP BY order_id
) t
WHERE 订单金额 > (SELECT AVG(订单金额) FROM (
  SELECT SUM(quantity * unit_price) AS 订单金额
  FROM order_items GROUP BY order_id
));` },
  { id: 80, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询与《活着》同一作者的其他图书。',
    hint: '子查询取《活着》的 author_id。',
    answer: `SELECT title, author_id
FROM books
WHERE author_id = (SELECT author_id FROM books WHERE title = '活着')
  AND title <> '活着';` },
  { id: 81, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询总销量高于平均销量的图书。',
    hint: '先算每本书总销量，再与平均销量比较。',
    answer: `SELECT book_id, 总销量
FROM (
  SELECT book_id, SUM(quantity) AS 总销量
  FROM order_items GROUP BY book_id
) t
WHERE 总销量 > (SELECT AVG(总销量) FROM (
  SELECT SUM(quantity) AS 总销量 FROM order_items GROUP BY book_id
));` },
  { id: 82, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询下单次数最多的客户姓名。',
    hint: '先算每客户订单数，取最大值对应的客户。',
    answer: `SELECT name
FROM customers
WHERE customer_id = (
  SELECT customer_id
  FROM orders
  GROUP BY customer_id
  ORDER BY COUNT(*) DESC
  LIMIT 1
);` },
  { id: 83, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询至少下过一单的客户（用 EXISTS）。',
    hint: 'EXISTS 关联子查询。',
    answer: `SELECT name
FROM customers cu
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = cu.customer_id
);` },
  { id: 84, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格排名前 3 的图书（用子查询 + 比较）。',
    hint: '可用 >= 某个阈值，或配合 ORDER BY ... LIMIT。',
    answer: `SELECT title, price
FROM books
WHERE price >= (
  SELECT MIN(price) FROM (
    SELECT price FROM books ORDER BY price DESC LIMIT 3
  )
)
ORDER BY price DESC;` },
  { id: 85, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询每个分类中价格最高的图书（相关子查询）。',
    hint: '外部行价格等于该分类的最大价格。',
    answer: `SELECT category_id, title, price
FROM books b1
WHERE price = (
  SELECT MAX(price)
  FROM books b2
  WHERE b2.category_id = b1.category_id
);` },
  { id: 86, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询消费总额高于平均消费额的客户姓名与金额。',
    hint: '先算每客户消费额（派生表），再与平均比较。',
    answer: `SELECT 客户, 消费总额
FROM (
  SELECT cu.name AS 客户, SUM(oi.quantity * oi.unit_price) AS 消费总额
  FROM customers cu
  JOIN orders o ON cu.customer_id = o.customer_id
  JOIN order_items oi ON o.order_id = oi.order_id
  GROUP BY cu.customer_id
) t
WHERE 消费总额 > (SELECT AVG(消费总额) FROM (
  SELECT SUM(oi.quantity * oi.unit_price) AS 消费总额
  FROM customers cu
  JOIN orders o ON cu.customer_id = o.customer_id
  JOIN order_items oi ON o.order_id = oi.order_id
  GROUP BY cu.customer_id
));` },
  { id: 87, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '对所有图书按价格排名（相同价格并列，用 RANK）。',
    hint: 'RANK() OVER (ORDER BY price DESC)。',
    answer: `SELECT title, price,
       RANK() OVER (ORDER BY price DESC) AS 价格排名
FROM books;` },
  { id: 88, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '在每个分类内，按价格从高到低排名。',
    hint: 'PARTITION BY category_id ORDER BY price DESC。',
    answer: `SELECT title, category_id, price,
       RANK() OVER (PARTITION BY category_id ORDER BY price DESC) AS 分类内排名
FROM books;` },
  { id: 89, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '按价格降序给图书编号（连续序号，用 ROW_NUMBER）。',
    hint: 'ROW_NUMBER() OVER (ORDER BY price DESC)。',
    answer: `SELECT title, price,
       ROW_NUMBER() OVER (ORDER BY price DESC) AS 序号
FROM books;` },
  { id: 90, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '按图书编号顺序，计算库存的累计总和。',
    hint: 'SUM(stock) OVER (ORDER BY book_id)。',
    answer: `SELECT book_id, title, stock,
       SUM(stock) OVER (ORDER BY book_id) AS 累计库存
FROM books;` },
  { id: 91, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '在每个分类内，计算库存的累计总和（按 book_id 排序）。',
    hint: 'PARTITION BY category_id ORDER BY book_id。',
    answer: `SELECT book_id, category_id, stock,
       SUM(stock) OVER (PARTITION BY category_id ORDER BY book_id) AS 分类累计库存
FROM books;` },
  { id: 92, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每本书价格，以及按 book_id 排序时上一本书的价格（LAG）。',
    hint: 'LAG(price) OVER (ORDER BY book_id)。',
    answer: `SELECT book_id, title, price,
       LAG(price) OVER (ORDER BY book_id) AS 上一本价格
FROM books;` },
  { id: 93, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '为每个客户的订单按下单日期排序编号。',
    hint: 'PARTITION BY customer_id ORDER BY order_date。',
    answer: `SELECT customer_id, order_id, order_date,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS 客户内序号
FROM orders;` },
  { id: 94, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '对所有图书按价格排名，相同价格占用相同名次且后续连续（DENSE_RANK）。',
    hint: 'DENSE_RANK() OVER (ORDER BY price DESC)。',
    answer: `SELECT title, price,
       DENSE_RANK() OVER (ORDER BY price DESC) AS 密集排名
FROM books;` },
  { id: 95, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '计算每个订单金额占全部订单总金额的百分比。',
    hint: '用 SUM(...) OVER () 求全局总额。',
    answer: `SELECT order_id, 订单金额,
       ROUND(订单金额 * 100.0 / SUM(订单金额) OVER (), 2) AS 占比百分比
FROM (
  SELECT order_id, SUM(quantity * unit_price) AS 订单金额
  FROM order_items GROUP BY order_id
);` },
  { id: 96, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每本书价格，以及全局平均价格（用窗口函数展示在每一行）。',
    hint: 'AVG(price) OVER () 不分区即全局平均。',
    answer: `SELECT title, price,
       ROUND(AVG(price) OVER (), 2) AS 全局平均价
FROM books;` },
  { id: 97, difficulty: '进阶实战', category: '理论概念', requiresDB: false,
    question: '什么是主键（PRIMARY KEY）？它有什么作用？',
    hint: '从唯一性、非空、表定位角度回答。',
    answer: `-- 主键用于唯一标识表中的每一行：
-- 1) 值唯一，不能有重复；
-- 2) 不能为 NULL；
-- 3) 一张表只能有一个主键（可由多列组成复合主键）。
-- 示例：
-- CREATE TABLE books (
--   book_id INTEGER PRIMARY KEY,
--   title   TEXT
-- );` },
  { id: 98, difficulty: '进阶实战', category: '理论概念', requiresDB: false,
    question: '简述内连接（INNER JOIN）与外连接（LEFT/RIGHT JOIN）的区别。',
    hint: '关注不匹配行是否被保留。',
    answer: `-- INNER JOIN：只返回两表都匹配上的行；
-- LEFT JOIN ：返回左表全部行，右表无匹配时以 NULL 填充；
-- RIGHT JOIN：返回右表全部行，左表无匹配时以 NULL 填充（SQLite 不支持，用 LEFT JOIN 改写）。
-- 示例：
-- SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;  -- A 全部保留` },
  { id: 99, difficulty: '进阶实战', category: '理论概念', requiresDB: false,
    question: 'WHERE 和 HAVING 有什么区别？',
    hint: '执行顺序与针对对象不同。',
    answer: `-- WHERE：在分组前过滤「行」，不能使用聚合函数；
-- HAVING：在 GROUP BY 之后过滤「分组」，可以使用聚合函数。
-- 示例：
-- SELECT category_id, COUNT(*) c
-- FROM books
-- WHERE price > 0
-- GROUP BY category_id
-- HAVING COUNT(*) > 3;` },
  { id: 100, difficulty: '进阶实战', category: '理论概念', requiresDB: false,
    question: '数据库索引（INDEX）有什么作用？会带来什么代价？',
    hint: '从查询加速与写入/空间成本权衡回答。',
    answer: `-- 作用：为列建立有序结构（如 B+ 树），大幅加速 WHERE / JOIN / ORDER BY 的查找。
-- 代价：
-- 1) 占用额外存储空间；
-- 2) 拖慢 INSERT / UPDATE / DELETE（需同步维护索引）；
-- 3) 并非越多越好，应建在高频查询且区分度高的列上。
-- 示例：
-- CREATE INDEX idx_books_price ON books(price);` },

  /* ---------- 进阶实战 · 新增实战题（101-150） ---------- */
  { id: 101, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每个分类内，按价格从高到低的排名（显示书名、分类、价格、分类内排名）。',
    hint: 'RANK() OVER (PARTITION BY category_id ORDER BY price DESC)。',
    answer: `SELECT b.title, b.category_id, b.price,
       RANK() OVER (PARTITION BY b.category_id ORDER BY b.price DESC) AS 分类内排名
FROM books b
ORDER BY b.category_id, 分类内排名;` },
  { id: 102, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '统计每位作者（作者姓名）的著作数量，以及其作品的总销量（未售出的记为 0）。',
    hint: 'authors 连接 books，再 LEFT JOIN order_items 求和。',
    answer: `SELECT a.name AS 作者,
       COUNT(DISTINCT b.book_id) AS 著作数,
       COALESCE(SUM(oi.quantity), 0) AS 总销量
FROM authors a
JOIN books b ON b.author_id = a.author_id
LEFT JOIN order_items oi ON oi.book_id = b.book_id
GROUP BY a.author_id
ORDER BY 总销量 DESC;` },
  { id: 103, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询金额最高的那一笔订单（订单编号、客户姓名、订单金额）。',
    hint: '先算每单金额，按金额降序取第 1。',
    answer: `SELECT o.order_id, cu.name AS 客户, SUM(oi.quantity * oi.unit_price) AS 订单金额
FROM orders o
JOIN customers cu ON cu.customer_id = o.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY o.order_id
ORDER BY 订单金额 DESC
LIMIT 1;` },
  { id: 104, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '统计 2024 年每个月的订单数量（按月份排序）。',
    hint: 'strftime(\'%m\', order_date) 取月份，先 WHERE 过滤年份。',
    answer: `SELECT strftime('%m', order_date) AS 月份, COUNT(*) AS 订单数
FROM orders
WHERE order_date >= '2024-01-01'
GROUP BY strftime('%m', order_date)
ORDER BY 月份;` },
  { id: 105, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '按客户所在城市，统计每个城市的消费总额（含城市名、消费总额），按总额降序。',
    hint: 'customers 连接 orders/order_items，SUM(quantity*unit_price)，GROUP BY city。',
    answer: `SELECT cu.city, SUM(oi.quantity * oi.unit_price) AS 城市消费总额
FROM customers cu
JOIN orders o ON o.customer_id = cu.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY cu.city
ORDER BY 城市消费总额 DESC;` },
  { id: 106, difficulty: '进阶实战', category: '分组统计', requiresDB: true,
    question: '查询被不同订单购买次数最多的图书（书名与购买订单数）。',
    hint: 'COUNT(DISTINCT order_id) 统计购买订单数，取最大。',
    answer: `SELECT b.title, COUNT(DISTINCT oi.order_id) AS 购买订单数
FROM books b
JOIN order_items oi ON oi.book_id = b.book_id
GROUP BY b.book_id
ORDER BY 购买订单数 DESC
LIMIT 1;` },
  { id: 107, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询每本书第一次被购买的日期（书名、首次购买日期），未被购买的书不显示。',
    hint: 'books → order_items → orders，MIN(order_date)。',
    answer: `SELECT b.title, MIN(o.order_date) AS 首次购买日期
FROM books b
JOIN order_items oi ON oi.book_id = b.book_id
JOIN orders o ON o.order_id = oi.order_id
GROUP BY b.book_id;` },
  { id: 108, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询订单明细中 quantity > 1 的记录（显示订单编号、书名、数量）。',
    hint: 'order_items 连接 books，WHERE quantity > 1。',
    answer: `SELECT oi.order_id, b.title, oi.quantity
FROM order_items oi
JOIN books b ON b.book_id = oi.book_id
WHERE oi.quantity > 1
ORDER BY oi.quantity DESC;` },
  { id: 109, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询每个分类中价格最高的图书（分类、书名、价格）。',
    hint: '相关子查询：外部行价格等于该分类的最大价格。',
    answer: `SELECT b.category_id, b.title, b.price
FROM books b
WHERE b.price = (
  SELECT MAX(b2.price) FROM books b2 WHERE b2.category_id = b.category_id
)
ORDER BY b.category_id;` },
  { id: 110, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询客户「张伟」买过的所有不同书名（去重）。',
    hint: 'customers → orders → order_items → books，DISTINCT title。',
    answer: `SELECT DISTINCT b.title
FROM customers cu
JOIN orders o ON o.customer_id = cu.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN books b ON b.book_id = oi.book_id
WHERE cu.name = '张伟';` },
  { id: 111, difficulty: '进阶实战', category: 'CTE', requiresDB: true,
    question: '用 WITH 子句计算每本书的总销量，再从中取销量前 5 的图书（书名、总销量）。',
    hint: 'WITH 销量 AS (...) 然后 JOIN books 排序取前 5。',
    answer: `WITH 销量 AS (
  SELECT book_id, SUM(quantity) AS 总销量
  FROM order_items GROUP BY book_id
)
SELECT b.title, 销量.总销量
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
ORDER BY 销量.总销量 DESC
LIMIT 5;` },
  { id: 112, difficulty: '进阶实战', category: 'CTE', requiresDB: true,
    question: '用 WITH 计算每位客户的消费总额，再筛出高于平均消费额的客户（姓名、消费额）。',
    hint: 'CTE 先算每客户消费额，外层用子查询求平均再比较。',
    answer: `WITH 消费 AS (
  SELECT cu.customer_id, cu.name, SUM(oi.quantity * oi.unit_price) AS 消费额
  FROM customers cu
  JOIN orders o ON o.customer_id = cu.customer_id
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY cu.customer_id
)
SELECT name, 消费额
FROM 消费
WHERE 消费额 > (SELECT AVG(消费额) FROM 消费)
ORDER BY 消费额 DESC;` },
  { id: 113, difficulty: '进阶实战', category: 'CTE', requiresDB: true,
    question: '用 WITH 计算每个分类的总销量，再取每个分类销量最高的图书（分类、书名、总销量）。',
    hint: 'CTE 算出每本书销量，再用窗口函数 ROW_NUMBER 取每类第 1。',
    answer: `WITH 销量 AS (
  SELECT b.book_id, b.category_id, b.title, SUM(oi.quantity) AS 总销量
  FROM books b
  JOIN order_items oi ON oi.book_id = b.book_id
  GROUP BY b.book_id
)
SELECT category_id, title, 总销量
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY 总销量 DESC) AS r
  FROM 销量
) t
WHERE r = 1
ORDER BY category_id;` },
  { id: 114, difficulty: '进阶实战', category: 'CTE', requiresDB: true,
    question: '用 WITH 计算每笔订单金额，再按订单日期排序计算累计销售额（订单日期、金额、累计销售额）。',
    hint: 'CTE 算每单金额，外层用 SUM() OVER (ORDER BY order_date) 累计。',
    answer: `WITH 订单金额 AS (
  SELECT o.order_id, o.order_date, SUM(oi.quantity * oi.unit_price) AS 金额
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY o.order_id
)
SELECT order_date, 金额, SUM(金额) OVER (ORDER BY order_date, order_id) AS 累计销售额
FROM 订单金额
ORDER BY order_date, order_id;` },
  { id: 115, difficulty: '进阶实战', category: 'CTE', requiresDB: true,
    question: '用 WITH 取出每位客户按日期排序的订单，再用 LAG 计算相邻两笔订单的间隔天数（客户、订单日期、上一单日期、间隔天）。',
    hint: 'julianday() 可计算两个日期相差天数；自连接相邻序号。',
    answer: `WITH 排序 AS (
  SELECT customer_id, order_date,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS rn
  FROM orders
)
SELECT a.customer_id, a.order_date, b.order_date AS 上一单日期,
       CAST(julianday(a.order_date) - julianday(b.order_date) AS INTEGER) AS 间隔天
FROM 排序 a
LEFT JOIN 排序 b ON a.customer_id = b.customer_id AND a.rn = b.rn + 1
WHERE a.rn > 1
ORDER BY a.customer_id, a.order_date;` },
  { id: 116, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '用 ROW_NUMBER 给每个分类内的图书按价格降序编号，取编号 = 1 的书（即每类最贵的一本）。',
    hint: 'ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) = 1。',
    answer: `SELECT category_id, title, price
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC) AS rn
  FROM books
) t
WHERE rn = 1
ORDER BY category_id;` },
  { id: 117, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每位客户按订单金额从高到低的排名（客户、订单日期、订单金额、客户内排名）。',
    hint: 'CTE 算每单金额，再 RANK() OVER (PARTITION BY customer_id)。',
    answer: `WITH 金额 AS (
  SELECT o.order_id, o.customer_id, o.order_date,
         SUM(oi.quantity * oi.unit_price) AS 金额
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY o.order_id
)
SELECT customer_id, order_date, 金额,
       RANK() OVER (PARTITION BY customer_id ORDER BY 金额 DESC) AS 客户内排名
FROM 金额
ORDER BY customer_id, 客户内排名;` },
  { id: 118, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每本书的书名、价格，以及价格与全局平均价的差额（价格 - 平均价）。',
    hint: 'AVG(price) OVER () 得到全局平均价。',
    answer: `SELECT title, price, ROUND(price - AVG(price) OVER (), 2) AS 与平均差额
FROM books
ORDER BY 与平均差额 DESC;` },
  { id: 119, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '按分类、按 book_id 顺序，计算每本书销量的分类内累计（书名、分类、销量、分类内累计销量）。',
    hint: 'CTE 算每本书销量，外层 SUM() OVER (PARTITION BY category_id ORDER BY book_id)。',
    answer: `WITH 销量 AS (
  SELECT book_id, SUM(quantity) AS 销量 FROM order_items GROUP BY book_id
)
SELECT b.title, b.category_id, 销量.销量,
       SUM(销量.销量) OVER (PARTITION BY b.category_id ORDER BY b.book_id) AS 分类内累计
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
ORDER BY b.category_id, b.book_id;` },
  { id: 120, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '将所有订单按日期排序，查询每笔订单的金额及其上一笔订单的金额（LAG）。',
    hint: 'CTE 算每单金额，LAG(金额) OVER (ORDER BY order_date, order_id)。',
    answer: `WITH 金额 AS (
  SELECT o.order_id, o.order_date, SUM(oi.quantity * oi.unit_price) AS 金额
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY o.order_id
)
SELECT order_date, 金额, LAG(金额) OVER (ORDER BY order_date, order_id) AS 上一笔金额
FROM 金额
ORDER BY order_date, order_id;` },
  { id: 121, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '按 book_id 排序，查询每本书的下一本书的价格（LEAD）。',
    hint: 'LEAD(price) OVER (ORDER BY book_id)。',
    answer: `SELECT book_id, title, price, LEAD(price) OVER (ORDER BY book_id) AS 下一本价格
FROM books;` },
  { id: 122, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '把所有图书按价格从低到高分成 3 组（NTILE(3)），显示书名、价格、价位组。',
    hint: 'NTILE(3) OVER (ORDER BY price)。',
    answer: `SELECT title, price, NTILE(3) OVER (ORDER BY price) AS 价位组
FROM books;` },
  { id: 123, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每位作者的图书，按出版年份排序并编号（作者、书名、年份、作者内序号）。',
    hint: 'books 连接 authors，ROW_NUMBER() OVER (PARTITION BY author_id ORDER BY publish_year)。',
    answer: `SELECT a.name AS 作者, b.title, b.publish_year,
       ROW_NUMBER() OVER (PARTITION BY a.author_id ORDER BY b.publish_year) AS 序号
FROM books b
JOIN authors a ON a.author_id = b.author_id
ORDER BY a.author_id, 序号;` },
  { id: 124, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每笔订单的金额，以及它占该客户总消费的百分比（客户、订单金额、占比%）。',
    hint: 'CTE 算每单金额，100.0*金额 / SUM(金额) OVER (PARTITION BY customer_id)。',
    answer: `WITH 金额 AS (
  SELECT o.order_id, o.customer_id, SUM(oi.quantity * oi.unit_price) AS 金额
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY o.order_id
)
SELECT customer_id, 金额,
       ROUND(100.0 * 金额 / SUM(金额) OVER (PARTITION BY customer_id), 2) AS 占客户消费百分比
FROM 金额
ORDER BY customer_id, 金额 DESC;` },
  { id: 125, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每本书的总销量，并按销量做密集排名（DENSE_RANK）。',
    hint: 'CTE 算每本书销量，DENSE_RANK() OVER (ORDER BY 总销量 DESC)。',
    answer: `WITH 销量 AS (
  SELECT book_id, SUM(quantity) AS 总销量 FROM order_items GROUP BY book_id
)
SELECT b.title, 销量.总销量,
       DENSE_RANK() OVER (ORDER BY 销量.总销量 DESC) AS 销量排名
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
ORDER BY 销量排名, b.title;` },
  { id: 126, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '统计每个年份的订单数量（用 strftime 取年份）。',
    hint: 'strftime(\'%Y\', order_date) 分组。',
    answer: `SELECT strftime('%Y', order_date) AS 年份, COUNT(*) AS 订单数
FROM orders
GROUP BY strftime('%Y', order_date)
ORDER BY 年份;` },
  { id: 127, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '统计每个「年-月」的订单数量。',
    hint: 'strftime(\'%Y-%m\', order_date) 分组。',
    answer: `SELECT strftime('%Y-%m', order_date) AS 年月, COUNT(*) AS 订单数
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY 年月;` },
  { id: 128, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '查询 2024 年第一季度（1-3 月）的所有订单（订单编号、日期、状态）。',
    hint: 'order_date 在 [2024-01-01, 2024-04-01) 之间。',
    answer: `SELECT order_id, order_date, status
FROM orders
WHERE order_date >= '2024-01-01' AND order_date < '2024-04-01'
ORDER BY order_date;` },
  { id: 129, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '按客户注册年份统计客户数量。',
    hint: 'strftime(\'%Y\', registration_date) 分组。',
    answer: `SELECT strftime('%Y', registration_date) AS 注册年份, COUNT(*) AS 客户数
FROM customers
GROUP BY strftime('%Y', registration_date)
ORDER BY 注册年份;` },
  { id: 130, difficulty: '进阶实战', category: '日期函数', requiresDB: true,
    question: '统计订单集中在哪几个月（按月份数字分组，不区分年份）。',
    hint: 'CAST(strftime(\'%m\', …) AS INTEGER) 得到月份数字。',
    answer: `SELECT CAST(strftime('%m', order_date) AS INTEGER) AS 月份, COUNT(*) AS 订单数
FROM orders
GROUP BY strftime('%m', order_date)
ORDER BY 月份;` },
  { id: 131, difficulty: '进阶实战', category: '字符串函数', requiresDB: true,
    question: '查询每本书的书名及其长度（LENGTH），按长度降序取前 10。',
    hint: 'LENGTH(title) 求书名长度。',
    answer: `SELECT title, LENGTH(title) AS 书名长度
FROM books
ORDER BY 书名长度 DESC
LIMIT 10;` },
  { id: 132, difficulty: '进阶实战', category: '字符串函数', requiresDB: true,
    question: '统计书名以「三」开头的图书数量。',
    hint: "WHERE title LIKE '三%' 再 COUNT。",
    answer: `SELECT COUNT(*) AS 数量
FROM books
WHERE title LIKE '三%';` },
  { id: 133, difficulty: '进阶实战', category: '字符串函数', requiresDB: true,
    question: '查询每位作者的姓名长度（LENGTH），按长度降序。',
    hint: 'authors 表用 LENGTH(name)。',
    answer: `SELECT name, LENGTH(name) AS 姓名长度
FROM authors
ORDER BY 姓名长度 DESC;` },
  { id: 134, difficulty: '进阶实战', category: '字符串函数', requiresDB: true,
    question: '查询每本书的「书名（作者）」拼接格式，如《三体》（刘慈欣）。',
    hint: '用 || 拼接字符串。',
    answer: `SELECT b.title || '（' || a.name || '）' AS 书名作者
FROM books b
JOIN authors a ON a.author_id = b.author_id
LIMIT 10;` },
  { id: 135, difficulty: '进阶实战', category: '字符串函数', requiresDB: true,
    question: '用子查询 + || 生成一句话描述，如「计算机：共 8 本」。',
    hint: 'categories 外层，子查询统计该分类图书数，用 || 拼接。',
    answer: `SELECT c.name || '：共 ' ||
       (SELECT COUNT(*) FROM books b WHERE b.category_id = c.category_id) ||
       ' 本' AS 描述
FROM categories c;` },
  { id: 136, difficulty: '进阶实战', category: '条件分支', requiresDB: true,
    question: '按价格档位（>100 贵 / >50 中 / 其他 便宜）统计各档图书数量。',
    hint: 'CASE WHEN … THEN … ELSE … END，再 GROUP BY 档位。',
    answer: `SELECT CASE
         WHEN price > 100 THEN '贵'
         WHEN price > 50  THEN '中'
         ELSE '便宜'
       END AS 价格档位,
       COUNT(*) AS 数量
FROM books
GROUP BY 价格档位
ORDER BY 数量 DESC;` },
  { id: 137, difficulty: '进阶实战', category: '条件分支', requiresDB: true,
    question: '按城市是否为一线城市（北京/上海/深圳/杭州）统计客户数量。',
    hint: 'CASE WHEN city IN (...) THEN \'一线\' ELSE \'其他\' END。',
    answer: `SELECT CASE
         WHEN city IN ('北京','上海','深圳','杭州') THEN '一线'
         ELSE '其他'
       END AS 城市档,
       COUNT(*) AS 客户数
FROM customers
GROUP BY 城市档;` },
  { id: 138, difficulty: '进阶实战', category: '条件分支', requiresDB: true,
    question: '按库存把图书分成「充足(>200)/一般(50-200)/紧张(<50)」三档并统计数量。',
    hint: 'CASE 连续区间判断，注意顺序。',
    answer: `SELECT CASE
         WHEN stock > 200 THEN '充足'
         WHEN stock >= 50 THEN '一般'
         ELSE '紧张'
       END AS 库存档位,
       COUNT(*) AS 数量
FROM books
GROUP BY 库存档位
ORDER BY 数量 DESC;` },
  { id: 139, difficulty: '进阶实战', category: '条件分支', requiresDB: true,
    question: '用 CASE 给每本书按总销量打标签（>10 畅销 / >3 一般 / 其他 滞销），显示书名、总销量、标签。',
    hint: 'CTE 算每本书销量，外层 CASE 打标签。',
    answer: `WITH 销量 AS (
  SELECT book_id, COALESCE(SUM(quantity), 0) AS 总销量
  FROM order_items GROUP BY book_id
)
SELECT b.title, 销量.总销量,
       CASE
         WHEN 销量.总销量 > 10 THEN '畅销'
         WHEN 销量.总销量 > 3  THEN '一般'
         ELSE '滞销'
       END AS 标签
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
ORDER BY 销量.总销量 DESC;` },
  { id: 140, difficulty: '进阶实战', category: '条件分支', requiresDB: true,
    question: '按消费总额给客户分级（>500 VIP / >200 普通 / 其他 新客），显示姓名、消费额、级别。',
    hint: 'CTE 算每客户消费额（含 0），外层 CASE 分级。',
    answer: `WITH 消费 AS (
  SELECT cu.customer_id, cu.name,
         COALESCE(SUM(oi.quantity * oi.unit_price), 0) AS 消费额
  FROM customers cu
  LEFT JOIN orders o ON o.customer_id = cu.customer_id
  LEFT JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY cu.customer_id
)
SELECT name, 消费额,
       CASE
         WHEN 消费额 > 500 THEN 'VIP'
         WHEN 消费额 > 200 THEN '普通'
         ELSE '新客'
       END AS 级别
FROM 消费
ORDER BY 消费额 DESC;` },
  { id: 141, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格高于「计算机类平均价」的非计算机类图书（书名、价格）。',
    hint: 'category_id <> 1 且 price > 计算机类平均价子查询。',
    answer: `SELECT title, price
FROM books
WHERE category_id <> 1
  AND price > (SELECT AVG(price) FROM books WHERE category_id = 1);` },
  { id: 142, difficulty: '进阶实战', category: '多表连接', requiresDB: true,
    question: '查询购买过「刘慈欣」作品的所有客户姓名（去重）。',
    hint: 'authors 过滤刘慈欣，经 books/order_items/orders 找到客户。',
    answer: `SELECT DISTINCT cu.name
FROM customers cu
JOIN orders o ON o.customer_id = cu.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
JOIN books b ON b.book_id = oi.book_id
JOIN authors a ON a.author_id = b.author_id
WHERE a.name = '刘慈欣';` },
  { id: 143, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询价格高于其所属分类平均价，且库存大于 100 的图书（书名、价格、库存）。',
    hint: '相关子查询求分类平均价，再 AND stock > 100。',
    answer: `SELECT b.title, b.price, b.stock
FROM books b
WHERE b.price > (
  SELECT AVG(b2.price) FROM books b2 WHERE b2.category_id = b.category_id
)
AND b.stock > 100;` },
  { id: 144, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询既有「已完成」订单又有「已取消」订单的客户姓名。',
    hint: '两个 IN 子查询的交集（AND）。',
    answer: `SELECT name
FROM customers
WHERE customer_id IN (SELECT customer_id FROM orders WHERE status = '已完成')
  AND customer_id IN (SELECT customer_id FROM orders WHERE status = '已取消');` },
  { id: 145, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '查询每个分类销量排名前 2 的图书（分类、书名、总销量、分类内排名）。',
    hint: 'CTE 算每本书销量，ROW_NUMBER 分区取排名 <= 2。',
    answer: `WITH 销量 AS (
  SELECT b.book_id, b.category_id, b.title, SUM(oi.quantity) AS 总销量
  FROM books b
  JOIN order_items oi ON oi.book_id = b.book_id
  GROUP BY b.book_id
)
SELECT category_id, title, 总销量, 排名
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY 总销量 DESC) AS 排名
  FROM 销量
) t
WHERE 排名 <= 2
ORDER BY category_id, 排名;` },
  { id: 146, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询总销量高于「文学小说(分类2)中所有书销量」的图书（即高于该分类最大销量）。',
    hint: '用子查询算出文学小说类的最大单书销量，再比较。',
    answer: `WITH 销量 AS (
  SELECT book_id, SUM(quantity) AS 总销量 FROM order_items GROUP BY book_id
)
SELECT b.title, 销量.总销量
FROM 销量
JOIN books b ON b.book_id = 销量.book_id
WHERE 销量.总销量 > (
  SELECT MAX(s2.总销量)
  FROM 销量 s2
  JOIN books b2 ON b2.book_id = s2.book_id
  WHERE b2.category_id = 2
);` },
  { id: 147, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询从未购买过「计算机(分类1)」图书的客户姓名。',
    hint: 'NOT IN 子查询返回买过计算机书的 customer_id。',
    answer: `SELECT name
FROM customers
WHERE customer_id NOT IN (
  SELECT DISTINCT o.customer_id
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  JOIN books b ON b.book_id = oi.book_id
  WHERE b.category_id = 1
);` },
  { id: 148, difficulty: '进阶实战', category: '子查询', requiresDB: true,
    question: '查询每位客户最近一笔订单的编号与日期（相关子查询）。',
    hint: '外部行 order_date = 该客户最大 order_date。',
    answer: `SELECT o.order_id, o.customer_id, o.order_date
FROM orders o
WHERE o.order_date = (
  SELECT MAX(o2.order_date)
  FROM orders o2
  WHERE o2.customer_id = o.customer_id
);` },
  { id: 149, difficulty: '进阶实战', category: '窗口函数', requiresDB: true,
    question: '将所有订单按金额排序均分为 2 组，取「较高那组」的订单（用于看中位数以上）。',
    hint: 'CTE 算每单金额，NTILE(2) OVER (ORDER BY 金额) = 2 为高组。',
    answer: `WITH 金额 AS (
  SELECT o.order_id, SUM(oi.quantity * oi.unit_price) AS 金额
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.order_id
  GROUP BY o.order_id
)
SELECT order_id, 金额
FROM (
  SELECT *, NTILE(2) OVER (ORDER BY 金额) AS 组
  FROM 金额
) t
WHERE 组 = 2
ORDER BY 金额;` },
  { id: 150, difficulty: '进阶实战', category: '集合运算', requiresDB: true,
    question: '用 UNION 对比：价格<40 的书 与 作者为「余华」(author_id=3) 的书，取书名列表（去重）。',
    hint: 'UNION 自动去重；UNION ALL 不去重。',
    answer: `SELECT title FROM books WHERE price < 40
UNION
SELECT title FROM books WHERE author_id = 3
LIMIT 10;` }
];
