import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="bg-[#FFEBCB] py-16 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-[#843E1B]">
          Batatas Recheadas com Muito Amor! 
          <img src='/imgs/Sra.BatataNoCarrinho.png' className="w-24 h-auto inline-block ml-2" alt="Sra. Batata"></img>
          </h1>
        <p className="text-lg mb-6 text-[#843E1B]">500g de puro sabor em cada porção. Divertido e delicioso!</p>
        <Link
          to="/cardapio"
          className="inline-block bg-[#FFD873] text-brown-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition text-[#843E1B]"
        >
          Ver Cardápio
        </Link>
      </motion.div>
    </section>
  );
}

export default Hero;