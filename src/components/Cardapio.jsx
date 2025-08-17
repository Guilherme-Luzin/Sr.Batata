import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../context/FirebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import formatarPreco from '../utils/formatarPreco';

function Cardapio() {
  const navigate = useNavigate(); 
  const [tabAtiva, setTabAtiva] = useState('500g');
  const [cardapio, setCardapio] = useState();
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [loadingCardapio, setLoadingCardapio] = useState(true);
  const [categorias, setCategorias] = useState();

  const [carrinho, setCarrinho] = useState(() => {
    let carrinhoString = localStorage.getItem('carrinho');
    return !carrinhoString ? [] : JSON.parse(carrinhoString);
  })
  const [categoriasLocais, setCategoriasLocais] = useState(() => {
    let categoriasLocaisString = localStorage.getItem('categoriasLocais');
    return !categoriasLocaisString ? [] : JSON.parse(categoriasLocaisString);
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCardapio(true);
      try {
        const q = query(
          collection(db, "cardapio"),
          where("categoria", "==", tabAtiva)
        );
        const querySnapshot = await getDocs(q);
        const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCardapio(itens);
      } catch (error) {
        alert("Erro ao buscar itens do cardápio:", error);
      }
      setLoadingCardapio(false);
    };
    fetchData();
  }, [tabAtiva]);

  useEffect(() => {
    if(categoriasLocais.length > 0) {
      setCategorias(categoriasLocais);
      return;
    }
    const fetchData = async () => {
      setLoadingCategorias(true);
      try {
        const q = query(
          collection(db, "categorias"),
          orderBy("nome", "asc")
        );
        const querySnapshot = await getDocs(q);
        const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategorias(itens);
      } catch (error) {
        alert("Erro ao buscar categorias:", error);
      }
      setLoadingCategorias(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("categoriasLocais", JSON.stringify(categoriasLocais));
  }, [categoriasLocais]);

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

        {loadingCategorias 
        ? (<p className="text-center text-[#843E1B]">Carregando categorias...</p>)
        : <div className="flex justify-center gap-4 mb-6">
            {categorias?.map((tab) => (
              <button
                key={tab.nome}
                className={`px-4 py-2 rounded-full font-semibold ${
                  tabAtiva === tab.nome
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setTabAtiva(tab.nome)}
              >
                {tab.nome}
              </button>
            ))}
          </div>
        }

        {loadingCardapio 
        ? (<p className="text-center text-[#843E1B]">Carregando itens...</p>)
        : <div className="grid gap-6 md:grid-cols-2">
            {cardapio?.map((item, index) => (
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
                  <p className="font-bold text-brown-900 text-[#843E1B]">{formatarPreco(item.preco)}</p>
              </div>
            ))}
          </div>
        }
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