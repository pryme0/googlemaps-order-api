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
		const newOrder = await Services.order(origin, destination)
		newOrder.error?res.status(newOrder.status|| 500).json(newOrder):res.status(200).json(newOrder);
	}),
	takeOrder:asyncHandler(async(req,res)=>{
		const id=req.params.id;
		console.log(id)
		const { status} = req.body;
		const  takeOrder = await Services.takeOrder(id,status);
		takeOrder.error?res.status(takeOrder.status||400).json(takeOrder):res.status(200).json(takeOrder);
	}),
	paginateOrder:asyncHandler(async(req,res)=>{
		const {page,limit}=req.query;
		const  paginateOrder = await Services.pageinatOrders(page,limit);
		paginateOrder.error?res.status(paginateOrder.status||400).json(paginateOrder):res.status(200).json(paginateOrder);
	})
};
