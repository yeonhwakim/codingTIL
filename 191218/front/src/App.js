import './index.css';
import shortId from 'shortid';
import React, {
  useRef,
  useEffect,
  useCallback,
} from 'react';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  setItem,
  joinRoom,
  reqAddItem,
  reqVoteItem,
} from './actions';


const shortid = require('shortid');
const generateKey = () => shortid.generate() + Date.now();
const { socket } = window;
function App() {
  const { value, items, prevId } = useSelector((state) => ({
    value: state.value,
    items: state.items,
    prevId: state.prevId,
  }));

  const dispatch = useDispatch();
  const input = useRef('');

  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    window.user = shortId.generate() 
  }, []);
  useEffect(() => {
    dispatch(joinRoom()) 
  }, []);

  const setItems = (e) => dispatch(setItem(e.target.value));

  const addItems = (e) => {
    e.preventDefault();
    if (!input.current.value) {
      alert('식당이름을 입력해주세요.');
      return;
    }

    return dispatch(reqAddItem(input.current.value, generateKey())) 
  };

  const voteItems = (id) => dispatch(reqVoteItem(id, prevId)) 
  return (
    <div className="App">
      <form  onSubmit={addItems}>
        <input ref={input} value={value} onChange={setItems}/>
        <button  type="submit">press</button>
      </form>
      <ul>
      {
        !items.length
          ? ''
          : items.map((item) => (
            <li key={item.key}>
                <div className="name">
                  <div className="ellipsis">{item.name}</div>
                </div>
                <button type="button" className="counter" onClick={() => voteItems(item.id || item.key)}>{item.count || 0}</button>
            </li>
          ))
      }
      </ul>
    </div>
  );
}

export default App;
