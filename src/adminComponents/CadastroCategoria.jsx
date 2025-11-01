import { useState, useEffect } from "react";
import Input from "./Input";
import Navbar from "./Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CategoriasRepository } from '../repositories/CategoriasRepository';

export default function CadastroCategoria() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [searchParams] = useSearchParams();
  const categoriaId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if(!categoriaId || categoriaId === 0 || categoriaId === "undefined")
    {
      setLoading(false);
      return;
    }

    const fetchCategorias = async () => {
      setLoading(true);
      try {
        let categoria = await CategoriasRepository.getCategoriaById(categoriaId);

        setNome(categoria.nome || "");

      } catch (error) {
        console.error("Erro ao buscar categoria com id:", categoriaId, error);
      }
      setLoading(false);
    };
    fetchCategorias();
  }, [categoriaId]);

  const AtualizarCategoria = async () => {
    if (!categoriaId)
      return;

    try {
      await CategoriasRepository.update(categoriaId, nome);

      setMensagem("Categoria atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar categoria:", error);
    }    
  }

  const CadastrarCategoria = async () => {
    if (categoriaId)
      return;

    try {
      await CategoriasRepository.create(nome);

      setMensagem("Categoria cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar categoria:", error);
    }
  }

  const aoClicarEmCadastrar = async (e) => {
    e.preventDefault();
    if (!nome) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    try {

      AtualizarCategoria();
      CadastrarCategoria();
      
      navigate("/categorias");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      setMensagem("Erro ao cadastrar categoria!", error);
    }
  };

  if (loading)
    return <p className="text-[#843E1B]">Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar voltarVisivel={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Categoria</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={aoClicarEmCadastrar} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome da categoria"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded mt-2 font-semibold text-[#843E1B]">
              Salvar
            </button>
        </form>
        </div>
    </section>
  );
}

