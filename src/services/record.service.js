const prisma2 = new (require('@prisma/client').PrismaClient)();

exports.createRecord = (data) => prisma2.record.create({ data });
exports.getRecords = (query) => prisma2.record.findMany(query);
