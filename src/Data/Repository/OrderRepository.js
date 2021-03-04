const  OrderModel = require('../Models/Order');

class OrderRepository{

    static async create(data){
        return OrderModel.create(data);
    }
    static async getOrder(id){
            return OrderModel.findOne({_id:id});
    }
    static async pageinateOrders(page,limit){
        let pages = await OrderModel.find({})
        .sort({})
        .skip(page * limit)
        .limit(page)
        .exec()
        return pages;
    }

}
module.exports =  OrderRepository;

