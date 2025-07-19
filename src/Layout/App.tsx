import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Eagerly loaded components for critical paths
import Login from '../pages/Login';
import Header from '../components/Header';
import ProductList from '../pages/Products';
import ProtectedRoute from '../services/ProtectedRoute';

// Lazy-loaded components for secondary paths
const Wishlist = lazy(() => import('../pages/Wishlist'));
const Profile = lazy(() => import('../pages/Profile'));
const Cart = lazy(() => import('../pages/Bag'));
const NotFound = lazy(() => import('../pages/NotFound'));
const PaymentFailure = lazy(() => import('../pages/Failure'));
const PaymentSuccess = lazy(() => import('../pages/Suceess'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mainContent">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/bag" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/failure" element={<PaymentFailure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
