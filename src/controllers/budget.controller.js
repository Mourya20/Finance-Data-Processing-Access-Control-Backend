const prisma = require('../utils/prisma');

exports.createBudget = async (req, res) => {
  const { category, limit } = req.body;

  if (!category || !limit) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const budget = await prisma.budget.create({
    data: { category, limit }
  });

  res.status(201).json({ success: true, data: budget });
};
exports.checkBudget = async (req, res) => {
  const budgets = await prisma.budget.findMany();

  const result = [];

  for (let b of budgets) {
    const spent = await prisma.record.aggregate({
      _sum: { amount: true },
      where: {
        category: b.category,
        type: 'EXPENSE'
      }
    });

    const spentAmount = spent._sum.amount || 0;

    result.push({
      category: b.category,
      limit: b.limit,
      spent: spentAmount,
      exceeded: spentAmount > b.limit
    });
  }

  res.json({ success: true, data: result });
};