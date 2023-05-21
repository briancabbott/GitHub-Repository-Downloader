import { DocumentNode, Source, parse } 
from "graphql";
import { GHOMGeneratorConfig } from '../ghom_generator';
import { WebResourceLoader } from "../utils/web_utils";

export class GHOMGraphQLLoader {
    config: GHOMGeneratorConfig;

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }
    
    public async loadSchema(): Promise<DocumentNode> {
        let schemaText: string = "";

        let webResourceLoader = new WebResourceLoader(this.config.schemaLocationURI);
        schemaText = await webResourceLoader.loadSchema();
        const source = new Source(schemaText, 'GitHub.graphql');
        const ast = parse(source);
        
        return ast
    }
}