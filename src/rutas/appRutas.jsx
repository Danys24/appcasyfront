import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../paginas/inicio'
import SetPrueba from '../paginas/setPrueba'
import Informes from '../paginas/informes'
import Ayuda from '../paginas/ayuda'
import Navbar from '../componentes/navbar'
import Footer from '../componentes/footer'
import Home from '../paginas/home'
import Login from '../paginas/login'
import CrearUsuario from '../paginas/crearUsuario'
import Set from '../paginas/set'
import CasoPrueba from '../paginas/casoPrueba'
import PrivateRoute from './privateRoutes'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>   
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CrearUsuario" element={<CrearUsuario />} />
        <Route path="/Inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
        <Route path="/SetPrueba" element={<PrivateRoute><SetPrueba /></PrivateRoute>} />
        <Route path="/Informes" element={<PrivateRoute><Informes /></PrivateRoute>} />
        <Route path="/Ayuda" element={<PrivateRoute><Ayuda /></PrivateRoute>} />
        <Route path="/Set/:nombre" element={<PrivateRoute><Set /></PrivateRoute>} />
        <Route path="/CasoPrueba/:nombre" element={<PrivateRoute><CasoPrueba /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}