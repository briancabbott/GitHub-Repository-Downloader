"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = __importStar(require("yargs"));
const main_1 = require("./main");
const GhomVerifier_1 = require("./ghom/utils/ghom-verifier/GhomVerifier");
const download_1 = require("./download");
// let validateAuthToken = () => {}
// let m: { [key: string]: yargs.Options }
//         alias?: string | string[];
//         array?: boolean;
//         boolean?: boolean;
//         choices?: Choices;
//         coerce?: (arg: any) => any;
//         config?: boolean;
//         configParser?: (configPath: string) => object;
//         conflicts?: string | string[] | { [key: string]: string | string[] };
//         count?: boolean;
//         default?: any;
//         defaultDescription?: string;
//         /**
//          *  @deprecated since version 6.6.0
//          *  Use 'demandOption' instead
//          */
//         demand?: boolean | string;
//         demandOption?: boolean | string;
//         desc?: string;
//         describe?: string;
//         description?: string;
//         global?: boolean;
//         group?: string;
//         hidden?: boolean;
//         implies?: string | string[] | { [key: string]: string | string[] };
//         nargs?: number;
//         normalize?: boolean;
//         number?: boolean;
//         /**
//          *  @deprecated since version 6.6.0
//          *  Use 'demandOption' instead
//          */
//         require?: boolean | string;
//         /**
//          *  @deprecated since version 6.6.0
//          *  Use 'demandOption' instead
//          */
//         required?: boolean | string;
//         requiresArg?: boolean;
//         skipValidation?: boolean;
//         string?: boolean;
//         type?: "array" | "count" | PositionalOptionsType;
let repositoriesListCommand = {
    command: 'list',
    describe: 'Retrieves a list of repositories for the organizations provided to the parameter.',
    builder: {
        "organization": {
            demand: true,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "array",
            alias: ["o", "org"]
        },
        "github-auth-token": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token", "gat", "at"]
        },
        "github-auth-token-file": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token-file", "gatf", "atf"]
        },
        "global-store-directory": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["storedir", "sd", "s"]
        },
        "application-working-directory": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["workdir", "wd", "w"]
        }
    },
    handler: (argv) => {
        let organizations = argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];
        let oc = {
            tokenFile: ghautf,
            token: ghaut,
            organizations: organizations,
            workingDirectory: awd,
            globalStoreDirectory: gsd,
            organizationDownloadPath: "",
            isLongRunningDownloadOperation: false
        };
        let downloadOp = (0, main_1.performOperationSetup)(oc);
        (0, main_1.performListRetrieval)(downloadOp);
    }
};
let downloadCommand = {
    command: 'download',
    describe: 'Download all GitHub Repositories for the organizations specified',
    builder: {
        "organization": {
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "array",
            alias: ["o", "org"]
        },
        "github-auth-token": {
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token", "gat", "at"]
        },
        "github-auth-token-file": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token-file", "gatf", "atf"]
        },
        "global-store-directory": {
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["storedir", "sd", "s"]
        },
        "application-working-directory": {
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["workdir", "wd", "w"]
        },
        "is-longrunning-download": {
            requiresArg: true,
            skipValidation: false,
            default: false,
            type: "boolean",
            alias: ["lrd"]
        }
        // Retries downloads on repositories that have failed.
        // retry-on-failed
        // conflicts?: string | string[] | { [key: string]: string | string[] };
        // The maximum number of retries
        // maximum-retries
        // This set of methods to use for validation (simple-list-to-folder, log-parsing, local-git-command)
        // validation-methods
        // Skip performing post-download completness validation
        // skip-validation
        // Todo: Would need to create a merge-operation to support this...
        // merge-into-existing
    },
    handler: async (argv) => {
        let organizations = argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];
        let lrdo = argv["is-longrunning-download"];
        let oc = {
            tokenFile: ghautf,
            token: ghaut,
            organizations: organizations,
            workingDirectory: awd,
            globalStoreDirectory: gsd,
            organizationDownloadPath: "",
            isLongRunningDownloadOperation: lrdo
        };
        let downloadOp = (0, main_1.performOperationSetup)(oc);
        let list = await (0, main_1.performListRetrieval)(downloadOp);
        console.log(list);
        console.log("REPO FILES FINISHED...");
        list.forEach(async (orl) => {
            for (let org of downloadOp.organizations) {
                const downloader = new download_1.Downloader(downloadOp, org);
                const cloneCommandResults = await downloader.downloadRepositories(orl);
                cloneCommandResults.forEach(element => console.log("CloneCommand: ", element));
            }
        });
    }
};
let ghomVerifierCommand = {
    command: "ghom-verify",
    describe: "verifies the current GHOM implementation against an instance of the GitHub GraphQL Schema.",
    builder: {
        "schema-uri": {
            demand: true,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["schema-file", "su", "sf"]
        }
    },
    handler: (argv) => {
        let uriValue = argv["schemaUri"];
        console.log(typeof uriValue);
        let ghomVerifier = new GhomVerifier_1.GHOMVerifier();
        let source = ghomVerifier.loadSchema(uriValue);
        let doc = ghomVerifier.parseSchema(source);
        console.log("got source: ", source);
    }
};
let updateCommand = {
    command: "update",
    describe: `Updates a current organization download collection with any repositories that have been added
               since either the last update or initial download operations.`,
    builder: {
        "organization": {
            demand: true,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "array",
            alias: ["o", "org"]
        },
        "organization-download-path": {
            demand: true,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["od", "odp"]
        },
        "github-auth-token": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token", "gat", "at"]
        },
        "github-auth-token-file": {
            demand: false,
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["auth-token-file", "gatf", "atf"]
        },
    },
    handler: (argv) => {
        let organizations = argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let organizationDownloadPath = argv["organization-download-path"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];
        let oc = {
            tokenFile: ghautf,
            token: ghaut,
            organizations: organizations,
            organizationDownloadPath: organizationDownloadPath,
            workingDirectory: awd,
            globalStoreDirectory: gsd,
            isLongRunningDownloadOperation: false
        };
        let downloadOp = (0, main_1.performOperationSetup)(oc);
        // performNewRepositoryDownloads(downloadOp);
    }
};
/**
 * Performs a validation function using operation log data against a given Repository Store.
//  */
// let validateCommand: yargs.CommandModule = {
//             // This set of methods to use for validation (simple-list-to-folder, log-parsing, local-git-command)
//         // validation-methods
//     handler: (argv) => {
//     }
// }
// let y: yargs.Argv;
// const argv = await parser.parse();
const parser = yargs
    .command(downloadCommand)
    .command(updateCommand)
    .command(repositoriesListCommand)
    .command(ghomVerifierCommand)
    .usage("GitHub Downloader")
    .strict();
// try {
//     const argv = parser.parse();
// } catch (err) {
//     console.info(`${err.message}\n ${await parser.getHelp()}`);
// }
(async () => {
    const argv = await parser.argv;
    argv.a;
    // => No error, type: boolean
})();
// .demandCommand()
// .demandCommand(0, 0) // minMsg?: string, maxMsg?: string): Argv;
// .command(validateCommand)
