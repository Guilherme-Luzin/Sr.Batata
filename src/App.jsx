import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Hero from './components/Hero';

function App() {
  return (
    <div className="bg-[#FFF6ED] text-brown-800 font-sans h-screen w-screen flex flex-col">
      <div className="space-y-4">
        <Navbar voltarVisivel={false}/>
      <div className="flex-grow">
        <Hero />
      </div>
      <Footer />
      </div>
    </div>
  );
}

export default App;