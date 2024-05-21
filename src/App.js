import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import MemberList from './components/MemberList';
import MemberForm from './components/MemberForm';
import MemberShow from './components/MemberShow';
import MemberEdit from './components/MemberEdit';
import './App.css';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<MemberForm />}/>
          <Route path='/members/add' element={<MemberForm />}/>
          <Route path='/members/:id' element={<MemberShow />}/>
          <Route path='/members/:id/edit' element={<MemberEdit />}/>
        </Routes>
      <MemberList />
    </div>
    </Router>
    
  )
}

export default App;
