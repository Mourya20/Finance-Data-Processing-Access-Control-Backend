const prisma3 = new (require('@prisma/client').PrismaClient)();

exports.getSummary = async () => {
  const income = await prisma3.record.aggregate({ _sum: { amount: true }, where: { type: 'INCOME' } });
  const expense = await prisma3.record.aggregate({ _sum: { amount: true }, where: { type: 'EXPENSE' } });
  return {
    totalIncome: income._sum.amount || 0,
    totalExpense: expense._sum.amount || 0,
    netBalance: (income._sum.amount || 0) - (expense._sum.amount || 0)
  };
};
