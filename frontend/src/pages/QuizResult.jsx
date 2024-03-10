import React from 'react'

const QuizResult = () => {
    
    const storedJsonString = localStorage.getItem('userScore');

    // Parse the JSON string back to an object
    const storedDictionary = JSON.parse(storedJsonString);

  return (
    <div className="bg-white dark:text-gray-200 max-w-screen-md mx-auto dark:bg-secondary-dark-bg w-1/2  p-4 pt-9 rounded-2xl m-4">
        <ul>
            {Object.keys(storedDictionary).map((key, index) => (
                <li className='mb-4'>{index + 1}: {storedDictionary[key]}</li>
            ))}
        </ul>
    </div>
  )
}

export default QuizResult