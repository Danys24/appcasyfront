import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from '../paginas/inicio'
import Proyecto from '../paginas/proyectos'
import Ciclo from '../paginas/ciclos'
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
import ResultadoPrueba from '../paginas/resultadoPrueba'

export default function AppRoutes() {
  return (
    <>
      <Navbar/>
      <Routes>   
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CrearUsuario" element={<PrivateRoute><CrearUsuario /></PrivateRoute>} />
        <Route path="/Inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
        <Route path="/Proyecto/:id" element={<PrivateRoute><Proyecto /></PrivateRoute>} >
          <Route path="Ciclos" element={<PrivateRoute><Ciclo /></PrivateRoute>} />
          <Route path="SetPrueba" element={<PrivateRoute><SetPrueba /></PrivateRoute>} />
          <Route path="SetPrueba/Set/:idSet" element={<PrivateRoute><Set /></PrivateRoute>} />
          <Route path="SetPrueba/Set/:idSet/CasoPrueba/:idCaso" element={<PrivateRoute><CasoPrueba /></PrivateRoute>} />
          <Route path="SetPrueba/Set/:idSet/CasoPrueba/:idCaso/ciclo/:idCiclo" element={<PrivateRoute><ResultadoPrueba /></PrivateRoute>} />
          <Route path="Informes" element={<PrivateRoute><Informes /></PrivateRoute>} />
        </Route>
        <Route path="/Ayuda" element={<PrivateRoute><Ayuda /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </>
  )
}