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


router.post('/orders', ServiceController.order);
router.patch('/orders/:id',ServiceController.takeOrder);
router.get('/orders',ServiceController.paginateOrder)

module.exports = router;
