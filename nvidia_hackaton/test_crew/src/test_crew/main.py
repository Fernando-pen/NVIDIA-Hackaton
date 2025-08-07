from src.analise_acao.crew import create_crew

def run_analysis(ticker: str, perfil_investidor: str):
    crew = create_crew()

    result = crew.kickoff(
        inputs={
            "ticker": ticker,
            "perfil_investidor": perfil_investidor
        }
    )

    return result


if __name__ == "__main__":
    markdown_report = run_analysis("VALE3", "moderado")
    print(markdown_report)
