import React, { useState, useEffect } from 'react'

const Context = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = localStorage.getItem('id');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/noteyapp/context/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    // console.log(data[0]['context']),
    <div>
      {/* {loading} */}
      {data && (
        data.map((item, index) => (
        // <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 pt-9 rounded-2xl m-4'>
        <p className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg  p-4 rounded-2xl m-3'>{item['context']}</p>
        // </div>
        ))
      )}
    </div>
  )
}

export default Context