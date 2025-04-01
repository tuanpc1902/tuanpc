<<<<<<< HEAD
import React from 'react'

export default function HeaderLayout() {
  return (
    <div className='min-h-[13.2rem] bg-white'>HeaderLayout</div>
=======
import { Poppins } from 'next/font/google'
import React from 'react'
import { poppinsFont } from '~alias~/app/page'


export default function HeaderLayout() {
  return (
    <div className={` min-h-[8.2rem] flex justify-between items-center p-[1rem]`}>
      <div className="logo min-w-[30rem] max-w-[50rem] text-[2.4rem] font-extrabold flex items-center justify-center">TUANPC</div>
      <nav className={poppinsFont.className + ` min-w-lg-[30rem] min-w-[50rem] max-w-[80rem] text-[1.8rem] space-x-8 flex items-center justify-center`}>
          <button className="">Home</button>
          <button className="">About me</button>
          <button className="x">Contact</button>
      </nav>
    </div>
>>>>>>> e1bd2ef77ee4cc672b1f1977817062857330eeb6
  )
}
