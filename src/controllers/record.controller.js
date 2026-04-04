const service = require('../services/record.service');

exports.create = async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing amount. Positive number required.'
      });
    }

    if (!type || !['INCOME', 'EXPENSE'].includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or missing type. Must be INCOME or EXPENSE.'
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: category.'
      });
    }

    const record = await service.createRecord({
      ...req.body,
      userId: req.user.id,
      date: date ? new Date(date) : new Date()
    });

    res.status(201).json({ success: true, data: record });

  } catch (err) {
    console.error('Record Creation Error:', err);

    res.status(500).json({
      success: false,
      error: 'Record creation failed due to an internal server error.'
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const records = await service.getRecords({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      where: search ? {
  OR: [
    { notes: { contains: search } },
    { category: { contains: search } }
  ]
} : {} 
    });
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to retrieve records' });
  }
};
exports.update = async (req, res) => {
  const id = Number(req.params.id);
  const record = await prisma.record.update({
    where: { id },
    data: req.body
  });
  res.json({ success: true, data: record });
};

exports.remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.record.delete({ where: { id } });
  res.json({ success: true, data: { message: "Deleted" } });
};
