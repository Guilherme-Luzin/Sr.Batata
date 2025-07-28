import Footer from './Footer';
import Navbar from './Navbar';
import { useState } from 'react';

function Carrinho() {
    const [observacoes, setObservacoes] = useState("");

    const formatarPreco = (preco) => {
        preco = preco.toString().replace('R$', '').trim();
        return parseFloat(preco).toFixed(2).replace('.', ',');
    }

    let carrinhoString = localStorage.getItem("carrinho") ?? [];
    let carrinho = JSON.parse(carrinhoString);
    const total = carrinho.reduce((acc, item) => {
        let precoFormato = formatarPreco(item.preco);

        return acc + precoFormato;
    }, 0);

    return (
        <section className="min-h-screen w-screen bg-[#FFEBCB] flex flex-col">
            <Navbar voltarVisivel={true} />
            <div className="flex-grow flex flex-col items-center px-4">
                <h2 className="text-3xl font-bold my-6 text-center text-[#843E1B]">
                🛒 Meu Carrinho
                </h2>

                {carrinho.length === 0 ? (
                <p className="text-center text-[#843E1B]">
                    Seu carrinho está vazio por enquanto.
                </p>
                ) : (
                <div className="space-y-4 w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                    {carrinho.map((item, idx) => (
                    <div key={idx} className="border-b pb-2">
                        <div className="flex justify-between">
                        <span className="text-[#843E1B] font-bold">{item.nome}</span>
                        <span className="font-bold text-[#843E1B]">
                            R$ {formatarPreco(item.preco)}
                        </span>
                        </div>
                        <span className="text-[#843E1B]">{item.descricao}</span>
                    </div>
                    ))}

                    <div className="flex justify-between mt-6 text-lg font-bold">
                    <span className="text-[#843E1B]">Total:</span>
                    <span className="text-[#843E1B]">R$ {formatarPreco(total)}</span>
                    </div>

                    <div className='flex space-x-4'>
                        <span className="text-[#843E1B]">Observações</span>
                        <textarea className='text-[#843E1B] w-full' 
                            value={observacoes}
                            onChange={(event) => setObservacoes(event.target.value)}/>
                    </div>
                    <span className="text-[#843E1B] font-semibold text-sm block">
                    A taxa de entrega será definida na finalização do pedido via WhatsApp
                    </span>

                    <a
                    href={`https://wa.me/556282285204?text=${encodeURIComponent("Olá! Gostaria de fazer o pedido:\n" + carrinho.map(i => `- ${i.nome} (R$ ${formatarPreco(i.preco)})`).join("\n") + `\nTotal: R$ ${formatarPreco(total)}` + `\nObservações: ${observacoes}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                    Finalizar Pedido via WhatsApp
                    </a>
                </div>
                )}
            </div>
            <Footer />
        </section>
    );
}

export default Carrinho;