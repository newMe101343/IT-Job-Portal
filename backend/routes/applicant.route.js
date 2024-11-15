const router = require('express').Router();
const { registerApplicant, anotherRouteHandler, sigIn } = require('../controllers/applicant.controller');

router.post('/register', registerApplicant);

router.post('/sigin', sigIn);

// Another route
router.get('/another-route', anotherRouteHandler);

module.exports = router;
