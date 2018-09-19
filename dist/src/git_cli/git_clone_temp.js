"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Temp in the sense that I need a logging cloning agent now, but, will implement a better version later with the GitCommands Model.
 */
class GitCloneTemp_CommandInfo {
    constructor(commandText, repo, targetPath, startTime, endTime, cloneOperationFailed, childProcessPid, stdOutDataMessages, stdOutErrMessages, stdErrDataMessages, stdErrErrMessages, closeMessage, executionErrors) {
        this.commandText = commandText;
        this.repo = repo;
        this.targetPath = targetPath;
        this.startTime = startTime;
        this.endTime = endTime,
            this.cloneOperationFailed = cloneOperationFailed;
        this.childProcessPid = childProcessPid;
        this.stdOutDataMessages = stdOutDataMessages || new Array();
        this.stdOutErrMessages = stdOutErrMessages || new Array();
        this.stdErrDataMessages = stdErrDataMessages || new Array();
        this.stdErrErrMessages = stdErrErrMessages || new Array();
        this.closeMessage = closeMessage;
        this.executionErrors = executionErrors || new Array();
    }
    determineFailureStatus() {
        let messages = this.stdOutDataMessages.concat(this.stdOutErrMessages).concat(this.stdErrDataMessages)
            .concat(this.stdErrErrMessages).concat(this.closeMessage);
        let capturedMsgsLength = this.stdOutDataMessages.length + this.stdOutErrMessages.length + this.stdErrDataMessages.length +
            this.stdErrErrMessages.length + 1;
        if (messages.length !== capturedMsgsLength) {
            let errorMessage = "Messages incorrectly concatenated. Concatenated length was: " +
                messages.length + ". ChildProc CapturedMsg.Length was: " + capturedMsgsLength;
            console.log(errorMessage);
            throw new Error(errorMessage);
        }
        messages.forEach((message) => {
            let messagelc = message.toLowerCase();
            if (messagelc.includes("error") || messagelc.includes("fatal")) {
                this.cloneOperationFailed = true;
                return;
            }
        });
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
        args.push('--');
        args.push(repo);
        args.push(targetPath);
        this.commandInfo.commandText = git + " " + args.join(" ");
        this.commandInfo.repo = repo;
        this.commandInfo.targetPath = targetPath;
        this.commandInfo.startTime = new Date();
        var process = child_process_1.spawn(git, args);
        this.commandInfo.childProcessPid = process.pid;
        process.stdout.on("data", (chunk) => {
            let procStdOutDataMsg = "child_process(" + process.pid + ")::clone(" + repo + "):stdout:data: " + chunk;
            // this.commandInfo.stdOutDataMessages.push(procStdOutDataMsg);
            console.log(procStdOutDataMsg);
        });
        process.stdout.on("error", (error) => {
            let procStdOutErrMsg = "child_process(" + process.pid + ")::clone(" + repo + "):stdout:error: " + error;
            // this.commandInfo.stdOutErrMessages.push(procStdOutErrMsg);
            console.log(procStdOutErrMsg);
        });
        process.stderr.on("data", (chunk) => {
            let procStdErrDataMsg = "child_process(" + process.pid + ")::clone(" + repo + "):stderr:data: " + chunk;
            // this.commandInfo.stdErrDataMessages.push(procStdErrDataMsg);
            console.log(procStdErrDataMsg);
        });
        process.stderr.on("error", (error) => {
            let procStdErrErrMsg = "child_process(" + process.pid + ")::clone(" + repo + "):stderr:error: " + error;
            //  this.commandInfo.stdOutDataMessages.push(procStdErrErrMsg);
            console.log(procStdErrErrMsg);
        });
        process.on('close', (status) => {
            this.commandInfo.endTime = new Date();
            let closeMessage = "child_process(" + process.pid + ")::clone(" + repo + "):close()";
            if (status !== 0) {
                closeMessage += ":error: with status: " + status;
                // this.commandInfo.executionErrors.push(new Error(closeMessage));
            }
            this.commandInfo.closeMessage = closeMessage;
            console.log(closeMessage);
            cb(this.commandInfo);
        });
    }
}
exports.GitCloneTemp = GitCloneTemp;
