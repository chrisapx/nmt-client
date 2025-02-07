import React from 'react'
import { getAuthUser, isAuthenticated } from '../../components/utils/AuthCookiesManager'
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../global/Toast';
import { Avatar } from '@mui/material';
import { useAuthDialog } from '../../hooks/useAuthDialog';
import { dialog_operations } from '../../components/utils/constansts/DialogOperations';

const user = getAuthUser() || {};

const Settings = () => {
    const navigate = useNavigate();
    const { openDialog } = useAuthDialog();
    
    if(!isAuthenticated()){
        showToast("You are not authenticated to view the page, redirecting you home ...", "info");
        setTimeout(() => {
            navigate('/');
        }, 1500)
    }

  return isAuthenticated() ? (
    <div className='px-4'>
        <section className='flex justify-between items-center py-4'>
            <i className='pi pi-arrow-left' onClick={() => navigate('/')}/>
            <p className='font-semibold'>My Account</p>
            <i className='pi pi-lock text-md text-green-600'/>
        </section>

        <section className='flex flex-col gap-4 items-center justify-center m-3'>
          <Avatar sx={{ width: 86, height: 86 }}/>
          <p className='font-bold flex gap-2 items-center'>{user?.fullName} <span className='pi pi-user-edit text-blue-400 font-bold' onClick={() => openDialog(dialog_operations.edit_profile, [{key: "u_email", value: user?.email}])}></span></p>
          <p className='font-semibold text-xs flex gap-2 items-center'>
            {user?.address?.street} {", "}
            {user?.address?.city} {", "}
            {user?.address?.country} {", "}
            {user?.address?.zip}
              <span className='pi pi-user-edit text-blue-400 font-bold' onClick={() => openDialog(dialog_operations.edit_profile, [{key: "u_email", value: user?.email}, { key: "p_edit_index", value: "2"}])}></span>
          </p>
        </section>

        <section className='p-3 border rounded-lg'>
          <p className='text-xs font-semibold text-gray-400'>Nalmart Credits Over view</p>
          <p className='font-bold my-1'>{user?.ncredit || '0.0'} Credits</p>
          <p className='w-full h-2 bg-gray-300 rounded-sm'></p>
          <ul>
            <li className='text-xs font-semibold text-gray-400 mt-2'>Referals: 0.0</li>
            <li className='text-xs font-semibold text-gray-400 mt-'>Purchases: 0.0</li>
          </ul>
        </section>

        <section className='py-6 space-y-2 rounded-lg'>
          <div className='flex justify-between items-center p-2 rounded' onClick={() => showToast("Function off, check again later", "info")}>
            <div className='flex gap-3 items-center'>
              <i className='pi pi-user p-2 border bg-gray-50 text-green-700 rounded-full'/>
              <p className='text-black font-bold text-sm'>My Account</p>
            </div>
            <i className='pi pi-angle-right text-gray-400'/>
          </div>

          <div className='flex justify-between items-center p-2 rounded' onClick={() => showToast("Function off, check again later", "info")}>
            <div className='flex gap-3 items-center'>
              <i className='pi pi-cart-plus p-2 border bg-gray-50 text-green-700 rounded-full'/>
              <p className='text-black font-bold text-sm'>Orders</p>
            </div>
            <i className='pi pi-angle-right text-gray-400'/>
          </div>

          <div className='flex justify-between items-center p-2 rounded' onClick={() => showToast("Function off, check again later", "info")}>
            <div className='flex gap-3 items-center'>
              <i className='pi pi-cog p-2 border bg-gray-50 text-green-700 rounded-full'/>
              <p className='text-black font-bold text-sm'>General Settings</p>
            </div>
            <i className='pi pi-angle-right text-gray-400'/>
          </div>
        </section>

    </div>
  ) : (
    <p>Un Authorised</p>
  )
}

export default Settings
