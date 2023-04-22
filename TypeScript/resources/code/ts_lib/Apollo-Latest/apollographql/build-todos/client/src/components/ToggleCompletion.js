import {useMutation, gql} from '@apollo/client'
import {TODO_FRAGMENT} from '../queries'

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $isComplete: Boolean!) {
    updateTodo(id: $id, isComplete: $isComplete) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`

export default function ToggleCompletion({todo}) {
  const [updateTodo, {loading}] = useMutation(UPDATE_TODO, {
    onError: (error) => alert(error.message)
  })
  return (
    <input
      type="checkbox"
      disabled={loading}
      checked={todo.isComplete}
      onChange={(event) => updateTodo({
        variables: {
          id: todo.id,
          isComplete: event.target.checked
        }
      })}
    />
  )
}