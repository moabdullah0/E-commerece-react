import React from 'react'
import landing from '../../../assets/front-end/img/16544-removebg-preview.png'
import { getUserNameFromLocalStorage } from './getUserNameFromLocalStorage';
import land from '../../../assets/front-end/img/20943855_preview_rev_1.png'
import { delay, motion } from "framer-motion"
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div>
       <section className=''>
    <motion.div initial={{ x: -2000, opacity:0 ,scale:0 }} whileInView={{opacity:1,scale:1}} animate={{ x: 0 }} transition={{ delay: '0.6', duration: '0.6' }} className='  flex px-5 flex-col-reverse justify-between items-center md:flex-row-reverse '>
   
    <motion.div className='md:w-1/2 ' initial={{y:-1000}} animate={{ y:0}} transition={{
         duration:'0.5',
        delay:'2'
    }}>
        <h1 className='text-4xl font-bold pb-2 text-gray-900 dark:text-gray-100 md:pt-36'>Welcom <span className='text-blue-500'></span> in my Website </h1>
        <p className='pb-5'>is simply dummy text of the printing and  uries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
    
    </motion.div>
    <div className='md:w-1/2 pt-36  '>
    <motion.img initial={{y:-1000}} animate={{y:0}} transition={{
        duration:'1',
delay:'2'

    }
        
    } src={landing} className='lg:w-96 sm:w-36 lg:mx-5'/>
    </div>
    </motion.div>

   </section>
    </div>
  )
}

export default Services
