import { visit, DocumentNode } from "graphql";
import { GHOMGraphQLLoader } from "./graphql_loader";
import { ElementProcessor, ElementProcessorResultSet } from "./element_processors";





export interface GHOMGeneratorConfig {
    schemaLocation: string;
    
}

export class GHOMGenerator {
    config: GHOMGeneratorConfig

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    async loadInitialAst() {
        let graphqlLoader = new GHOMGraphQLLoader(this.config)
        let documentAst = await graphqlLoader.loadSchema();
    
        let elementProcessor = new ElementProcessor();
        let elementResultSet: ElementProcessorResultSet = await elementProcessor.processDocumentAST(documentAst);
        
        this.generateGHOMFromElements(elementResultSet);
    }

    async generateGHOMFromElements(elementResultSet: ElementProcessorResultSet) {
        
    }    
}