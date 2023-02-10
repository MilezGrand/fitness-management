import React from 'react';
import Info from './components/Info/index';
import Users from './components/Users/index';
import { Routes, Route } from 'react-router-dom';


const Wrapper = {
  display: "flex"
}

const App = () => {
  const [showForm, setShowForm] = React.useState(false);
  
  return (
      <div style={Wrapper}>
        <Users setShowForm={setShowForm} showForm={showForm} />

        <Routes>
          <Route path="/clients/:id" element={<Info />} />
        </Routes>
      </div>
  );
};

export default App;
