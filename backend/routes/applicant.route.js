const router = require('express').Router();
const { registerApplicant, anotherRouteHandler } = require('../controllers/applicant.controller');

// Initial register for applicant
router.post('/register', registerApplicant);

// Another route
router.get('/another-route', anotherRouteHandler);

module.exports = router;
