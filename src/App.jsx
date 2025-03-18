
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from './Page/SigninPage';
import Dashboard from './Page/DashboardPage';
import ResetPassword from './Page/ResetPassword';
import ChangePassword from './Page/ChangePassword';

import DesginationPage from './Page/DesginationPage';
import Adminsignup from './Page/Adminsignup';

import Admindashboard from './Page/Admindashboard';
import Employeelist from './Components/Admindashboardcomponents/employeelist';
import Deptmember from './Components/Dashboardcomponents/Deptmember';
import ProjectDetail from './Components/Dashboardcomponents/Projectdetail';


function App() {
 
  return (
    <div>
         <BrowserRouter>
                    <Routes>

                      <Route path='/' element={<Signin/>} />
                    
                       <Route path='/dashboard' element={<Dashboard/>}/>
                       <Route path='/reset-password' element={<ResetPassword/>} />
                       <Route path='/changepassword' element={<ChangePassword/>} />
                       <Route path='/desgination'  element={<DesginationPage/>} />
                       <Route path='/admin-signup' element={<Adminsignup/>} />
                       <Route path='/employeelist' element={<Employeelist/>} />
                      
                       <Route path='/admin-dashboard' element ={<Admindashboard/>} />
                       <Route path='/deptmember/:id' element={<Deptmember/>} />
                       <Route path="/project-detail/:projectId" element={<ProjectDetail />} />
                      
                    </Routes>
         
         </BrowserRouter>
    </div>
  );
}

export default App;
