import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';

const Profile = () => {
  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ['Delete'];
  // const editing = { allowDeleting: true, allowEditing: true };

  // const { currentColor, currentMode } = useStateContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/noteyapp/dashboard/');
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

  return (
    // <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
    //   <Header category="Page" title="Customers" />
    //   <GridComponent
    //     dataSource={customersData}
    //     enableHover={false}
    //     allowPaging
    //     pageSettings={{ pageCount: 5 }}
    //     selectionSettings={selectionsettings}
    //     toolbar={toolbarOptions}
    //     editSettings={editing}
    //     allowSorting
    //   >
    //     <ColumnsDirective>
    //       {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    //       {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
    //     </ColumnsDirective>
    //     <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
    //   </GridComponent>
    // </div>
    <div>
      {loading}
      {data && (
        <div>
          <div className='flex flex-wrap lg:flex-nowrap justify-center m-4'>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        First Name
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['first_name']}</p>
              </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Last Name
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['last_name']}</p>
              </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Email
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['email']}</p>
              </div>
          </div>
          <div className='flex flex-wrap lg:flex-nowrap justify-center m-4'>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        User Id
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['id']}</p>
              </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Username
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['username']}</p>
              </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Date Joined
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['date_joined'].substring(0,10)}</p>
              </div>
          </div>
          <div className='flex flex-wrap lg:flex-nowrap justify-center m-4'>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Activity Status
                      </span>
                    </p>
                    {data['data'][0]['is_active'] ? (
                    <p className="text-sm text-gray-400  mt-1">
                      Online
                      </p>)
                      : <p className="text-sm text-gray-400  mt-1">
                      Offline
                      </p> }
            </div>
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
                    <p className="mt-3">
                      <span className="text-lg font-semibold"></span>
                      <span className={`text-sm ml-2`}>
                        Last Login
                      </span>
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{data['data'][0]['last_login'].substring(0,10)}</p>
            </div>
          </div>
        </div>
        )}
    </div>
  )};

export default Profile;