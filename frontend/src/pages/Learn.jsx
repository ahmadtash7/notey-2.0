import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

function fetchDataFromBackend() {
  const apiUrl = 'http://127.0.0.1:8000/noteyapp/learn/';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

const Learn = () => {
  const editing = { allowDeleting: true, allowEditing: true };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentColor } = useStateContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchDataFromBackend();
        setData(result);
        console.log(result)
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Topics" />
            {data.map((topic, index) => (
              <div key={index} className='m-2 md:m-5 mt-6 p-2 rounded-3xl' style={{ background: currentColor }}>
                <NavLink to='/homepage'>
                  <span>{index}</span>
                  <span>{topic['topic']}</span>
                </NavLink>
                </div>

            ))}
    </div>
  );
};

export default Learn;
