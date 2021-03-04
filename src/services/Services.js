/**
 * @file handles API response services
 * @author Collins <collinspro18@gmail.com>
 */

const axios = require("axios").default;
const OrderRepository = require("../Data/Repository/OrderRepository");

class Services {
  /**
   * @description Handles success responses
   * @param  origin ["START_LATITUDE", "START_LONGITUDE"],
   * @param  destination ["END_LATITUDE", "END_LONGITUDE"]
   * @return Object
   */
  static async order(origin, destination) {
    try {
      let newDistance = await axios({
        method: "get",
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=${process.env.API_KEY}`,
        responseType: "json",
      });
      let element = [];
      newDistance.data.rows.map((row) => {
        element = row.elements;
      });
      let newOrder = await OrderRepository.create({
        distance: element[0].distance.text,
      });
      return newOrder;
    } catch (error) {
      if (error.message) {
        return { error: error.message, status: error.status || 500 };
      }
      return { error: "Error creating order", status: "err.status || 500" };
    }
  }

  static async takeOrder(id, status) {
    try {
      let order = await OrderRepository.getOrder(id);
	  console.log(order);
      if (order && order.status === "UNASSIGNED") {
        order.status = status;
        await order.save();
		console.log(order)
        return { status: "success" };
      }

	  throw {message :'order already taken'}
  
    } catch (err) {
		console.log(err)
      if (err.message) {
        return { error: err.message };
      }
      return { error: "Error taking user order" };
    }
  }

  static async pageinatOrders(page,limit){
	try{
		const orders = await OrderRepository.pageinateOrders(parseInt(page),parseInt(limit));
		return(orders);
	}catch(err){
		if(err.message){
			return {error:err.message};
		}
		return {error:'error getting orders'}
	}


  }


}

module.exports = Services;
