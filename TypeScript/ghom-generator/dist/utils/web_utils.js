"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebResourceLoader = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = require("fs");
class WebResourceLoader {
    resourceURI;
    constructor(resourceURI) {
        this.resourceURI = resourceURI;
    }
    async loadSchema() {
        let resource = "";
        let loc = new URL(this.resourceURI);
        if (loc.protocol === "http:") {
            resource = await this.loadWebResourceFromURI(loc);
        }
        else if (loc.protocol === "https:") {
            resource = await this.loadWebResourceFromSecureURI(loc);
        }
        else if (loc.protocol === "file:") {
            resource = this.loadWebResourceFromFile(this.resourceURI);
        }
        return resource;
    }
    loadWebResourceFromFile(filePath) {
        return (0, fs_1.readFileSync)(filePath, 'utf8');
    }
    async loadWebResourceFromURI(webResource) {
        return await this.loadWebResource(webResource, http_1.default);
    }
    async loadWebResourceFromSecureURI(webResource) {
        return await this.loadWebResource(webResource, https_1.default);
    }
    async loadWebResource(url, httpModule) {
        return new Promise((resolve, reject) => {
            let client = httpModule;
            client.get(url, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
}
exports.WebResourceLoader = WebResourceLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3dlYl91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxnREFBd0I7QUFDeEIsa0RBQTBCO0FBRTFCLDJCQUFrQztBQUdsQyxNQUFhLGlCQUFpQjtJQUMxQixXQUFXLENBQVM7SUFFcEIsWUFBWSxXQUFtQjtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDbkIsSUFBSSxRQUFRLEdBQVcsRUFBRSxDQUFBO1FBRXpCLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNuQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1lBQzFCLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDbEMsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtZQUNqQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM3RDtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxRQUFnQjtRQUM1QyxPQUFPLElBQUEsaUJBQVksRUFBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxXQUFnQjtRQUNqRCxPQUFPLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsY0FBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxXQUFnQjtRQUN2RCxPQUFPLE1BQU0sSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsZUFBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBUSxFQUFFLFVBQWU7UUFDbEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFxQixFQUFFLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN0QixJQUFJLElBQUksS0FBSyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBakRELDhDQWlEQyJ9