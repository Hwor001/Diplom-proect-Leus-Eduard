import { Account } from '#ui/pages/account';
import { MainBookStore } from '#ui/pages/main-bookstore';
// import { NewPassword } from '#ui/pages/new-password';
import { PageSingInAndUp } from '#ui/pages/page-sing-in-and-up';
// import { ResetPassword } from '#ui/pages/reset-password';
import { SelectedBook } from '#ui/pages/selected-book';
import './App.css';
// import { useAppSelector } from '#hooks';
// import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';
import { SearchBook } from '#ui/pages/seach-book';
import { useState } from 'react';
import { Favorite } from '#ui/pages/favorite';
import { Response } from '#features/auth/types';
import { Basket } from '#ui/pages/basket';

export function Root() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (inputValue: string) => {
    setSearchText(inputValue);
  };

  const yourResponseObject: Response = {
    error: 0,
    title: '',
    subtitle: '',
    authors: '',
    publisher: '',
    isbn10: 0,
    isbn13: 0,
    pages: 0,
    year: 0,
    rating: 0,
    desc: '',
    price: '',
    image: null,
    url: null,
    language: '',
    pdf: null,
  };
  return (
    <div className={`App `}>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Link to="/PageSingInAndUp">Go to sing up</Link>}
          />
          <Route
            path="/PageSingInAndUp"
            element={<PageSingInAndUp handleSearch={handleSearch} />}
          />
          <Route
            path="/MainBookStore"
            element={
              <MainBookStore
                handleSearch={handleSearch}
                response={yourResponseObject}
              />
            }
          />
          <Route
            path="/books/:isbn13"
            element={<SelectedBook handleSearch={handleSearch} />}
          />
          <Route
            path="/Favorite"
            element={
              <Favorite
                handleSearch={handleSearch}
                response={yourResponseObject}
              />
            }
          />
          <Route
            path="/search/:searchResultsText/:page"
            element={
              <SearchBook
                handleSearch={handleSearch}
                searchResultsText={searchText}
              />
            }
          ></Route>
          <Route
            path="/Basket"
            element={
              <Basket
                handleSearch={handleSearch}
                response={yourResponseObject}
              />
            }
          ></Route>
          <Route
            path="/Account"
            element={<Account handleSearch={handleSearch} />}
          ></Route>
        </Route>
      </Routes>
      {/* <PageSingInAndUp></PageSingInAndUp>
      <ResetPassword></ResetPassword>
      <NewPassword></NewPassword>
      <Account></Account> */}
    </div>
  );
}

export default Root;
