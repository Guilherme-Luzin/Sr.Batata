import { CheckIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DialogoDeletar from "./DialogoDeletar";
import { ItensRepository } from '../repositories/ItensRepository';

function ItensAdmin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [itens, setItens] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);

    const abrirModalDeletar = (itemId) => {
        setItemSelecionado(itemId);
        setModalAberto(true);
    };

    const confirmarDeletar = async () => {
        try {
            await ItensRepository.delete(itemSelecionado)
        } catch (error) {
            console.error("Erro ao deletar item:", error);
        }
        setModalAberto(false);
        setItemSelecionado(null);
        fetchItens();
    };

    function aoClicarNoitem(itemId) {
        const query = new URLSearchParams();
        query.set("id", itemId);
        navigate(`/cadastro-itens?${query.toString()}`);
    }

    useEffect(() => {
        fetchItens();
    }, []);

    const fetchItens = async () => {
        setLoading(true);
        try {
            let itens = await ItensRepository.getItens();
            setItens(itens);
            
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
        setLoading(false);
    };
    
    if (loading) {
        return <div className="text-[#843E1B]">Carregando itens...</div>;
    }

    return (
        <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
            <Navbar voltarVisivel={true} />

            <div className="flex flex-col items-center mt-2">
                <div className="flex justify-center">
                    <button 
                        className="bg-[#843E1B] text-[#FFEBCB] rounded-md px-4 py-2"
                        onClick={() => navigate("/cadastro-itens")}
                    >
                        Cadastrar novo item
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <ul className="space-y-4 p-6 bg-[#FFEBCB] rounded-md shadow-2xl w-full md:w-[600px]">
                {itens.map((item) => (
                    <li key={item.id} className="flex gap-2">
                    <button
                        onClick={() => aoClicarNoitem(item.id)}
                        className="bg-[#FFD873] text-[#843E1B] p-2 w-100 rounded-md flex items-center gap-2 text-left"
                    >
                        {item.nome} - {item.categoria}
                    </button>
                    <button 
                        className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md flex items-center gap-2 text-left"
                        onClick={() => abrirModalDeletar(item.id)}
                    >
                        <TrashIcon />
                    </button>
                    </li>
                ))}
                </ul>
            </div>

            {modalAberto && (
                <DialogoDeletar
                    fecharModal={() => setModalAberto(false)}
                    aoConfirmar={confirmarDeletar} />
            )}
        </section>
    )
}

export default ItensAdmin
