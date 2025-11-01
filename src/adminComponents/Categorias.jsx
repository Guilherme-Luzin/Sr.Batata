import { CheckIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DialogoDeletar from "./DialogoDeletar";
import { CategoriasRepository } from '../repositories/CategoriasRepository';

function Categorias() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

    const abrirModalDeletar = (categoriaId) => {
        setCategoriaSelecionada(categoriaId);
        setModalAberto(true);
    };

    const confirmarDeletar = async () => {
        try {
            await CategoriasRepository.delete(categoriaSelecionada)
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
        }
        setModalAberto(false);
        setCategoriaSelecionada(null);
        fetchCategorias();
    };

    function aoClicarNaCategoria(categoriaId) {
        const query = new URLSearchParams();
        query.set("id", categoriaId);
        navigate(`/cadastro-categoria?${query.toString()}`);
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

    const fetchCategorias = async () => {
        setLoading(true);
        try {
            const categorias = await CategoriasRepository.getCategorias();

            setCategorias(categorias);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
        setLoading(false);
    };
    
    if (loading) {
        return <div className="text-[#843E1B]">Carregando categorias...</div>;
    }

    return (
        <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
            <Navbar voltarVisivel={true} />

            <div className="flex flex-col items-center mt-2">
                <div className="flex justify-center">
                    <button 
                        className="bg-[#843E1B] text-[#FFEBCB] rounded-md px-4 py-2"
                        onClick={() => navigate("/cadastro-categoria")}
                    >
                        Cadastrar nova categoria
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <ul className="space-y-4 p-6 bg-[#FFEBCB] rounded-md shadow-2xl w-full md:w-[600px]">
                {categorias.map((categoria) => (
                    <li key={categoria.id} className="flex gap-2">
                    <button
                        onClick={() => aoClicarNaCategoria(categoria.id)}
                        className="bg-[#FFD873] text-[#843E1B] p-2 w-100 rounded-md flex items-center gap-2 text-left"
                    >
                        {categoria.nome}
                    </button>
                    <button 
                        className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md flex items-center gap-2 text-left"
                        onClick={() => abrirModalDeletar(categoria.id)}
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

export default Categorias

