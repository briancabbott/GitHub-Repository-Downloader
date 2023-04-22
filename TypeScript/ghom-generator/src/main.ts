
import {readFileSync, readFile} from 'fs';
import { URL } from 'url';

import http from 'http';
import https from 'https';

import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    buildASTSchema,
} from 'graphql';

import { parse, ParseOptions, DocumentNode} from 'graphql/language';
import { IncomingMessage } from 'http';

class GHOMGeneratorConfig {
    schemaLocation: string;
    
    constructor(scemaLocation: string) {
        this.schemaLocation = scemaLocation;
    }
}


class GHOMGenerator {
    config: GHOMGeneratorConfig
    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    async loadSchema(): Promise<GraphQLSchema> {
        let schemaText: string = ""
        if (this.config.schemaLocation.startsWith("http")) {
            schemaText = await this.loadSchemaFromURI(new URL(this.config.schemaLocation));
        } else if (this.config.schemaLocation.startsWith("https")) {
            schemaText = await this.loadSchemaFromSecureURI(new URL(this.config.schemaLocation));
        } else {
            schemaText = await this.loadSchemaFromFile(this.config.schemaLocation);
        }

        let dn = new DocumentNode()
        let schema: buildASTSchema = buildASTSchema(schemaText);
        return schema;
    }

    async loadSchemaFromFile(filePath: string): Promise<string> {
        let graphQLSchemaText = readFileSync(filePath, 'utf8')
        return new Promise((resolve, reject) => {
            readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async loadSchemaFromURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, http);
    }

    async loadSchemaFromSecureURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, https);
    }

    async loadWebResource(url: URL, httpModule: any): Promise<string> {
        return new Promise((resolve, reject) => {
            let client = httpModule;
            client.get(url, (resp: IncomingMessage) => {
                let data = '';    
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err: Error) => {
                reject(err);
            });
        });
    }
}
  


function main() {


}