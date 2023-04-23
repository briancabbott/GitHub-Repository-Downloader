﻿using System.Collections.Generic;
using Octokit.GraphQL.Core.Deserializers;
using Octokit.GraphQL.Core.Introspection;
using Xunit;

namespace Octokit.GraphQL.Core.UnitTests
{
    public class IntrospectionTests
    {
        [Fact]
        public void Select_Schema_QueryType_Kind()
        {
            var expected = "query{__schema{queryType{kind}}}";

            var expression = new IntrospectionQuery()
                .Schema.QueryType
                .Select(x => x.Kind);

            var query = expression.Compile();

            Assert.Equal(expected, query.ToString(0));
        }

        [Fact]
        public void Select_Schema_Types()
        {
            var expectedQuery = @"query {
  __schema {
    types {
      kind
      name
      description
      fields(includeDeprecated: true) {
        name
        description
        type {
          name
        }
      }
    }
  }
}";

            var data = @"{
  ""data"": {
    ""__schema"": {
      ""types"": [
        {
          ""kind"": ""SCALAR"",
          ""name"": ""Scalar"",
          ""description"": ""A scalar value."",
          ""fields"": null
        },
        {
          ""kind"": ""INPUT_OBJECT"",
          ""name"": ""InputObject"",
          ""description"": ""An input object."",
          ""fields"": null
        },
      ]
    }
  }
}";

            var expression = new IntrospectionQuery()
                .Schema
                .Select(x => new SchemaModel
                {
                    Types = x.Types.Select(t => new TypeModel
                    {
                        Kind = t.Kind,
                        Name = t.Name,
                        Description = t.Description,
                        Fields = t.Fields(true).Select(f => new FieldModel
                        {
                            Name = f.Name,
                            Description = f.Description,
                            Type = f.Type.Name,
                        }).ToList()
                    }).ToList()
                });

            var query = (SimpleQuery<SchemaModel>)expression.Compile();

            Assert.Equal(expectedQuery, query.ToString(), ignoreLineEndingDifferences: true);

            var responseResult = new ResponseDeserializer().Deserialize(query, data);

            var type = responseResult.Types[0];
            Assert.Equal(TypeKind.Scalar, type.Kind);
            Assert.Equal("Scalar", type.Name);
            Assert.Equal("A scalar value.", type.Description);

            type = responseResult.Types[1];
            Assert.Equal(TypeKind.InputObject, type.Kind);
            Assert.Equal("InputObject", type.Name);
            Assert.Equal("An input object.", type.Description);
        }

        [Fact]
        public void Select_Schema_Enum_Types()
        {
            var expression = new IntrospectionQuery()
                .Schema
                .Select(x => new SchemaModel
                {
                    Types = x.Types.Select(t => new TypeModel
                    {
                        Fields = t.Fields(true).Select((Field f) => new FieldModel
                        {
                            Name = f.Name,
                        }).ToList(),
                        EnumValues = t.EnumValues(true).Select((EnumValue e) => new EnumValueModel
                        {
                            Name = e.Name,
                        }).ToList(),
                    }).ToList()
                });

            var expectedQuery = @"query {
  __schema {
    types {
      fields(includeDeprecated: true) {
        name
      }
      enumValues(includeDeprecated: true) {
        name
      }
    }
  }
}";
            var query = expression.Compile();

            Assert.Equal(expectedQuery, query.ToString(), ignoreLineEndingDifferences: true);
        }

        private class SchemaModel
        {
            public IList<TypeModel> Types { get; set; }
        }

        private class TypeModel
        {
            public TypeKind Kind { get; set; } 
            public string Name { get; set; }
            public string Description { get; set; }
            public IList<FieldModel> Fields { get; set; }
            public IList<EnumValueModel> EnumValues { get; set; }
        }

        private class FieldModel
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public string Type { get; set; }
        }

        private class EnumValueModel
        {
            public string Name { get; set; }
            public string Description { get; set; }
        }
    }
}
