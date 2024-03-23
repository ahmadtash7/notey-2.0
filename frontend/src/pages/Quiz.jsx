import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { NavLink } from 'react-router-dom';

function fetchDataFromBackend() {
  const apiUrl = 'http://127.0.0.1:8000/noteyapp/getQATopics/';

  return fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Token " + localStorage.getItem('token'), // Add a space after "Token"

      },
      })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      const responseData = response.json();
      console.log(responseData);
      return responseData;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

const Quiz = () => {

  const { currentColor, currentMode, activeMenu, setActiveMenu } = useStateContext();

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // Check if the user is currently in a test
  //     const isInTest = true
      
  //     if (isInTest) {
  //       // Cancel the unload event
  //       event.preventDefault();
  //       // Chrome requires returnValue to be set
  //       event.returnValue = '';
  //     }
  //   };

  //   // Add event listener when the component mounts
  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden') {
  //       setActiveMenu(true);
  //       console.log(activeMenu);
  //       window.location.href = '/homepage';
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, []);
  

  const [userAnswers, setUserAnswers] = useState({});

  const handleRadioChange = (questionId, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  // const handleClick = () => {
  //   const correctAnswers = {};
  //   data['qa'].forEach(item => {
  //     correctAnswers[item['id']] = item['answer'];
  //   });

  //   const userScore = {};

  //   for (const key in correctAnswers) {
  //     if (correctAnswers.hasOwnProperty(key) && userAnswers.hasOwnProperty(key)) {
  //       const value1 = correctAnswers[key];
  //       const value2 = userAnswers[key];
    
  //       if (value1 === value2) {
  //         userScore[key] = 'Correct';
  //       } else {
  //         userScore[key] = ['Incorrect -- ' , 'Your Answer: '  + value2, ' -- Correct Answer: '  + value1];
  //       }
  //     }
  //   }

  //   console.log(userScore);

  //   // Convert the object to a JSON string
  //   const jsonString = JSON.stringify(userScore);

  //   // Save the JSON string to local storage
  //   localStorage.setItem('userScore', jsonString);

  // };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const saveContext = (index) => {
  //   // const id = event.target.id;
  //   const id = index + 2;
  //   // console.log(id);
  //   localStorage.setItem('id', id);
  // }

  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleClick = (topicId) => {
    setSelectedTopics(prevSelectedTopics => {
      if (prevSelectedTopics.includes(topicId)) {
        return prevSelectedTopics.filter(id => id !== topicId);
      } else {
        return [...prevSelectedTopics, topicId];
      }
    });
  };

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  return (
  console.log(selectedTopics),
    <div>
      <div className="flex justify-between items-center p-4">
        <Header title="Select Topics For Quiz"/>
        <button className="px-4 py-2 text-white rounded-md" style={{ background: currentColor}}>
          Generate Quiz
        </button>
      </div>
      <div className="flex flex-wrap">
        {data && (
          Object.keys(data).map((topic) => (
                      <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl lg: p-6 m-4 bg-hero-pattern bg-no-repeat bg-cover bg-center text-xl' style={{ background: currentColor }} id={topic['id']}>
                          <input
              type="checkbox"
              onChange={() => handleClick(topic)}
              className='mr-4'
              id={topic['id']}
            />
                          <span>{topic}</span>
                        </div>
                    )
                    )
        )}
      </div>
    </div>

  );
};
export default Quiz;