import { useState, useEffect } from 'react';
import { ATTRIBUTE_LIST, CLASS_LIST } from './consts';

export function Attributes({ onUpdatingTotal, ALLOWED_SUM}) {
    // For API
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [attributeValues, setAttributeValues] = useState(
        ATTRIBUTE_LIST.reduce((acc, attribute) => {
            acc[attribute] = 10; // setting initial value to 10 for each attribute
            return acc;
        }, {})
    );

    const [matchedClasses, setMatchedClasses] = useState([]);

    
    // use api to save and restore the values
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attributeValues })
    };

    function saveRecord () {
        setLoading(true);
        fetch(
            `https://recruiting.verylongdomaintotestwith.ca/api/{{Simerjit-developer}}/character `,
            opts
        )
        .then((response) => response.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(setError);
        console.log('API data', data)
    }

      // on first load
      useEffect(() => {
        fetch(
          `https://recruiting.verylongdomaintotestwith.ca/api/{{Simerjit-developer}}/character `
        )
          .then((response) => response.json())
          .then((data)=>{
            console.log(data.body.attributeValues)
            setAttributeValues(prevState => ({
                ...prevState,
                ...data.body.attributeValues, // Update the specific attribute
              }));

              // calculate sum & list classes
              calculateSum();
          });
      }, []);

    useEffect(() => {
        console.log(`updated the values, calculate total!`);
        
      }, [attributeValues, matchedClasses]);

    function calculateSum() {
        const total = Object.values(attributeValues).reduce((currentVal, acc) => {
            return acc + currentVal
        }, 0 )

        matchMinRequirements();
        onUpdatingTotal(total, matchedClasses);
        return total;
    }
    // hanle change
    function increment(attr) {
        attributeValues[attr] = attributeValues[attr] + 1
        const total = calculateSum();
        if(total <= ALLOWED_SUM) {
            console.log('Did I reach jere')
            setAttributeValues({
                ...attributeValues
            })
        } else {
            attributeValues[attr] = attributeValues[attr] - 1
        }
    }

    function decrement(attr) {
        // value can not be less than 0
        if(attributeValues[attr] === 0) {
            alert(`${attr} value can not be less than 0`)
        } else {
            attributeValues[attr] = attributeValues[attr] - 1
            const total = calculateSum();
            if(total <= ALLOWED_SUM) {
                setAttributeValues({
                    ...attributeValues
                })
            }
        }

        
    }

    function matchMinRequirements() {
        // get selected values
        let macthedClasses = [];

        for (let className in CLASS_LIST) {
            let allMatch = true;
            for(let attrName in CLASS_LIST[className]) {
                // assuming keys will exist
                if(attributeValues[attrName] < CLASS_LIST[className][attrName]) {
                    allMatch = false
                }
            }
            if(allMatch === true) {
                macthedClasses.push(className);
            }
          }

          setMatchedClasses(macthedClasses);
    }

    return (
        <section style={{
            width:'30%',
            float:'left'
        }}>
            <h1>Attributes</h1>
            <div>
                 { Object.entries(attributeValues).map(([attr, value]) => (
                    <div key={attr}>
                        {attr} {value} 
                        <button id="increment" onClick={() => increment(attr)}>+</button>
                        <button id="decrement" onClick={() => decrement(attr)}>-</button>
                    </div>
                ))}  
            </div>

        <button ket="save-btn" onClick={()=> saveRecord()} >Save the Record</button>
        </section>
    )
}
