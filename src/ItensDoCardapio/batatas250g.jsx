import formatarPreco from '../utils/formatarPreco';
import { Utensils, Beef, Shrimp, Drumstick, Leaf, FlameKindling } from 'lucide-react';

const batatas250g = [
  {
      nome: 'Batata com Frango',
      descricao: 'Batata gourmet com frango desfiado temperado, finalizado com catupiry e mussarela ou cheddar, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(15.00),
      icone: <Drumstick className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Batata com Calabresa',
      descricao: 'Batata gourmet com linguiça calabresa refogada e cebola, bacon por cima e mussarela ou cheddar, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(15.00),
      icone: <FlameKindling className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Batata com Camarão',
      descricao: 'Batata gourmet com um delicioso camarão ao alho e óleo, finalizada com requeijão e mussarela ou cheddar, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(20.00),
      icone: <Shrimp className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Strogonoff de Frango',
      descricao: 'Batata gourmet com strogonoff de frango cremoso, acompanhado de batata palha, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(15.00),
      icone: <Utensils className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Camarão Cremoso',
      descricao: 'Batata gourmet com um delicioso  camarão cremoso, finalizada muSSarela ou cheddar, acompanha 100 gramas de arroz e batata pa',
      moeda: "R$",
      preco: formatarPreco(20.00),
      icone: <Shrimp className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Carne Moída Cremosa',
      descricao: 'Batata gourmet com uma deliciosa  caane moída cremosa, finalizada mussarela ou cheddar, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(15.00),
      icone: <Beef className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  },
  {
      nome: 'Brócolis com Bacon',
      descricao: 'Batata gourmet com um delicioso  Brocolis temperado cremoso, com mussarela ou cheddar e Bacon, acompanha 100 gramas de arroz e batata palha',
      moeda: "R$",
      preco: formatarPreco(15.00),
      icone: <Leaf className="w-5 h-5 inline mr-1" />,
      categoria: "250g"
  }
];

export default batatas250g;