
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express")
const cors = require('cors');

const  Razorpay  = require('razorpay');
const  crypto = require( 'crypto');
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_buOHm2NXFkUpvU',
  key_secret: 'E8bho9ADyy6vaGpMdiFEyBwL',
});

const app = express();
app.use(cors({origin:true}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('hello world')
    
});

app.post('/order', (req, res) => {
  console.log(req.body)
const { amount } = req.body;

try {
    const options = {
        amount: Number(amount * 100),
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    }

    razorpayInstance.orders.create(options, (error, order) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
        res.status(200).json({ data: order });
        console.log(order)
    });
} catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
}
})


app.post('/verify', async (req, res) => {
  console.log("reached")
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // console.log("req.body", req.body);

  try {
      // Create Sign
      const sign = razorpay_order_id + "|" + razorpay_payment_id;

      // Create ExpectedSign
      const expectedSign = crypto.createHmac("sha256", 'E8bho9ADyy6vaGpMdiFEyBwL')
          .update(sign.toString())
          .digest("hex");

      // console.log(razorpay_signature === expectedSign);

      // Create isAuthentic
      const isAuthentic = expectedSign === razorpay_signature;

      // Condition 
      // if (isAuthentic) {
      //     const payment = new Payment({
      //         razorpay_order_id,
      //         razorpay_payment_id,
      //         razorpay_signature
      //     });

      //     // Save Payment 
      //     await payment.save();

      //     // Send Message 
      //     res.json({
      //         message: "Payement Successfully"
      //     });
      // }
            res.json({
              message: "Payement Successfully"
          });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
      console.log(error);
  }
})

exports.api = onRequest(app)


// http://127.0.0.1:5001/ecommerce-34747/us-central1/api