import React, { useState } from 'react';
import {motion} from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore  from 'swiper';
import { Navigation, Pagination } from 'swiper';
import { useQuery, gql } from '@apollo/client';
import 'swiper/swiper-bundle.css';
//import aboutImage from '../images/about-image.jpeg';
import '../Styles/slider.css'
const api = process.env.REACT_APP_APIURL;
const POSTS = gql`
query getPosts{
  
  posts (sort: "year.year:desc"){
      data{
          id
          attributes{
              title
              media{
                data{
                  attributes{
                      formats
                       url
                      
                      
                    }
                   
                  }
                }
             year{
              data{
                attributes{
                  year
                }
              }
            }
          
          }
          }
    }
}

`;



function Slider() {

  const {loading, error, data} = useQuery(POSTS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

    return(

            <Swiper
            id="swiper"

        
            modules={[Pagination, Navigation]}    
            navigation
            slidesPerView={1}
            spaceBetween={50}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
         >
             {data.posts.data.map((post,id) =>(
                <div key={id}>
               <SwiperSlide className='swiper'>
                    {post.attributes.media.data.map((image,id2) => {
                         
                               return(
                                  
                                       <img
                                        src={api + image.attributes.url}/>
                                
                                   
                           
                                )
                            })}  
                                </SwiperSlide>
                  </div>
                
                  
              ))}
              

     
    </Swiper>
       
     
    );
}

export default Slider;