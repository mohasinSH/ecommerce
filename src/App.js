import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { Routes,Route } from "react-router-dom";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from "./Orders";
const promise = loadStripe('pk_test_51PPq432Nlafg0cnojkWrfeokUqg2Xnn1pcR2Bog0lkPgg08NvUmLFX9sMoXebg9QTAqdXG8eorX1DCuTtGUuMhEi00OJ5G6CJ9')


function App() {
  const [{},dispatch] = useStateValue();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type:'SET_USER',
          user:user
        })
      } else {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    });
  },[])
  return (
    <div className="App">

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<><Header/><Home/></>}/>
      <Route path='/orders' element={<Orders/>}/>
      
      <Route path='/payment' element={<>
      <Header/>
        <Elements stripe={promise}>
        <Payment/>
        </Elements>
      </>}/>
      <Route path='/checkout' element={<><Header/><Checkout/></>} />
    </Routes>
    </div>
  );
}


export default App;
