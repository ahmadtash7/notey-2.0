import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';
import { FaUser, FaEnvelope, FaIdCard, FaUserTag, FaCalendar, FaPowerOff, FaSignInAlt } from 'react-icons/fa';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Profile = () => {
  // const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ['Delete'];
  // const editing = { allowDeleting: true, allowEditing: true };

  const { currentColor, currentMode } = useStateContext();

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
    <div>
      {loading}
      {data && (
        // <div className="profile-block">
        //   <div className='flex flex-wrap lg:flex-nowrap justify-center m-4 ml-10 mr-10'>
        //   <div className="inline-block dark:text-gray-200 p-4 pt-9 rounded-2xl m-4">
        //     <p className='text-5xl font-semibold'>
        //       User Profile
        //     </p>
        //   </div>
        //   </div>
        //   <div className='flex flex-wrap lg:flex-nowrap justify-between m-4 ml-10 mr-10'>
        //     <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 First Name
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['first_name']}</p>
        //       </div>
        //     <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Last Name
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['last_name']}</p>
        //       </div>
        //     <div className="bg-white inline-block dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Email
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['email']}</p>
        //             {/* <p className="text-2xl mt-2">{data['data'][0]['email'].substring(15,25)}</p> */}
        //       </div>
        //       <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Status
        //               </span>
        //             </p>
        //             {data['data'][0]['is_active'] ? (
        //             <p className="text-2xl mt-2">
        //               Online
        //               </p>)
        //               : <p className="text-2xl mt-2">
        //               Offline
        //               </p> }
        //     </div>
            
        //   </div>
        //   <div className='flex flex-wrap lg:flex-nowrap justify-between m-4  ml-10 mr-10'>
        //     <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 User Id
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['id']}</p>
        //       </div>
        //     <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Username
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['username']}</p>
        //       </div>
        //     <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Date Joined
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['date_joined'].substring(0,10)}</p>
        //       </div>
        //       <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl m-4">
        //             <p className="mt-3">
        //               <span className="font-bold text-gray-400 text-3xl mt-2">
        //                 Last Login
        //               </span>
        //             </p>
        //             <p className="text-2xl mt-2">{data['data'][0]['last_login'].substring(0,10)}</p>
        //     </div>
        //   </div>
        //   {/* <div className='flex flex-wrap lg:flex-nowrap justify-around m-4'>
            
            
        //   </div> */}
        // </div>
        Object.entries(data['data'][0]).map((info) => (
          <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl lg: p-6 m-4 bg-hero-pattern bg-no-repeat bg-cover bg-center text-xl' style={{ background: currentColor }} id={info['id']}>
              <span>{info}</span>
            </div>
        )
        )
        )}
    </div>
  )};

export default Profile;