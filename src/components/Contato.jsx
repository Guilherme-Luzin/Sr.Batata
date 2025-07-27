import Navbar from './Navbar';
import Footer from './Footer';

function Contato() {
  return (
    <section className="h-screen w-screen bg-[#FFEBCB]">
        <Navbar voltarVisivel={true}/>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Fale com a gente!</h2>
        <p className="mb-4 text-black">📍 Rua Teu Teu, Qd. 39, Lt. 24 - Aparecida de Goiânia - GO</p>
        <p className="mb-4 text-black">📞 <a href="tel:+5562982285204" className="text-brown-900 underline">(62) 98228-5204</a></p>
        <p className="text-black">📦 Entregamos com carinho e rapidez. Chama no WhatsApp! 💬</p>
      </div>
      <Footer />
    </section>
  );
}

export default Contato;