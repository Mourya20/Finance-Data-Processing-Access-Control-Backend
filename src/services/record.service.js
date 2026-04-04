const prisma = require('../utils/prisma');

exports.createRecord = async (data) => {
  return prisma.record.create({
    data
  });
};

exports.getRecords = (query) => {
  return prisma.record.findMany(query);
};