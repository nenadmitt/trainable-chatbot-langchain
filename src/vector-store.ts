import { OpenAIEmbeddings } from "@langchain/openai";
import { Injectable } from "@nestjs/common";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ChromaVectorStore {

    private vectorStore: Chroma
    static readonly DOC_COLLECTION = "docs-collection";

    constructor( private readonly config: ConfigService) {
        this.initializeVectorStore();
    }

    private initializeVectorStore() {
        const openaiKey = this.config.getOrThrow("OPENAI_API_KEY");
        const chromaUrl = this.config.getOrThrow("CHROMA_URL")
        const embedings = new OpenAIEmbeddings({
            openAIApiKey: openaiKey
        })
        this.vectorStore = new Chroma(embedings, {
            url: chromaUrl,
            collectionName: ChromaVectorStore.DOC_COLLECTION
        })

    }

    public getStore() {
        return this.vectorStore;
    }
}