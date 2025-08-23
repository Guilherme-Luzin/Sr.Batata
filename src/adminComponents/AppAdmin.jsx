import Navbar from './Navbar';
import Footer from '../components/Footer';
import '../App.css';    
import Inicio from './Inicio';

function AppAdmin() {
  return (
    <div className="bg-[#FFEBCB] text-brown-800 font-sans h-screen w-screen flex flex-col">
      <div className="space-y-4">
        <Navbar voltarVisivel={false}/>
      <div className="flex-grow">
        <Inicio />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppAdmin;