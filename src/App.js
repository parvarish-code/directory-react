import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainNavbar from './components/MainNavbar';
import MemberList from './components/MemberList';
import MemberShow from './components/MemberShow';
import MemberEdit from './components/MemberEdit';
import MemberRegister from './components/MemberRegister';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import MemberLogin from './components/MemberLogin';
import './App.css';
import BulletinBoard from './components/BulletinBoard';


const App = () => {
  return (
    <AuthProvider>
    <Router>
      <MainNavbar />
      <div>
        <Routes>
          <Route path='/register' element={<MemberRegister />}/>
          <Route path='/' element={<MemberList />}/>
          <Route path='/login' element={<MemberLogin />}/>
          <Route path='/members/:id' element={<MemberShow />}/>
          <Route path='/members/:id/edit' element={<MemberEdit />}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin/members' element={<AdminPanel/>}/>
          </Route>
          <Route path='/bulletin/:id' element={<BulletinBoard/>}/>
        </Routes>
    </div>
    </Router>
    </AuthProvider>
    
  )
}

export default App;
