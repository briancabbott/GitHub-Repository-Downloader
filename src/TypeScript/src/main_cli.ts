
import * as yargs from "yargs"

import { OperationConfig, ListOperationConfig, DownloadOperationConfig, performListRetrieval, PerformOperationSetup, Runtime } from "./main";
import { Downloader } from "./download";
import { OrganizationRepositoriesList, RepositoryDownloadOperation, RepositoryListOperation, UserRepositoriesList } from "./model";

// import { createObjectCsvWriter } from 'csv-writer';
// import { string } from "yargs";
// import { Operation } from "apollo-link";
import { GHOMVerifier } from "./ghom/utils/ghom-verifier/GHOMVerifier";



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

interface ExtendedOptions extends yargs.Options{
    propertyName?: string;
}

var optionsMap: {[key: string]: { [key: string]: ExtendedOptions }} = { };

optionsMap.common = {
    "user": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "array",
        alias: ["u", "usr"],
        propertyName: "users",
    },
    "organization": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "array",
        alias: ["o", "org"],
        propertyName: "organizations",
    },
    "github-auth-token": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "string",
        alias: ["auth-token", "gat", "at"],
        propertyName: "token",
    },
    "github-auth-token-file": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "string",
        alias: ["auth-token-file", "gatf", "atf"],
        propertyName: "tokenFile",
    },
    "global-store-directory": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "string",
        alias: ["storedir", "sd", "s"],
        propertyName: "",
    },
    "application-working-directory": {
        demand: false,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "string",
        alias: ["workdir", "wd", "w"],
        propertyName: "",
    }
}
optionsMap.list = {}
optionsMap.download = {
    "is-longrunning-download": {
        requiresArg: true,
        skipValidation: false,
        default: false,
        type: "boolean",
        alias: ["lrd"],
        propertyName: "",
    }
}
optionsMap.ghomVerifier = {
    "schema-uri": {
        demand: true,
        requiresArg: true,
        skipValidation: false,
        string: true,
        type: "string",
        alias: ["schema-file", "su", "sf"],
        propertyName: "",
    }
}
optionsMap.update = {}
optionsMap.listLatestCommitsForRepositories = {}

function createInstance<T1>(c: new () => T1): T1 {
    // return new T1.proptype.ctor();
    return new c();
}

export function ExtactConfigurationFromArguments<T1>(op: string, commands: string[], argv: yargs.Arguments): T1 {
    // let t = createInstance<T1>();
    let loc: OperationConfig = undefined;
    if (op == "list") {
        loc = new ListOperationConfig();
    } else if (op == "download") {
    } else if (op == "ghom-verifier") {
    } else if (op == "update") {
    } else if (op == "list-latest-commits-for-repositories") {
    } else {
        throw new Error("Operation not supported: " + op);
    }

    if (loc === undefined) {
        throw new Error("Operation not supported: " + op);
    }

    for (let c of commands) {
        let configSet: {[key: string]: ExtendedOptions} = optionsMap[c]
        for (let v in configSet) {
            let val = configSet[v];

            let vall = argv[v]

            console.log("v")
            console.log(v)
            console.log("val")
            console.log(val)
            console.log("vall")
            console.log(vall)
            loc[val.propertyName] = vall;
            console.log("object")
            console.log(JSON.stringify(loc, undefined, 4));

        }
    }

    console.log("FINALLLL");
    console.log("FINALLLL");
    console.log("FINALLLL");
    console.log(JSON.stringify(loc, undefined, 4));

    return loc as T1;
}

let repositoriesListCommand: yargs.CommandModule = {
    command: 'list',
    describe: 'Retrieves a list of repositories for the organizations provided to the parameter.',
    builder: {...optionsMap.common, ...optionsMap.list},
    handler: (argv) => {
        Runtime.setupRuntimeVars()

        let oc: ListOperationConfig = ExtactConfigurationFromArguments<ListOperationConfig>("list", ["common", "list"], argv);
        let op = PerformOperationSetup<RepositoryListOperation>(oc);
        let listResults = performListRetrieval(op);
        let json = JSON.stringify(listResults, undefined, 4);
        console.log("Repositories List Command Results");
        console.log(json)
    }
};

let downloadCommand: yargs.CommandModule = {
    command: 'download',
    describe: 'Download all GitHub Repositories for the organizations specified',
    builder: {...optionsMap.common, ...optionsMap.download},
    handler: async (argv) => {
        let oc: DownloadOperationConfig = ExtactConfigurationFromArguments<DownloadOperationConfig>('download', ["common", "download"], argv);
        let downloadOp: RepositoryDownloadOperation = PerformOperationSetup<RepositoryDownloadOperation>(oc);
        let list: UserRepositoriesList[] | OrganizationRepositoriesList[] = await performListRetrieval(downloadOp);

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
    builder: {...optionsMap.common, ...optionsMap.ghomVerifier},
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
    builder: {...optionsMap.common, ...optionsMap.update},
    handler: (argv) => {
        // let organizations: Array<string> = <Array<string>>argv.organization;
        // let ghaut = argv["github-auth-token"];
        // let ghautf = argv["github-auth-token-file"];
        // let organizationDownloadPath = argv["organization-download-path"];
        // let gsd = argv["global-store-directory"];
        // let awd = argv["application-working-directory"];

        // let oc: OperationConfig = {
        //     tokenFile: <string>ghautf,
        //     token: <string>ghaut,
        //     organizations: <string[]>organizations,
        //     organizationDownloadPath: <string>organizationDownloadPath,
        //     workingDirectory: <string>awd,
        //     globalStoreDirectory: <string>gsd,
        //     isLongRunningDownloadOperation: false
        // };

        // let downloadOp = PerformOperationSetup(oc);
        // // performNewRepositoryDownloads(downloadOp);

    }
};

let listLatestCommitsForRepositoriesCommand: yargs.CommandModule = { 
    command: "latest-commits",
    describe: "List the latest commits for an Organizations repositories or, the repositories present in a local directory that belong to an organization",
    builder: {...optionsMap.common, ...optionsMap.listLatestCommitsForRepositories},
    handler: async (argv) => { 

        // let organizations = <Array<string>> argv.organization;
        // let ghaut = argv["github-auth-token"];
        // let ghautf = argv["github-auth-token-file"];
        // let gsd = argv["global-store-directory"];
        // let awd = argv["application-working-directory"];
        // let csvFilename: string = argv["csv-file-name"] as string;


        // let oc: OperationConfig = {
        //     tokenFile: <string>ghautf,
        //     token: <string>ghaut,
        //     organizations: organizations,
        //     workingDirectory: <string>awd,
        //     globalStoreDirectory: <string>gsd,
        //     organizationDownloadPath: "",
        //     isLongRunningDownloadOperation: false
        // };
        // let downloadOp = performOperationSetup(oc);
        // console.log("\t\t HERE: performing list retrieval...");
        // // const m: Map<Repository, Date> = new Map<Repository, Date>()

        // let latestDates: Array<{repository: string, latestCommit: Date}> = [];

        // performListLatestCommitsRetrieval(downloadOp).then((list) => {
            
        //     list.forEach(async (e) => {
        //         e.repositoryCommitTimeMap.forEach((value: any, key: Repository, map) => {
        //             console.log(`repository: ${key.name}`);
        //             let dates: Array<Date> = new Array<Date>();
        //             value.forEach((v: any) => {
        //                 dates.push(new Date(v.committedDate)); 
        //             });
        //             dates.sort((a: Date, b: Date) => {
        //                 return b.getTime() - a.getTime();
        //             });
        //             const latestCommit: Date = dates[0];
        //             // m.set(key, latestCommit);
        //             latestDates.push({repository: key.name, latestCommit: latestCommit});
        //         });
        //     });
            
        //     // latestDates.forEach( => {
        //     //     console.log(`repository: ${key.name} latest commit: ${value.getDay()}/${value.getMonth()}/${value.getFullYear()}`);
            

        //     let cvsFile: string = csvFilename || "latest_repository_dates.csv";
        //     let csvWriter = createObjectCsvWriter({
        //         path: cvsFile,
        //         header: [
        //             {id: 'repository', title: 'repository'},
        //             {id: 'latestCommit', title: 'latest commit'}
        //         ]
        //     });
            
        //     csvWriter.writeRecords(latestDates).then(() => {
        //         console.log('...Done');
        //     });

        // });        
    }
} 

const parser = yargs
    .command(downloadCommand)
    .command(updateCommand)
    .command(repositoriesListCommand)
    .command(ghomVerifierCommand)
    .command(listLatestCommitsForRepositoriesCommand)
    .usage("GitHub Downloader")
    .strict();
(async() => {
    const argv = await parser.argv;
    argv.a
})();