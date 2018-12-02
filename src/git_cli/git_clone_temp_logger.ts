import { open, write, close } from "fs";

import path from 'path';

export class GitCloneTempLogger {
    processID: number;
    startingTime: Date;
    repositoryURL: string;
    logStoreLocation: string;

    constructor(processID: number, startingTime: Date, repositoryURL: string, logStoreLocation: string) {
        this.processID = processID;
        this.startingTime = startingTime;
        this.repositoryURL = repositoryURL;
        this.logStoreLocation = logStoreLocation;
    }

    public log(message: string) {
        let logFilePath = this.logFileLocationPath();
        open(logFilePath, 'a+', (err, fd) => {
            if (err == null) {
                write(fd, message, (err, written, str) => {
                    if (err != null) {
                        let errorMessage = "ERROR WRITING TO FILE: " + logFilePath;
                        errorMessage += " error was: " + err.message;
                        console.log(errorMessage);
                    }
                    console.log("Bytes written: " + written);
                    console.log("Resp. str: " + str);
                });
                close(fd, (err) => {
                    let errStr = "Error closing file: " + logFilePath
                    if (err != null) {
                        errStr += err.message;
                    }
                    console.log(errStr);
                });
            } else {
                console.log("Error occured opening the file: " + logFilePath + ". error.message: " + err.message);
            }
        });
    }

    public logFileLocationPath(): string {
        let url = new URL(this.repositoryURL);
        let organizationRepositoryName = url.pathname.split("/").join("--");
        let fullPath = path.join(this.logStoreLocation, organizationRepositoryName + "--" + this.processID);
        
        return fullPath;
    }
}