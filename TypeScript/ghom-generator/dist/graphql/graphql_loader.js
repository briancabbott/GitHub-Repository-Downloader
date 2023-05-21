"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHOMGraphQLLoader = void 0;
const graphql_1 = require("graphql");
const web_utils_1 = require("../utils/web_utils");
class GHOMGraphQLLoader {
    config;
    constructor(config) {
        this.config = config;
    }
    async loadSchema() {
        let schemaText = "";
        let webResourceLoader = new web_utils_1.WebResourceLoader(this.config.schemaLocationURI);
        schemaText = await webResourceLoader.loadSchema();
        const source = new graphql_1.Source(schemaText, 'GitHub.graphql');
        const ast = (0, graphql_1.parse)(source);
        return ast;
    }
}
exports.GHOMGraphQLLoader = GHOMGraphQLLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbF9sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ3JhcGhxbC9ncmFwaHFsX2xvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FDZTtBQUVmLGtEQUF1RDtBQUV2RCxNQUFhLGlCQUFpQjtJQUMxQixNQUFNLENBQXNCO0lBRTVCLFlBQVksTUFBMkI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVO1FBQ25CLElBQUksVUFBVSxHQUFXLEVBQUUsQ0FBQztRQUU1QixJQUFJLGlCQUFpQixHQUFHLElBQUksNkJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdFLFVBQVUsR0FBRyxNQUFNLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUN4RCxNQUFNLEdBQUcsR0FBRyxJQUFBLGVBQUssRUFBQyxNQUFNLENBQUMsQ0FBQztRQUUxQixPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUM7Q0FDSjtBQWpCRCw4Q0FpQkMifQ==