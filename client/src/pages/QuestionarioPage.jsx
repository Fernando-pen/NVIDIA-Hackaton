// src/pages/QuestionarioPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionarioPage.module.css';

// 1. Definimos nossas perguntas em uma estrutura de dados fora do componente.
// Isso torna fácil adicionar, remover ou alterar perguntas.
const perguntas = [
  {
    id: 'objetivo',
    texto: 'Qual seu principal objetivo ao investir?',
    opcoes: [
      { texto: 'Preservar meu patrimônio com segurança', valor: 'preservacao' },
      { texto: 'Gerar uma renda extra regularmente', valor: 'renda' },
      { texto: 'Aumentar meu capital o máximo possível, mesmo com riscos', valor: 'crescimento' },
    ],
  },
  {
    id: 'toleranciaRisco',
    texto: 'Seus investimentos caem 20% em um mês. O que você faz?',
    opcoes: [
      { texto: 'Vendo tudo para não perder mais', valor: 'baixa' },
      { texto: 'Não faço nada e espero o mercado se recuperar', valor: 'media' },
      { texto: 'Compro mais, pois os preços estão baixos', valor: 'alta' },
    ],
  },
  {
    id: 'prazo',
    texto: 'Por quanto tempo você pretende deixar seu dinheiro investido?',
    opcoes: [
      { texto: 'Até 2 anos (curto prazo)', valor: 'curto' },
      { texto: 'Entre 2 e 5 anos (médio prazo)', valor: 'medio' },
      { texto: 'Mais de 5 anos (longo prazo)', valor: 'longo' },
    ],
  },
];

export default function QuestionarioPage() {
  const navigate = useNavigate();

  // 2. Nossos novos estados para controlar a interatividade
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Pega a pergunta atual do array com base no índice
  const perguntaAtual = perguntas[currentQuestionIndex];
  
  // Função chamada quando uma opção é clicada
  const handleAnswerSelect = (answerValue) => {
    // Salva a resposta para a pergunta atual
    setRespostas(prev => ({
      ...prev,
      [perguntaAtual.id]: answerValue
    }));
  };

  // Função para o botão "Próximo" ou "Finalizar"
  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === perguntas.length - 1;

    if (isLastQuestion) {
      // Se for a última pergunta, processa e mostra os resultados
      console.log('Respostas finais:', respostas);
      // Aqui você pode ter uma lógica mais complexa para definir o perfil
      const perfilCalculado = 'Moderado'; // Simulação
      localStorage.setItem('perfilInvestidor', perfilCalculado);
      localStorage.setItem('questionarioCompleto', 'true');
      setShowResults(true);
    } else {
      // Se não for a última, avança para a próxima
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Calcula o progresso para a barra
  const progressPercentage = ((currentQuestionIndex + 1) / perguntas.length) * 100;


  // 3. Renderização Condicional: ou mostra os resultados, ou a pergunta atual.
  if (showResults) {
    return (
      <div className={styles.container}>
        <div className={styles.questionarioBox}>
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>Questionário Concluído!</h2>
            <p>Seu perfil de investidor é:</p>
            <p className={styles.resultsProfile}>
              {localStorage.getItem('perfilInvestidor') || 'Não definido'}
            </p>
            <button className={styles.navButton} onClick={() => navigate('/dashboard')}>
              Ir para o Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionarioBox}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <h2 className={styles.questionText}>{perguntaAtual.texto}</h2>
        
        <div className={styles.optionsContainer}>
          {perguntaAtual.opcoes.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => handleAnswerSelect(opcao.valor)}
              // Aplica a classe 'selected' se esta opção foi a escolhida
              className={`${styles.optionButton} ${
                respostas[perguntaAtual.id] === opcao.valor ? styles.selected : ''
              }`}
            >
              {opcao.texto}
            </button>
          ))}
        </div>
        
        <div className={styles.navigation}>
          <button 
            onClick={handleNext}
            className={styles.navButton}
            // Desabilita o botão se nenhuma resposta foi dada para a pergunta atual
            disabled={!respostas[perguntaAtual.id]}
          >
            {currentQuestionIndex === perguntas.length - 1 ? 'Finalizar' : 'Próximo'}
          </button>
        </div>
      </div>
    </div>
  );
}