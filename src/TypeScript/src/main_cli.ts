
import * as yargs from "yargs"
import { OperationConfig, performOperationSetup, performListRetrieval, performRepositoryDownloads } from "./main";
import { GHOMVerifier } from "./ghom/utils/ghom-verifier/GhomVerifier";

const path = './file.txt'




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

let repositoriesListCommand: yargs.CommandModule = {
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
        let organizations = <Array<string>> argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];

        let oc: OperationConfig = {
            tokenFile: <string>ghautf,
            token: <string>ghaut,
            organizations: organizations,
            workingDirectory: <string>awd,
            globalStoreDirectory: <string>gsd,
            organizationDownloadPath: "",
            isLongRunningDownloadOperation: false
        };

        let downloadOp = performOperationSetup(oc);
        performListRetrieval(downloadOp);
    }
};


let downloadCommand: yargs.CommandModule = {
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
    handler: (argv) => {
        let organizations: Array<string> = <Array<string>> argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];
        let lrdo = argv["is-longrunning-download"];

        let oc: OperationConfig = {
            tokenFile: <string>ghautf,
            token: <string>ghaut,
            organizations: <string[]>organizations,
            workingDirectory: <string>awd,
            globalStoreDirectory: <string>gsd,
            organizationDownloadPath: "",
            isLongRunningDownloadOperation: <boolean>lrdo
        };

        let downloadOp = performOperationSetup(oc);
        performRepositoryDownloads(downloadOp);
    }
};

let ghomVerifierCommand: yargs.CommandModule = {
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

        console.log(typeof uriValue)

        let ghomVerifier = new GHOMVerifier();
        let source = ghomVerifier.loadSchema(<string>uriValue);
        let doc = ghomVerifier.parseSchema(source);

        console.log("got source: ", source);
    }
};

let updateCommand: yargs.CommandModule = {
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
        let organizations: Array<string> = <Array<string>>argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let organizationDownloadPath = argv["organization-download-path"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];

        let oc: OperationConfig = {
            tokenFile: <string>ghautf,
            token: <string>ghaut,
            organizations: <string[]>organizations,
            organizationDownloadPath: <string>organizationDownloadPath,
            workingDirectory: <string>awd,
            globalStoreDirectory: <string>gsd,
            isLongRunningDownloadOperation: false
        };

        let downloadOp = performOperationSetup(oc);
        // performNewRepositoryDownloads(downloadOp);

    }
}

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
let y = yargs
    .command(downloadCommand)
    .command(updateCommand)
    .command(repositoriesListCommand)
    .command(ghomVerifierCommand)
    .usage("GitHub Downloader")
    .strict();

    // .demandCommand()
    // .demandCommand(0, 0) // minMsg?: string, maxMsg?: string): Argv;
    // .command(validateCommand)
y.argv;
