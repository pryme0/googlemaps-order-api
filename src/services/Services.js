/**
 * @file handles API response services
 * @author Collins <collinspro18@gmail.com>
 */

const axios = require('axios').default;
const { successResponse, errorResponse } = require('./ResponseServices');

class Services {
	/**
	 * @description Handles success responses
	 * @param  origin ["START_LATITUDE", "START_LONGITUDE"],
	 * @param  destination ["END_LATITUDE", "END_LONGITUDE"]
	 * @return Object
	 */
	static async order(origin, destination) {
		try {
			axios({
				method: 'get',
				url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin[0]},${origin[1]}&destinations=${destination[0]},${destination[1]}&key=${process.env.API_KEY}`,
				responseType: 'json',
			}).then(async (res) => {
				let element = [];
				res.data.rows.map((row) => {
					element = row.elements;
				});
				console.log(element);
				return await successResponse(id, element[0].distance.text, element[0].status);
			});
		} catch (error) {
			console.log(error.message);
		}
	}
}

module.exports = Services;
