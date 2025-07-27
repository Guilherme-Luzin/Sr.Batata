import { Utensils, Beef, Shrimp, Drumstick, Leaf, FlameKindling } from 'lucide-react';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Footer from './Footer';

const batatas = [
  {
    nome: 'Batata com Frango',
    descricao: 'Frango desfiado com catupiry e mussarela ou cheddar',
    preco: 'R$25,00',
    icone: <Drumstick className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Batata com Calabresa',
    descricao: 'Calabresa refogada com cebola, bacon e queijo',
    preco: 'R$25,00',
    icone: <FlameKindling className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Batata com Camarão',
    descricao: 'Camarão ao alho e óleo com requeijão e queijo',
    preco: 'R$35,00',
    icone: <Shrimp className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Strogonoff de Frango',
    descricao: 'Strogonoff cremoso com arroz e batata palha',
    preco: 'R$25,00',
    icone: <Utensils className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Camarão Cremoso',
    descricao: 'Camarão ao molho cremoso com queijo',
    preco: 'R$35,00',
    icone: <Shrimp className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Carne Moída Cremosa',
    descricao: 'Carne moída com creme e queijo',
    preco: 'R$25,00',
    icone: <Beef className="w-5 h-5 inline mr-1" />
  },
  {
    nome: 'Brócolis com Bacon',
    descricao: 'Brócolis cremoso com queijo e bacon',
    preco: 'R$25,00',
    icone: <Leaf className="w-5 h-5 inline mr-1" />
  }
];

function Cardapio() {
  const [carrinho, setCarrinho] = useState(() => {
    const armazenado = localStorage.getItem("carrinho");
    return armazenado ? JSON.parse(armazenado) : [];
  })
  const [quantidadeDeItens, setQuantidadeDeItens] = useState(() => {
    const armazenado = localStorage.getItem("carrinho");
    let jsonArmazenado = JSON.parse(armazenado);

    if(!jsonArmazenado || jsonArmazenado == [] || jsonArmazenado.length === 0)
      return 0;

    return jsonArmazenado.length;
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (item) => {
    setCarrinho((prev) => [...prev, item]);
    setQuantidadeDeItens((prev) => prev + 1);
  };

  const removerItem = (index) => {
    setCarrinho((prev) => prev.filter((_, i) => i !== index));
    setQuantidadeDeItens((prev) => prev ? prev - 1 : 0);
  };

  return (
    <section className="bg-[#FFEBCB] h-screen w-screen">
      <div>
        <Navbar voltarVisivel={true}/>
        <h2 className="text-3xl font-bold mb-8 text-center text-black">Nosso Cardápio</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {batatas.map((item, index) => (
            <div key={index} className="bg-[#FFD873] rounded-xl shadow p-6">
              <div className='flex space-x-4'>
                <h3 className="text-xl font-semibold mb-2 flex items-center text-black">{item.icone} {item.nome}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => removerItem(item)}
                    className="w-8 h-8 flex justify-center items-center bg-black text-white rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-black font-medium">
                    {quantidadeDeItens}
                  </span>
                  <button
                    onClick={() => adicionarAoCarrinho(item)}
                    className="w-8 h-8 flex justify-center items-center bg-black text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
                <p className="mb-2 text-brown-700 text-black">{item.descricao}</p>
                <p className="font-bold text-brown-900 text-black">{item.preco}</p>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </section>
  );
}

export default Cardapio;