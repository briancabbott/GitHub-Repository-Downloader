﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AgileObjects.ReadableExpressions;
using Newtonsoft.Json.Linq;
using Octokit.GraphQL.Core.Builders;
using Octokit.GraphQL.Core.UnitTests.Models;
using Octokit.GraphQL.Core.UnitTests.PagingTests.Models;
using Xunit;

namespace Octokit.GraphQL.Core.UnitTests
{
    public class Repository_Name_Issues_AllPages_To_Dictionary
    {
        static Repository_Name_Issues_AllPages_To_Dictionary()
        {
            ExpressionCompiler.IsUnitTesting = true;
        }

        private ICompiledQuery<RepositoryModelWithDictionary> TestQuery => new Query()
            .Repository("foo", "bar")
            .Select(repository => new RepositoryModelWithDictionary
            {
                Name = repository.Name,
                Issues = repository.Issues(null, null, null, null, new[] { "bug" }).AllPages().Select(issue => new IssueModel
                {
                    Number = issue.Number,
                }).ToDictionary(x => x.Number, x => x)
            }).Compile();

        private SimpleQuery<RepositoryModelWithDictionary> TestMasterQuery => TestQuery.GetMasterQuery();

        private IReadOnlyList<ISubquery> TestQuerySubqueries => TestQuery.GetSubqueries();

        private SimpleSubquery<IEnumerable<IssueModel>> TestQueryFirstSubquery => (SimpleSubquery<IEnumerable<IssueModel>>)TestQuerySubqueries.First();

        [Fact]
        public void Creates_MasterQuery()
        {
            var expected = @"query {
  repository(owner: ""foo"", name: ""bar"") {
    id
    name
    issues(labels: [""bug""], first: 100) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        number
      }
    }
  }
}";

            Assert.Equal(expected, TestMasterQuery.ToString(), ignoreLineEndingDifferences: true);
        }

        [Fact]
        public void Creates_MasterQuery_Expression()
        {
            Expression<Func<JObject, RepositoryModelWithDictionary>> expected = data =>
                Rewritten.Value.Select(
                    data["data"]["repository"],
                    repository => new RepositoryModelWithDictionary
                    {
                        Name = repository["name"].ToObject<string>(),
                        Issues = (IDictionary<int, IssueModel>)Rewritten.List.ToSubqueryDictionary(
                            Rewritten.List.Select(
                                repository["issues"]["nodes"],
                                issue => new IssueModel
                                {
                                    Number = issue["number"].ToObject<int>()
                                }),
                            data.Annotation<ISubqueryRunner>(),
                            SubqueryPlaceholder.placeholder,
                            x => x.Number,
                            x => x)
                    });

            ExpressionRewriterAssertions.AssertCompiledQueryExpressionEqual(expected, TestMasterQuery,
                "SimpleSubquery<IEnumerable<IssueModel>>");
        }

        [Fact]
        public void Creates_Subquery()
        {
            var expected = @"query($__id: ID!, $__after: String) {
  node(id: $__id) {
    __typename
    ... on Repository {
      issues(first: 100, after: $__after, labels: [""bug""]) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          number
        }
      }
    }
  }
}";

            Assert.Single(TestQuerySubqueries);
            Assert.Equal(expected, TestQueryFirstSubquery.ToString(), ignoreLineEndingDifferences: true);
        }

        [Fact]
        public void Creates_Subquery_Expression()
        {
            Expression<Func<JObject, IEnumerable<IssueModel>>> expected =
                data => (IEnumerable<IssueModel>)Rewritten.List.Select(
                    Rewritten.Interface.Cast(data["data"]["node"], "Repository")["issues"]["nodes"],
                    issue => new IssueModel
                    {
                        Number = issue["number"].ToObject<int>()
                    }).ToList();
            var expectedString = expected.ToReadableString();

            var actual = ExpressionCompiler.GetSourceExpression(TestQueryFirstSubquery.ResultBuilder);
            var actualString = actual.ToReadableString();

            Assert.Equal(ExpressionRewriterAssertions.StripWhitespace(expectedString), ExpressionRewriterAssertions.StripWhitespace(actualString));
        }

        [Fact]
        public void Creates_Subquery_Expression_PageInfo()
        {
            var actual = ExpressionCompiler.GetSourceExpression(TestQueryFirstSubquery.PageInfo);
            var actualString = actual.ToReadableString();

            Expression<Func<JObject, JToken>> expected = data => data.SelectToken("data.node.issues.pageInfo");
            var expectedString = expected.ToReadableString();

            Assert.Equal(ExpressionRewriterAssertions.StripWhitespace(expectedString), ExpressionRewriterAssertions.StripWhitespace(actualString));
        }

        [Fact]
        public void Creates_Subquery_Expression_ParentId()
        {
            var actual = ExpressionCompiler.GetSourceExpression(TestQueryFirstSubquery.ParentIds);
            var actualString = actual.ToReadableString();

            Expression<Func<JObject, IEnumerable<JToken>>> expected = data => data.SelectTokens("$.data.repository.id");
            var expectedString = expected.ToReadableString();

            Assert.Equal(ExpressionRewriterAssertions.StripWhitespace(expectedString), ExpressionRewriterAssertions.StripWhitespace(actualString));
        }

        [Fact]
        public void Creates_Subquery_Expression_ParentPageInfo()
        {
            var actual = ExpressionCompiler.GetSourceExpression(TestQueryFirstSubquery.ParentPageInfo);
            var actualString = actual.ToReadableString();

            Expression<Func<JObject, IEnumerable<JToken>>> expected = data => data.SelectTokens("$.data.repository.issues.pageInfo");
            var expectedString = expected.ToReadableString();

            Assert.Equal(ExpressionRewriterAssertions.StripWhitespace(expectedString), ExpressionRewriterAssertions.StripWhitespace(actualString));
        }

        [Fact]
        public async Task Reads_All_Pages()
        {
            int page = 0;

            string Execute(string _, IDictionary<string, string> variables)
            {
                switch (page++)
                {
                    case 0:
                        Assert.Null(variables);
                        return @"{
  data: {
    ""repository"": {
      ""id"": ""repoid"",
      ""name"": ""foo"",
      ""issues"": {
        ""pageInfo"": {
          ""hasNextPage"": true,
          ""endCursor"": ""end0""
        },
        ""nodes"": [
          { ""number"": 0 },
          { ""number"": 1 },
          { ""number"": 2 },
        ]
      }
    }
  }
}";
                    case 1:
                        Assert.NotNull(variables);
                        Assert.Equal(variables["__id"], "repoid");
                        Assert.Equal(variables["__after"], "end0");
                        return @"{
  data: {
    ""node"": {
      ""__typename"": ""Repository"",
      ""issues"": {
        ""pageInfo"": {
          ""hasNextPage"": false,
          ""endCursor"": ""end1""
        },
        ""nodes"": [
          { ""number"": 3 },
          { ""number"": 4 },
        ]
      }
    }
  }
}";
                    default:
                        throw new NotSupportedException("Should not get here");
                }
            }

            var connection = new MockConnection(Execute);
            var result = await connection.Run(TestQuery);

            Assert.Equal(
                Enumerable.Range(0, 5).ToList(),
                result.Issues.Select(x => x.Key).ToList());
        }
    }
}