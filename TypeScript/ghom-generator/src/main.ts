
import 'graphql'; // ES6
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    buildASTSchema,
    parse,
    Source,
    DefinitionNode,
    ASTNode,
    visit,
    DocumentNode,
    ObjectTypeDefinitionNode,
    InterfaceTypeDefinitionNode,
    NameNode,
} from 'graphql';

import { GHOMGenerator, GHOMGeneratorConfig, GHOMTargetLanguageKind } from './ghom_generator';

async function  main() {
    let schemaLoc = "https://docs.github.com/public/schema.docs.graphql";

    const config: GHOMGeneratorConfig = {
        schemaLocationURI: schemaLoc,
        targetLanguage: GHOMTargetLanguageKind.TypeScript,
        generationOutputDirectory: "output"
    };

    const generator = new GHOMGenerator(config);
    generator.generateGHOM();
    
}

let l = async () => {
    await main();
}
l();
