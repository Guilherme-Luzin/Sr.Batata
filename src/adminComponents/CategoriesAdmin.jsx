import { TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DeleteDialog from "./DeleteDialog";
import { CategoriesRepository } from '../repositories/CategoriesRepository';

function CategoriesAdmin() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openDeleteModal = (categoryId) => {
        setSelectedCategory(categoryId);
        setOpenModal(true);
    };

    const ConfirmDelete = async () => {
        try {
            await CategoriesRepository.delete(selectedCategory)
        } catch (error) {
            console.error("Erro ao deletar categoria:", error);
        }
        setOpenModal(false);
        setSelectedCategory(null);
        fetchCategories();
    };

    function onCategoryClick(categoryId) {
        const query = new URLSearchParams();
        query.set("id", categoryId);
        navigate(`/category-registration?${query.toString()}`);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const categories = await CategoriesRepository.getCategories();

            setCategories(categories);
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
            <Navbar backVisible={true} />

            <div className="flex flex-col items-center mt-2">
                <div className="flex justify-center">
                    <button 
                        className="bg-[#843E1B] text-[#FFEBCB] rounded-md px-4 py-2"
                        onClick={() => navigate("/category-registration")}
                    >
                        Cadastrar nova categoria
                    </button>
                </div>
            </div>
            <div className="flex justify-center">
                <ul className="space-y-4 p-6 bg-[#FFEBCB] rounded-md shadow-2xl w-full md:w-[600px]">
                {categories.map((category) => (
                    <li key={category.id} className="flex gap-2">
                    <button
                        onClick={() => onCategoryClick(category.id)}
                        className="bg-[#FFD873] text-[#843E1B] p-2 w-100 rounded-md flex items-center gap-2 text-left"
                    >
                        {category.name}
                    </button>
                    <button 
                        className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md flex items-center gap-2 text-left"
                        onClick={() => openDeleteModal(category.id)}
                    >
                        <TrashIcon />
                    </button>
                    </li>
                ))}
                </ul>
            </div>

            {openModal && (
                <DeleteDialog
                    closeModal={() => setOpenModal(false)}
                    onConfirm={ConfirmDelete} />
            )}
        </section>
    )
}

export default CategoriesAdmin

