from crewai import Crew, Process
from crewai.config import Config
from crewai.config.loaders import AgentConfigLoader, TaskConfigLoader

def create_crew():
    agents = AgentConfigLoader.load(path='src/analise_acao/config/agents.yaml')
    tasks = TaskConfigLoader.load(path='src/analise_acao/config/tasks.yaml')

    crew = Crew(
        agents=list(agents.values()),
        tasks=list(tasks.values()),
        process=Process.sequential
    )

    return crew
