namespace Octokit.GraphQL.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Octokit.GraphQL.Core;
    using Octokit.GraphQL.Core.Builders;

    /// <summary>
    /// The connection type for OrganizationInvitation.
    /// </summary>
    public class EnterprisePendingMemberInvitationConnection : QueryableValue<EnterprisePendingMemberInvitationConnection>, IPagingConnection<OrganizationInvitation>
    {
        internal EnterprisePendingMemberInvitationConnection(Expression expression) : base(expression)
        {
        }

        /// <summary>
        /// A list of edges.
        /// </summary>
        public IQueryableList<EnterprisePendingMemberInvitationEdge> Edges => this.CreateProperty(x => x.Edges);

        /// <summary>
        /// A list of nodes.
        /// </summary>
        public IQueryableList<OrganizationInvitation> Nodes => this.CreateProperty(x => x.Nodes);

        /// <summary>
        /// Information to aid in pagination.
        /// </summary>
        public PageInfo PageInfo => this.CreateProperty(x => x.PageInfo, Octokit.GraphQL.Model.PageInfo.Create);

        /// <summary>
        /// Identifies the total count of items in the connection.
        /// </summary>
        public int TotalCount { get; }

        /// <summary>
        /// Identifies the total count of unique users in the connection.
        /// </summary>
        public int TotalUniqueUserCount { get; }

        IPageInfo IPagingConnection.PageInfo => PageInfo;

        internal static EnterprisePendingMemberInvitationConnection Create(Expression expression)
        {
            return new EnterprisePendingMemberInvitationConnection(expression);
        }
    }
}