import Footer from './Footer';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import formatValue from '../utils/FormatValue';

function Cart() {
    const [cart, setCart] = useState(() => {
        let cartString = localStorage.getItem('cart');
        return !cartString ? [] : JSON.parse(cartString);
    });
    const [remarks, setObservacoes] = useState("");
    const [total, setTotal] = useState("");
    const [currency, setCurrency] = useState("R$");
    const [groupCart, setGroupCart] = useState([]);

    // Atualiza o carrinho agrupado sempre que o carrinho muda
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));

        if (!cart || cart.length <= 0) {
            setGroupCart([]);
            return;
        }

        const groupedCart = cart.reduce((acc, item) => {
            const name = item.name;
            const category = item.category;
            const groupName = `${name} - ${category}`;

            if (!acc[groupName])
                acc[groupName] = [];

            acc[groupName].push(item);
            return acc;
        }, {});

        const formatedCart = Object.entries(groupedCart)
        .sort(([nomeA], [nomeB]) => nomeA.localeCompare(nomeB))
        .map(([name, itens]) => {
            const TotalValue = itens.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
            const totalOfItens = itens.length;
            return {
                id: `${name} - ${itens[0].categoria}`,
                name: itens[0].name,
                category: itens[0].category,
                weight: itens[0].weight,
                description: itens[0].description,
                currency: itens[0].currency,
                value: itens[0].value,
                totalValue: formatValue(TotalValue),
                totalItens: totalOfItens
            };
        });

        setGroupCart(formatedCart);
    }, [cart]);

    // Atualiza o total sempre que o carrinho agrupado muda
    useEffect(() => {
        const totalValue = groupCart.reduce((acumulator, item) => {
            return acumulator + parseFloat(item.totalValue);
        }, 0);

        if (cart && cart.length > 0)
            setCurrency(cart[0].currency);

        setTotal(formatValue(totalValue));
    }, [cart, groupCart]);

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

    const clearCart = () =>{
        setCart([]);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    return (
        <section className="min-h-screen w-screen bg-[#FFEBCB] flex flex-col">
            <Navbar backVisible={true} />
            <div className="flex-grow flex flex-col items-center px-4">
                <h2 className="text-3xl font-bold my-6 text-center text-[#843E1B]">
                🛒 Meu Carrinho
                </h2>

                {groupCart.length === 0 ? (
                    <p className="text-center text-[#843E1B]">
                        Seu carrinho está vazio por enquanto.
                    </p>
                ) : (
                <div className="space-y-4 w-full max-w-md bg-white rounded-lg p-6 shadow-md">
                    {groupCart.map((item) => (
                    <div key={item.id} className="border-b pb-2">
                        <div className="flex justify-between">
                        <span className="text-[#843E1B] font-bold">{item.name}</span>
                        <div className='bg-[#843E1B] flex items-center justify-end'>
                            <button
                            onClick={() => removeIten(item)}
                            className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                            >
                                -
                            </button>
                            <span className="text-[#FFEBCB] font-bold">{item.totalItens}</span>
                            <button
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 flex justify-center items-center bg-[#843E1B] text-white rounded"
                            >
                                +
                            </button>
                        </div>
                        <span className="font-bold text-[#843E1B]">
                            {item.currency} {formatValue(item.totalValue)}
                        </span>
                        </div>
                        <span className="text-[#843E1B]">{item.weight}</span>
                    </div>
                    ))}

                    <div className="flex justify-between mt-6 text-lg font-bold">
                    <span className="text-[#843E1B]">Total:</span>
                    <span className="text-[#843E1B]">{currency} {formatValue(total)}</span>
                    </div>

                    <div className='flex space-x-4'>
                        <span className="text-[#843E1B]">Observações</span>
                        <textarea className='text-[#843E1B] w-full rounded border-[#843E1B] - border-1' 
                            value={remarks}
                            onChange={(event) => setObservacoes(event.target.value)}/>
                    </div>
                    <span className="text-[#843E1B] font-semibold text-sm block">
                    A taxa de entrega será definida na finalização do pedido via WhatsApp
                    </span>

                    <a
                    href={`https://wa.me/556282285204?text=${encodeURIComponent("Olá! Gostaria de fazer o pedido:\n" + groupCart.map(i => `- ${i.name} - ${i.weight} ${i.totalItens}x (R$ ${formatValue(i.totalValue)})`).join("\n") + `\nTotal: R$ ${formatValue(total)}` + `\nObservações: ${remarks}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                    Finalizar Pedido via WhatsApp
                    </a>
                    <button
                        onClick={() => clearCart()}
                        className="block text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition w-full"
                    >
                        Limpar carrinho
                    </button>
                </div>
                )}
                <Link to="/itens" className="text-center text-[#843E1B]">Voltar ao cardápio</Link>
            </div>
            <Footer />
        </section>
    );
}

export default Cart;