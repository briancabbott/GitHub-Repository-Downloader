"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql"); // ES6
const ghom_generator_1 = require("./ghom_generator");
async function main() {
    let schemaLoc = "https://docs.github.com/public/schema.docs.graphql";
    const config = {
        schemaLocationURI: schemaLoc,
        targetLanguage: ghom_generator_1.GHOMTargetLanguageKind.TypeScript,
        generationOutputDirectory: "output"
    };
    const generator = new ghom_generator_1.GHOMGenerator(config);
    generator.generateGHOM();
}
let l = async () => {
    await main();
};
l();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUJBQWlCLENBQUMsTUFBTTtBQWtCeEIscURBQThGO0FBRTlGLEtBQUssVUFBVyxJQUFJO0lBQ2hCLElBQUksU0FBUyxHQUFHLG9EQUFvRCxDQUFDO0lBRXJFLE1BQU0sTUFBTSxHQUF3QjtRQUNoQyxpQkFBaUIsRUFBRSxTQUFTO1FBQzVCLGNBQWMsRUFBRSx1Q0FBc0IsQ0FBQyxVQUFVO1FBQ2pELHlCQUF5QixFQUFFLFFBQVE7S0FDdEMsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksOEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7QUFFN0IsQ0FBQztBQUVELElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ2YsTUFBTSxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDLENBQUE7QUFDRCxDQUFDLEVBQUUsQ0FBQyJ9