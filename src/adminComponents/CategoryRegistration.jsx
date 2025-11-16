import { useState, useEffect } from "react";
import Input from "./Input";
import Navbar from "./Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export default function CategoryRegistration() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    if(!categoryId || categoryId === 0 || categoryId === "undefined")
    {
      setLoading(false);
      return;
    }

    const fetchCategories = async () => {
      setLoading(true);
      try {
        let category = await CategoriesRepository.getCategoryById(categoryId);

        setName(category.name || "");

      } catch (error) {
        console.error("Erro ao buscar categoria com id:", categoryId, error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, [categoryId]);

  const updateCategory = async () => {
    if (!categoryId)
      return;

    try {
      await CategoriesRepository.update(categoryId, name);

      setMessage("Categoria atualizada com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar categoria:", error);
    }    
  }

  const registerCategory = async () => {
    if (categoryId)
      return;

    try {
      await CategoriesRepository.create(name);

      setMessage("Categoria cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar categoria:", error);
    }
  }

  const onRegisterClick = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Todos os campos são obrigatórios!");
      return;
    }

    try {
      updateCategory();
      registerCategory();

      navigate("/categories");
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      setMessage("Erro ao cadastrar categoria!", error);
    }
  };

  if (loading)
    return <p className="text-[#843E1B]">Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar backVisible={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Categoria</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={onRegisterClick} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome da categoria"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="bg-yellow-400 px-4 py-2 rounded mt-2 font-semibold text-[#843E1B]">
              Salvar
            </button>
        </form>
        </div>
    </section>
  );
}

