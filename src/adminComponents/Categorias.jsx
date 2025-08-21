import { CheckIcon, TrashIcon } from "lucide-react"
import { useNavigate } from "react-router-dom";

function Categorias() {
  const navigate = useNavigate();

  function aoClicarNoPrato(prato) {
    const query = new URLSearchParams();
    query.set("id", prato.id);
    navigate(`/cadastro-prato?${query.toString()}`);
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {pratos.map((prato) => (
          <li key={prato.id} className="flex gap-2">
            <button
              onClick={() => aoClicarNoPrato(prato.id)}
              className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md w-full flex items-center gap-2 text-left"
            >
              {prato.isCompleted && <CheckIcon />}
              {prato.title}
            </button>
            <button 
              className="bg-[#FFD873] text-[#843E1B] p-2 rounded-md w-full flex items-center gap-2 text-left"
              onClick={() => aoClicarEmDeletar(prato.id)}
            >
              <TrashIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categorias
