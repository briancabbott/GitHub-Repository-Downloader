﻿using System;
using System.IO;
using Octokit.GraphQL.Core.Generation.Models;
using Octokit.GraphQL.Core.Introspection;
using Xunit;

namespace Octokit.GraphQL.Core.Generation.UnitTests
{
    public class InputObjectGenerationTests : TestBase
    {
        const string MemberTemplate = @"namespace Test
{{
    using System;
    using System.Collections.Generic;

    public class InputObject
    {{{0}
    }}
}}";

        [Fact]
        public void Generates_Property_For_Scalar_Field()
        {
            var expected = FormatMemberTemplate("public int? Foo { get; set; }");

            var model = new TypeModel
            {
                Name = "InputObject",
                Kind = TypeKind.InputObject,
                InputFields = new[]
                {
                    new InputValueModel
                    {
                        Name = "foo",
                        Type = TypeModel.Int()
                    },
                }
            };

            var result = CodeGenerator.Generate(model, "Test", null);

            CompareModel("InputObject.cs", expected, result);
        }

        [Fact]
        public void Generates_Property_For_List_Field()
        {
            var expected = FormatMemberTemplate("public IEnumerable<int?> Foo { get; set; }");

            var model = new TypeModel
            {
                Name = "InputObject",
                Kind = TypeKind.InputObject,
                InputFields = new[]
                {
                    new InputValueModel
                    {
                        Name = "foo",
                        Type = TypeModel.List(TypeModel.Int())
                    },
                }
            };

            var result = CodeGenerator.Generate(model, "Test", null);

            CompareModel("InputObject.cs", expected, result);
        }

        [Fact]
        public void Generates_Property_For_List_Field_With_Description()
        {
            var expected = FormatMemberTemplate("/// <summary>\r\n        /// Field foo for InputObject\r\n        /// </summary>\r\n        public IEnumerable<int?> Foo { get; set; }");

            var model = new TypeModel
            {
                Name = "InputObject",
                Kind = TypeKind.InputObject,
                InputFields = new[]
                {
                    new InputValueModel
                    {
                        Description = "Field foo for InputObject",
                        Name = "foo",
                        Type = TypeModel.List(TypeModel.Int())
                    },
                }
            };

            var result = CodeGenerator.Generate(model, "Test", null);

            CompareModel("InputObject.cs", expected, result);
        }

        private string FormatMemberTemplate(string members)
        {
            if (members != null)
            {
                members = "\r\n        " + members;
            }

            return string.Format(MemberTemplate, members);
        }
    }
}
