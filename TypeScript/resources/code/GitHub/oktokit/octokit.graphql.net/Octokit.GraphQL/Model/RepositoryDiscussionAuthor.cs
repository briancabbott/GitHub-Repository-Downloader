namespace Octokit.GraphQL.Model
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Octokit.GraphQL.Model;
    using Octokit.GraphQL.Core;
    using Octokit.GraphQL.Core.Builders;

    /// <summary>
    /// Represents an author of discussions in repositories.
    /// </summary>
    public interface IRepositoryDiscussionAuthor : IQueryableValue<IRepositoryDiscussionAuthor>, IQueryableInterface
    {
        /// <summary>
        /// Discussions this user has started.
        /// </summary>
        /// <param name="first">Returns the first _n_ elements from the list.</param>
        /// <param name="after">Returns the elements in the list that come after the specified cursor.</param>
        /// <param name="last">Returns the last _n_ elements from the list.</param>
        /// <param name="before">Returns the elements in the list that come before the specified cursor.</param>
        /// <param name="answered">Filter discussions to only those that have been answered or not. Defaults to including both answered and unanswered discussions.</param>
        /// <param name="orderBy">Ordering options for discussions returned from the connection.</param>
        /// <param name="repositoryId">Filter discussions to only those in a specific repository.</param>
        DiscussionConnection RepositoryDiscussions(Arg<int>? first = null, Arg<string>? after = null, Arg<int>? last = null, Arg<string>? before = null, Arg<bool>? answered = null, Arg<DiscussionOrder>? orderBy = null, Arg<ID>? repositoryId = null);
    }
}

namespace Octokit.GraphQL.Model.Internal
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Octokit.GraphQL.Core;
    using Octokit.GraphQL.Core.Builders;

    internal class StubIRepositoryDiscussionAuthor : QueryableValue<StubIRepositoryDiscussionAuthor>, IRepositoryDiscussionAuthor
    {
        internal StubIRepositoryDiscussionAuthor(Expression expression) : base(expression)
        {
        }

        public DiscussionConnection RepositoryDiscussions(Arg<int>? first = null, Arg<string>? after = null, Arg<int>? last = null, Arg<string>? before = null, Arg<bool>? answered = null, Arg<DiscussionOrder>? orderBy = null, Arg<ID>? repositoryId = null) => this.CreateMethodCall(x => x.RepositoryDiscussions(first, after, last, before, answered, orderBy, repositoryId), Octokit.GraphQL.Model.DiscussionConnection.Create);

        internal static StubIRepositoryDiscussionAuthor Create(Expression expression)
        {
            return new StubIRepositoryDiscussionAuthor(expression);
        }
    }
}