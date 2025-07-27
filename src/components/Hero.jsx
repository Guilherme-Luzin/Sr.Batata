import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="bg-[#FFEBCB] py-16 px-6 text-center overflow-hidden">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-black">Batatas Recheadas com Muito Amor! 🥔💛</h1>
        <p className="text-lg mb-6 text-black">500g de puro sabor em cada porção. Divertido e delicioso!</p>
        <Link
          to="/cardapio"
          className="inline-block bg-[#FFD873] text-brown-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition text-black"
        >
          Ver Cardápio
        </Link>
      </motion.div>
    </section>
  );
}

export default Hero;