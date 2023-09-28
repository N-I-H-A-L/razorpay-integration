import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PaymentSuccess from "./components/paymentSuccess.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element = {<Home />} />
        <Route path='/paymentsuccess' element = {<PaymentSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
