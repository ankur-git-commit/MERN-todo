import { Note } from '../App';
import { AllowedFilterString } from './OutputHandler';

interface FilterItemsProps {
  numberOfItems: number;
  setFilter: React.Dispatch<React.SetStateAction<AllowedFilterString>>;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
}
function FilterItems({ numberOfItems, setFilter, setNote }: FilterItemsProps) {
  return (
    <div className="flex flex-row justify-between px-5 py-6 text-sm text-[#9495A5]">
      <p>{numberOfItems} items left </p>
      <div className="flex gap-5">
        <button
          onClick={() => setFilter('all')}
          className={`cursor-pointer font-bold hover:text-black`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`cursor-pointer font-bold hover:text-black`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`cursor-pointer font-bold hover:text-black`}
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
