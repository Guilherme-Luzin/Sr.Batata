import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Cardapio from './components/Cardapio.jsx'
import Contato from './components/Contato.jsx'
import Carrinho from './components/Carrinho.jsx'

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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
