import {useMutation, gql} from '@apollo/client'

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

export default function DeleteButton({id}) {
  const [deleteTodo, {loading}] = useMutation(DELETE_TODO, {
    variables: {id},
    onError: (error) => alert(error.message)
  })
  return <button disabled={loading} onClick={deleteTodo}>Delete</button>
}