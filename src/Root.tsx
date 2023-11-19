import { Account } from '#ui/pages/account';
import { MainBookStore } from '#ui/pages/main-bookstore';
import { NewPassword } from '#ui/pages/new-password';
import { PageSingInAndUp } from '#ui/pages/page-sing-in-and-up';
import { ResetPassword } from '#ui/pages/reset-password';
import { SelectedBook } from '#ui/pages/selected-book';
import './App.css';
// import { useAppSelector } from '#hooks';
// import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';
import { SearchBook } from '#ui/pages/search-book';
import { useState } from 'react';
import { Favorite } from '#ui/pages/favorite';
import { Response, SeachBooks } from '#features/auth/types';
import { Basket } from '#ui/pages/basket';

export function Root() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (inputValue: string) => {
    setSearchText(inputValue);
  };

  const yourPostObject: SeachBooks = {
    error: 0,
    page: 0,
    total: 0,
    books: [
      {
        title: '',
        subtitle: '',
        isbn13: 0,
        price: '',
        image: null,
        url: null,
      },
    ],
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
            element={
              <PageSingInAndUp
                handleSearch={handleSearch}
                post={yourPostObject}
              />
            }
          />
          <Route
            path="/MainBookStore"
            element={
              <MainBookStore
                handleSearch={handleSearch}
                response={yourResponseObject}
                post={yourPostObject}
              />
            }
          />
          <Route
            path="/books/:isbn13"
            element={
              <SelectedBook
                handleSearch={handleSearch}
                title={yourResponseObject.title}
                post={yourPostObject}
              />
            }
          />
          <Route
            path="/Favorite"
            element={
              <Favorite
                handleSearch={handleSearch}
                response={yourResponseObject}
                post={yourPostObject}
              />
            }
          />
          <Route
            path="/search/:searchResultsText/:page"
            element={
              <SearchBook
                handleSearch={handleSearch}
                searchResultsText={searchText}
                post={yourPostObject}
              />
            }
          ></Route>
          <Route
            path="/Basket"
            element={
              <Basket
                handleSearch={handleSearch}
                response={yourResponseObject}
                post={yourPostObject}
              />
            }
          ></Route>
          <Route
            path="/Account"
            element={
              <Account handleSearch={handleSearch} post={yourPostObject} />
            }
          ></Route>
          <Route
            path="/NewPassword"
            element={
              <NewPassword handleSearch={handleSearch} post={yourPostObject} />
            }
          ></Route>
          <Route
            path="/ResetPassword"
            element={
              <ResetPassword
                handleSearch={handleSearch}
                post={yourPostObject}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Root;
