import React, { useEffect,useState } from 'react'
import './Payment.css'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
import { Link, useNavigate } from 'react-router-dom'
import {db} from './firebase'
import { getFirestore, doc, collection, setDoc } from "firebase/firestore"; 
import Axios from './axios'
import axios from 'axios'
import { toast } from 'react-toastify';
const Payment = () => {
    const navigate = useNavigate();
    const [{user,basket},dispatch] = useStateValue();
    console.log(user)
    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState('');
    const [error,setError] = useState();
    const [disabled,setDisabled] = useState();
    const [clientSecret,setClientSecret] = useState(true);
    const getTotal = (basket)=>{
       return basket?.reduce((acc,val)=> acc+val.price,0)
    }
   
    const handlePayment =  () => {
        const amount = getTotal(basket)
        try {
          const res =  axios.post('http://127.0.0.1:5001/ecommerce-34747/us-central1/api/order', { amount }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res)=>{
            const data = res.data;
          console.log(data);
          handlePaymentVerify(data.data)
          });
    
          
        } catch (error) {
          console.log(error);
        }
       
      };
      
      const handlePaymentVerify = async (data) => {
        const options = {
            key: 'rzp_test_buOHm2NXFkUpvU',
            amount: data.amount,
            currency: data.currency,
            name: "Mohasin",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                
            //   db.collection('users').doc(user?.uid).collection('orders').doc(response.razorpay_payment_id).set({
            //     basket:basket,
            //     amount:data.amount/100,
            //     created: data.created_at
            //   })
            if (user?.uid) {
                const userDocRef = doc(db, 'users', user.uid);
                const ordersCollectionRef = collection(userDocRef, 'orders');
                const orderDocRef = doc(ordersCollectionRef, response.razorpay_payment_id);
              
                setDoc(orderDocRef, {
                  basket: basket,
                  amount: data.amount / 100,
                  created: data.created_at
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
              }
                try {
                    const res = await fetch(`http://127.0.0.1:5001/ecommerce-34747/us-central1/api/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })
    
                    const verifyData = await res.json();
    
                    if (verifyData.message) {
                        // toast.success(verifyData.message)
                        navigate('/orders')
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    

    const handleChange = event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message:'');
    }
  return (
    <div className='payment'>
      <div className='payment__container'>
      <h1>
        Checkout (
            <Link to='/checkout'>{basket?.length} items</Link>
        )
      </h1>
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__adress'>
                <p>{user?.email}</p>
                <p>123 React</p>
                <p></p>
            </div>
        </div>
        <div className='payment__section'>
        <div className='payment__title'>
            <h3>Review items and delivery</h3>
        </div>
        <div className='payment__items'>
            {
                basket.map(item =>(
                    <CheckoutProduct
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price ={item.price}
                    rating = {item.rating}/>
                ))
            }
        </div>
        </div>
        <div className='payment__section'>
        {/* <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div> */}
        <div className='payment__details'>
            {/* <form onSubmit={handlePayment}>
                <CardElement onChange={handleChange}/>
                <div className='payment__priceContainer'>
                <CurrencyFormat
                renderText={(value) => (
                 <h3>Order Total: {value}</h3>
                )}
                 decimalScale={2}
                 value={basket?.reduce((acc,val)=> acc+val.price,0)}
            displayType={"text"}
                thousandSeparator={true}
            prefix={"$"}/>
             <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p>:'Buy Now'}</span>
             </button>
                </div>

            </form> */}
            <button onClick={handlePayment} disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p>:'Buy Now'}</span>
             </button>
        </div>     
        </div>
      </div>
    </div>
  )
}

export default Payment

//MohasinS@2024Stripe!