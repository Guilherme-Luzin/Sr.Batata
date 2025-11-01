import { useState, useEffect } from "react";
import Input from "./Input";
import Navbar from "./Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ItensRepository } from '../repositories/ItensRepository';
import { CategoriasRepository } from '../repositories/CategoriasRepository';

export default function CadastroItens() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [peso, setPeso] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if(!itemId || itemId === 0 || itemId === "undefined")
    {
      setLoading(false);
      return;
    }

    const fetchItens = async () => {
      setLoading(true);
      try{
        let item = await ItensRepository.getItemById(itemId);

        setNome(item.nome || "");
        setDescricao(item.descricao || "");
        setPreco(item.preco || "");
        setCategoria(item.categoria || "");
        setPeso(item.peso || "");
        
      } catch (error) {
        console.error("Erro ao buscar item com id:", itemId, error);
      }
      setLoading(false);
    };
    fetchItens();
  }, [itemId]);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {     
        const categorias = await CategoriasRepository.getCategorias();

        setCategorias(categorias);

        if(categorias.length > 0 && !itemId) 
          setCategoria(categorias[0].nome);

      } catch (error) {
        alert("Erro ao buscar categorias:", error);
      }
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  const AtualizarItem = async () => {
    if (!itemId)
      return;

    try {
      let item = {
        id: itemId,
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,
        peso
      }

      await ItensRepository.update(item);
    
      setMensagem("Item atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar item:", error);
    }
  }

  const CadastrarItem = async () => {
    if (itemId)
      return;

    try {
      let item = {
        id: itemId,
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,
        peso
      }

      await ItensRepository.create(item);

      setMensagem("Item cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar item:", error);
    }
  }

  const aoClicarEmCadastrar = async (e) => {
    e.preventDefault();
    if (!nome || !descricao || !preco || !categoria) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    try {

      AtualizarItem();
      CadastrarItem();
      
      navigate("/itens-admin");
    } catch (error) {
      setMensagem("Erro ao cadastrar item!", error);
    }
  };

  if (loading)
    return <p className="text-[#843E1B]">Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar voltarVisivel={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Item</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={aoClicarEmCadastrar} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome do item"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <textarea 
                className="p-2 border rounded text-[#843E1B] min-w-[270px]"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <Input 
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
            />
            <Input 
                type="text"
                placeholder="Peso"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
            />
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="p-2 border rounded text-[#843E1B] min-w-[270px]"
            >
            {categorias.map(cat => (
                <option key={cat.id} value={cat.nome}>{cat.nome}</option>
            ))}
            </select>
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded mt-2 font-semibold text-[#843E1B]">
              Salvar
            </button>
        </form>
        </div>
    </section>
  );
}
