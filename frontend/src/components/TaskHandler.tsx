import { FaArrowRight } from "react-icons/fa";


interface InputProps {
  input: string;
  handleAddNote: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string
}

function TaskHandler({ input, handleAddNote, handleSubmitForm, className = '' }: InputProps) {

  return (
    <div className={`${className}`}>
      <form className="flex w-full justify-evenly"  
      onSubmit={handleSubmitForm}>
        {/* <label htmlFor="input-field"></label> */}
        <input
          className="w-3/4 text-xl focus:outline-none caret-[#3A7CFD]"
          type="text"
          id="input-field"
          name="input-field"
          required
          autoComplete="off"
          autoCapitalize="on"
          value={input}
          onChange={handleAddNote}
          placeholder="Enter task here"
        />
        <button className="transition-transform duration-300 hover:scale-[1.3]"><FaArrowRight size={24}/></button>
      </form>
    </div>
  );
}

export default TaskHandler;
