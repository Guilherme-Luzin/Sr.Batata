import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Cardapio from './components/Cardapio.jsx'
import Contato from './components/Contato.jsx'
import Carrinho from './components/Carrinho.jsx'
import Login from './adminComponents/Login.jsx'
import { AuthProvider } from './context/AuthContext'
import CadastroPrato from './adminComponents/CadastroPrato.jsx'
import CadastroCategoria from './adminComponents/CadastroCategoria.jsx'
import AppAdmin from './adminComponents/AppAdmin.jsx'
import Pratos from './adminComponents/Pratos.jsx'
import Categorias from './adminComponents/Categorias.jsx'
import ProtectedRoute from './adminComponents/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cardapio",
    element: <Cardapio />,
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
    path: "/pratos",
    element: <ProtectedRoute> <Pratos /> </ProtectedRoute>,
  },
  {
    path: "/categorias",
    element: <ProtectedRoute> <Categorias /> </ProtectedRoute>,
  },
  {
    path: "/cadastro-prato",
    element: <ProtectedRoute> <CadastroPrato /> </ProtectedRoute>,
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
