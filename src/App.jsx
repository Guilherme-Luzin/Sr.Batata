import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="bg-[#FFEBCB] text-brown-800 font-sans h-screen w-screen flex flex-col">
      <div className="space-y-4">
        <Navbar backVisible={false}/>
      <div className="flex-grow">
        <Home />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;