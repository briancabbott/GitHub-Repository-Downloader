package graphql.analysis;

import graphql.PublicApi;
import graphql.language.FragmentDefinition;
import graphql.language.Node;
import graphql.schema.GraphQLSchema;
import graphql.util.TraverserContext;

@PublicApi
public interface QueryVisitorFragmentDefinitionEnvironment {

    /**
     * @return the graphql schema in play
     */
    GraphQLSchema getSchema();

    FragmentDefinition getFragmentDefinition();

    TraverserContext<Node> getTraverserContext();
}
