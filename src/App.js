// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import Menu from './components/Menu'; // ✅ Import Menu




// function App() {
//   return (
//     <Router>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/menu" element={<Menu />} /> {/* ✅ Add this */}
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
       
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Menu from './components/Menu';
import OrdersPage from './components/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify'; // ✅ Toast container
import 'react-toastify/dist/ReactToastify.css'; // ✅ Toast styles

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer /> {/* ✅ Add this line to show toast messages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
