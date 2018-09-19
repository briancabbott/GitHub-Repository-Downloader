// /**
//  * Abstract parent/interface for all git cli commands.
//  */
// import { ChildProcess, spawn, SpawnOptions } from "child_process";
// export abstract class GitCommand {
//     readonly primaryCommand: string = "git";
//     secondaryCommand: string;
//     secondaryCommandParameters: Array<GitCommandParameter>;
//     executionParameters: Array<GitCommandParameter>;
//     init() {
//         let cp: ChildProcess;
//         let commandParameters = new Array<string>();
//         commandParameters.push(this.secondaryCommand);
//         commandParameters.push(...this.secondaryCommandParameters);
//         let spawnOptions: SpawnOptions = {};
//         let processEnv: NodeJS.ProcessEnv = {};
//         spawnOptions.env = new ()
//         spawn(this.primaryCommand, )
//     }
//     setupStdIoHooking() {
//     }
//     setupProcessSignalHooking() {
//     }
//     executeAsChildProcess() {
//     }
//     executeAsFork() {
//     }
// }
