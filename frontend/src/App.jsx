import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Movements from './pages/Movements';


export default function App() {
return (
<Router>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/products" element={<Products />} />
<Route path="/movements" element={<Movements />} />
</Routes>
</Router>
);
}