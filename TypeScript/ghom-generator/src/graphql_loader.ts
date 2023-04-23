import { readFile, readFileSync } from "fs";
import { DocumentNode, Source, parse } from "graphql";
import { IncomingMessage } from "http";
import http from 'http';
import https from 'https';
import { GHOMGeneratorConfig } from "./main";


export class GHOMGraphQLLoader {
    config: GHOMGeneratorConfig;

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    public async loadSchema(): Promise<DocumentNode> {
        let schemaText: string = ""

        let loc = new URL(this.config.schemaLocation)
        if (loc.protocol === "http:") {
            schemaText = await this.loadSchemaFromURI(new URL(this.config.schemaLocation));
        } else if (loc.protocol === "https:") {
            schemaText = await this.loadSchemaFromSecureURI(loc);
        } else {
            schemaText = await this.loadSchemaFromFile(this.config.schemaLocation);
        }
        
        const source = new Source(schemaText, 'GitHub.graphql');
        const ast = parse(source);
        return ast
    }

    private async loadSchemaFromFile(filePath: string): Promise<string> {
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