import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import{BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproducts from './components/Getproducts';
import Addproduct from './components/Addproduct';
import MakePayment from './components/Makepayment';
// import Makepayment from './components/Makepayment';    



function App() {
  return (
    <BrowserRouter>
     <div className="App">
      <header className="App-header">
        <h1>Sokogarden - Buy & Sell</h1>
        
      </header>

        

      <nav className='mt-3'>
        <Link to="/" className='p-2 btn btn-dark text-light'>Home</Link> | {" "}
        <Link to="/signup" className='p-2 btn btn-dark text-light'>Sign Up</Link> | {" "}
        <Link to="/signin" className='p-2 btn btn-dark text-light'>Sign In</Link> | {" "}
        <Link to="/addproduct" className='p-2 btn btn-dark text-light'>Add Products</Link>

      {/* routes */}
      <Routes>
        {/* Home - get products elements */}
        <Route path='/' element={<Getproducts/>}/>
        {/* "/" symbolizes the first page or component loaded when the app is launched. It serves as the default landing page for users when they access the application. In this case, it will render the Getproducts component, which likely displays a list of products available for purchase or sale on the Sokogarden platform. */}
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/addproducts' element={<Addproduct/>}/>
        <Route path='/makepayment' element={<MakePayment/>}/>
      </Routes>
      </nav>

      {/* navigation links or buttons */}
     
     </div>
    </BrowserRouter>
  );
};

export default App;
