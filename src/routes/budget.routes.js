const router = require('express').Router();
const ctrl = require('../controllers/budget.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

router.post('/', auth, role(['ADMIN']), ctrl.createBudget);
router.get('/check', auth, ctrl.checkBudget);

module.exports = router;