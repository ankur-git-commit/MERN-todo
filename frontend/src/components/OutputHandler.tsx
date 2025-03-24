import { useState } from 'react';
import { Note } from '../App';
import FilterItems from './FilterItems';

interface OutputProps {
  taskList: Note[];
  removeNote: (id: string) => void;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
}

export type AllowedFilterString = 'all' | 'completed' | 'active';

function OutputHandler({ taskList, removeNote, setNote }: OutputProps) {
  const [filter, setFilter] = useState<AllowedFilterString>('all');

  const handleToggle = (id: string): void => {
    setNote((prevNote) =>
      prevNote.map((note) =>
        note.id === id
          ? {
              ...note,
              isActive: !note.isActive,
              isCompleted: !note.isCompleted,
            }
          : note,
      ),
    );
  };

  const filteredList = taskList.filter((note) => {
    if (filter === 'active') return note.isActive;
    if (filter === 'completed') return note.isCompleted;
    return true;
  });

  const noteListPlaceHolder =
    filteredList.length > 0 ? (
      filteredList.map((item) => {
        return (
          <span key={item.id}>
            <input
              onChange={() => handleToggle(item.id)}
              type="checkbox"
              id={`task-${item.id}`}
              checked={item.isCompleted ? true : false}
            />
            <label htmlFor={`task-${item.id}`}>{item.task}</label>{' '}
            <button
              className={`border-1 px-2`}
              onClick={() => removeNote(item.id)}
            >
              X
            </button>
          </span>
        );
      })
    ) : (
      <p>Please Add a task</p>
    );

  return (
    <div>
      {noteListPlaceHolder}

      <FilterItems
        numberOfItems={filteredList.filter((task) => task.isActive).length}
        setFilter={setFilter}
        setNote={setNote}
      />
    </div>
  );
}

export default OutputHandler;
