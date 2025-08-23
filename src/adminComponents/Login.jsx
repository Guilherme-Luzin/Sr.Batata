import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import Input from "./Input";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const aoClicarEmEntrar = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, senha);
      navigate('/app-admin')
    } catch (err) {
      setErro("Credenciais inválidas");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Verificando login...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8 justify-center min-h-screen w-screen">
      <h1 className="text-xl font-bold mb-4 text-[#843E1B]">
        Login
    </h1>
      <form onSubmit={aoClicarEmEntrar} className="flex flex-col gap-2">
        <Input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
        />
        <Input 
          className="p-2 border rounded text-[#843E1B]"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={submitting}
        />
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-yellow-400 px-4 py-2 rounded mt-2 text-[#843E1B]">
          {submitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
