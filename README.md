## Description

A simple proof of concept NestJS application which uses OpenAI LLM and LangChain

App exposes two endpoints 

## /ask
```
  GET {APP_URL}/ask?question=<Your question here>
```
Sends a question to LLM and returns a response

## /train
```
  POST {APP_URL}/train
```
This endpoint a json request body with string data. Example:
```
  {
    "data": "This is data to be feed to llm"
  }
```

## Installation

```bash
$ yarn install
```
Create an .env file and add environment variables
```
OPENAI_API_KEY=<openai-api-key>
CHROMA_URL=<chroma url> (http://localhost:8000 if docker-compose is used)
```
## Running the app

```bash
# start chroma db as docker container in detach mode
$ docker-compose up -d

# start app
$ yarn start

```
