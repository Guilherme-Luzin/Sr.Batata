import formatarPreco from '../utils/formatarPreco';
import { CakeSlice } from 'lucide-react';

const sobremesas = [
  {
      nome: 'Pudim',
      descricao: 'Um delicioso pudim de leite condensado',
      moeda: "R$",
      preco: formatarPreco(7.00),
      icone: <CakeSlice className="w-5 h-5 inline mr-1" />,
      categoria: "150g"
  }
];

export default sobremesas;