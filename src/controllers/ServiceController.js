/**
 * @file Handles Chat's Services
 * @author Collins <collinspro18@gmail.com>
 */

const asyncHandler = require('../utilities/asyncHandler');
const Services = require('../services/Services');

module.exports = {
	/**
	 * Create an order
	 * @query origin: []
	 * @query destination: []
	 * @route /order
	 */
	order: asyncHandler(async (req, res) => {
		let { origin, destination } = req.body;
		res.send(await Services.order(origin, destination));
	}),
};
