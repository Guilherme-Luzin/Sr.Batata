import { useState, useEffect } from "react";
import { db } from "../context/FirebaseConfig";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import Input from "./Input";
import Navbar from "./Navbar";
import { section } from "framer-motion/client";

export default function CadastroPrato() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const q = query(collection(db, "categorias"), orderBy("nome", "asc"));
        const querySnapshot = await getDocs(q);
        const itens = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCategorias(itens);
        if(itens.length > 0) setCategoria(itens[0].nome);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
      setLoading(false);
    };
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !descricao || !preco || !categoria || !imagem) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await addDoc(collection(db, "cardapio"), {
        nome,
        descricao,
        preco: parseFloat(preco),
        categoria,
        imagem
      });
      setMensagem("Prato cadastrado com sucesso!");
      
      setNome("");
      setDescricao("");
      setPreco("");
      setImagem("");
    } catch (error) {
      console.error("Erro ao cadastrar prato:", error);
      setMensagem("Erro ao cadastrar prato!");
    }
  };

  if (loading)
    return <p>Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar voltarVisivel={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Prato</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="p-2 border rounded text-[#843E1B] min-w-[270px]"
            >
            {categorias.map(cat => (
                <option key={cat.id} value={cat.nome}>{cat.nome}</option>
            ))}
            </select>
            <Input 
                type="text"
                placeholder="Nome da imagem (ex: batata-cheddar.jpg)"
                value={imagem}
                onChange={(e) => setImagem(e.target.value)}
            />
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded mt-2 font-semibold">
            Cadastrar
            </button>
        </form>
        </div>
    </section>
  );
}
