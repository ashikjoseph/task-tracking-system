import logo from './logo.svg';
import './App.css';
import Addtasks from './components/Addtasks';
import Listtasks from './components/Listtasks';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [uploadTodoStatus, setUploadTodoStatus] = useState({})
  return (
    <div>
      <Routes>
        <Route path='/' element={<Addtasks setUploadTodoStatus={setUploadTodoStatus} />} />
        <Route path='/listtasks' element={<Listtasks uploadTodoStatus={uploadTodoStatus} />} />
      </Routes>
    </div>
  );
}

export default App;
