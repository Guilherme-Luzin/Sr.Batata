import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Footer from './Footer';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import formatValue from '../utils/FormatValue';
import { ItensRepository } from '../repositories/ItensRepository';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

function Itens() {
  const navigate = useNavigate(); 
  const [activeTab, setActiveTab] = useState('');
  const [itens, setItens] = useState();
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingItens, setLoadingItens] = useState(true);
  const [categories, setCategories] = useState();

  const [cart, setCart] = useState(() => {
    let cartString = localStorage.getItem('cart');
    return !cartString ? [] : JSON.parse(cartString);
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoadingItens(true);
      try {
        if(activeTab === '' && categories && categories.length > 0)
          setActiveTab(categories[0].nome);

        if(activeTab === '' || !activeTab){
          setLoadingItens(false);
          return;
        }

        let itens = await ItensRepository.getItensByCategory(activeTab);

        setItens(itens); 
      } catch (error) {
        alert("Erro ao buscar itens do cardápio:", error);
      }
      setLoadingItens(false);
    };
    fetchData();
  }, [activeTab, categories]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingCategories(true);

      try {
        let categoriesItens = await CategoriesRepository.getCategories();

        setCategories(categoriesItens);
        setActiveTab(categoriesItens[0].nome);
      } catch (error) {
        alert("Erro ao buscar categorias:", error);
      }

      setLoadingCategories(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeIten = (item) => {
    const index = cart.findIndex((i) => i.name === item.name
                                  && i.category === item.category);

    if(index < 0)
      return;

    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const setItenQuantity = (item) => {
    const quantity = cart.filter((i) => i.name === item.name
                                        && i.category === item.category); 
                                        
    return quantity ? quantity.length : 0;
  }

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
      <div>
        <Navbar backVisible={true}/>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#843E1B]">Nosso Cardápio</h2>

        {loadingCategories 
        ? (<p className="text-center text-[#843E1B]">Carregando categorias...</p>)
        : <div className="flex justify-center gap-4 mb-6">
            {categories?.map((tab) => (
              <button
                key={tab.name}
                className={`px-4 py-2 rounded-full font-semibold ${
                  activeTab === tab.name
                    ? 'bg-yellow-400 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        }

        {loadingItens 
        ? (<p className="text-center text-[#843E1B]">Carregando itens...</p>)
        : <div className="grid gap-6 md:grid-cols-2">
            {itens?.map((item, index) => (
              <div key={index} className="bg-[#FFD873] rounded-xl shadow p-6">
                <div className='flex space-x-4'>
                  <h3 className="text-xl font-semibold mb-2 flex items-center text-[#843E1B]">{item.icon} {item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeIten(item)}
                      className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-[#843E1B] font-medium">
                      {setItenQuantity(item)}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                  <p className="mb-2 text-brown-700 text-[#843E1B]">{item.description}</p>
                  <p className="font-bold text-brown-900 text-[#843E1B]">{formatValue(item.value)}</p>
              </div>
            ))}
          </div>
        }
        <div className="grid gap-6 md:grid-cols-2">
        </div>
        {cart.length > 0 && (
          <button
            onClick={() => navigate('/cart')}
            className={`
              fixed bottom-6 right-6 z-50 flex items-center 
              bg-[#843E1B] text-white 
              px-4 py-3 rounded-full shadow-lg
              transition
            `}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ver Carrinho ({cart.length})
          </button>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default Itens;