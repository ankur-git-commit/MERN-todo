interface InputProps {
  input: string;
  handleAddNote: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
}

function TaskHandler({ input, handleAddNote, handleSubmitForm }: InputProps) {

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="input-field">Input: </label>
      <input
        className="border-1 border-black"
        type="text"
        id="input-field"
        name="input-field"
        required
        autoComplete="off"
        autoCapitalize="on"
        value={input}
        onChange={handleAddNote}
        placeholder="Enter task here"
      />{" "}
      <button className="border-1 px-2">Add Note</button>
    </form>
  );
}

export default TaskHandler;
