import React from 'react'
import styled from 'styled-components'
import { Button } from '../button'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'

const menuLinks = [
    {
        url: '/',
        title: 'Home',
    },
    {
        url: '/blog',
        title: 'Blog',
    },
    {
        url: '/contact',
        title: 'Contact',
    },
]



  const Header = () => {
    const {userInfo} = useAuth()
    // console.log('userInfo', userInfo)
         
    function getLastName(name) {
        if(!name) return " ";
        const length = name.split(" ").length;
             return name.split("")[length - 1];
    }
  return (
    <HeaderStyles>
      <div className='container'>
        <div className='header-main'>
            <ul className='menu'>
                {menuLinks.map((item) => (
                <li className='menu-item' key={item.title}>
                    <NavLink to={item.url} className='menu-link'>
                        {item.title}
                    </NavLink >
                </li>
                ))}
            </ul>
                <div className='search'>
                    <input type='text' className='search-input' placeholder='Search posts...' />
                    <span className='search-icon' ></span>  
                </div>        
                   {                   
                    !userInfo ? 
                    <Button
                    to = '/sign-in'
                    type='button' 
                    className = "header-button"
                    height= '45px'
                    >Login</Button>  
                    : 
                    <div className='header-auth'>
                        <span>Welcome back,</span>
                        <strong className='text-primary'>{getLastName(userInfo?.displayName)}</strong>

                    </div>           
                   }
        </div>
      </div>

    </HeaderStyles>
  )
}

export default Header

const HeaderStyles = styled.div`
.header-main {
    display: flex;
    align-items: center;
    padding-top: 40px;
}
.menu {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-left: 40px;
    list-style: none;
    font-weight: 500;

}

    .search {
        margin-left: auto;
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 8px;
        width: 100%;
        max-width: 320px;
        display: flex;
        align-items: center;
        position: relative;
        font-weight: 500;
        margin-right: 20px;

        .search-input {
            flex: 1;
            padding-right: 45px;
        }
        .search-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 15px;
        }
    }


`;

