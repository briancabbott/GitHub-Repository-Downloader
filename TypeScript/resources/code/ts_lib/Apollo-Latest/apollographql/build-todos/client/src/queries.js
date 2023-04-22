import {gql} from '@apollo/client';

export const TODO_FRAGMENT = gql`
  fragment TodoFragment on Todo {
    id
    text
    isComplete
  }
`

export const LIST_TODOS = gql`
  query ListTodos {
    todos {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`
