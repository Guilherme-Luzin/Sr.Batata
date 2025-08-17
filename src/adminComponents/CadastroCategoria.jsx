import { useState } from "react";
import { db } from "../context/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Input from "./Input";
import Navbar from "./Navbar";

export default function CadastroCategoria() {
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoria) {
      setMensagem("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await addDoc(collection(db, "categoria"), {
        categoria
      });
      setMensagem("Categoria cadastrada com sucesso!");
      
      setCategoria("");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      setMensagem("Erro ao cadastrar categoria!");
    }
  };

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar voltarVisivel={true}/>
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Categoria</h2>
        {mensagem && <p className="mb-4 text-green-600">{mensagem}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome da categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />
            <button type="submit"
                className="bg-yellow-400 px-4 py-2 rounded mt-2 font-semibold text-[#843E1B]"
            >
            Cadastrar
            </button>
        </form>
        </div>
    </section>
  );
}
