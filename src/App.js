import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { Routes,Route } from "react-router-dom";
import Login from "./Login";
function App() {
  return (
    <div className="App">

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<><Header/><Home/></>}/>
      <Route path='/checkout' element={<><Header/><Checkout/></>} />
    </Routes>
    </div>
  );
}


export default App;
