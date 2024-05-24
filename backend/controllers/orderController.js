import asyncHandler from "../middleware/asyncHandler.js";
import Order from "./../models.js/orderModel.js";

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  // res.send('add order items');
// console.log(req.body)
// console.log(req.body.orderItems)
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems?.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // console.log('ORDER',order)
    
    const createdOrder=await order.save();
    // console.log("createdOrder,",createdOrder)
    res.status(201).json(createdOrder)
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    //   res.send("get my orders");

    const orders=await Order.find({user:req.user._id});
    res.status(200).json(orders)
});

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
//   res.send("get order by id");

    const order=await Order.findById(req.params.id).populate('user','name email');
    if(order){
        res.status(200).json(order)
    } else{
        res.status(404);
        throw new Error('Order not found')
    }
    
});

// @desc update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // res.send("update order to paid");
    const order=await Order.findById(req.params.id);
    if(order){
      console.log("Req body",req.body)
      order.isPaid=true;
      order.paidAt=Date.now();
      
      //this will come from paypal
      order.paymentResult={
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email_address,
      }
      const updatedOrder=await order.save();
      res.status(200).json(updatedOrder)
    } else{
      res.status(404);
      throw new Error('Order not found')
    }
});

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // res.send("update order to delivered");
  const order=await Order.findById(req.params.id);
    if(order){
      order.isDelivered=true
      order.deliveredAt=Date.now()
      
      const updatedOrder=await order.save();
      res.status(200).json(updatedOrder)
      
    } else{
      res.status(404);
      throw new Error('Order not found')
    }

});

// @desc get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // res.send("get all orders");
  const orders=await Order.find({}).populate('user','id name');
  res.status(200).json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
