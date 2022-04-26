"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCloneTemp = exports.GitCloneTemp_CommandInfo = void 0;
const child_process_1 = require("child_process");
const path_1 = require("path");
require("process");
const fs_1 = require("fs");
const fsext = require("fs-extra");
const git_clone_temp_logger_1 = require("./git_clone_temp_logger");
/**
 * Temp in the sense that I need a logging cloning agent now, but, will implement a better version later with the GitCommands Model.
 */
class GitCloneTemp_CommandInfo {
    constructor(commandText, repo, targetPath, startTime, endTime, cloneOperationFailed, childProcessPid, commandLogFilePath, executionErrors) {
        this.commandText = commandText;
        this.repo = repo;
        this.targetPath = targetPath;
        this.startTime = startTime;
        this.endTime = endTime,
            this.cloneOperationFailed = cloneOperationFailed;
        this.childProcessPid = childProcessPid;
        this.commandLogFilePath = commandLogFilePath;
        // this.stdOutDataMessages = stdOutDataMessages || new Array<string>();
        // this.stdOutErrMessages = stdOutErrMessages || new Array<string>();
        // this.stdErrDataMessages = stdErrDataMessages || new Array<string>();
        // this.stdErrErrMessages = stdErrErrMessages || new Array<string>();
        // this.closeMessage = closeMessage;
        this.executionErrors = executionErrors || new Array();
    }
    determineFailureStatus() {
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
    writeToFile(dirName) {
        let ciWritePath = (0, path_1.join)(dirName || this.targetPath, "GitCloneTemp_CommandInfo.json");
        let jsonContent = JSON.stringify(this, undefined, 4);
        try {
            (0, fs_1.writeFileSync)(ciWritePath, jsonContent, { flag: "a+" });
        }
        catch (e) {
            console.log("ERROR OCCURED WRITING GitClone CommandInfo. Error was: " + e);
        }
        return ciWritePath;
    }
}
exports.GitCloneTemp_CommandInfo = GitCloneTemp_CommandInfo;
class GitCloneTemp {
    constructor() {
        this.commandInfo = new GitCloneTemp_CommandInfo();
    }
    execute(repo, targetPath, cb) {
        var git = 'git';
        var args = ['clone'];
        args.push('--progress');
        args.push('--verbose');
        args.push(repo);
        args.push(targetPath);
        this.commandInfo.commandText = git + " " + args.join(" ");
        this.commandInfo.repo = repo;
        this.commandInfo.targetPath = targetPath;
        this.commandInfo.startTime = new Date();
        console.log("spawning clone osProcess: osProcess information is: ", git, args);
        var osProcess = (0, child_process_1.spawn)(git, args);
        this.commandInfo.childProcessPid = osProcess.pid;
        let workingDir = process.cwd() + "/workingdir";
        fsext.ensureDirSync(workingDir);
        let commandLogger = new git_clone_temp_logger_1.GitCloneTempLogger(osProcess.pid, this.commandInfo.startTime, repo, workingDir);
        this.commandInfo.commandLogFilePath = commandLogger.logFileLocationPath();
        osProcess.stdout.on("data", (chunk) => {
            let procStdOutDataMsg = "child_process(" + osProcess.pid + ")::clone(" + repo + "):stdout:data: " + chunk;
            commandLogger.log(procStdOutDataMsg);
        });
        osProcess.stdout.on("error", (error) => {
            let procStdOutErrMsg = "child_process(" + osProcess.pid + ")::clone(" + repo + "):stdout:error: " + error.message;
            commandLogger.log(procStdOutErrMsg);
        });
        osProcess.stderr.on("data", (chunk) => {
            let procStdErrDataMsg = "child_process(" + osProcess.pid + ")::clone(" + repo + "):stderr:data: " + chunk;
            commandLogger.log(procStdErrDataMsg);
        });
        osProcess.stderr.on("error", (error) => {
            let procStdErrErrMsg = "child_process(" + osProcess.pid + ")::clone(" + repo + "):stderr:error: " + error.message;
            commandLogger.log(procStdErrErrMsg);
        });
        osProcess.on('close', (status) => {
            this.commandInfo.endTime = new Date();
            let closeMessage = "child_process(" + osProcess.pid + ")::clone(" + repo + "):close()";
            if (status !== 0) {
                closeMessage += ":error: with status: " + status;
            }
            commandLogger.log(closeMessage);
            cb(this.commandInfo);
        });
    }
}
exports.GitCloneTemp = GitCloneTemp;
