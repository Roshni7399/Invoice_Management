import './App.css';
import { Routes, Route} from "react-router-dom";
import Admin from './Components/Admin Login';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import Addcustomer from './Components/Addcustomerform'
import Sidebar from './Components/Sidebar';
import Managecustomer from './Components/Managecustomer';
import Manageinvoice from './Components/Manageinvoice';
import Updatecustomer from './Components/Updatecustomer';
import Addinvoice from './Components/Addinvoice';
import Updateinvoice from './Components/Updateinvoice';
import Contact from './Components/Contact';
import { ToastContainer, toast } from "react-toastify";
import ProtectedOutlet from './Components/Protected';
import Profile from './Components/Profile';
import Viewcustomer from './Components/Viewcustomer';

function App() {
  return (
    <div>
   <Navbar/>
   <ToastContainer/>
   <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="About" element={<About/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/admin/login" element={<Admin/>}/>
        <Route element={<ProtectedOutlet/>}>
            <Route path="/Addcustomer" element={<Addcustomer/>}/>
            <Route path="/Sidebar" element={<Sidebar/>}/>
            <Route path="/Managecustomer" element={<Managecustomer/>}/>
            <Route path="/Manageinvoice" element={<Manageinvoice/>}/>
            <Route path="/Updatecustomer/:id" element={<Updatecustomer/>}/>
            <Route path="/Addinvoice" element={<Addinvoice/>}/>
            <Route path="/Updateinvoice/:id" element={<Updateinvoice/>}/>
            <Route path="/Viewcustomer/:id" element={<Viewcustomer/>}/>
            <Route path="Profile" element={<Profile/>}/>
        </Route>
        </Routes>
    </div>
  );
}

export default App;
