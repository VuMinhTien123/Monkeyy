import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const AuthenticationPage = ({children}) => {
  return (
    <AuthenticationPageStyles>
      <div className='container'>
        <NavLink to='/'>
          <h1 className='heading'>Monkeyyy</h1>
        </NavLink>
        
        
        {children}
        </div>
    </AuthenticationPageStyles>
  )
}

export default AuthenticationPage


const AuthenticationPageStyles = styled.div `
min-height: 100vh;
padding: 40px;

    .heading {
        text-align: center;
        color: ${props => props.theme.primary};
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 60px;
    }

       .form {
        max-width: 600px;
        margin: 0 auto;
       }

       .have-account {
        margin-bottom: 20px;
        font-size: 18px;
        a{
          display: inline-block;
          color: ${props => props.theme.primary};
          font-weight: 500;
        }
        .nav-form {
          margin-left: 15px;
          font-size: 20px;
        }
        
       }

`;