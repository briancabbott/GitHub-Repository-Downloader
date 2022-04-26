"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitCloneTempLogger = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class GitCloneTempLogger {
    constructor(processID, startingTime, repositoryURL, logStoreLocation) {
        this.processID = processID;
        this.startingTime = startingTime;
        this.repositoryURL = repositoryURL;
        this.logStoreLocation = logStoreLocation;
    }
    log(message) {
        let logFilePath = this.logFileLocationPath();
        (0, fs_1.open)(logFilePath, 'a+', (err, fd) => {
            if (err == null) {
                (0, fs_1.write)(fd, message, (err, written, str) => {
                    if (err != null) {
                        let errorMessage = "ERROR WRITING TO FILE: " + logFilePath;
                        errorMessage += " error was: " + err.message;
                        console.log(errorMessage);
                    }
                    console.log("Bytes written: " + written);
                    console.log("Resp. str: " + str);
                });
                (0, fs_1.close)(fd, (err) => {
                    let errStr = "Error closing file: " + logFilePath;
                    if (err != null) {
                        errStr += err.message;
                    }
                    console.log(errStr);
                });
            }
            else {
                console.log("Error occured opening the file: " + logFilePath + ". error.message: " + err.message);
            }
        });
    }
    logFileLocationPath() {
        let url = new URL(this.repositoryURL);
        let organizationRepositoryName = url.pathname.split("/").join("--");
        let fullPath = path_1.default.join(this.logStoreLocation, organizationRepositoryName + "--" + this.processID);
        return fullPath;
    }
}
exports.GitCloneTempLogger = GitCloneTempLogger;
