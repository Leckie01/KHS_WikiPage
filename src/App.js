import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './componentts/Main';
import Layout from './componentts/Layout';
import Post from './componentts/Post';
import Edit from './componentts/Edit';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Main />} />
        <Route path='/posts/:id' element={<Post />} />
        <Route path='/posts/edit' element={<Edit />} />
      </Route>
    </Routes>
  );
};

export default App;
