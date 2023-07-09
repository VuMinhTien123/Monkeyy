import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../conponents/button'

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to='/'>
        <img srcSet='/logo' alt='monkey' />
      </NavLink>
      <h1 className='heading'>OOps! Page not NotFound</h1>
      <NavLink
      className='back' 
      to='/'
      >Back to Home</NavLink>
    </NotFoundPageStyles>
  )
}

export default NotFoundPage

const NotFoundPageStyles = styled.div `
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

.back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${props => props.theme.primary};
    border-radius: 15px;
    font-weight: 500;
}
`;