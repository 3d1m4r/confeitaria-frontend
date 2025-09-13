import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Meus dados estão protegidos nesse site?",
    answer: "Sim, utilizamos sistemas de pagamento com certificação de segurança SSL e criptografia de dados de nível bancário para proteger todas as suas informações.",
  },
  {
    question: "Quanto tempo tenho para acessar o conteúdo?",
    answer: "O acesso é vitalício! Você pode baixar as apostilas e acessar o conteúdo quando quiser, quantas vezes precisar.",
  },
  {
    question: "Preciso de experiência prévia em confeitaria?",
    answer: "Não! O curso foi desenvolvido para iniciantes. Todas as receitas têm passo a passo detalhado e dicas para garantir o sucesso mesmo de quem nunca fez doces antes.",
  },
  {
    question: "Existe garantia de satisfação?",
    answer: "Sim! Oferecemos 7 dias de garantia incondicional. Se por qualquer motivo não ficar satisfeita, devolvemos 100% do seu dinheiro.",
  },
  {
    question: "Como recebo o material após a compra?",
    answer: "Imediatamente após a aprovação do pagamento, você recebe por email o link para download de todas as apostilas em PDF e acesso à área de membros exclusiva.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4" data-testid="faq-section">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 text-left bg-muted hover:bg-muted/80 transition-colors flex justify-between items-center"
            onClick={() => toggleFAQ(index)}
            data-testid={`faq-question-${index}`}
          >
            <span className="font-semibold">{faq.question}</span>
            <ChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ${
              openIndex === index ? "max-h-96 py-4" : "max-h-0"
            }`}
            data-testid={`faq-answer-${index}`}
          >
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
