import { useState, useEffect } from "react";
import { db } from "../context/FirebaseConfig";
import { collection, addDoc, getDocs, query, orderBy, doc, getDoc, updateDoc } from "firebase/firestore";
import Input from "./Input";
import Navbar from "./Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function CadastroPrato() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [peso, setPeso] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [searchParams] = useSearchParams();
  const pratoId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if(!pratoId || pratoId === 0 || pratoId === "undefined")
    {
      setLoading(false);
      return;
    }

    const fetchPratos = async () => {
      setLoading(true);
      try {
        const pratoDoc = doc(db, "cardapio", pratoId);
        const pratoSnapshot = await getDoc(pratoDoc);

        if (pratoSnapshot.exists()) 
        {
          const pratoData = pratoSnapshot.data();
          setNome(pratoData.nome || "");
          setDescricao(pratoData.descricao || "");
          setPreco(pratoData.preco || "");
          setCategoria(pratoData.categoria || "");
          setPeso(pratoData.peso || "");
        }

      } catch (error) {
        console.error("Erro ao buscar prato com id:", pratoId, error);
      }
      setLoading(false);
    };
    fetchPratos();
  }, [pratoId]);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "categorias"), orderBy("nome", "asc"));
        const querySnapshot = await getDocs(q);
        const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategorias(itens);
        if(itens.length > 0 && !pratoId) 
          setCategoria(itens[0].nome);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  const AtualizarPrato = async () => {
    if (!pratoId)
      return;

    const pratoRef = doc(db, "cardapio", pratoId);
    await updateDoc(pratoRef, {
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      peso
    });
    setMensagem("Prato atualizado com sucesso!");
  }

  const CadastrarPrato = async () => {
    if (pratoId)
      return;

    await addDoc(
      collection(db, "cardapio"), {
            nome,
            descricao,
            preco: parseFloat(preco),
            categoria,
            peso
        }
      );
    setMensagem("Prato cadastrado com sucesso!");
  }

  const aoClicarEmCadastrar = async (e) => {
    e.preventDefault();
    if (!nome || !descricao || !preco || !categoria) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    try {

      AtualizarPrato();
      CadastrarPrato();
      
      navigate("/pratos");
    } catch (error) {
      console.error("Erro ao cadastrar prato:", error);
      setMensagem("Erro ao cadastrar prato!", error);
    }
  };

  if (loading)
    return <p className="text-[#843E1B]">Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar voltarVisivel={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Prato</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={aoClicarEmCadastrar} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome do prato"
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
