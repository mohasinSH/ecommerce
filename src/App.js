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
import Orders from "./Orders";
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
       
        <Payment/>
        
      </>}/>
      <Route path='/checkout' element={<><Header/><Checkout/></>} />
    </Routes>
    </div>
  );
}


export default App;
