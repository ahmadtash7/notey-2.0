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
  console.log(data['qa'][0]['distractors']),
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Quiz" />
      
      {data && (
        data['qa'].map((item, index) => (
          <ul>
            <div key={index} className='m-3'>
                <h1>{item.question}</h1>
                <li>
                  {/* <div>
                    <input type="radio" id="answer_{item.id}" name="question_{item.id}" value="{item.answer}"/>
                    <label for={item.answer}>{item.answer}</label>
                  </div> */}
                  {Object.values(item.distractors).map((value, index) => (
                  <div key={index}>
                    {index === 0 && (
                  <React.Fragment>
                    <input type="radio" id={`answer_${item.id}`} name={`question_${item.id}`} value={item.answer} />
                    <label htmlFor={`answer_${item.id}`}>{item.answer}</label>
                    <br/>
                  </React.Fragment>
                )}
                    <input type="radio" id={`radio_${index}`} name={`question_${item.id}`} value={value} />
                    <label htmlFor={`radio_${index}`}>{value}</label>
                  </div>
                                ))}
                </li>
                {/* {data['qa'][index]['distractors'].map((d, index) => (
                  <li key={index}>{d}</li>
                ))} */}
              {/* 
              <input type="radio" id="distractor1_{item.id}" name="question_{item.id}" value={item.distractors[3]}/>
              <label for="distractor1_{item.id}">{item.distractors[3]}</label>
              <br />
              <input type="radio" id="distractor2_{item.id}" name="question_{item.id}" value={item.distractors[1]}/>
              <label for="distractor2_{item.id}">{item.distractors[1]}</label>
              <br />
              <input type="radio" id="distractor3_{item.id}" name="question_{item.id}" value={item.distractors[2]}/>
              <label for="distractor3_{item.id}">{item.distractors[2]}</label>
              <br /> */}
            </div>
          </ul>
        ))
      )}
      
    </div>
          

  );
};
export default Quiz;