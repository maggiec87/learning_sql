/* ============================================================
 * cheatsheet.js — SQL 速查表数据
 * 每个分类包含若干条目：语法 + 说明（+ 可选示例）
 * ============================================================ */

window.SQL_CHEATSHEET = [
  {
    group: '基础查询',
    items: [
      { syntax: 'SELECT 列 FROM 表;', desc: '查询指定列（* 表示所有列）' },
      { syntax: 'SELECT DISTINCT 列 FROM 表;', desc: '去重查询' },
      { syntax: 'SELECT 列 AS 别名 FROM 表;', desc: '为列/表达式起别名' },
      { syntax: "SELECT 列, 列*0.9 FROM 表;", desc: '在 SELECT 中写算术表达式' },
      { syntax: 'SELECT TOP 5 列 FROM 表;', desc: 'SQL Server 取前 N 行（SQLite/MySQL 用 LIMIT）' },
      { syntax: 'SELECT 列 FROM 表 LIMIT 5;', desc: 'SQLite/MySQL/PostgreSQL 取前 N 行' }
    ]
  },
  {
    group: '过滤条件 WHERE',
    items: [
      { syntax: 'WHERE 列 = 值', desc: '等于' },
      { syntax: 'WHERE 列 <> 值 / != 值', desc: '不等于' },
      { syntax: 'WHERE 列 > 值 / >= / < / <=', desc: '比较大小' },
      { syntax: "WHERE 列 BETWEEN a AND b", desc: '区间（含两端）' },
      { syntax: "WHERE 列 IN (值1, 值2)", desc: '在集合中' },
      { syntax: "WHERE 列 LIKE '张%'", desc: "模糊匹配，% 任意多字符，_ 单个字符" },
      { syntax: "WHERE 列 NOT LIKE '张%'", desc: '反向模糊匹配' },
      { syntax: 'WHERE 列 IS NULL', desc: '为空' },
      { syntax: 'WHERE 列 IS NOT NULL', desc: '不为空' },
      { syntax: 'WHERE 条件1 AND 条件2', desc: '同时满足' },
      { syntax: 'WHERE 条件1 OR 条件2', desc: '满足其一' },
      { syntax: 'WHERE NOT 条件', desc: '取反' }
    ]
  },
  {
    group: '排序与分页',
    items: [
      { syntax: 'ORDER BY 列 ASC', desc: '升序（默认）' },
      { syntax: 'ORDER BY 列 DESC', desc: '降序' },
      { syntax: 'ORDER BY 列1 DESC, 列2 ASC', desc: '多列排序' },
      { syntax: 'LIMIT 10', desc: '返回前 10 行' },
      { syntax: 'LIMIT 10 OFFSET 20', desc: '跳过 20 行后取 10 行（分页）' }
    ]
  },
  {
    group: '聚合函数',
    items: [
      { syntax: 'COUNT(*) / COUNT(列)', desc: '计数（列会忽略 NULL）' },
      { syntax: 'SUM(列)', desc: '求和' },
      { syntax: 'AVG(列)', desc: '平均值' },
      { syntax: 'MIN(列) / MAX(列)', desc: '最小 / 最大值' },
      { syntax: 'COUNT(DISTINCT 列)', desc: '去重计数' },
      { syntax: 'ROUND(值, 2)', desc: '四舍五入到指定小数位' }
    ]
  },
  {
    group: '分组 GROUP BY / HAVING',
    items: [
      { syntax: 'GROUP BY 列', desc: '按列分组后聚合' },
      { syntax: 'GROUP BY 列1, 列2', desc: '多列分组' },
      { syntax: 'HAVING 聚合条件', desc: '对分组结果过滤（可用聚合函数）' },
      { syntax: 'WHERE … GROUP BY … HAVING …', desc: '执行顺序：WHERE→GROUP→HAVING' }
    ]
  },
  {
    group: '多表连接 JOIN',
    items: [
      { syntax: 'A JOIN B ON A.id = B.a_id', desc: '内连接：只返回匹配行' },
      { syntax: 'A LEFT JOIN B ON …', desc: '左连接：保留左表全部，右表无匹配补 NULL' },
      { syntax: 'A RIGHT JOIN B ON …', desc: '右连接：保留右表全部' },
      { syntax: 'A CROSS JOIN B', desc: '笛卡尔积（慎用）' },
      { syntax: 'A JOIN B ON … JOIN C ON …', desc: '多表连接' },
      { syntax: '自连接：FROM 表 t1 JOIN 表 t2 ON …', desc: '同一张表当两张用' }
    ]
  },
  {
    group: '子查询',
    items: [
      { syntax: 'WHERE 列 = (SELECT …)', desc: '标量子查询（返回单个值）' },
      { syntax: 'WHERE 列 IN (SELECT …)', desc: '集合子查询' },
      { syntax: 'WHERE EXISTS (SELECT 1 …)', desc: '存在性判断' },
      { syntax: 'FROM (SELECT …) 别名', desc: '派生表（内联视图）' },
      { syntax: '相关子查询：WHERE 列 > (SELECT … WHERE 外.列=内.列)', desc: '子查询引用外层列' }
    ]
  },
  {
    group: '窗口函数',
    items: [
      { syntax: 'ROW_NUMBER() OVER (ORDER BY 列)', desc: '连续序号（不并列）' },
      { syntax: 'RANK() OVER (ORDER BY 列 DESC)', desc: '排名（并列跳号）' },
      { syntax: 'DENSE_RANK() OVER (ORDER BY 列 DESC)', desc: '密集排名（并列不跳号）' },
      { syntax: 'SUM(列) OVER (PARTITION BY 分组 ORDER BY 排)', desc: '分组内累计/滑动聚合' },
      { syntax: 'LAG(列) OVER (ORDER BY 排)', desc: '取上一行的值' },
      { syntax: 'LEAD(列) OVER (ORDER BY 排)', desc: '取下一行的值' },
      { syntax: 'AVG(列) OVER ()', desc: '全局聚合（不分区）' }
    ]
  },
  {
    group: '常用字符串 / 日期函数',
    items: [
      { syntax: "UPPER(列) / LOWER(列)", desc: '大小写转换' },
      { syntax: "LENGTH(列)", desc: '字符串长度' },
      { syntax: "SUBSTR(列, 起, 长)", desc: '截取子串（从 1 开始）' },
      { syntax: "REPLACE(列, '旧', '新')", desc: '替换' },
      { syntax: "strftime('%Y', 日期列)", desc: 'SQLite 提取年份' },
      { syntax: "DATE(列) / datetime(列)", desc: '日期处理（SQLite）' },
      { syntax: "|| 拼接（SQLite） / CONCAT()（MySQL）", desc: '字符串拼接' }
    ]
  },
  {
    group: '数据定义 DDL',
    items: [
      { syntax: 'CREATE TABLE 表 (列 类型, …);', desc: '建表' },
      { syntax: 'ALTER TABLE 表 ADD 列 类型;', desc: '加列' },
      { syntax: 'DROP TABLE 表;', desc: '删表' },
      { syntax: 'CREATE INDEX 名 ON 表(列);', desc: '建索引' },
      { syntax: 'CREATE VIEW 名 AS SELECT …;', desc: '建视图' }
    ]
  },
  {
    group: '数据操作 DML',
    items: [
      { syntax: "INSERT INTO 表(列) VALUES (值);", desc: '插入' },
      { syntax: "UPDATE 表 SET 列=值 WHERE …;", desc: '更新（务必带 WHERE）' },
      { syntax: 'DELETE FROM 表 WHERE …;', desc: '删除（务必带 WHERE）' },
      { syntax: 'BEGIN / COMMIT / ROLLBACK', desc: '事务控制' }
    ]
  }
];
