# Use an official Python runtime as a parent image
# Using a specific version ensures consistency

FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the file that lists the dependencies
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application's code into the container
COPY . .

# Command to run your application
# Replace 'main.py' with the name of your main script
CMD ["python", "main.py"]