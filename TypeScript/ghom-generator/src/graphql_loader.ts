import { readFile, readFileSync } from "fs";
import { DocumentNode, Source, parse } from "graphql";
import { IncomingMessage } from "http";
import http from 'http';
import https from 'https';
import { GHOMGeneratorConfig } from './ghom_generator';


export class GHOMGraphQLLoader {
    config: GHOMGeneratorConfig;

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    public async loadSchema(): Promise<DocumentNode> {
        let schemaText: string = ""

        let loc = new URL(this.config.schemaLocationURI)
        if (loc.protocol === "http:") {
            schemaText = await this.loadSchemaFromURI(loc);
        } else if (loc.protocol === "https:") {
            schemaText = await this.loadSchemaFromSecureURI(loc);
        } else if (loc.protocol === "file:") {
            schemaText = this.loadSchemaFromFile(this.config.schemaLocationURI);
        }
        
        const source = new Source(schemaText, 'GitHub.graphql');
        const ast = parse(source);
        return ast
    }

    private loadSchemaFromFile(filePath: string): string {
        return readFileSync(filePath, 'utf8');
    }

    private async loadSchemaFromURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, http);
    }

    private async loadSchemaFromSecureURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, https);
    }

    private async loadWebResource(url: URL, httpModule: any): Promise<string> {
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