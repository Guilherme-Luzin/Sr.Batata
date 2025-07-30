import { Utensils, Beef, Shrimp, Drumstick, Leaf, FlameKindling } from 'lucide-react';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Footer from './Footer';

const formatarPreco = (preco) => {
    return parseFloat(preco).toFixed(2);
}

const batatas = [
  {
    nome: 'Batata com Frango',
    descricao: 'Frango desfiado com catupiry e mussarela ou cheddar',
    moeda: "R$",
    preco: formatarPreco(25.00),
    icone: <Drumstick className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Batata com Calabresa',
    descricao: 'Calabresa refogada com cebola, bacon e queijo',
    moeda: "R$",
    preco: formatarPreco(25.00),
    icone: <FlameKindling className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Batata com Camarão',
    descricao: 'Camarão ao alho e óleo com requeijão e queijo',
    moeda: "R$",
    preco: formatarPreco(35.00),
    icone: <Shrimp className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Strogonoff de Frango',
    descricao: 'Strogonoff cremoso com arroz e batata palha',
    moeda: "R$",
    preco: formatarPreco(25.00),
    icone: <Utensils className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Camarão Cremoso',
    descricao: 'Camarão ao molho cremoso com queijo',
    moeda: "R$",
    preco: formatarPreco(35.00),
    icone: <Shrimp className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Carne Moída Cremosa',
    descricao: 'Carne moída com creme e queijo',
    moeda: "R$",
    preco: formatarPreco(25.00),
    icone: <Beef className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Brócolis com Bacon',
    descricao: 'Brócolis cremoso com queijo e bacon',
    moeda: "R$",
    preco: formatarPreco(25.00),
    icone: <Leaf className="w-5 h-5 inline mr-1" />
  }
];

function Cardapio() {
  const [carrinho, setCarrinho] = useState(() => {
    let carrinhoString = localStorage.getItem('carrinho');
    return !carrinhoString ? [] : JSON.parse(carrinhoString);
  })

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho([...carrinho, item]);

    definirQuantidadeDeItem(item.nome);
  };

  const removerItem = (item) => {
    const index = carrinho.findIndex((i) => i.nome === item.nome);

    if(index < 0)
      return;

    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const definirQuantidadeDeItem = (nomeDoItem) => {
    const quantidade = carrinho.filter((i) => i.nome === nomeDoItem);
    return quantidade ? quantidade.length : 0;
  }

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
      <div>
        <Navbar voltarVisivel={true}/>
        <h2 className="text-3xl font-bold mb-8 text-center text-[#843E1B]">Nosso Cardápio</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {batatas.map((item, index) => (
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
                    {definirQuantidadeDeItem(item.nome)}
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
      </div>
      <Footer />
    </section>
  );
}

export default Cardapio;