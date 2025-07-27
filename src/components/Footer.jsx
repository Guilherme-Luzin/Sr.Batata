function Footer() {
  return (
    <footer className="bg-[#FFD873] text-brown-900 py-4 mt-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-black">&copy; {new Date().getFullYear()} Sra. Batata. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;