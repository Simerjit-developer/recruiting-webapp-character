import { useState, useEffect } from 'react';
import { CLASS_LIST } from './consts';

export function Classes({matchedClasses}) {
    const classArr = Object.keys(CLASS_LIST);

    // List all the classes
    const [classValues] = useState(
        classArr.reduce((acc, item) => {
            acc[item] = 'value exists'; // setting initial value to false for each class
            return acc;
        }, {}));

    const [selectedClass, setSelectedClass] = useState(matchedClasses || []);

    function handleClick(className) {
        if(Array.isArray(className)){
            setSelectedClass(className);
        } else {
            setSelectedClass([className]);
        }
        
    }

    useEffect(() => {
        console.log(`updated the values of matched classes`, selectedClass, matchedClasses);
        handleClick(matchedClasses)
      }, [matchedClasses]);
    return (
        <div id="classes" style={{
            width:'30%',
            float:'left'
        }}>
            <h1>Classes</h1>
            {
                
                Object.entries(classValues).map(([cls, val]) => {
                    return(
                        <div
                         key = {cls} 
                         onClick={() => handleClick(cls)} 
                         style={{
                            cursor:'pointer',
                            color: selectedClass.includes(cls) ? 'red': 'white'
                         }}
                         >
                            {JSON.stringify(cls)}
                        </div>
                     )
                })
            }

            {/* Show the selected class */}
            {selectedClass.length} Length  {JSON.stringify(selectedClass)}
            { selectedClass.length > 0 ? (
                selectedClass.map((selected) => {
                    return (
                        // <>{selected}</>
                    <div id="selectedClass">
                        <section style={{
                            padding:"20px"
                        }}>
                            <b>Selected Class Name: {JSON.stringify(selected)} <br/></b>
                            Minimum Requirements: <br/>
                            { 
                                (CLASS_LIST[selected]) 
                                && Object.entries(CLASS_LIST[selected]).map(([key, value]) => (
                                <div key={key}>
                                    {key} {value} 
                                </div>
                            ))}
                        </section>
                    </div>)
                }

                )
                
            ) : null
            }


        </div>
    )
}