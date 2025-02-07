import React, { useEffect } from 'react'
import { getAuthUser, isAuthenticated } from '../../components/utils/AuthCookiesManager'
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../global/Toast';

const user = getAuthUser() || {};

const Profile = () => {
    const navigate = useNavigate();
    
    if(!isAuthenticated()){
        showToast("You are not authenticated to view the page, redirecting you home ...", "info");
        setTimeout(() => {
            navigate('/');
        }, 1500)
    }

  return isAuthenticated() ? (
    <div>
        <section className='px-3'>
            <Header showBack showCart showMenuIcon/>
        </section>

        <section>This is the profile page</section>
    </div>
  ) : (
    <p>Un Authorised</p>
  )
}

export default Profile
