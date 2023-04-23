namespace Octokit.GraphQL.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Octokit.GraphQL.Core;
    using Octokit.GraphQL.Core.Builders;

    /// <summary>
    /// An Invitation for a user to an organization.
    /// </summary>
    public class OrganizationInvitation : QueryableValue<OrganizationInvitation>
    {
        internal OrganizationInvitation(Expression expression) : base(expression)
        {
        }

        /// <summary>
        /// Identifies the date and time when the object was created.
        /// </summary>
        public DateTimeOffset CreatedAt { get; }

        /// <summary>
        /// The email address of the user invited to the organization.
        /// </summary>
        public string Email { get; }

        public ID Id { get; }

        /// <summary>
        /// The type of invitation that was sent (e.g. email, user).
        /// </summary>
        public OrganizationInvitationType InvitationType { get; }

        /// <summary>
        /// The user who was invited to the organization.
        /// </summary>
        public User Invitee => this.CreateProperty(x => x.Invitee, Octokit.GraphQL.Model.User.Create);

        /// <summary>
        /// The user who created the invitation.
        /// </summary>
        public User Inviter => this.CreateProperty(x => x.Inviter, Octokit.GraphQL.Model.User.Create);

        /// <summary>
        /// The organization the invite is for
        /// </summary>
        public Organization Organization => this.CreateProperty(x => x.Organization, Octokit.GraphQL.Model.Organization.Create);

        /// <summary>
        /// The user's pending role in the organization (e.g. member, owner).
        /// </summary>
        public OrganizationInvitationRole Role { get; }

        internal static OrganizationInvitation Create(Expression expression)
        {
            return new OrganizationInvitation(expression);
        }
    }
}