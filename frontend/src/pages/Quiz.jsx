import React, { useEffect, useState } from 'react';
// import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

// import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { NavLink } from 'react-router-dom';

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

  const { currentColor, currentMode } = useStateContext();

  const [userAnswers, setUserAnswers] = useState({});

  const handleRadioChange = (questionId, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleClick = () => {
    const correctAnswers = {};
    data['qa'].forEach(item => {
      correctAnswers[item['id']] = item['answer'];
    });
    
    // console.log('Correct Answer', correctAnswers)
    // console.log('User Answers:', userAnswers);

    const userScore = {};

    for (const key in correctAnswers) {
      if (correctAnswers.hasOwnProperty(key) && userAnswers.hasOwnProperty(key)) {
        const value1 = correctAnswers[key];
        const value2 = userAnswers[key];
    
        if (value1 === value2) {
          userScore[key] = 'Correct';
        } else {
          userScore[key] = ['Incorrect -- ' , 'Your Answer: '  + value2, ' -- Correct Answer: '  + value1];
        }
      }
    }

    console.log(userScore);

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(userScore);

    // Save the JSON string to local storage
    localStorage.setItem('userScore', jsonString);

  };

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
  // console.log(data['qa']),
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Quiz" />
      
      {data && (
        data['qa'].map((item, index) => (
          <ul>
            <div key={index} className='m-3'>
                <h1>{item.question}</h1>
                <li>
                  {Object.values(item.distractors).map((value, index) => (
                  <div key={index}>
                    {index === 0 && (
                    <React.Fragment>
                    <input type="radio" id={`answer_${item.id}`} name={`question_${item.id}`} value={item.answer}
                          checked={userAnswers[item.id] === item.answer}
                          onChange={() => handleRadioChange(item.id, item.answer)} />
                    <label htmlFor={`answer_${item.id}`}>{item.answer}</label>
                    <br/>
                    </React.Fragment>
                    )}
                    <input type="radio" id={`radio_${index}`} name={`question_${item.id}`} value={value}
                      checked={userAnswers[item.id] === value}
                      onChange={() => handleRadioChange(item.id, value)} />
                    <label htmlFor={`radio_${index}`}>{value}</label>
                  </div>
                  ))}
                </li>
            </div>
          </ul>
        ))
      )}
      <button onClick={handleClick} type="button" style={{ backgroundColor: currentColor }}
                className="text-l opacity-0.9 text-white hover:drop-shadow-xl rounded-2xl p-3"
              ><NavLink to={'/quizresult'}>Submit</NavLink></button>
    </div>
          

  );
};
export default Quiz;