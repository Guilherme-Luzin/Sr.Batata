import { Link } from 'react-router-dom';
import BotaoDeVoltar from './BotaoDeVoltar';
import { ShoppingCart } from 'lucide-react';

function Navbar({voltarVisivel}) {

  return (
    <header className="bg-[#FFD873] text-brown-900 shadow-md flex">
      <BotaoDeVoltar visible={voltarVisivel} />
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold px-4">
          Sra. Batata
        </Link>
        <nav className="space-x-4 flex">
          <h3 className='text-black'> | </h3>
          <Link to="/cardapio" className="gap-2 px-4 items-center">Cardápio</Link>
          <h3 className='text-black'> | </h3>
          <Link to="/contato" className="gap-2 px-4 items-center">Contato</Link>
          <h3 className='text-black'> | </h3>
          <Link to="/carrinho" className='gap-2 px-4 items-center' title='Carrinho'>
            <ShoppingCart />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;