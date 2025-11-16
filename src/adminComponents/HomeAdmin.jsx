import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HomeAdmin() {
  return (
    <section className="bg-[#FFEBCB] py-16 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-[#843E1B]">
          Batatas gourmet recheadas 
          <img src='/imgs/Sra.BatataNoCarrinho.png' className="w-24 h-auto inline-block ml-2" alt="Sra. Batata"></img>
          </h1>
        <p className="text-lg mb-6 text-[#843E1B]">Bem-vindo, aqui você poderá ver e cadastrar novos itens e categorias!</p>
        <Link
          to="/itens-admin"
          className="inline-block mr-2 bg-[#FFD873] text-brown-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition text-[#843E1B]"
        >
          Itens
        </Link>
        <Link
          to="/categories"
          className="inline-block bg-[#FFD873] text-brown-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition text-[#843E1B]"
        >
          Categorias
        </Link>
      </motion.div>
    </section>
  );
}

export default HomeAdmin;