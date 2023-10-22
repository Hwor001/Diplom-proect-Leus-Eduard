import { Account } from '#ui/pages/account';
import { MainBookStore } from '#ui/pages/main-bookstore';
import { NewPassword } from '#ui/pages/new-password';
import { PageSingInAndUp } from '#ui/pages/page-sing-in-and-up';
import { ResetPassword } from '#ui/pages/reset-password';
import './App.css';
// import styled from 'styled-components';
// import { Link, Route, Routes } from 'react-router-dom';

export function Root() {
  return (
    <div className={`App `}>
      {/* <Routes>
        <Route path="/">
          <Route
            index
            element={<Link to="/PageSingInAndUp">Go to sing up</Link>}
          />
          <Route path="/PageSingInAndUp" element={<PageSingInAndUp />} />
        </Route>
      </Routes> */}
      <PageSingInAndUp></PageSingInAndUp>
      <ResetPassword></ResetPassword>
      <NewPassword></NewPassword>
      <Account></Account>
      <MainBookStore></MainBookStore>
    </div>
  );
}

export default Root;
