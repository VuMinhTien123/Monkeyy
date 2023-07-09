import React from 'react'
import styled from 'styled-components';
import { Button } from '../../conponents/button';

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
        <div className='container'>
            <div className='banner'>
                <div className='banner-content'>
                    <h1 className='banner-heading'>Monkeyyy</h1>
                    <p className='banner desc'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium magnam similique accusantium natus esse facilis!
                    Quaerat voluptates possimus dolorem officiis pariatur, repellat,
                    cupiditate porro, quidem molestiae impedit laudantium neque quo!
                    </p>
                    <div className='flex'>
                    <Button 
                    className = "mr-4"
                    kind='secondary'
                    to = "/sign-up">
                        Get Started
                    </Button>
                    <Button 
                    kind='secondary'
                    to = "/dashboard">
                         dashboard
                    </Button>
                    </div>
                </div>
                <div className='banner-image'>
                    <img src='/img-banner.png' alt='banner'/>

                </div>
            </div>
        </div>
      
    </HomeBannerStyles>
  )
}

export default HomeBanner;

const HomeBannerStyles = styled.div `
padding: 40px 0;
min-height: 520px;
background-image: linear-gradient(to right bottom, ${props => props.theme.primary},
 ${props => props.theme.secondary});

 .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
 

 .banner-content {
    max-width: 600px;
    color: white;
 }
 .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
 }
 &.desc {
    line-height: 1.75;
    margin-bottom: 40px;

 }
}
`;
