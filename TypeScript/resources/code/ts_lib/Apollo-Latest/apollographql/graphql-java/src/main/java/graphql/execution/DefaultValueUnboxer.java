package graphql.execution;

import graphql.Internal;
import graphql.PublicApi;

import java.util.Optional;
import java.util.OptionalDouble;
import java.util.OptionalInt;
import java.util.OptionalLong;

/**
 * Public API because it should be used as a delegate when implementing a custom {@link ValueUnboxer}
 */
@PublicApi
public class DefaultValueUnboxer implements ValueUnboxer {


    @Override
    public Object unbox(final Object object) {
        return unboxValue(object);
    }

    @Internal // used by next-gen at the moment
    public static Object unboxValue(Object result) {
        if (result instanceof Optional) {
            Optional optional = (Optional) result;
            return optional.orElse(null);
        } else if (result instanceof OptionalInt) {
            OptionalInt optional = (OptionalInt) result;
            if (optional.isPresent()) {
                return optional.getAsInt();
            } else {
                return null;
            }
        } else if (result instanceof OptionalDouble) {
            OptionalDouble optional = (OptionalDouble) result;
            if (optional.isPresent()) {
                return optional.getAsDouble();
            } else {
                return null;
            }
        } else if (result instanceof OptionalLong) {
            OptionalLong optional = (OptionalLong) result;
            if (optional.isPresent()) {
                return optional.getAsLong();
            } else {
                return null;
            }
        }

        return result;
    }
}