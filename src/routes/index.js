/**
 * @file Handles requests
 * @author Collins <collinspro18@gmail.com>
 */

const router = require('express').Router();
const ServiceController = require('../controllers/ServiceController');

/**
 * @action create an order
 * @query origin: []
 * @query destination: []
 */
router.get('/', (req, res) => res.send('Welcome to GoogleMaps API integrations'));
router.post('/orders', ServiceController.order);

module.exports = router;
