import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, changeAnotherValue } from "./counterSlice";

function App() {
  const count = useSelector((state) => state.counter.value);
  const anotherValue = useSelector((state) => state.counter.anotherValue);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeAnotherValue(e.target.value));
  };


  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>

        <input type="text" value={anotherValue} onChange={handleChange} />
      </div>
    </div>
  );
}

export default App;
