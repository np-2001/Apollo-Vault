# syntax=docker/dockerfile:1
FROM python:3.8-slim-buster

# Install build dependencies
RUN apt-get update && \
    apt-get install -y build-essential cmake && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /apollo-vault-backend

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install pymongo

COPY . .

# Set environment variables
ENV FLASK_APP=website.py

# Command to run the Flask application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]