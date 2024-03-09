import React, { useEffect, useState } from 'react';
// import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

function fetchDataFromBackend() {
  const apiUrl = 'http://127.0.0.1:8000/noteyapp/quiz/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // console.log(response);
      const responseData = response.json();
      // console.log(responseData);
      return responseData;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

const Quiz = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromBackend();
        
        setData(result);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  
  return (
    console.log(data),
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Quiz" />
      
      {data && (
        data['qa'].map((item, index) => (
          <div key={index}>
            <br />
            <h1>{item.question}</h1>
            {/* <p>{item.answer}</p>
            <p>{item.distractors[0]}</p>
            <p>{item.distractors[1]}</p>
            <p>{item.distractors[2]}</p> */}
            <input type="radio" id="answer_{item.id}" name="question_{item.id}" value="{item.answer}"/>
<label for={item.answer}>{item.answer}</label>
<br />
<input type="radio" id="distractor1_{item.id}" name="question_{item.id}" value={item.distractors[3]}/>
<label for="distractor1_{item.id}">{item.distractors[3]}</label>
<br />

<input type="radio" id="distractor2_{item.id}" name="question_{item.id}" value={item.distractors[1]}/>
<label for="distractor2_{item.id}">{item.distractors[1]}</label>
<br />

<input type="radio" id="distractor3_{item.id}" name="question_{item.id}" value={item.distractors[2]}/>
<label for="distractor3_{item.id}">{item.distractors[2]}</label>
<br />

          </div>
        ))
      )}
      
    </div>
          

  );
};
export default Quiz;