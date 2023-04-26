

import { 
    GHOMGraphQLLoader 
} from "./graphql/graphql_loader";

import { writeFileSync } from "fs";

import { 
    ElementDefinition, 
    ElementDefinitionType, 
    ElementDefinition_Ref, 
    ElementProcessor, 
    ElementProcessorResultSet, 
    ElementRefDef 
} from "./element_processors";

import { 
    CryptoUtils 
} from "./utils/crypto_utils";


export enum GHOMTargetLanguageKind {
    TypeScript = "TypeScript",
}
export interface GHOMGeneratorConfig {
    schemaLocationURI: string;
    targetLanguage: GHOMTargetLanguageKind;
    generationOutputDirectory: string;
}
export interface GeneratedArtifactInfo {
    element: ElementRefDef
    filename: string;
    filepath: string;
    filecontents: string;
    timestamp: Date;
    sha256: string;
}

export interface IGHOMGenerator { 
    generateTargets(elements: ElementProcessorResultSet): Promise<GeneratedArtifactInfo[]>;
}

export class GHOMGenerator {
    config: GHOMGeneratorConfig;

    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    private async loadInitialAst(): Promise<ElementProcessorResultSet> {
        let graphqlLoader = new GHOMGraphQLLoader(this.config)
        let documentAst = await graphqlLoader.loadSchema();
        let elementProcessor = new ElementProcessor();
        let elementResultSet: ElementProcessorResultSet = await elementProcessor.processDocumentAST(documentAst);
        
        return elementResultSet;
    }

    private generatorForTarget(targetLanguage: GHOMTargetLanguageKind): {new(): IGHOMGenerator} {
        switch (targetLanguage) {
            case GHOMTargetLanguageKind.TypeScript:
                let t = typeof TypeScriptGHOMGenerator;
                return t as any as {new(): any};
            default:
                throw new Error("Unknown target language");
        }
    }

    private async generateGHOMFromElements(elementResultSet: ElementProcessorResultSet) {
        let gen = this.generatorForTarget(this.config.targetLanguage);
        let generator = new gen();

        generator.generateTargets(elementResultSet);

    }

    public async generateGHOM() {
        let elementResultSet: ElementProcessorResultSet = await this.loadInitialAst();
        this.generateGHOMFromElements(elementResultSet); 
    }
}

export class TypeScriptGHOMGenerator implements IGHOMGenerator {
    config: GHOMGeneratorConfig;
    
    constructor(config: GHOMGeneratorConfig) {
        this.config = config;
    }

    async generateTargets(elementResultSet: ElementProcessorResultSet): Promise<GeneratedArtifactInfo[]> {
        let generatedTargets = new Array<GeneratedArtifactInfo>();

        let interfaceMap = elementResultSet.elementsMap.get(ElementDefinitionType.InterfaceType);
        interfaceMap!.forEach(async (value: ElementRefDef, key: string, map: Map<String, ElementRefDef>) => {
            let interfaceName = key;
            let elementRef = value.ref;
            let elementDef = value.def;

            let fileArtifactInfo = this.generateTypeScriptInterface(value);
            writeFileSync(fileArtifactInfo.filepath, fileArtifactInfo.filecontents, {encoding: "utf8"});
            let hexoutput = await CryptoUtils.hashGeneratedTarget(fileArtifactInfo);
            fileArtifactInfo.sha256 = hexoutput;

            generatedTargets.push(fileArtifactInfo);
        });

        // Generate objects
        let objectMap = elementResultSet.elementsMap.get(ElementDefinitionType.ObjectType);
        objectMap!.forEach(async (value: ElementRefDef, key: string, map: Map<String, ElementRefDef>) => {
            let objectName = key;
            let elementRef = value.ref;
            let elementDef = value.def;
            let fileArtifactInfo = this.generateTypeScriptClass(objectName, elementRef, elementDef);

            writeFileSync(
                fileArtifactInfo.filepath, 
                fileArtifactInfo.filecontents, 
                { 
                    encoding: "utf8" 
                });

            let hexoutput = await CryptoUtils.hashGeneratedTarget(fileArtifactInfo);

            fileArtifactInfo.sha256 = hexoutput;
            generatedTargets.push(fileArtifactInfo);
        });

        return Promise.resolve(generatedTargets);
    }

    generateTypeScriptInterface(element: ElementRefDef): GeneratedArtifactInfo {
        let interfaceTemplate = `export interface ${element.ref.name} {
            `;
        return {} as GeneratedArtifactInfo;
    }

    generateTypeScriptClass(className: string, elementRef: ElementDefinition_Ref, elementDef: ElementDefinition): GeneratedArtifactInfo {
        
        return {} as GeneratedArtifactInfo;
    }
}