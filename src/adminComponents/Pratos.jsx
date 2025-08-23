import { CheckIcon, TrashIcon } from "lucide-react";
import { db } from "../context/FirebaseConfig";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DialogoDeletar from "./DialogoDeletar";

function Pratos() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [pratos, setPratos] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [pratoSelecionado, setPratoSelecionado] = useState(null);

    const abrirModalDeletar = (pratoId) => {
        setPratoSelecionado(pratoId);
        setModalAberto(true);
    };

    const confirmarDeletar = async () => {
        try {
            await deleteDoc(doc(db, "cardapio", pratoSelecionado));
        } catch (error) {
            console.error("Erro ao deletar prato:", error);
        }
        setModalAberto(false);
        setPratoSelecionado(null);
        fetchPratos();
    };

    function aoClicarNoPrato(pratoId) {
        const query = new URLSearchParams();
        query.set("id", pratoId);
        navigate(`/cadastro-prato?${query.toString()}`);
    }

    useEffect(() => {
        fetchPratos();
    }, []);

    const fetchPratos = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, "cardapio"),
                orderBy("nome", "asc")
            );

            const querySnapshot = await getDocs(q);
            const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPratos(itens);
            
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
        setLoading(false);
    };
    
    if (loading) {
        return <div className="text-[#843E1B]">Carregando prato...</div>;
    }

    return (
        <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
            <Navbar voltarVisivel={true} />

            <div className="flex flex-col items-center mt-2">
                <div className="flex justify-center">
                    <button 
                        className="bg-[#843E1B] text-[#FFEBCB] rounded-md px-4 py-2"
                        onClick={() => navigate("/cadastro-prato")}
                    >
                        Cadastrar novo prato
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <ul className="space-y-4 p-6 bg-[#FFEBCB] rounded-md shadow-2xl w-full md:w-[600px]">
                {pratos.map((prato) => (
                    <li key={prato.id} className="flex gap-2">
                    <button
                        onClick={() => aoClicarNoPrato(prato.id)}
                        className="bg-[#FFD873] text-[#843E1B] p-2 w-100 rounded-md flex items-center gap-2 text-left"
                    >
                        {prato.nome} - {prato.categoria}
                    </button>
                    <button 
                        className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md flex items-center gap-2 text-left"
                        onClick={() => abrirModalDeletar(prato.id)}
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

export default Pratos
