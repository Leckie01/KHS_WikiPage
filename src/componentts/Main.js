import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { data } from '../data';
import { Button, Pagination } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

const Title = styled.h1`
  font-size: 2rem;
  padding-bottom: 20px;
  border-bottom: solid 1px #000;
  font-weight: 600;
  margin-top: 30px;
`;

const Content = styled.main`
  padding: 20px 0;
`;

const ListItem = styled.li`
  padding: 20px 15px;
  font-size: 1.25rem;
  cursor: pointer;

  &:hover {
    color: #555;
    text-decoration: none;
    background-color: #f5f5f5;
  }
`;

const Logo = styled.img`
  height: 3rem;
`;

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [limit] = useState(5);
  const [list, setList] = useState(data);
  const [pagingCount] = useState(Math.ceil(data.length / limit));

  useEffect(() => {
    setList(data.slice((currentPage - 1) * limit, limit * currentPage));
  }, [currentPage]);

  return (
    <div>
      <Title>코딩 허브 강의 위키페이지</Title>
      <Content>
        <ul>
          {list.map((el) => {
            return (
              <Link key={el.id} to={`/posts/${el.id}`}>
                <ListItem>{el.title}</ListItem>
              </Link>
            );
          })}
        </ul>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Pagination
            page={parseInt(currentPage)}
            onChange={(_, page) => {
              searchParams.set('page', page);
              setSearchParams(searchParams);
              setCurrentPage(page);
            }}
            count={pagingCount}
          />
          <Link to='/posts/edit'>
            <Button variant='contained' style={{ backgroundColor: '#000' }}>
              추가
            </Button>
          </Link>
        </div>
      </Content>
    </div>
  );
};

export default Main;
