import os
from dotenv import load_dotenv
from crewai_tools import SerperDevTool

# Load environment variables from your .env file
load_dotenv()

# Check if the API key is loaded correctly
if not os.getenv("SERPER_API_KEY"):
    raise ValueError("SERPER_API_KEY is not set. Please add it to your .env file.")

# Instantiate the tool
search_tool = SerperDevTool()

