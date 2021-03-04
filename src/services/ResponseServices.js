/**
 * @file handles API response services
 * @author Collins <collinspro18@gmail.com> <2/09/2020 2:02am>
 */

class ResponseServices {
	/**
	 * @description Handles success responses
	 * @param  id
	 * @param  distance
	 * @return Object
	 */
	static async successResponse(id, distance, status = 'UNASSIGNED') {
		return { code, data, api };
	}

	/**
	 * @description Handles error responses
	 * @param  error error message
	 * @return Object
	 */
	static async errorResponse(error = 'Server error') {
		return { error };
	}
}

module.exports = ResponseServices;
