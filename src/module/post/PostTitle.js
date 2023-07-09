import React from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const PostTitle = ({children, className = "", size = 'nomal', to = '/'}) => {
  return (
    <PostTitleStyles size = {size}
     className={`post-title ${className}`}>
        <NavLink to={to}>
      {children}
        </NavLink>
    </PostTitleStyles>
  )
}

export default PostTitle

const PostTitleStyles = styled.div`
font-weight: 600;
line-height: 1.5;
a {
    display: block;
}

${props => props.size === 'nomal' && css `
 font-size : 18px
`};
${props => props.size === 'big' && css `
 font-size : 22px
`};

`;
