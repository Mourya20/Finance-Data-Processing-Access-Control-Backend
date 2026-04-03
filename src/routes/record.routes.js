const router2 = require('express').Router();
const ctrl2 = require('../controllers/record.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
router2.post('/', auth, role(['ADMIN']), ctrl2.create);
router2.get('/', auth, ctrl2.getAll);
router2.put("/:id", auth, role(["ADMIN"]), ctrl2.update);
router2.delete("/:id", auth, role(["ADMIN"]), ctrl2.remove);

module.exports = router2;
