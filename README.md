## Description

A simple proof of concept NestJS application which uses OpenAI LLM and LangChain

App exposes two endpoints 

```
  {URL}/ask?question=<Your question here>
```
Sends a question to LLM and returns a response

```
  {URL}/train
```
Sending a data to model so he can respond based on the data.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# start chroma db as docker container in detach mode
$ docker-compose up -d

# start app
$ yarn start

```
