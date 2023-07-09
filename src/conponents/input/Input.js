import React from 'react'
import { useController } from 'react-hook-form'
import styled from 'styled-components'
import { IconEyeOpen } from '../icon'

const Input = ({
    name = "",
    type = "text",
    children,
    control,
    ...props
}) => {
    const {field} = useController({
        control,
        name,
        defaultValue: ""
    })
  return (
    <InputStyles hasIcon = {children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children ? <div className='input-icon'> {children} </div> : null}
    </InputStyles>
  )
}

export default Input

const InputStyles = styled.div `
position: relative;
width: 100%;
 input {
        width: 100%;
        padding: 20px;
        padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
        background-color: ${props => props.theme.grayLight};
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s linear;
        border: 1px solid transparent;
 }
    input:focus {
            background-color: white;
            border-color: ${props => props.theme.primary};
        }

       input::-webkit-input-placeholder {
        color: #848788;
       }
       input::-moz-input-placeholder {
        color: #848788;
       }

       .input-icon {
        position: absolute;
        right: 20px;
        top: 40%;
        transform: translateY(-50);
        cursor: pointer;
       }

`;
