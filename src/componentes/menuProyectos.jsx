import { Link, useNavigate } from 'react-router-dom';
import './menuProyectos.css';
import { useAuth } from '../context/authContext';
import {useState} from 'react';

export default function MenuProyectos() {

  const {navegar} = useNavigate();

  return (
    <>
      <nav className="menu-proyecto">
          <Link to="/SetPrueba" className='btn-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M14,7V.46c.913,.346,1.753,.879,2.465,1.59l3.484,3.486c.712,.711,1.245,1.551,1.591,2.464h-6.54c-.552,0-1-.449-1-1Zm1.5,8h-7c-.276,0-.5,.224-.5,.5v2c0,.276,.224,.5,.5,.5h7c.276,0,.5-.224,.5-.5v-2c0-.276-.224-.5-.5-.5Zm6.5-4.515v8.515c0,2.757-2.243,5-5,5H7c-2.757,0-5-2.243-5-5V5C2,2.243,4.243,0,7,0h4.515c.163,0,.324,.013,.485,.024V7c0,1.654,1.346,3,3,3h6.976c.011,.161,.024,.322,.024,.485ZM6,6c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1s-.448-1-1-1h-2c-.552,0-1,.448-1,1Zm0,4c0,.552,.448,1,1,1h2c.552,0,1-.448,1-1s-.448-1-1-1h-2c-.552,0-1,.448-1,1Zm12,5.5c0-1.378-1.122-2.5-2.5-2.5h-7c-1.378,0-2.5,1.122-2.5,2.5v2c0,1.378,1.122,2.5,2.5,2.5h7c1.378,0,2.5-1.122,2.5-2.5v-2Z"/></svg>
            Sets Prueba
          </Link>
          <Link to="/Ciclos" className='btn-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M12,2a10.032,10.032,0,0,1,7.122,3H15V7h5.143A1.859,1.859,0,0,0,22,5.143V0H20V3.078A11.982,11.982,0,0,0,0,12H2A10.011,10.011,0,0,1,12,2Z"/><path d="M22,12A9.986,9.986,0,0,1,4.878,19H9V17H3.857A1.859,1.859,0,0,0,2,18.857V24H4V20.922A11.982,11.982,0,0,0,24,12Z"/></g></svg>
            Ciclos
          </Link>
          <Link to="/Informes" className='btn-menu'>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M3,21.976a1,1,0,0,1-1-1V0H0V20.976a3,3,0,0,0,3,3H24v-2Z"/><rect x="5" y="12" width="2" height="7"/><rect x="10" y="10" width="2" height="9"/><rect x="15" y="13" width="2" height="6"/><rect x="20" y="9" width="2" height="10"/><polygon points="11 4.414 16 9.414 23.707 1.707 22.293 0.293 16 6.586 11 1.586 5.293 7.293 6.707 8.707 11 4.414"/></svg>
            Informes
          </Link>
       </nav>
    </>
  )
}