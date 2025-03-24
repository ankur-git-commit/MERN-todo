import { Note } from '../App';
import { AllowedFilterString } from './OutputHandler';

interface FilterItemsProps {
  numberOfItems: number;
  setFilter: React.Dispatch<React.SetStateAction<AllowedFilterString>>;
  setNote: React.Dispatch<React.SetStateAction<Note[]>>;
}
function FilterItems({ numberOfItems, setFilter, setNote }: FilterItemsProps) {
  return (
    <div>
      <p>{numberOfItems} items left </p>
      <button onClick={() => setFilter('all')} className="border-1 px-2">
        All
      </button>{' '}
      <button onClick={() => setFilter('active')} className="border-1 px-2">
        Active
      </button>{' '}
      <button onClick={() => setFilter('completed')} className="border-1 px-2">
        Completed
      </button>{' '}
      <button
        onClick={() =>
          setNote((prevValue) => prevValue.filter((item) => !item.isCompleted))
        }
        className="border-1 px-2"
      >
        Clear Completed
      </button>{' '}
    </div>
  );
}

export default FilterItems;
