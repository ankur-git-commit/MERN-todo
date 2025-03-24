import { useState, useEffect } from 'react';
import Background from './components/Background';

import TaskHandler from './components/TaskHandler';
import OutputHandler from './components/OutputHandler';

export interface Note {
  id: string;
  task: string;
  isActive: boolean;
  isCompleted: boolean;
}

function App() {
  const [note, setNote] = useState<Note[]>([]);
  const [input, setInput] = useState<string>('');

  const handleAddNote = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(event.target.value);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const inputValue = input.trim();

    if (inputValue) {
      setNote([
        ...note,
        {
          id: crypto.randomUUID(),
          task: inputValue,
          isActive: true,
          isCompleted: false,
        },
      ]);
      setInput('');
    } else
      console.error(
        `${inputValue} as a value is not valid to be added to the list`,
      );
  };

  const handleRemoveNote = (id: string): void => {
    setNote(note.filter((item) => id !== item.id));
  };

  useEffect(() => {
    console.log(note);
  }, [note]);

  return (
    <>
      <Background>
        <main className="flex flex-col items-center justify-center">
          <TaskHandler
            input={input}
            handleAddNote={handleAddNote}
            handleSubmitForm={handleSubmitForm}
          />
          <OutputHandler
            taskList={note}
            removeNote={handleRemoveNote}
            setNote={setNote}
          />
        </main>
      </Background>
    </>
  );
}
export default App;
