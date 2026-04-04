const prisma = require('../utils/prisma');

exports.getSummary = async () => {
  const income = await prisma.record.aggregate({ _sum: { amount: true }, where: { type: 'INCOME' } });
  const expense = await prisma.record.aggregate({ _sum: { amount: true }, where: { type: 'EXPENSE' } });
  return {
    totalIncome: income._sum.amount || 0,
    totalExpense: expense._sum.amount || 0,
    netBalance: (income._sum.amount || 0) - (expense._sum.amount || 0)
  };
};
