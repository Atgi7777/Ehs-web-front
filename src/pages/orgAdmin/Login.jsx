// import React, { useState } from 'react'
import React from 'react';

import logoImage from '../../assets/images/image.png';
import loginn from '../../assets/images/loginn.png';
import { useNavigate } from 'react-router-dom'

function ExampleButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/org-admin/login-form')
  }

// function OrgAdminLogin() 

  return (
    <div className=" flex-col min-h-100vh bg-gradient-to-br from-[#172D46] to-[#396FAC] h-full w-full ">
      <header className="flex flex-row bg-[#23476A] p-5 text-left text-white text-2xl items-center rounded-bl-3xl rounded-br-3xl">
        <div><img src={logoImage} alt="logo" className=" w-10 mr-5" /></div>
        <div className="font-m-plus-2">ENVIRONMENT</div>
      </header>

      <section className=" flex flex-row font-m-plus-2 text-2xl color-white text-left   ">
        <div className='w-1/2 p-5 flex-col text-white ml-5'>
          <h1 className='text-4xl bold mt-20 mb-8  font-bold'> Environment Health and Safety</h1>
          <p className='text-xl font-light'>Ажилтны аюулгүй ажиллааг хангах</p>
          <p className='text-xl mb-8 font-light'>платформ</p>

          {/* <a href = '/dashboard'>Нэвтрэх</a> */}
          
            <button className="text-xl cursor-pointer border-2 border-white px-4 py-2  m-6 rounded-lg" onClick={handleClick}>Нэвтрэх</button>
          
        </div>

        <div>
          <img src={loginn} alt="logon" className="w-[600px] ml-[8px]" />
        </div>
      </section>

      <footer className="bg-black text-white text-center p-5 mt-8">
        <div className="logo-text">ENVIRONMENT</div>
        <div className="m-3">
          <p>Email: 1234***@XXXX.com Addr: 123, XX street, XX District, XX City</p>
          <p>138-1234-XXXX</p>
        </div>
        <p>&copy; Copyright 2022 - All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default ExampleButton;











// function OrgAdminLogin() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const navigate = useNavigate()

//   const handleLogin = (e) => {
//     e.preventDefault()
//     // Mock login logic
//     localStorage.setItem('orgAdminToken', 'sample_token')
//     navigate('/org-admin/dashboard')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
//         <h2 className="text-xl font-bold mb-4">Байгууллагын админ нэвтрэх</h2>
//         <input
//           type="email"
//           placeholder="Имэйл"
//           className="w-full p-2 border mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Нууц үг"
//           className="w-full p-2 border mb-4"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
//           Нэвтрэх
//         </button>
//       </form>
//     </div>
//   )
// }

// export default OrgAdminLogin
