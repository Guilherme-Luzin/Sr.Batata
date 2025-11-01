import { Link } from 'react-router-dom';
import BotaoDeVoltar from '../components/BotaoDeVoltar';
import { useNavigate } from 'react-router-dom';

function Navbar({voltarVisivel}) {
  const navigate = useNavigate(); 

  return (
    <header className="bg-[#FFD873] text-brown-900 shadow-md flex w-screen">
      <BotaoDeVoltar visible={voltarVisivel} />
      <div className="flex items-center">
        <img src='/imgs/Sra.BatataNoCarrinho.png'
            className="w-10 h-auto inline-block ml-2 hover:cursor-pointer"
            alt="Sra. Batata"
            onClick={() => navigate('/app-admin')} />
        <nav className="space-x-4 flex">
          <h3 className='text-[#843E1B]'> | </h3>
          <Link to="/itens-admin" className="gap-2 items-center">Itens</Link>
          <h3 className='text-[#843E1B]'> | </h3>
          <Link to="/categorias" className="gap-2 items-center">Categorias</Link>
          <h3 className='text-[#843E1B]'> | </h3>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;