"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHOMVerifier = void 0;
const language_1 = require("graphql/language");
const axios = require('axios');
const fs_1 = require("fs");
/**
 * Takes the most recent GitHub GraphQL Schema (either by downloading it or, from the local-filesystem)
 * and, verifies that all fields and operations have corresponding representation in the GHOM and, for
 * those that are either not present or represented differantly then in the Schema Definition, a report
 * about the missing component is generated and (optionally), the code for the correct (current)
 * implementation is generated and either printed or, written to an output file.
 */
class GHOMVerifier {
    loadSchema(schemaFileURI) {
        // let schemaURL = new URL(schemaFileURI);
        let validUrl = false;
        let validFile = false;
        let source = null;
        try {
            let urlo = new URL(schemaFileURI);
            console.log("url.protocol: ", urlo.protocol);
            validUrl = true;
        }
        catch (e) {
            // console.log(e);
        }
        console.log("valid url: ", validUrl);
        if (!validUrl) {
            try {
                validFile = (0, fs_1.existsSync)(schemaFileURI);
            }
            catch (e) {
                validFile = false; // reset to false for sure
            }
        }
        if (validUrl && !validFile) {
            console.log("read-url");
            return axios.get(schemaFileURI)
                .then((result) => {
                console.log(result);
                source = new language_1.Source(result, schemaFileURI.substring(schemaFileURI.lastIndexOf('/')));
                return source;
            });
        }
        else if (validFile && !validUrl) {
            console.log("read-file");
            let buff = (0, fs_1.readFileSync)(schemaFileURI);
            console.log(buff.toString());
            source = new language_1.Source(buff.toString(), schemaFileURI.substring(schemaFileURI.lastIndexOf('/') + 1));
            console.log(source);
        }
        else {
            console.log("ERROR!");
        }
        return source;
    }
    parseSchema(source) {
        return (0, language_1.parse)(source);
    }
}
exports.GHOMVerifier = GHOMVerifier;
