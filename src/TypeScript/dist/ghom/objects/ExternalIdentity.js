"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalIdentity = void 0;
// ExternalIdentity
// An external identity provisioned by SAML SSO or SCIM.
// Implements
// Node
// Fields
// guid (String!)
// The GUID for this identity
// id (ID!)
// organizationInvitation (OrganizationInvitation)
// Organization invitation for this SCIM-provisioned external identity
// samlIdentity (ExternalIdentitySamlAttributes)
// SAML Identity attributes
// scimIdentity (ExternalIdentityScimAttributes)
// SCIM Identity attributes
// user (User)
// User linked to this external identity. Will be NULL if this identity has not been claimed by an organization member.
// An external identity provisioned by SAML SSO or SCIM.
class ExternalIdentity {
}
exports.ExternalIdentity = ExternalIdentity;
