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
    element: <AppAdmin />,
  },
  {
    path: "/pratos",
    element: <Pratos />,
  },
  {
    path: "/categorias",
    element: <Categorias />,
  },
  {
    path: "/cadastro-prato",
    element: <CadastroPrato />,
  },
  {
    path: "/cadastro-categoria",
    element: <CadastroCategoria />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
