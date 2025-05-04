












// import React from 'react';
// import './App.css';
// import logoImage from '../src/assets/images/image.png'
// import loginn from '../src/assets/images/loginn.png'
// import { useNavigate } from 'react-router-dom';

// function App() {
//   const navigate = useNavigate();  // useNavigate hook-ийг ашиглан navigate объект авах

//   const handleLoginRedirect = () => {
//     navigate('/system-admin/login');  // /system-admin/login руу шилжих
//   };
//   return (
//     <div className="container">
//       <header className="header">
//       <div> <img src={logoImage} alt="logo" className="logo" /> </div>
//         <div className="logo-text">ENVIRONMENT</div>
        
//       </header>
//       <section className="content">
//        <div> <h1>Enviroment health and safety</h1>
//         <p>Ажилтны аюулгүй ажиллааг хангах <p>платформ</p></p>
//         <button className="register-btn" onClick={handleLoginRedirect}>Нэвтрэх</button>

//         </div>
//         <div>
//           <img src={loginn} alt="logon" className="logon" />
//         </div>
//       </section>
//       <footer className="footer">
//       <div class="logo-text">ENVIRONMENT</div>
//         <div className="footer-info">
        
//           <p>Email: 1234***@XXXX.com Addr: 123, XX street, XX District, XX City</p>
//           <p>138-1234-XXXX</p>
//         </div>
//         <p>&copy; Copyright 2022 - All Rights Reserved</p>
//       </footer>
//     </div>
//   );
// }
// export default App;     




import { useRoutes } from 'react-router-dom'
import { routes } from './routes/routes'


function App() {
  const element = useRoutes(routes)
  return element
}

export default App
