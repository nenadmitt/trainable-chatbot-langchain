import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ChromaVectorStore } from './vector-store';
import { OpenAI } from '@langchain/openai';
import { RetrievalQAChain, loadQARefineChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private retrivalChain: RetrievalQAChain;

  constructor(
    private readonly vectorStore: ChromaVectorStore,
    private readonly config: ConfigService,
  ) {
    this.initializeLLM();
  }

  private initializeLLM() {
    const openAIKey = this.config.getOrThrow('OPENAI_API_KEY');
    const model = new OpenAI({
      openAIApiKey: openAIKey,
      modelName: 'gpt-4',
      temperature: 0.9,
    });
    this.retrivalChain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(model),
      retriever: this.vectorStore.getStore().asRetriever(),
    });
  }

  public async query(question: string) {
    if (!question || question.length < 5) {
      throw new BadRequestException('Question must be at least 5 characters');
    }

    try {
      const { output_text } = await this.retrivalChain.invoke({
        query: question,
      });
      return output_text;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error');
    }
  }

  public async feed(data: string) {
    if (!data || data.length < 5) {
      throw new BadRequestException(
        'Training data must be at least 5 characters',
      );
    }

    try {
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
      });
      const docs = await textSplitter.createDocuments([data]);
      await this.vectorStore.getStore().addDocuments(docs);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Error while training');
    }
  }
}
