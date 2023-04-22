
import * as yargs from "yargs"

import { OperationConfig, performOperationSetup, performListRetrieval, performListLatestCommitsRetrieval } from "./main";
import { GHOMVerifier } from "./ghom/utils/ghom-verifier/GhomVerifier";
import { Downloader } from "./download";
import { OrganizationRepositoriesList, Repository } from "./model";

import { createObjectCsvWriter } from 'csv-writer';
import { string } from "yargs";



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
    handler: async (argv) => {
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
        let list: OrganizationRepositoriesList[] = await performListRetrieval(downloadOp);
        console.log(list);
        console.log("REPO FILES FINISHED...");
        list.forEach(async (orl) => {
            for (let org of downloadOp.organizations) {
                const downloader = new Downloader(downloadOp, org);
                const cloneCommandResults = await downloader.downloadRepositories(orl);
                cloneCommandResults.forEach(element => console.log("CloneCommand: ", element));
            }
        });
    }
};

// TODO: Move this to an internal kind of maintenance place 
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

// NOTE: I dont believe that this is currently implemented....
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
};

let listLatestCommitsForRepositories: yargs.CommandModule = { 
    command: "latest-commits",
    describe: "List the latest commits for an Organizations repositories or, the repositories present in a local directory that belong to an organization",
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
        "csv-file-name": {
            requiresArg: true,
            skipValidation: false,
            string: true,
            type: "string",
            alias: ["csv", "cv", "c"]
        }
    },
    handler: async (argv) => { 
        let organizations = <Array<string>> argv.organization;
        let ghaut = argv["github-auth-token"];
        let ghautf = argv["github-auth-token-file"];
        let gsd = argv["global-store-directory"];
        let awd = argv["application-working-directory"];
        let csvFilename: string = argv["csv-file-name"] as string;


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
        console.log("\t\t HERE: performing list retrieval...");
        // const m: Map<Repository, Date> = new Map<Repository, Date>()

        let latestDates: Array<{repository: string, latestCommit: Date}> = [];

        performListLatestCommitsRetrieval(downloadOp).then((list) => {
            
            list.forEach(async (e) => {
                e.repositoryCommitTimeMap.forEach((value: any, key: Repository, map) => {
                    console.log(`repository: ${key.name}`);
                    let dates: Array<Date> = new Array<Date>();
                    value.forEach((v: any) => {
                        dates.push(new Date(v.committedDate)); 
                    });
                    dates.sort((a: Date, b: Date) => {
                        return b.getTime() - a.getTime();
                    });
                    const latestCommit: Date = dates[0];
                    // m.set(key, latestCommit);
                    latestDates.push({repository: key.name, latestCommit: latestCommit});
                });
            });
            
            // latestDates.forEach( => {
            //     console.log(`repository: ${key.name} latest commit: ${value.getDay()}/${value.getMonth()}/${value.getFullYear()}`);
            

            let cvsFile: string = csvFilename || "latest_repository_dates.csv";
            let csvWriter = createObjectCsvWriter({
                path: cvsFile,
                header: [
                    {id: 'repository', title: 'repository'},
                    {id: 'latestCommit', title: 'latest commit'}
                ]
            });
            
            csvWriter.writeRecords(latestDates).then(() => {
                console.log('...Done');
            });

        });        
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
// const argv = await parser.parse();

const parser = yargs
    .command(downloadCommand)
    .command(updateCommand)
    .command(repositoriesListCommand)
    .command(ghomVerifierCommand)
    .command(listLatestCommitsForRepositories)
    .usage("GitHub Downloader")
    .strict();
// try {
//     const argv = parser.parse();

// } catch (err) {
//     console.info(`${err.message}\n ${await parser.getHelp()}`);
// }

(async() => {
    const argv = await parser.argv;
    argv.a
    // => No error, type: boolean
})();


// .demandCommand()
// .demandCommand(0, 0) // minMsg?: string, maxMsg?: string): Argv;
// .command(validateCommand)

