import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Questionnaire',
    path: '/questionnaire',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
      title:'Psychologists',
      path:'/psychologists',
      icon: <IoIcons.IoMdCreate/>,
      cName:'nav-text'
  }

]