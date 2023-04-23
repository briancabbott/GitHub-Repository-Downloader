namespace Octokit.GraphQL.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Octokit.GraphQL.Core;
    using Octokit.GraphQL.Core.Builders;

    /// <summary>
    /// An event related to sponsorship activity.
    /// </summary>
    public class SponsorsActivity : QueryableValue<SponsorsActivity>
    {
        internal SponsorsActivity(Expression expression) : base(expression)
        {
        }

        /// <summary>
        /// What action this activity indicates took place.
        /// </summary>
        public SponsorsActivityAction Action { get; }

        public ID Id { get; }

        /// <summary>
        /// The tier that the sponsorship used to use, for tier change events.
        /// </summary>
        public SponsorsTier PreviousSponsorsTier => this.CreateProperty(x => x.PreviousSponsorsTier, Octokit.GraphQL.Model.SponsorsTier.Create);

        /// <summary>
        /// The user or organization who triggered this activity and was/is sponsoring the sponsorable.
        /// </summary>
        public Sponsor Sponsor => this.CreateProperty(x => x.Sponsor, Octokit.GraphQL.Model.Sponsor.Create);

        /// <summary>
        /// The user or organization that is being sponsored, the maintainer.
        /// </summary>
        public ISponsorable Sponsorable => this.CreateProperty(x => x.Sponsorable, Octokit.GraphQL.Model.Internal.StubISponsorable.Create);

        /// <summary>
        /// The associated sponsorship tier.
        /// </summary>
        public SponsorsTier SponsorsTier => this.CreateProperty(x => x.SponsorsTier, Octokit.GraphQL.Model.SponsorsTier.Create);

        /// <summary>
        /// The timestamp of this event.
        /// </summary>
        public DateTimeOffset? Timestamp { get; }

        internal static SponsorsActivity Create(Expression expression)
        {
            return new SponsorsActivity(expression);
        }
    }
}