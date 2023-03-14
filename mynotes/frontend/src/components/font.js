

import React, { useState,useEffect } from 'react';



function MyComponent() {
    const [data, setData] = useState([]);

useEffect(() => {
  fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB0RRs2sM4m_Ci4xXo00CZe4Dk7sTHeAPg')
    .then(response => response.json())
    .then(data => setData(data.items));
}, []);


  const [selectedFont, setSelectedFont] = useState('Arial');

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  return (
   
        // <select multiple>
        //   {options}
        // </select>
        <select onChange={handleFontChange}>
  
        
        {data.map((option, index) => {
            return <option key={option.family}>
                {option.family}
            </option>
        })}
    </select>
  );
}
export default MyComponent



