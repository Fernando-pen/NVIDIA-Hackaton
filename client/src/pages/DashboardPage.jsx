// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DashboardPage.module.css'; // Importa os novos estilos

export default function DashboardPage() {
  const [perfil, setPerfil] = useState('');
  const [ticker, setTicker] = useState('');
  const [relatorio, setRelatorio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const perfilSalvo = localStorage.getItem('perfilInvestidor');
    if (perfilSalvo) {
      setPerfil(perfilSalvo);
    }
  }, []);

  const handleGerarRelatorio = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError('Por favor, insira o código da empresa.');
      return;
    }
    setIsLoading(true);
    setError('');
    setRelatorio(null);

    try {
      const response = await axios.post('http://localhost:8000/api/gerar-relatorio', {
        perfil_investidor: perfil,
        ticker_empresa: ticker,
      });
      setRelatorio(response.data);
    } catch (err) {
      console.error("Erro ao buscar relatório:", err);
      setError('Não foi possível gerar o relatório. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para pegar a classe CSS correta baseada na recomendação
  const getRecomendacaoClass = (recomendacao) => {
    if (!recomendacao) return '';
    // Converte 'COMPRAR' para 'comprar', 'VENDER' para 'vender', etc.
    return styles[recomendacao.toLowerCase()] || '';
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Painel de Análise</h1>
          <p>Seu centro de decisões de investimento.</p>
        </div>
        <div className={styles.profileInfo}>
          <p className={styles.label}>Seu Perfil de Investidor:</p>
          <p className={styles.value}>{perfil || 'Não definido'}</p>
        </div>
      </header>

      <div className={styles.searchCard}>
        <form onSubmit={handleGerarRelatorio} className={styles.searchForm}>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Ex: PETR4, MGLU3"
            className={styles.searchInput}
          />
          <button type="submit" disabled={isLoading} className={styles.searchButton}>
            {isLoading ? 'Analisando...' : 'Gerar Relatório'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>

      {isLoading && <p>Carregando análise...</p>}

      {relatorio && (
        <div className={styles.reportCard}>
          <h2 className={styles.reportTitle}>Relatório para {relatorio.ticker}</h2>
          
          <div className={`${styles.recomendacaoBadge} ${getRecomendacaoClass(relatorio.recomendacao)}`}>
            {relatorio.recomendacao}
          </div>

          <div className={styles.analysisSection}>
            <h3 className={styles.sectionTitle}>Justificativa da Análise</h3>
            <p>{relatorio.justificativa}</p>
          </div>
          
          <div className={`${styles.analysisSection} ${styles.analysisGrid}`}>
            <div>
              <h3 className={styles.sectionTitle}>Pontos Positivos ✅</h3>
              <ul className={styles.list}>
                  {relatorio.pontos_positivos.map((ponto, index) => <li key={index}>{ponto}</li>)}
              </ul>
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Pontos de Atenção ⚠️</h3>
              <ul className={styles.list}>
                  {relatorio.pontos_negativos.map((ponto, index) => <li key={index}>{ponto}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}