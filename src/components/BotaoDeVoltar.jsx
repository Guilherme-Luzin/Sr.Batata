import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BotaoDeVoltar({visible}) {
    const navigate = useNavigate();
    
    if (!visible)
        return null;
    
    return (
        <button
            onClick={() => navigate(-1)}
            className="left-0 top-0 bottom-0 text-slate-100 bg-[#843E1B]" >
            <ChevronLeftIcon />
        </button>
    );
}

export default BotaoDeVoltar;