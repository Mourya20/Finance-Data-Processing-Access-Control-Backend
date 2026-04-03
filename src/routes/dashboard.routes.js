const router3 = require('express').Router();
const ctrl3 = require('../controllers/dashboard.controller');
const auth2 = require('../middleware/auth.middleware');

router3.get('/summary', auth2, ctrl3.summary);
router3.get('/category', auth2, ctrl3.category);
router3.get('/recent', auth2, ctrl3.recent);
router3.get('/finance/monthly', auth2, ctrl3.monthlyFinance);
router3.get('/finance/quarterly', auth2, ctrl3.quarterlyFinance);
router3.get('/finance/yearly', auth2, ctrl3.yearlyFinance);
router3.get('/category-breakdown', auth2, ctrl3.categoryBreakdown);

module.exports = router3;
