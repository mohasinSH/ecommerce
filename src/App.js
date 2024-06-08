import Checkout from "./Checkout";
import Header from "./Header";
import Home from "./Home";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/checkout' element={<Checkout/>} />
    </Routes>
    </div>
  );
}


export default App;
