function DialogoDeletar({ fecharModal, aoConfirmar }) {
    const handleConfirm = () => {
        aoConfirmar();
        fecharModal();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#FFEBCB] p-6 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-4 text-[#843E1B]">Confirmar deletar</h2>
                <p className="text-[#843E1B]">Tem certeza que deseja deletar este prato?</p>
                <div className="mt-4 flex justify-end gap-2">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={handleConfirm}
                    >
                        Confirmar
                    </button>
                    <button 
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        onClick={fecharModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DialogoDeletar;