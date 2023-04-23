import { visit } from "graphql";
import { GHOMGraphQLLoader } from "./graphql_loader";
import { ElementProcessor } from "./element_processors";





export interface GHOMGeneratorConfig {
    schemaLocation: string;
    
}

export class GHOMGenerator {
    config: GHOMGeneratorConfig

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    async loadInitialAst(): DocumentNode {

        let graphqlLoader = new GHOMGraphQLLoader(this.config)
        let documentAst = await graphqlLoader.loadSchema();
    
        let elementProcessor = new ElementProcessor();

        
    
    let elementsAsJSON = JSON.stringify(ElementsMap, mapReplacer, 4);
    writeFileSync("elements.json", elementsAsJSON);
    // console.log(editedAST)
}