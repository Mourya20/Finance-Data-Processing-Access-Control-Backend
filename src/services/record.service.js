const prisma = require('../utils/prisma');

exports.createRecord = async (data) => {
  return prisma.record.create({
    data
  });
};
exports.getRecords = (query) => prisma2.record.findMany(query);
