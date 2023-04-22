import { ID } from "../scalars/Id";
import { Node } from "../interfaces/Node";
import { OrganizationInvitation } from "./OrganizationInvitation";
import { ExternalIdentitySamlAttributes } from "./ExternalIdentitySamlAttributes";
import { ExternalIdentityScimAttributes } from "./ExternalIdentityScimAttributes";
import { User } from "./User";

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
export class ExternalIdentity implements Node {
    // The GUID for this identity
    guid: string
    
    id: ID
    
    // Organization invitation for this SCIM-provisioned external identity
    organizationInvitation: OrganizationInvitation
    
    // SAML Identity attributes
    samlIdentity: ExternalIdentitySamlAttributes
    
    // SCIM Identity attributes
    scimIdentity: ExternalIdentityScimAttributes
    
    // User linked to this external identity. Will be NULL if this identity has not been claimed by an organization member.
    user: User
}