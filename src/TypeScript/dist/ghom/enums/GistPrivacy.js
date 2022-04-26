"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GistPrivacy = void 0;
// GistPrivacy
// The privacy of a Gist
var GistPrivacy;
(function (GistPrivacy) {
    // Gists that are public and secret
    GistPrivacy[GistPrivacy["ALL"] = 0] = "ALL";
    // Public
    GistPrivacy[GistPrivacy["PUBLIC"] = 1] = "PUBLIC";
    // SECRET
    GistPrivacy[GistPrivacy["Secret"] = 2] = "Secret";
})(GistPrivacy = exports.GistPrivacy || (exports.GistPrivacy = {}));
