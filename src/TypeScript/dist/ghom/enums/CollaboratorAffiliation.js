"use strict";
// CollaboratorAffiliation
// Collaborators affiliation level with a subject.
// Values
// ALL
// All collaborators the authenticated user can see.
// DIRECT
// All collaborators with permissions to an organization-owned subject, 
// regardless of organization membership status.
// OUTSIDE
// All outside collaborators of an organization-owned subject.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorAffiliation = void 0;
// Collaborators affiliation level with a subject.
var CollaboratorAffiliation;
(function (CollaboratorAffiliation) {
    // All collaborators the authenticated user can see.
    CollaboratorAffiliation[CollaboratorAffiliation["ALL"] = 0] = "ALL";
    // All collaborators with permissions to an organization-owned 
    // subject, regardless of organization membership status.
    CollaboratorAffiliation[CollaboratorAffiliation["DIRECT"] = 1] = "DIRECT";
    // All outside collaborators of an organization-owned subject.
    CollaboratorAffiliation[CollaboratorAffiliation["OUTSIDE"] = 2] = "OUTSIDE";
})(CollaboratorAffiliation = exports.CollaboratorAffiliation || (exports.CollaboratorAffiliation = {}));
