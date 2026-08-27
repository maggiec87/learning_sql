/* ============================================================
 * db.js — 网上书店示例数据库（用于训练场 / 题库练习）
 * 纯前端构建：用 sql.js 在浏览器内创建 SQLite 数据库并写入示例数据。
 * 数据完全确定（不依赖随机），保证每次加载结果一致。
 * ============================================================ */

(function (global) {
  'use strict';

  // ---------- 1. 基础维度表数据 ----------
  const categories = [
    { category_id: 1, name: '计算机' },
    { category_id: 2, name: '文学小说' },
    { category_id: 3, name: '经济学' },
    { category_id: 4, name: '历史' },
    { category_id: 5, name: '心理学' },
    { category_id: 6, name: '科普' }
  ];

  const authors = [
    { author_id: 1, name: '吴军', country: '中国' },
    { author_id: 2, name: '刘慈欣', country: '中国' },
    { author_id: 3, name: '余华', country: '中国' },
    { author_id: 4, name: '尤瓦尔·赫拉利', country: '以色列' },
    { author_id: 5, name: '丹尼尔·卡尼曼', country: '美国' },
    { author_id: 6, name: '曼昆', country: '美国' },
    { author_id: 7, name: '斯蒂芬·平克', country: '加拿大' },
    { author_id: 8, name: '东野圭吾', country: '日本' },
    { author_id: 9, name: '彼得·蒂尔', country: '美国' },
    { author_id: 10, name: '黄仁宇', country: '中国' },
    { author_id: 11, name: '卡洛·罗韦利', country: '意大利' },
    { author_id: 12, name: '马歇尔·卢森堡', country: '美国' }
  ];

  const books = [
    { book_id: 1, title: '浪潮之巅', author_id: 1, category_id: 1, price: 69.0, stock: 120, publish_year: 2013 },
    { book_id: 2, title: '数学之美', author_id: 1, category_id: 1, price: 45.0, stock: 200, publish_year: 2012 },
    { book_id: 3, title: '三体', author_id: 2, category_id: 2, price: 88.0, stock: 350, publish_year: 2008 },
    { book_id: 4, title: '球状闪电', author_id: 2, category_id: 2, price: 39.0, stock: 80, publish_year: 2005 },
    { book_id: 5, title: '活着', author_id: 3, category_id: 2, price: 28.0, stock: 500, publish_year: 1993 },
    { book_id: 6, title: '许三观卖血记', author_id: 3, category_id: 2, price: 32.0, stock: 150, publish_year: 1995 },
    { book_id: 7, title: '人类简史', author_id: 4, category_id: 4, price: 68.0, stock: 260, publish_year: 2014 },
    { book_id: 8, title: '未来简史', author_id: 4, category_id: 4, price: 68.0, stock: 190, publish_year: 2017 },
    { book_id: 9, title: '思考，快与慢', author_id: 5, category_id: 5, price: 79.0, stock: 95, publish_year: 2012 },
    { book_id: 10, title: '经济学原理', author_id: 6, category_id: 3, price: 128.0, stock: 60, publish_year: 2015 },
    { book_id: 11, title: '启蒙运动', author_id: 7, category_id: 4, price: 98.0, stock: 40, publish_year: 2018 },
    { book_id: 12, title: '白夜行', author_id: 8, category_id: 2, price: 59.0, stock: 175, publish_year: 2004 },
    { book_id: 13, title: '嫌疑人X的献身', author_id: 8, category_id: 2, price: 49.0, stock: 210, publish_year: 2005 },
    { book_id: 14, title: '从0到1', author_id: 9, category_id: 3, price: 42.0, stock: 130, publish_year: 2014 },
    { book_id: 15, title: '万历十五年', author_id: 10, category_id: 4, price: 36.0, stock: 220, publish_year: 1982 },
    { book_id: 16, title: '七堂极简物理课', author_id: 11, category_id: 6, price: 32.0, stock: 300, publish_year: 2016 },
    { book_id: 17, title: '非暴力沟通', author_id: 12, category_id: 5, price: 39.0, stock: 240, publish_year: 2009 },
    { book_id: 18, title: 'Python编程：从入门到实践', author_id: 1, category_id: 1, price: 89.0, stock: 410, publish_year: 2019 },
    { book_id: 19, title: '算法导论', author_id: 1, category_id: 1, price: 158.0, stock: 30, publish_year: 2013 },
    { book_id: 20, title: '深入理解计算机系统', author_id: 1, category_id: 1, price: 139.0, stock: 45, publish_year: 2011 },
    { book_id: 21, title: '平凡的世界', author_id: 3, category_id: 2, price: 108.0, stock: 160, publish_year: 1986 },
    { book_id: 22, title: '时间简史', author_id: 11, category_id: 6, price: 45.0, stock: 280, publish_year: 1988 },
    { book_id: 23, title: '穷查理宝典', author_id: 5, category_id: 3, price: 88.0, stock: 70, publish_year: 2010 },
    { book_id: 24, title: '国富论', author_id: 6, category_id: 3, price: 76.0, stock: 55, publish_year: 1776 },
    { book_id: 25, title: '大秦帝国', author_id: 10, category_id: 4, price: 268.0, stock: 25, publish_year: 2008 },
    { book_id: 26, title: '怪诞行为学', author_id: 5, category_id: 5, price: 49.0, stock: 110, publish_year: 2008 },
    { book_id: 27, title: '代码整洁之道', author_id: 1, category_id: 1, price: 59.0, stock: 140, publish_year: 2009 },
    { book_id: 28, title: '解忧杂货店', author_id: 8, category_id: 2, price: 39.0, stock: 330, publish_year: 2012 },
    { book_id: 29, title: '认知觉醒', author_id: 12, category_id: 5, price: 42.0, stock: 260, publish_year: 2019 },
    { book_id: 30, title: '宇宙之美', author_id: 11, category_id: 6, price: 99.0, stock: 50, publish_year: 2017 },
    { book_id: 31, title: '冷门书：数据库内核探秘', author_id: 1, category_id: 1, price: 52.0, stock: 99, publish_year: 2020 },
    { book_id: 32, title: '冷门书：冥想入门', author_id: 12, category_id: 5, price: 36.0, stock: 88, publish_year: 2021 }
  ];

  const customers = [
    { customer_id: 1, name: '张伟', city: '北京', email: 'zhangwei@example.com', registration_date: '2022-03-12' },
    { customer_id: 2, name: '李娜', city: '上海', email: 'lina@example.com', registration_date: '2022-05-08' },
    { customer_id: 3, name: '王芳', city: '广州', email: 'wangfang@example.com', registration_date: '2022-07-21' },
    { customer_id: 4, name: '刘洋', city: '深圳', email: 'liuyang@example.com', registration_date: '2022-09-30' },
    { customer_id: 5, name: '陈静', city: '杭州', email: 'chenjing@example.com', registration_date: '2023-01-15' },
    { customer_id: 6, name: '杨光', city: '成都', email: 'yangguang@example.com', registration_date: '2023-02-19' },
    { customer_id: 7, name: '赵磊', city: '北京', email: 'zhaolei@example.com', registration_date: '2023-03-22' },
    { customer_id: 8, name: '孙悦', city: '上海', email: 'sunyue@example.com', registration_date: '2023-04-11' },
    { customer_id: 9, name: '周强', city: '武汉', email: 'zhouqiang@example.com', registration_date: '2023-06-05' },
    { customer_id: 10, name: '吴敏', city: '广州', email: 'wumin@example.com', registration_date: '2023-08-17' },
    { customer_id: 11, name: '郑浩', city: '深圳', email: 'zhenghao@example.com', registration_date: '2023-09-28' },
    { customer_id: 12, name: '冯丽', city: '杭州', email: 'fengli@example.com', registration_date: '2023-11-02' },
    { customer_id: 13, name: '蒋勇', city: '成都', email: 'jiangyong@example.com', registration_date: '2024-01-09' },
    { customer_id: 14, name: '韩雪', city: '北京', email: 'hanxue@example.com', registration_date: '2024-02-14' },
    { customer_id: 15, name: '曹斌', city: '上海', email: 'caobin@example.com', registration_date: '2024-03-20' },
    { customer_id: 16, name: '试用客户', city: '西安', email: 'trial@example.com', registration_date: '2024-04-01' }
  ];

  // 订单：每单含若干明细（order_id, customer_id, order_date, status, items:[{book_id, quantity}]）
  // unit_price 取下单时图书价格（见下方构建时填充）
  const orders = [
    { order_id: 1, customer_id: 1, order_date: '2023-04-10', status: '已完成', items: [{ book_id: 3, quantity: 1 }, { book_id: 5, quantity: 2 }] },
    { order_id: 2, customer_id: 2, order_date: '2023-04-18', status: '已完成', items: [{ book_id: 18, quantity: 1 }] },
    { order_id: 3, customer_id: 3, order_date: '2023-05-02', status: '已发货', items: [{ book_id: 7, quantity: 1 }, { book_id: 8, quantity: 1 }, { book_id: 22, quantity: 1 }] },
    { order_id: 4, customer_id: 4, order_date: '2023-05-21', status: '已完成', items: [{ book_id: 1, quantity: 1 }, { book_id: 2, quantity: 2 }] },
    { order_id: 5, customer_id: 5, order_date: '2023-06-09', status: '已取消', items: [{ book_id: 10, quantity: 1 }] },
    { order_id: 6, customer_id: 6, order_date: '2023-06-25', status: '已完成', items: [{ book_id: 12, quantity: 1 }, { book_id: 13, quantity: 1 }] },
    { order_id: 7, customer_id: 7, order_date: '2023-07-14', status: '已发货', items: [{ book_id: 15, quantity: 1 }, { book_id: 27, quantity: 1 }] },
    { order_id: 8, customer_id: 8, order_date: '2023-08-03', status: '已完成', items: [{ book_id: 28, quantity: 2 }, { book_id: 17, quantity: 1 }] },
    { order_id: 9, customer_id: 9, order_date: '2023-08-22', status: '已完成', items: [{ book_id: 9, quantity: 1 }, { book_id: 26, quantity: 1 }] },
    { order_id: 10, customer_id: 10, order_date: '2023-09-12', status: '已发货', items: [{ book_id: 14, quantity: 1 }, { book_id: 23, quantity: 1 }] },
    { order_id: 11, customer_id: 11, order_date: '2023-10-01', status: '已完成', items: [{ book_id: 16, quantity: 3 }] },
    { order_id: 12, customer_id: 12, order_date: '2023-10-20', status: '已完成', items: [{ book_id: 21, quantity: 1 }, { book_id: 5, quantity: 1 }] },
    { order_id: 13, customer_id: 13, order_date: '2023-11-11', status: '待付款', items: [{ book_id: 19, quantity: 1 }] },
    { order_id: 14, customer_id: 14, order_date: '2023-11-28', status: '已完成', items: [{ book_id: 20, quantity: 1 }, { book_id: 27, quantity: 1 }] },
    { order_id: 15, customer_id: 15, order_date: '2023-12-15', status: '已发货', items: [{ book_id: 3, quantity: 1 }, { book_id: 4, quantity: 1 }, { book_id: 22, quantity: 1 }] },
    { order_id: 16, customer_id: 1, order_date: '2024-01-08', status: '已完成', items: [{ book_id: 18, quantity: 1 }, { book_id: 29, quantity: 1 }] },
    { order_id: 17, customer_id: 2, order_date: '2024-01-25', status: '已完成', items: [{ book_id: 7, quantity: 1 }] },
    { order_id: 18, customer_id: 3, order_date: '2024-02-14', status: '已取消', items: [{ book_id: 25, quantity: 1 }] },
    { order_id: 19, customer_id: 5, order_date: '2024-02-28', status: '已完成', items: [{ book_id: 17, quantity: 2 }, { book_id: 29, quantity: 1 }] },
    { order_id: 20, customer_id: 6, order_date: '2024-03-10', status: '已发货', items: [{ book_id: 28, quantity: 1 }, { book_id: 16, quantity: 1 }] },
    { order_id: 21, customer_id: 8, order_date: '2024-03-22', status: '已完成', items: [{ book_id: 13, quantity: 1 }, { book_id: 12, quantity: 1 }, { book_id: 6, quantity: 1 }] },
    { order_id: 22, customer_id: 10, order_date: '2024-04-05', status: '已完成', items: [{ book_id: 24, quantity: 1 }, { book_id: 14, quantity: 1 }] },
    { order_id: 23, customer_id: 11, order_date: '2024-04-18', status: '待付款', items: [{ book_id: 11, quantity: 1 }] },
    { order_id: 24, customer_id: 13, order_date: '2024-05-02', status: '已完成', items: [{ book_id: 30, quantity: 1 }, { book_id: 16, quantity: 2 }] },
    { order_id: 25, customer_id: 15, order_date: '2024-05-20', status: '已发货', items: [{ book_id: 9, quantity: 1 }, { book_id: 26, quantity: 1 }, { book_id: 17, quantity: 1 }] }
  ];

  const priceOf = {};
  books.forEach(function (b) { priceOf[b.book_id] = b.price; });

  // ---------- 2. 构建数据库 ----------
  function buildDatabase(DB) {
    const run = function (sql) { DB.run(sql); };

    run(`
      CREATE TABLE categories (
        category_id INTEGER PRIMARY KEY,
        name        TEXT NOT NULL
      );
      CREATE TABLE authors (
        author_id INTEGER PRIMARY KEY,
        name      TEXT NOT NULL,
        country   TEXT
      );
      CREATE TABLE books (
        book_id       INTEGER PRIMARY KEY,
        title         TEXT NOT NULL,
        author_id     INTEGER,
        category_id   INTEGER,
        price         REAL,
        stock         INTEGER,
        publish_year  INTEGER,
        FOREIGN KEY (author_id)   REFERENCES authors(author_id),
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
      );
      CREATE TABLE customers (
        customer_id       INTEGER PRIMARY KEY,
        name              TEXT NOT NULL,
        city              TEXT,
        email             TEXT,
        registration_date TEXT
      );
      CREATE TABLE orders (
        order_id     INTEGER PRIMARY KEY,
        customer_id  INTEGER,
        order_date   TEXT,
        status       TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
      );
      CREATE TABLE order_items (
        order_item_id INTEGER PRIMARY KEY,
        order_id      INTEGER,
        book_id       INTEGER,
        quantity      INTEGER,
        unit_price    REAL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (book_id)  REFERENCES books(book_id)
      );
    `);

    const insert = function (sql, params) {
      const stmt = DB.prepare(sql);
      for (let i = 0; i < params.length; i++) stmt.run(params[i]);
      stmt.free();
    };

    insert('INSERT INTO categories (category_id, name) VALUES (?, ?);',
      categories.map(function (c) { return [c.category_id, c.name]; }));
    insert('INSERT INTO authors (author_id, name, country) VALUES (?, ?, ?);',
      authors.map(function (a) { return [a.author_id, a.name, a.country]; }));
    insert('INSERT INTO books (book_id, title, author_id, category_id, price, stock, publish_year) VALUES (?,?,?,?,?,?,?);',
      books.map(function (b) { return [b.book_id, b.title, b.author_id, b.category_id, b.price, b.stock, b.publish_year]; }));
    insert('INSERT INTO customers (customer_id, name, city, email, registration_date) VALUES (?,?,?,?,?);',
      customers.map(function (c) { return [c.customer_id, c.name, c.city, c.email, c.registration_date]; }));

    const orderRows = orders.map(function (o) { return [o.order_id, o.customer_id, o.order_date, o.status]; });
    insert('INSERT INTO orders (order_id, customer_id, order_date, status) VALUES (?,?,?,?);', orderRows);

    let oi = 1;
    const itemRows = [];
    orders.forEach(function (o) {
      o.items.forEach(function (it) {
        itemRows.push([oi++, o.order_id, it.book_id, it.quantity, priceOf[it.book_id]]);
      });
    });
    insert('INSERT INTO order_items (order_item_id, order_id, book_id, quantity, unit_price) VALUES (?,?,?,?,?);', itemRows);
  }

  // ---------- 3. 暴露表结构说明（供界面展示） ----------
  const schemaInfo = [
    { table: 'categories', columns: ['category_id', 'name'], note: '图书分类' },
    { table: 'authors', columns: ['author_id', 'name', 'country'], note: '作者' },
    { table: 'books', columns: ['book_id', 'title', 'author_id', 'category_id', 'price', 'stock', 'publish_year'], note: '图书' },
    { table: 'customers', columns: ['customer_id', 'name', 'city', 'email', 'registration_date'], note: '客户' },
    { table: 'orders', columns: ['order_id', 'customer_id', 'order_date', 'status'], note: '订单（status: 已完成/已发货/待付款/已取消）' },
    { table: 'order_items', columns: ['order_item_id', 'order_id', 'book_id', 'quantity', 'unit_price'], note: '订单明细' }
  ];

  global.SampleDB = {
    buildDatabase: buildDatabase,
    schemaInfo: schemaInfo,
    categories: categories,
    authors: authors,
    books: books,
    customers: customers,
    orders: orders
  };
})(window);
