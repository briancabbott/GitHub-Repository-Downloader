import { Node } from "../interfaces/Node";
import { ID } from "../scalars/Id";
import { Organization } from "./Organization";

// OrganizationIdentityProvider
// An Identity Provider configured to provision SAML and SCIM identities for Organizations

// Implements
// Node
// Connections
// externalIdentities (ExternalIdentityConnection!)
// External Identities provisioned by this Identity Provider

// Argument	Type	Description
// after	String	
// Returns the elements in the list that come after the specified cursor.

// before	String	
// Returns the elements in the list that come before the specified cursor.

// first	Int	
// Returns the first n elements from the list.

// last	Int	
// Returns the last n elements from the list.

// Fields
// digestMethod (URI)
// The digest algorithm used to sign SAML requests for the Identity Provider.

// id (ID!)
// idpCertificate (X509Certificate)
// The x509 certificate used by the Identity Provder to sign assertions and responses.

// issuer (String)
// The Issuer Entity ID for the SAML Identity Provider

// organization (Organization)
// Organization this Identity Provider belongs to

// signatureMethod (URI)
// The signature algorithm used to sign SAML requests for the Identity Provider.

// ssoUrl (URI)
// The URL endpoint for the Identity Provider's SAML SSO.


// An Identity Provider configured to provision SAML and SCIM identities for Organizations
export class OrganizationIdentityProvider implements Node {

// Connections
// externalIdentities (ExternalIdentityConnection!)
// External Identities provisioned by this Identity Provider
//
// Argument	        Type	        Description
// after	        String          Returns the elements in the list that come after the specified cursor.
// before	        String	        Returns the elements in the list that come before the specified cursor.
// first	        Int	            Returns the first n elements from the list.
// last	            Int	            Returns the last n elements from the list.

// 
// Fields
// 


    // The digest algorithm used to sign SAML requests for the Identity Provider.
    digestMethod: URL

    id: ID

    // The x509 certificate used by the Identity Provder to sign assertions and responses.
    idpCertificate: X509Certificate

    // The Issuer Entity ID for the SAML Identity Provider
    issuer: string

    // Organization this Identity Provider belongs to
    organization: Organization

    // The signature algorithm used to sign SAML requests for the Identity Provider.
    signatureMethod: URL

    // The URL endpoint for the Identity Provider's SAML SSO.
    ssoUrl: URL 

}