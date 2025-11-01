import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Itens from './components/Itens.jsx'
import Contato from './components/Contato.jsx'
import Carrinho from './components/Carrinho.jsx'
import Login from './adminComponents/Login.jsx'
import { AuthProvider } from './context/AuthContext'
import CadastroItens from './adminComponents/CadastroItens.jsx'
import CadastroCategoria from './adminComponents/CadastroCategoria.jsx'
import AppAdmin from './adminComponents/AppAdmin.jsx'
import ItensAdmin from './adminComponents/ItensAdmin.jsx'
import Categorias from './adminComponents/Categorias.jsx'
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
    path: "/contato",
    element: <Contato />,
  },
  {
    path: "/carrinho",
    element: <Carrinho />,
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
    path: "/categorias",
    element: <ProtectedRoute> <Categorias /> </ProtectedRoute>,
  },
  {
    path: "/cadastro-itens",
    element: <ProtectedRoute> <CadastroItens /> </ProtectedRoute>,
  },
  {
    path: "/cadastro-categoria",
    element: <ProtectedRoute> <CadastroCategoria /> </ProtectedRoute>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
