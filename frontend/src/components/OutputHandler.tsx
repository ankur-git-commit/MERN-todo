import { useState } from 'react';
import { Note } from '../App';
import FilterItems from './FilterItems';
import removeIcon from '../assets/icons/icon-cross.svg';

interface OutputProps {
  taskList: Note[];
  removeNote: (id: string) => void;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
  className?: string;
}

export type AllowedFilterString = 'all' | 'completed' | 'active';

function OutputHandler({
  taskList,
  removeNote,
  setNote,
  className = '',
}: OutputProps) {
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
          <span
            className="b-[#E3E4F1] group flex w-full flex-row items-center justify-between border-b-1 border-[#E3E4F1] p-6 text-lg text-[#494C6B]"
            key={item.id}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  onChange={() => handleToggle(item.id)}
                  type="checkbox"
                  id={`task-${item.id}`}
                  checked={item.isCompleted}
                  className="peer absolute h-6 w-6 cursor-pointer opacity-0"
                />
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors duration-200 peer-checked:border-none peer-checked:bg-gradient-to-br peer-checked:from-blue-400 peer-checked:to-purple-500 peer-hover:border-blue-500 hover:border-blue-500">
                  {item.isCompleted && (
                    <img
                      src="/src/assets/icons/icon-check.svg"
                      alt="Checked"
                      className="h-3 w-3"
                    />
                  )}
                </div>
              </div>
              <label
                className={`cursor-pointer ${item.isCompleted ? 'text-gray-300 line-through' : ''}`}
                htmlFor={`task-${item.id}`}
              >
                {item.task}
              </label>
            </div>
            <button
              className="invisible cursor-pointer border-none group-hover:visible"
              onClick={() => removeNote(item.id)}
            >
              <img src={removeIcon} alt="remove" />
            </button>
          </span>
        );
      })
    ) : (
      <p className="border-b-1 border-[#E3E4F1] p-20 text-center">
        Please Add a task
      </p>
    );

  return (
    <div className={`${className}`}>
      <div>{noteListPlaceHolder}</div>

      <FilterItems
        numberOfItems={filteredList.filter((task) => task.isActive).length}
        setFilter={setFilter}
        setNote={setNote}
        filter={filter}
      />
    </div>
  );
}

export default OutputHandler;
