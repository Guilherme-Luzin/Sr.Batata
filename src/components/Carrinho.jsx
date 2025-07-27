import Footer from './Footer';

function Carrinho() {
    let carrinhoString = localStorage.getItem("carrinho") ?? [];
    let carrinho = JSON.parse(carrinhoString);
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

    const formatarPreco = (preco) => {
        preco = preco.replace('R$', '').trim();
        return parseFloat(preco).toFixed(2).replace('.', ',');
    }

    return (
        <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">🛒 Meu Carrinho</h2>
            {carrinho.length === 0 ? (
            <p className="text-center text-brown-700">Seu carrinho está vazio por enquanto.</p>
            ) : (
            <div className="space-y-4">
                {carrinho.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                    <span>{item.nome}</span>
                    <span className="font-bold">R$ {() => formatarPreco(item.preco)}</span>
                </div>
                ))}
                <div className="flex justify-between mt-6 text-lg font-bold">
                <span>Total:</span>
                <span>R$ {() => formatarPreco(total)}</span>
                </div>
                <a
                href={`https://wa.me/5562982285204?text=${encodeURIComponent("Olá! Gostaria de fazer o pedido:\n" + carrinho.map(i => `- ${i.nome} (R$ ${formatarPreco(i.preco)})`).join("\n") + `\nTotal: R$ ${formatarPreco(total)}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
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