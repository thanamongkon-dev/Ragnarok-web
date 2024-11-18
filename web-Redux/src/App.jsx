import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./stores/slices/counterSlice";
import Member from "./components/pages/Member";
import Login from "./components/form/Login";
import DataEncryptionComponent from "./components/pages/DataEncryptionComponent";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Redux Counter</h1>
      <p>Count: {count}</p>
      <button className="p-2 border rounded mx-4 bg-green-500" onClick={() => dispatch(increment())}>Increment</button>
      <button className="p-2 border rounded mx-4 bg-red-500" onClick={() => dispatch(decrement())}>Decrement</button>
      <button className="p-2 border rounded mx-4 bg-yellow-500" onClick={() => dispatch(incrementByAmount(2))}>
        Increment by 2
      </button>
      <Login />
      <DataEncryptionComponent />

      <Member />

    </div>
  );
}

export default App;
