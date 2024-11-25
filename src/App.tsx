import { useState } from 'react';
import './App.css';
import { Attributes } from './Attributes';
import { Classes } from './Classes';


function App() {
  const [num, setNum] = useState<number>(0);
  const [matchedClasses, setMatchedClasses] = useState<[]>([]); 

  const ALLOWED_SUM = 70;

  const handleSum = (sumprovided, matchedClasses) => {
    if(sumprovided > ALLOWED_SUM) {
      alert(`Sum can not be greater than ${ALLOWED_SUM}`)
    }
    console.log(matchedClasses, 'matched classes are here');
    setMatchedClasses(matchedClasses);
    setNum(sumprovided);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <label style={{
            width:'100%'
        }}>Sum : {num}</label>
       <Attributes onUpdatingTotal={handleSum}  ALLOWED_SUM={ALLOWED_SUM}/>
        <Classes matchedClasses = {matchedClasses}/>
      </section>
    </div>
  );
}

export default App;
