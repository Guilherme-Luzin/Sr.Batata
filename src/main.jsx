import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Itens from './components/Itens.jsx'
import Contact from './components/Contact.jsx'
import Cart from './components/Cart.jsx'
import Login from './adminComponents/Login.jsx'
import { AuthProvider } from './context/AuthContext'
import ItensRegistration from './adminComponents/ItensRegistration.jsx'
import CategoryRegistration from './adminComponents/CategoryRegistration.jsx'
import AppAdmin from './adminComponents/AppAdmin.jsx'
import ItensAdmin from './adminComponents/ItensAdmin.jsx'
import CategoriesAdmin from './adminComponents/CategoriesAdmin.jsx'
import ProtectedRoute from './adminComponents/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/itens",
    element: <Itens />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app-admin",
    element: <ProtectedRoute> <AppAdmin /> </ProtectedRoute>,
  },
  {
    path: "/itens-admin",
    element: <ProtectedRoute> <ItensAdmin /> </ProtectedRoute>,
  },
  {
    path: "/categories",
    element: <ProtectedRoute> <CategoriesAdmin /> </ProtectedRoute>,
  },
  {
    path: "/itens-registration",
    element: <ProtectedRoute> <ItensRegistration /> </ProtectedRoute>,
  },
  {
    path: "/category-registration",
    element: <ProtectedRoute> <CategoryRegistration /> </ProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
