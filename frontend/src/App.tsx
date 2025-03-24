import { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
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
          task: inputValue[0].toUpperCase() + inputValue.slice(1).toLowerCase(),
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
        <main className="font-josefin m-auto flex w-full max-w-[540px] flex-col items-center justify-center">
          <Header />
          <section className="w-full">
            <TaskHandler
              className="mb-6 flex w-full flex-row rounded-md bg-[#FFFFFF] p-6"
              input={input}
              handleAddNote={handleAddNote}
              handleSubmitForm={handleSubmitForm}
            />
          </section>
          <section className="mb-10 w-full">
            <OutputHandler
              className="flex w-full flex-col rounded-md bg-[#FFFFFF] shadow-lg"
              taskList={note}
              removeNote={handleRemoveNote}
              setNote={setNote}
            />
          </section>
        </main>
      </Background>
    </>
  );
}
export default App;
