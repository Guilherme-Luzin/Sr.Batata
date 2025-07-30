import Footer from './Footer';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Carrinho() {
    const [carrinho, setCarrinho] = useState(() => {
        let carrinhoString = localStorage.getItem('carrinho');
        return !carrinhoString ? [] : JSON.parse(carrinhoString);
    });
    const [observacoes, setObservacoes] = useState("");
    const [total, setTotal] = useState("");
    const [moeda, setMoeda] = useState("R$");
    const [carrinhoAgrupado, setCarrinhoAgrupado] = useState([]);

    const formatarPreco = (preco) => {
        return parseFloat(preco || 0).toFixed(2);
    }

      // Atualiza o carrinho agrupado sempre que o carrinho muda
    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        if (!carrinho || carrinho.length <= 0) {
            setCarrinhoAgrupado([]);
            return;
        }

        const grupoDeCarrinhos = carrinho.reduce((acc, item) => {
            const nome = item.nome;
            if (!acc[nome]) acc[nome] = [];
            acc[nome].push(item);
            return acc;
        }, {});

        const carrinhoFormatado = Object.entries(grupoDeCarrinhos)
        .sort(([nomeA], [nomeB]) => nomeA.localeCompare(nomeB))
        .map(([nome, itens]) => {
            const precoTotal = itens.reduce((soma, item) => soma + parseFloat(item.preco || 0), 0);
            const totalDeItens = itens.length;
            return {
                id: nome,
                nome,
                descricao: itens[0].descricao,
                moeda: itens[0].moeda,
                preco: itens[0].preco,
                precoTotal: formatarPreco(precoTotal),
                totalItens: totalDeItens
            };
        });

        setCarrinhoAgrupado(carrinhoFormatado);
    }, [carrinho]);

    // Atualiza o total sempre que o carrinho agrupado muda
    useEffect(() => {
        const precoFinal = carrinhoAgrupado.reduce((acumulador, item) => {
            return acumulador + parseFloat(item.precoTotal);
        }, 0);

        if (carrinho && carrinho.length > 0)
            setMoeda(carrinho[0].moeda);

        setTotal(formatarPreco(precoFinal));
    }, [carrinho, carrinhoAgrupado]);

    const adicionarAoCarrinho = (item) => {
        setCarrinho([...carrinho, item]);
    };

    const removerItem = (item) => {
        const index = carrinho.findIndex((i) => i.nome === item.nome);

        if(index < 0)
        return;

        const novoCarrinho = [...carrinho];
        novoCarrinho.splice(index, 1);

        setCarrinho(novoCarrinho);
    };

    const limparCarrinho = () =>{
        setCarrinho([]);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    return (
        <section className="min-h-screen w-screen bg-[#FFEBCB] flex flex-col">
            <Navbar voltarVisivel={true} />
            <div className="flex-grow flex flex-col items-center px-4">
                <h2 className="text-3xl font-bold my-6 text-center text-[#843E1B]">
                🛒 Meu Carrinho
                </h2>

                {carrinhoAgrupado.length === 0 ? (
                    <p className="text-center text-[#843E1B]">
                        Seu carrinho está vazio por enquanto.
                    </p>
                ) : (
                <div className="space-y-4 w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                    {carrinhoAgrupado.map((item) => (
                    <div key={item.id} className="border-b pb-2">
                        <div className="flex justify-between">
                        <span className="text-[#843E1B] font-bold">{item.nome}</span>
                        <div className='bg-[#843E1B] flex items-center justify-end'>
                            <button
                            onClick={() => removerItem(item)}
                            className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                            >
                                -
                            </button>
                            <span className="text-[#FFEBCB] font-bold">{item.totalItens}</span>
                            <button
                                onClick={() => adicionarAoCarrinho(item)}
                                className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                            >
                                +
                            </button>
                        </div>
                        <span className="font-bold text-[#843E1B]">
                            {item.moeda} {formatarPreco(item.precoTotal)}
                        </span>
                        </div>
                        <span className="text-[#843E1B]">{item.descricao}</span>
                    </div>
                    ))}

                    <div className="flex justify-between mt-6 text-lg font-bold">
                    <span className="text-[#843E1B]">Total:</span>
                    <span className="text-[#843E1B]">{moeda} {formatarPreco(total)}</span>
                    </div>

                    <div className='flex space-x-4'>
                        <span className="text-[#843E1B]">Observações</span>
                        <textarea className='text-[#843E1B] w-full rounded border-[#843E1B] - border-1' 
                            value={observacoes}
                            onChange={(event) => setObservacoes(event.target.value)}/>
                    </div>
                    <span className="text-[#843E1B] font-semibold text-sm block">
                    A taxa de entrega será definida na finalização do pedido via WhatsApp
                    </span>

                    <a
                    href={`https://wa.me/556282285204?text=${encodeURIComponent("Olá! Gostaria de fazer o pedido:\n" + carrinhoAgrupado.map(i => `- ${i.nome} ${i.totalItens}x (R$ ${formatarPreco(i.preco)})`).join("\n") + `\nTotal: R$ ${formatarPreco(total)}` + `\nObservações: ${observacoes}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                    Finalizar Pedido via WhatsApp
                    </a>
                    <button
                        onClick={() => limparCarrinho()}
                        className="block text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition w-full"
                    >
                        Limpar carrinho
                    </button>
                </div>
                )}
                <Link to="/cardapio" className="text-center text-[#843E1B]">Voltar ao cardápio</Link>
            </div>
            <Footer />
        </section>
    );
}

export default Carrinho;