import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Assuming data is an array of objects, get all unique property names
  const allColumns = data.reduce((columns, row) => {
    Object.keys(row).forEach(column => {
      if (!columns.includes(column)) {
        columns.push(column);
      }
    });
    return columns;
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Topics" />
      {data && (
        <GridComponent
          id="gridcomp"
          dataSource={data}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        >
          <ColumnsDirective>
            {allColumns.map((column, index) => (
              <ColumnDirective key={index} field={column} headerText={column} />
            ))}
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport]} />
        </GridComponent>
      )}
    </div>
  );
};

export default Learn;
