import { Link } from 'react-router-dom';
import BotaoDeVoltar from './BotaoDeVoltar';
import { ShoppingCart } from 'lucide-react';

function Navbar({voltarVisivel}) {

  return (
    <header className="bg-[#FFD873] text-brown-900 shadow-md flex w-screen">
      <BotaoDeVoltar visible={voltarVisivel} />
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 px-1 text-2xl font-bold ">
          Sra. Batata
        </Link>
        <nav className="space-x-4 flex">
          <h3 className='text-[#843E1B]'> | </h3>
          <Link to="/cardapio" className="gap-2 items-center">Cardápio</Link>
          <h3 className='text-[#843E1B]'> | </h3>
          <Link to="/contato" className="gap-2 items-center">Contato</Link>
          <h3 className='text-[#843E1B]'> | </h3>
          <Link to="/carrinho" className='gap-2 items-center' title='Carrinho'>
            <ShoppingCart />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;