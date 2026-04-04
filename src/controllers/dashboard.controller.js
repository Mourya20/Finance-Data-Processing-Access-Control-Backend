const prisma = require('../utils/prisma');
const dashService = require('../services/dashboard.service');

exports.summary = async (req, res) => {
  try {
    const data = await dashService.getSummary();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve dashboard summary' });
  }
};

exports.category = async (req, res) => {
  try {
    const data = await prisma.record.groupBy({
      by: ['category'],
      where: {
        type: 'EXPENSE'
      },
      _sum: { amount: true }
    });

    const formatted = data.map(d => ({
      category: d.category,
      total: d._sum.amount || 0
    }));

    res.json({ success: true, data: formatted });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch category data" });
  }
};
exports.recent = async (req, res) => {
  const data = await prisma.record.findMany({
    where: {},
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  res.json({ success: true, data });
};

const formatFinance = (data) => {
  return data.map(d => {
    const income = d.income || 0;
    const expense = d.expense || 0;

    const ebitda = income - expense;
    const tax = ebitda * 0.1;
    const pat = ebitda - tax;

    return {
      period: d.period,
      income,
      expense,
      ebitda,
      pat
    };
  });
};

exports.monthlyFinance = async (req, res) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        strftime('%Y-%m', createdAt) as period,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
      FROM record
      GROUP BY period
      ORDER BY period;
    `;

    res.json({ success: true, data: formatFinance(data) });

  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch monthly finance" });
  }
};

exports.quarterlyFinance = async (req, res) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        strftime('%Y', createdAt) || '-Q' || ((strftime('%m', createdAt)-1)/3 + 1) as period,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
      FROM record
      GROUP BY period
      ORDER BY period;
    `;

    res.json({ success: true, data: formatFinance(data) });

  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch quarterly finance" });
  }
};

exports.yearlyFinance = async (req, res) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        strftime('%Y', createdAt) as period,
        SUM(CASE WHEN type = 'INCOME' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) as expense
      FROM record
      GROUP BY period
      ORDER BY period;
    `;

    res.json({ success: true, data: formatFinance(data) });

  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch yearly finance" });
  }
};

exports.categoryBreakdown = async (req, res) => {
  const data = await prisma.record.groupBy({
  by: ['category'],
  where: {
    type: 'EXPENSE'
  },
  _sum: { amount: true },
  orderBy: {
    _sum: { amount: 'desc' }
  }
});

  const formatted = data.map(d => ({
    category: d.category,
    total: d._sum.amount || 0
  }));

  res.json({ success: true, data: formatted });
};