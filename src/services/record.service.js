const prisma = require('../utils/prisma');

exports.createRecord = async (data) => {
  return prisma.record.create({
    data: {
      ...data,
      date: data.date ? new Date(data.date) : new Date()
    }
  });
};

exports.getRecords = (query) => {
  return prisma.record.findMany(query);
};