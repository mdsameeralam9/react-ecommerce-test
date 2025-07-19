import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from '../pages/Login';
import Header from '../components/Header';
import ProductList from '../pages/Products';
import Wishlist from '../pages/Wishlist';
import Profile from '../pages/Profile';
import Cart from '../pages/Bag';
import ProtectedRoute from '../services/ProtectedRoute';

// Lazy-loaded components
const NotFound = lazy(() => import('../pages/NotFound'));
const PaymentFailure = lazy(() => import('../pages/Failure'));
const PaymentSuccess = lazy(() => import('../pages/Suceess'));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="mainContent">

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<ProductList />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/bag" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Lazy-loaded routes */}
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/failure" element={<PaymentFailure />} />
            <Route path="*" element={<NotFound />} />
          </Suspense>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
