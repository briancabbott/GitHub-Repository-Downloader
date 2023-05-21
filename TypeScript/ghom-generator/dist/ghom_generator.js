"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeScriptGHOMGenerator = exports.GHOMGenerator = exports.GHOMTargetLanguageKind = void 0;
const graphql_loader_1 = require("./graphql/graphql_loader");
const fs_1 = require("fs");
const element_processors_1 = require("./element_processors");
const crypto_utils_1 = require("./utils/crypto_utils");
const core_1 = require("./graphql/elements/core");
var GHOMTargetLanguageKind;
(function (GHOMTargetLanguageKind) {
    GHOMTargetLanguageKind["TypeScript"] = "TypeScript";
})(GHOMTargetLanguageKind = exports.GHOMTargetLanguageKind || (exports.GHOMTargetLanguageKind = {}));
class GHOMGenerator {
    config;
    constructor(config) {
        this.config = config;
    }
    async loadInitialAst() {
        let graphqlLoader = new graphql_loader_1.GHOMGraphQLLoader(this.config);
        let documentAst = await graphqlLoader.loadSchema();
        let elementProcessor = new element_processors_1.ElementProcessor();
        let elementResultSet = await elementProcessor.processDocumentAST(documentAst);
        return elementResultSet;
    }
    generatorForTarget(targetLanguage) {
        switch (targetLanguage) {
            case GHOMTargetLanguageKind.TypeScript:
                let t = typeof TypeScriptGHOMGenerator;
                return t;
            default:
                throw new Error("Unknown target language");
        }
    }
    async generateGHOMFromElements(elementResultSet) {
        let gen = this.generatorForTarget(this.config.targetLanguage);
        let generator = new gen();
        generator.generateTargets(elementResultSet);
    }
    async generateGHOM() {
        let elementResultSet = await this.loadInitialAst();
        this.generateGHOMFromElements(elementResultSet);
    }
}
exports.GHOMGenerator = GHOMGenerator;
class TypeScriptGHOMGenerator {
    config;
    constructor(config) {
        this.config = config;
    }
    async generateTargets(elementResultSet) {
        let generatedTargets = new Array();
        let interfaceMap = elementResultSet.elementsMap.get(core_1.ElementDefinitionType.InterfaceType);
        interfaceMap.forEach(async (value, key, map) => {
            let interfaceName = key;
            let elementRef = value.ref;
            let elementDef = value.def;
            let fileArtifactInfo = this.generateTypeScriptInterface(value);
            (0, fs_1.writeFileSync)(fileArtifactInfo.filepath, fileArtifactInfo.filecontents, { encoding: "utf8" });
            let hexoutput = await crypto_utils_1.CryptoUtils.hashGeneratedTarget(fileArtifactInfo);
            fileArtifactInfo.sha256 = hexoutput;
            generatedTargets.push(fileArtifactInfo);
        });
        // Generate objects
        let objectMap = elementResultSet.elementsMap.get(core_1.ElementDefinitionType.ObjectType);
        objectMap.forEach(async (value, key, map) => {
            let objectName = key;
            let elementRef = value.ref;
            let elementDef = value.def;
            let fileArtifactInfo = this.generateTypeScriptClass(objectName, elementRef, elementDef);
            (0, fs_1.writeFileSync)(fileArtifactInfo.filepath, fileArtifactInfo.filecontents, {
                encoding: "utf8"
            });
            let hexoutput = await crypto_utils_1.CryptoUtils.hashGeneratedTarget(fileArtifactInfo);
            fileArtifactInfo.sha256 = hexoutput;
            generatedTargets.push(fileArtifactInfo);
        });
        return Promise.resolve(generatedTargets);
    }
    generateTypeScriptInterface(element) {
        let interfaceTemplate = `export interface ${element.ref.name} {
            `;
        return {};
    }
    generateTypeScriptClass(className, elementRef, elementDef) {
        return {};
    }
}
exports.TypeScriptGHOMGenerator = TypeScriptGHOMGenerator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2hvbV9nZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZ2hvbV9nZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkRBRWtDO0FBRWxDLDJCQUFtQztBQUVuQyw2REFJOEI7QUFFOUIsdURBRThCO0FBQzlCLGtEQUF5SDtBQUd6SCxJQUFZLHNCQUVYO0FBRkQsV0FBWSxzQkFBc0I7SUFDOUIsbURBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQUZXLHNCQUFzQixHQUF0Qiw4QkFBc0IsS0FBdEIsOEJBQXNCLFFBRWpDO0FBbUJELE1BQWEsYUFBYTtJQUN0QixNQUFNLENBQXNCO0lBRTVCLFlBQVksTUFBMkI7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVPLEtBQUssQ0FBQyxjQUFjO1FBQ3hCLElBQUksYUFBYSxHQUFHLElBQUksa0NBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3RELElBQUksV0FBVyxHQUFHLE1BQU0sYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25ELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO1FBQzlDLElBQUksZ0JBQWdCLEdBQThCLE1BQU0sZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekcsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRU8sa0JBQWtCLENBQUMsY0FBc0M7UUFDN0QsUUFBUSxjQUFjLEVBQUU7WUFDcEIsS0FBSyxzQkFBc0IsQ0FBQyxVQUFVO2dCQUNsQyxJQUFJLENBQUMsR0FBRyxPQUFPLHVCQUF1QixDQUFDO2dCQUN2QyxPQUFPLENBQXdCLENBQUM7WUFDcEM7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2xEO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxnQkFB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