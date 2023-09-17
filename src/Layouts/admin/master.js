import React ,{useEffect}from 'react';

import Sidebar from './sidebar';
import Footer from './footer';
import Navbar from '../front-end/pages/Navbar';




const Master = () => {


  return (
    <div className='sb-nav-fixed container '>
         <Navbar/>
      <div id='layoutSidenav'>
        <div id="layoutSidenav_nav">
     <Sidebar/>
        </div>
        <div id="layoutSidenav_content">
        <div class="lg:w-full lg:ml-64 px-6 py-8">



</div>
       
        </div>
      </div>
/>
    </div>
  );
}

export default Master;
