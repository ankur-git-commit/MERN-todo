import { Note } from '../App';
import { AllowedFilterString } from './OutputHandler';

interface FilterItemsProps {
  numberOfItems: number;
  filter: AllowedFilterString; // Added this prop
  setFilter: React.Dispatch<React.SetStateAction<AllowedFilterString>>;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
}

function FilterItems({ numberOfItems, filter, setFilter, setNote }: FilterItemsProps) {

  const getButtonClass = (buttonFilter: AllowedFilterString) => {
    return `cursor-pointer font-bold ${
      filter === buttonFilter ? 'text-blue-500' : 'hover:text-black'
    }`;
  };

  return (
    <div className="flex flex-row justify-between px-5 py-6 text-sm text-[#9495A5]">
      <p>{numberOfItems} items left </p>
      <div className="flex gap-5">
        <button
          onClick={() => setFilter('all')}
          className={getButtonClass('all')}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={getButtonClass('active')}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={getButtonClass('completed')}
        >
          Completed
        </button>
      </div>
      <button
        className="cursor-pointer hover:text-black"
        onClick={() =>
          setNote((prevValue) => prevValue.filter((item) => !item.isCompleted))
        }
      >
        Clear Completed
      </button>
    </div>
  );
}

export default FilterItems;