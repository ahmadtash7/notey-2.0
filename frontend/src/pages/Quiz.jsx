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
      console.log(responseData[0]);
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

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Quiz" />
      {/* {data.userAnswers && (
        <div>
          {Object.entries(data.userAnswers).map(([question, answer]) => (
            <div key={question}>
              <p>
                <strong>{question}</strong>: {answer}
              </p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};
export default Quiz;