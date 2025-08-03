import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import batatas250g from '../ItensDoCardapio/batatas250g';
import batatas500g from '../ItensDoCardapio/batatas500g';
import sobremesas from '../ItensDoCardapio/sobremesas';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Cardapio() {
  const navigate = useNavigate(); 
  const [tabAtiva, setTabAtiva] = useState('500g');
  const [cardapio, setCardapio] = useState(batatas500g);

  useEffect(() => {
    switch (tabAtiva) {
      case '500g':
        setCardapio(batatas500g);
        break;
      case '250g':
        setCardapio(batatas250g);
        break;
      case 'Sobremesas':
        setCardapio(sobremesas);
        break;
      default:
        setCardapio(batatas500g);
        break;
    }
  }, [tabAtiva]);

  const [carrinho, setCarrinho] = useState(() => {
    let carrinhoString = localStorage.getItem('carrinho');
    return !carrinhoString ? [] : JSON.parse(carrinhoString);
  })

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);
  };

  const removerItem = (item) => {
    const index = carrinho.findIndex((i) => i.nome === item.nome
                                  && i.categoria === item.categoria);

    if(index < 0)
      return;

    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const definirQuantidadeDeItem = (item) => {
    const quantidade = carrinho.filter((i) => i.nome === item.nome
                                        && i.categoria === item.categoria); 
                                        
    return quantidade ? quantidade.length : 0;
  }

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
      <div>
        <Navbar voltarVisivel={true}/>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#843E1B]">Nosso Cardápio</h2>

        <div className="flex justify-center gap-4 mb-6">
          {['500g', '250g', 'Sobremesas'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-full font-semibold ${
                tabAtiva === tab
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => setTabAtiva(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {cardapio.map((item, index) => (
            <div key={index} className="bg-[#FFD873] rounded-xl shadow p-6">
              <div className='flex space-x-4'>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-[#843E1B]">{item.icone} {item.nome}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removerItem(item)}
                    className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-[#843E1B] font-medium">
                    {definirQuantidadeDeItem(item)}
                  </span>
                  <button
                    onClick={() => adicionarAoCarrinho(item)}
                    className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
                <p className="mb-2 text-brown-700 text-[#843E1B]">{item.descricao}</p>
                <p className="font-bold text-brown-900 text-[#843E1B]">{item.preco}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
        </div>
        {carrinho.length > 0 && (
          <button
            onClick={() => navigate('/carrinho')}
            className={`
              fixed bottom-6 right-6 z-50 flex items-center 
              bg-[#843E1B] text-white 
              px-4 py-3 rounded-full shadow-lg
              transition
            `}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ver Carrinho ({carrinho.length})
          </button>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Cardapio;