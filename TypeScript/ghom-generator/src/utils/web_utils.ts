
import { readFile, readFileSync } from "fs";
import { DocumentNode, Source, parse } from "graphql";
import { IncomingMessage } from "http";
import http from 'http';
import https from 'https';

export class WebResourceLoader {
    resourceURI: string;

    constructor(resourceURI: string) {
        this.resourceURI = resourceURI;
    }

    public async loadSchema(): Promise<string> {
        let resource: string = ""

        let loc = new URL(this.resourceURI)
        if (loc.protocol === "http:") {
            resource = await this.loadWebResourceFromURI(loc);
        } else if (loc.protocol === "https:") {
            resource = await this.loadWebResourceFromSecureURI(loc);
        } else if (loc.protocol === "file:") {
            resource = this.loadWebResourceFromFile(this.resourceURI);
        }
        return resource;
    }

    private loadWebResourceFromFile(filePath: string): string {
        return readFileSync(filePath, 'utf8');
    }

    private async loadWebResourceFromURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, http);
    }

    private async loadWebResourceFromSecureURI(webResource: URL): Promise<string> {
        return await this.loadWebResource(webResource, https);
    }

    public async loadWebResource(url: URL, httpModule: any): Promise<string> {
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