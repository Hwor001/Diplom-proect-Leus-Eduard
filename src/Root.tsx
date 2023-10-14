// import { SingIn } from '#ui/pages/sing-in';
import { SingUp } from '#ui/pages/sing-up';
import './App.css';
// import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';

export function Root() {
  return (
    <div className={`App `}>
      <Routes>
        <Route path="/">
          <Route index element={<Link to="/sing-up">Go to sing up</Link>} />
          <Route path="/sing-up" element={<SingUp />} />
          {/* <Route path="/sing-in" element={<SingIn />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default Root;
