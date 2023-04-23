
import {readFileSync, readFile, writeFileSync} from 'fs';
import { URL } from 'url';



import { IncomingMessage } from 'http';

function mapReplacer(key: string | number | Symbol, value: any) {
    if (value instanceof Map) {
      return Object.fromEntries(value.entries());
    }
    
    return value;
  }


// import { parse, ParseOptions, DocumentNode, DocumentNode, Kind} from 'graphql/language';
import 'graphql'; // ES6
// var GraphQL = require('graphql'); // CommonJS
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
import { Type } from 'typescript';
import { GHOMGenerator, GHOMGeneratorConfig } from './ghom_generator';

async function  main() {
    let schemaLoc = "https://docs.github.com/public/schema.docs.graphql";
    const config: GHOMGeneratorConfig = {
        schemaLocation: schemaLoc
    };
    const generator = new GHOMGenerator(config);
    generator.generateGHOM();
}
let l = async () => {
    await main();
}
l();
