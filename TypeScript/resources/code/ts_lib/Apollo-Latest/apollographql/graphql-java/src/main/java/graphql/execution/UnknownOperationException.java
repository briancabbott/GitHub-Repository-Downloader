package graphql.execution;

import graphql.ErrorClassification;
import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.GraphQLException;
import graphql.PublicApi;
import graphql.language.SourceLocation;

import java.util.List;

/**
 * This is thrown if multiple operations are defined in the query and
 * the operation name is missing or there is no matching operation name
 * contained in the GraphQL query.
 */
@PublicApi
public class UnknownOperationException extends GraphQLException implements GraphQLError {
    public UnknownOperationException(String message) {
        super(message);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorClassification getErrorType() {
        return ErrorType.ValidationError;
    }
}
