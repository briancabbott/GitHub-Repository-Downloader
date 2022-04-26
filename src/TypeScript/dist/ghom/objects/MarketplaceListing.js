"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketplaceListing = void 0;
// MarketplaceListing
// A listing in the GitHub integration marketplace.
// Implements
// Node
// Fields
// app (App)
// The GitHub App this listing represents.
// companyUrl (URI)
// URL to the listing owner's company site.
// configurationResourcePath (URI!)
// The HTTP path for configuring access to the listing's integration or OAuth app
// configurationUrl (URI!)
// The HTTP URL for configuring access to the listing's integration or OAuth app
// documentationUrl (URI)
// URL to the listing's documentation.
// extendedDescription (String)
// The listing's detailed description.
// extendedDescriptionHTML (HTML!)
// The listing's detailed description rendered to HTML.
// fullDescription (String!)
// The listing's introductory description.
// fullDescriptionHTML (HTML!)
// The listing's introductory description rendered to HTML.
// hasApprovalBeenRequested (Boolean!)
// Whether this listing has been submitted for review from GitHub for approval to be displayed in the Marketplace.
// hasPublishedFreeTrialPlans (Boolean!)
// Does this listing have any plans with a free trial?
// hasTermsOfService (Boolean!)
// Does this listing have a terms of service link?
// howItWorks (String)
// A technical description of how this app works with GitHub.
// howItWorksHTML (HTML!)
// The listing's technical description rendered to HTML.
// id (ID!)
// installationUrl (URI)
// URL to install the product to the viewer's account or organization.
// installedForViewer (Boolean!)
// Whether this listing's app has been installed for the current viewer
// isApproved (Boolean!)
// Whether this listing has been approved for display in the Marketplace.
// isDelisted (Boolean!)
// Whether this listing has been removed from the Marketplace.
// isDraft (Boolean!)
// Whether this listing is still an editable draft that has not been submitted for review and is not publicly visible in the Marketplace.
// isPaid (Boolean!)
// Whether the product this listing represents is available as part of a paid plan.
// isRejected (Boolean!)
// Whether this listing has been rejected by GitHub for display in the Marketplace.
// logoBackgroundColor (String!)
// The hex color code, without the leading '#', for the logo background.
// logoUrl (URI)
// URL for the listing's logo image.
// Argument	Type	Description
// size	Int	
// The size in pixels of the resulting square image.
// The default value is 400.
// name (String!)
// The listing's full name.
// normalizedShortDescription (String!)
// The listing's very short description without a trailing period or ampersands.
// pricingUrl (URI)
// URL to the listing's detailed pricing.
// primaryCategory (MarketplaceCategory!)
// The category that best describes the listing.
// privacyPolicyUrl (URI!)
// URL to the listing's privacy policy.
// resourcePath (URI!)
// The HTTP path for the Marketplace listing.
// screenshotUrls ([String]!)
// The URLs for the listing's screenshots.
// secondaryCategory (MarketplaceCategory)
// An alternate category that describes the listing.
// shortDescription (String!)
// The listing's very short description.
// slug (String!)
// The short name of the listing used in its URL.
// statusUrl (URI)
// URL to the listing's status page.
// supportEmail (String)
// An email address for support for this listing's app.
// supportUrl (URI!)
// Either a URL or an email address for support for this listing's app.
// termsOfServiceUrl (URI)
// URL to the listing's terms of service.
// url (URI!)
// The HTTP URL for the Marketplace listing.
// viewerCanAddPlans (Boolean!)
// Can the current viewer add plans for this Marketplace listing.
// viewerCanApprove (Boolean!)
// Can the current viewer approve this Marketplace listing.
// viewerCanDelist (Boolean!)
// Can the current viewer delist this Marketplace listing.
// viewerCanEdit (Boolean!)
// Can the current viewer edit this Marketplace listing.
// viewerCanEditCategories (Boolean!)
// Can the current viewer edit the primary and secondary category of this Marketplace listing.
// viewerCanEditPlans (Boolean!)
// Can the current viewer edit the plans for this Marketplace listing.
// viewerCanRedraft (Boolean!)
// Can the current viewer return this Marketplace listing to draft state so it becomes editable again.
// viewerCanReject (Boolean!)
// Can the current viewer reject this Marketplace listing by returning it to an editable draft state or rejecting it entirely.
// viewerCanRequestApproval (Boolean!)
// Can the current viewer request this listing be reviewed for display in the Marketplace.
// viewerHasPurchased (Boolean!)
// Indicates whether the current user has an active subscription to this Marketplace listing.
// viewerHasPurchasedForAllOrganizations (Boolean!)
// Indicates if the current user has purchased a subscription to this Marketplace listing for all of the organizations the user owns.
// viewerIsListingAdmin (Boolean!)
// Does the current viewer role allow them to administer this Marketplace listing.
// A listing in the GitHub integration marketplace.
class MarketplaceListing {
}
exports.MarketplaceListing = MarketplaceListing;
