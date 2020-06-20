import { spawn } from "child_process";
import { GitCloneTempLogger } from "./git_clone_temp_logger";
import { join } from "path";
import { writeFileSync } from "fs";
var fsext = require("fs-extra");


/**
 * Temp in the sense that I need a logging cloning agent now, but, will implement a better version later with the GitCommands Model.
 */


export class GitCloneTemp_CommandInfo {
    commandText: string
    repo: string;
    targetPath: string;
    startTime: Date;
    endTime: Date;
    cloneOperationFailed: boolean;
    childProcessPid: number;

    commandLogFilePath: string;

    // stdOutDataMessages: Array<string>;
    // stdOutErrMessages: Array<string>;
    // stdErrDataMessages: Array<string>;
    // stdErrErrMessages: Array<string>;
    // closeMessage: string;

    executionErrors: Array<Error>;

    constructor(commandText?: string, repo?: string, targetPath?: string, startTime?: Date, endTime?: Date,
        cloneOperationFailed?: boolean, childProcessPid?: number, commandLogFilePath?: string,
        executionErrors?: Array<Error>) {

        this.commandText = commandText;
        this.repo = repo;
        this.targetPath = targetPath;
        this.startTime = startTime;
        this.endTime = endTime,
        this.cloneOperationFailed = cloneOperationFailed;
        this.childProcessPid = childProcessPid;

        // this.stdOutDataMessages = stdOutDataMessages || new Array<string>();
        // this.stdOutErrMessages = stdOutErrMessages || new Array<string>();
        // this.stdErrDataMessages = stdErrDataMessages || new Array<string>();
        // this.stdErrErrMessages = stdErrErrMessages || new Array<string>();
        // this.closeMessage = closeMessage;

        this.executionErrors = executionErrors || new Array<Error>();
        this.commandLogFilePath = commandLogFilePath;
    }

    public determineFailureStatus() {
        // let messages = this.stdOutDataMessages.concat(this.stdOutErrMessages).concat(this.stdErrDataMessages)
        //     .concat(this.stdErrErrMessages).concat(this.closeMessage);

        // let capturedMsgsLength = this.stdOutDataMessages.length + this.stdOutErrMessages.length + this.stdErrDataMessages.length +
        //     this.stdErrErrMessages.length + 1; // +1 for close message.

        // if (messages.length !== capturedMsgsLength) {
        //     let errorMessage = "Messages incorrectly concatenated. Concatenated length was: " +
        //         messages.length + ". ChildProc CapturedMsg.Length was: " + capturedMsgsLength;

        //     console.log(errorMessage);
        //     throw new Error(errorMessage);
        // }

        // messages.forEach((message) => {
        //     let messagelc = message.toLowerCase();
        //     if (messagelc.includes("error") || messagelc.includes("fatal")) {
        //         this.cloneOperationFailed = true;
        //         return;
        //     }
        // });
    }

    public writeToFile(dirName?: string): string {
        let ciWritePath = join(dirName || this.targetPath, "GitCloneTemp_CommandInfo.json");
        let jsonContent = JSON.stringify(this, undefined, 4);

        try {
            writeFileSync(ciWritePath, jsonContent, { flag: "a+" });
        } catch (e) {
            console.log("ERROR OCCURED WRITING GitClone CommandInfo. Error was: " + e);
        }

        return ciWritePath;
    }
}


export class GitCloneTemp {
    commandInfo: GitCloneTemp_CommandInfo;

    constructor() {
        this.commandInfo = new GitCloneTemp_CommandInfo();

    }

    public execute(repo: string, targetPath: string, cb: (commandInfo: GitCloneTemp_CommandInfo) => void) {
        var git = 'git';
        var args = ['clone'];
        args.push('--progress')
        args.push('--verbose');
        args.push(repo);
        args.push(targetPath);

        this.commandInfo.commandText = git + " " + args.join(" ");
        this.commandInfo.repo = repo;
        this.commandInfo.targetPath = targetPath;
        this.commandInfo.startTime = new Date();

        console.log("spawning clone osProcess: osProcess information is: ", git, args);
        var osProcess = spawn(git, args);
        this.commandInfo.childProcessPid = osProcess.pid;

        let workingDir = process.cwd() + "/workingdir";
        fsext.ensureDirSync(workingDir);

        let commandLogger = new GitCloneTempLogger(osProcess.pid, this.commandInfo.startTime, repo, workingDir);
        this.commandInfo.commandLogFilePath = commandLogger.logFileLocationPath();

        osProcess.stdout.on("data", (chunk) => {
            let procStdOutDataMsg = "child_process(" + osProcess.pid + ")::clone("+ repo +"):stdout:data: " + chunk;
            commandLogger.log(procStdOutDataMsg);
        });
        osProcess.stdout.on("error", (error) => {
            let procStdOutErrMsg = "child_process(" + osProcess.pid + ")::clone("+ repo +"):stdout:error: " + error.message;
            commandLogger.log(procStdOutErrMsg);
        });
        osProcess.stderr.on("data", (chunk) => {
            let procStdErrDataMsg = "child_process(" + osProcess.pid + ")::clone("+ repo +"):stderr:data: " + chunk;
            commandLogger.log(procStdErrDataMsg);
        });
        osProcess.stderr.on("error", (error) => {
            let procStdErrErrMsg = "child_process(" + osProcess.pid + ")::clone("+ repo +"):stderr:error: " + error.message;
            commandLogger.log(procStdErrErrMsg);
        });

        osProcess.on('close', (status) => {
            this.commandInfo.endTime = new Date();
            let closeMessage = "child_process(" + osProcess.pid + ")::clone("+ repo +"):close()";
            if (status !== 0) {
                closeMessage += ":error: with status: " + status;
            }

            commandLogger.log(closeMessage);
            cb(this.commandInfo);
        });
    }
 }
