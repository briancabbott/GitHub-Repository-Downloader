import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { TODO_FRAGMENT } from "../queries";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      ...TodoFragment
    }
  }
  ${TODO_FRAGMENT}
`

export default function TodoForm() {
  const formRef = useRef();
  const [addTodo, {loading, error}] = useMutation(ADD_TODO, {
    onCompleted: () => formRef.current.reset()
  });
  return (
    <form ref={formRef} onSubmit={event => {
      event.preventDefault();
      addTodo({
        variables: {
          text: event.target.text.value
        }
      })
    }}>
      {error && <div style={{color: 'red'}}>{error.message}</div>}
      <input name="text" placeholder="What do you need to do?" />
      <button disabled={loading} type="submit">Create todo</button>
    </form>
  );
}