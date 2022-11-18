import React from 'react';
import numeral from "numeral";
import "numeral/locales/vi";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

// import Home from './pages/Home/Home';
import Employees from './pages/Employees';
import Products from './pages/Products';



import Page404 from './components/Page404/Page404';

numeral.locale('vi');

function App() {
  return (
    <div style={{ padding: 48 }}>
      <BrowserRouter>
        <Routes>

          <Route path='/employees' element={<Employees />} />
          <Route path='/products' element={<Products />} />


          {/* NO MATCH ROUTE */}
          <Route
            path='*'
            element={<Page404 />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;