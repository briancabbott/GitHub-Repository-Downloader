import { gql, useApolloClient } from "@apollo/client";
import { useValue, useRepeater } from "@repeaterjs/react-hooks";
import { useEffect } from "react";

const FOLLOW_SUBSCRIPTION = gql`
  subscription Follow {
    follow
  }
`;

export default function useFollows() {
  const client = useApolloClient();
  const [follows, push, stop] = useRepeater();

  useEffect(() => {
    const unsubscribe = client
      .subscribe({ query: FOLLOW_SUBSCRIPTION })
      .subscribe({
        next: ({ data }) => {
          push(data.follow);
        },
      });

    return () => {
      unsubscribe();
      stop();
    };
  }, [push, stop, client]);

  const value = useValue(async function* () {
    for await (const follow of follows) {
      yield follow;
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  });

  return value;
}
