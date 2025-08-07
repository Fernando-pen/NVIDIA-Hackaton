# NVIDIA-Hackaton
Visão Geral do Projeto: "Radar de Ações"

O objetivo não é dar uma recomendação de "compre" ou "venda" (o que é complexo e regulado), mas sim criar um assistente de pesquisa superpoderoso. A ferramenta economiza horas de trabalho manual do investidor, consolidando todas as informações públicas relevantes em um dashboard único, inteligente e fácil de interpretar.

Inputs do Usuário (O que o usuário fornece)

Para tornar a análise mais rica e personalizada, podemos ir além de apenas um input.

    Input Obrigatório: O Ticker da Ação

        Exemplo: PETR4, MGLU3, ITUB4, WEGE3.

        Este é o gatilho para todo o processo.

    Input Opcional: Perfil de Investidor

        O usuário pode selecionar seu perfil para que o relatório final tenha um "veredito" personalizado.

        Opções:

            Foco em Dividendos: Prioriza empresas boas pagadoras, com fluxo de caixa estável.

            Foco em Crescimento (Growth): Prioriza empresas com alto potencial de valorização, mesmo que não paguem dividendos.

            Foco em Valor (Value): Busca por ações que parecem estar "baratas" em relação aos seus fundamentos.

    Input Opcional: Horizonte de Tempo

        Opções: Curto Prazo (até 1 ano), Médio Prazo (1-3 anos), Longo Prazo (mais de 3 anos).

        Isso ajuda a crew a dar o peso certo para cada tipo de informação (notícias de curto prazo vs. fundamentos de longo prazo).

As Análises (O trabalho da CrewAI por trás das cortinas)

A CrewAI vai simular uma equipe de analistas, cada um com sua especialidade.

    Agente Analista Fundamentalista:

        Tarefa: Busca por indicadores financeiros chave em portais como Status Invest, Fundamentus ou em notícias recentes.

        Dados coletados: P/L (Preço/Lucro), P/VP (Preço/Valor Patrimonial), Dividend Yield (DY), ROE (Return on Equity), Margem Líquida, Dívida Líquida/EBITDA.

        Análise: Compara esses indicadores com a média histórica da própria empresa e com a média do setor (se possível encontrar essa informação).

    Agente Repórter de Mercado:

        Tarefa: Vasculha os principais portais de notícias financeiras do Brasil (Valor, InfoMoney, Money Times, etc.) por menções ao ticker nos últimos 30 dias.

        Análise: Classifica cada notícia como Positiva, Negativa ou Neutra e extrai a manchete e um resumo de uma linha. Identifica "Fatos Relevantes" oficiais.

    Agente de Sentimento Social (O "Voz do Povo"):

        Tarefa: Monitora o que investidores pessoa física estão falando no Twitter e em fóruns sobre a ação.

        Análise: Mede o "termômetro" do sentimento (Otimista/Pessimista) e identifica as principais teses ou boatos que estão circulando na comunidade.

    Agente Analista Setorial e de Concorrência:

        Tarefa: Identifica o setor da empresa (ex: Varejo, Bancos, Elétrico) e seus principais concorrentes listados na bolsa.

        Análise: Levanta os mesmos indicadores fundamentalistas para 1 ou 2 concorrentes para criar um quadro comparativo. Isso responde à pergunta: "Essa empresa está cara ou barata em relação aos seus pares?"

    Agente Advogado do Diabo (Analista de Riscos):

        Tarefa: Sua única missão é procurar por problemas. Ele lê as notícias e relatórios procurando especificamente por palavras como "risco", "desafio", "investigação", "dívida", "concorrência acirrada".

        Análise: Compila uma lista com os principais pontos de atenção e riscos potenciais para o investidor.

    Agente Chefe de Análise (Sintetizador):

        Tarefa: Recebe o trabalho de todos os outros agentes e monta o relatório final, escrevendo o Resumo Executivo e o Veredito Personalizado com base no perfil do usuário.

Outputs para o Usuário (O Dashboard Final)

Este é o produto final que o usuário vê. Um dashboard limpo e informativo.
Seção do Dashboard	Conteúdo
Cabeçalho	Análise Radar: VALE3 - Gerado em 07/08/2025
Resumo Executivo (TL;DR)	3 a 4 bullet points que resumem os achados mais importantes. Ex: "Apresenta múltiplos atrativos frente aos pares, mas notícias recentes sobre o mercado chinês acendem um alerta de curto prazo."
Termômetro de Sentimento	Um indicador visual simples: [ 🐂 Otimista ] / [ 🐻 Pessimista ] / [ 😐 Neutro ]
Painel Fundamentalista	Uma tabela clara com os indicadores (P/L, DY, ROE, etc.) e uma comparação com a média do setor.
Radar de Notícias Recentes	Uma lista das 3-5 notícias mais importantes, cada uma com sua classificação (ícone verde/vermelho), manchete e link para a fonte.
Radar de Riscos	Uma lista de bullet points com os principais riscos identificados pelo "Advogado do Diabo".
Visão dos Pares (Concorrência)	Uma pequena tabela comparando o P/L e o Dividend Yield da empresa analisada com seus principais concorrentes.
Veredito para seu Perfil (Seção Personalizada)	Um parágrafo que conecta a análise com o perfil do usuário. Ex: "Para um investidor com Foco em Dividendos, o DY atual de 8% é atrativo, mas a alta dependência de commodities pode não agradar quem busca baixa volatilidade."

Funcionalidades Adicionais (Para um Projeto Completo)

    Histórico de Análises: Uma área onde o usuário pode ver todos os relatórios que já gerou.

    Watchlist (Lista de Favoritos): Permite que o usuário salve suas ações de interesse para acesso rápido.

    Alertas por E-mail: O usuário pode "assinar" uma ação da sua watchlist e receber um e-mail quando a ferramenta detectar uma nova notícia de alto impacto ou um Fato Relevante.

    Modo Comparação: Uma tela onde o usuário pode selecionar duas ações (ex: ITSA4 vs BBAS3) e ver um relatório comparativo lado a lado.
