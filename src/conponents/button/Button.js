import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import { LoadingSpinner } from '../loading';
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom';


const Button = ({type='button',
                  onClick = () => {},
                  children,
                  kind = 'primary',
                   ...props 
                  }) => {

    const {isLoading, to} = props;
    const child = !! isLoading ? <LoadingSpinner></LoadingSpinner> : children;
    if(to !== "" && typeof to === "string") {
      return (
        <NavLink to={to}
        className='inline-block'
        >
          <ButtonStyles type={type}
            kind = {kind}
            {...props}
          >
            {child}
          </ButtonStyles>
        </NavLink>
      )
    }

  return (
    <ButtonStyles type={type}
    kind = {kind}
    onClick={onClick}
    {...props}
    >
      {child}
    </ButtonStyles>
  )
}
    Button.propTypes = {
      type: propTypes.oneOf(['button','submit']),
      isLoading : propTypes.bool,
      onClick : propTypes.func,
      children : propTypes.node,
      kind : propTypes.oneOf(['primary','secondary'])
    }  

export default Button

const ButtonStyles = styled.button `
    cursor: pointer;
    padding: 0 25px;
    line-height: 1;
    border-radius: 8px;
    font-weight: 600;
    font-size: 18px;
    /* width: 100%; */
    height: ${props => props.height || "66px"};
    display: flex;
    justify-content: center ;
    align-items: center;
    
    ${props => props.kind === 'secondary' && css`
    color: ${props => props.theme.primary};
    background-color: white;
    `};

    ${props => props.kind === 'primary' && css`
    color: white;
    background-image: linear-gradient(to right bottom,
         ${props => props.theme.primary},
         ${props => props.theme.secondary}
 );
    `};

    

 &:disabled{
    opacity: 0.5;
    pointer-events: none;
 }
`;
