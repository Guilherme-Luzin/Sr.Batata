import { useState, useEffect } from "react";
import Input from "./Input";
import Navbar from "./Navbar";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ItensRepository } from '../repositories/ItensRepository';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export default function ItensRegistration() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
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

        setName(item.name || "");
        setDescription(item.description || "");
        setValue(item.value || "");
        setCategory(item.category || "");
        setWeight(item.weight || "");
        
      } catch (error) {
        console.error("Erro ao buscar item com id:", itemId, error);
      }
      setLoading(false);
    };
    fetchItens();
  }, [itemId]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {     
        const categories = await CategoriesRepository.getCategories();

        setCategories(categories);

        if(categories.length > 0 && !itemId) 
          setCategory(categories[0].name);

      } catch (error) {
        alert("Erro ao buscar categorias:", error);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const updateItem = async () => {
    if (!itemId)
      return;

    try {
      let item = {
        id: itemId,
        name: name,
        description: description,
        value: parseFloat(value),
        category: category,
        weight: weight
      }

      await ItensRepository.update(item);
    
      setMessage("Item atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar item:", error);
    }
  }

  const registerItem = async () => {
    if (itemId)
      return;

    try {
      let item = {
        id: itemId,
        name: name,
        description: description,
        value: parseFloat(value),
        category: category,
        weight: weight
      }

      await ItensRepository.create(item);

      setMessage("Item cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar item:", error);
    }
  }

  const onRegisterClick = async (e) => {
    e.preventDefault();
    if (!name || !description || !value || !category) {
      setMessage("Todos os campos são obrigatórios!");
      return;
    }

    try {
      updateItem();
      registerItem();
      
      navigate("/itens-admin");
    } catch (error) {
      setMessage("Erro ao cadastrar item!", error);
    }
  };

  if (loading)
    return <p className="text-[#843E1B]">Carregando dados necessários...</p>;

  return (
    <section className="bg-[#FFEBCB] min-h-screen w-screen flex flex-col">
        <Navbar backVisible={true} />
        <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
        <h2 className="text-2xl font-bold mb-4 text-[#843E1B]">Cadastro de Item</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={onRegisterClick} className="flex flex-col gap-3">
            <Input 
                type="text"
                placeholder="Nome do item"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea 
                className="p-2 border rounded text-[#843E1B] min-w-[270px]"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input 
                type="number"
                placeholder="Preço"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Input 
                type="text"
                placeholder="Peso"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 border rounded text-[#843E1B] min-w-[270px]"
            >
            {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
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
