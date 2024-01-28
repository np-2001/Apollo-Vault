# syntax=docker/dockerfile:1
FROM python:3.8-slim-buster
WORKDIR /apollo-vault-backend-docker

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN pip install pymongo
COPY . .
ENV FLASK_APP=website.py

CMD ["python", "-m", "flask", "run", "--host=0.0.0.0"]