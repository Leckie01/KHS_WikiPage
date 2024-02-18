import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { data } from '../data';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';

const Title = styled.h1`
  font-size: 2rem;
  padding-bottom: 20px;
  border-bottom: solid 1px #000;
  font-weight: 600;
  margin-top: 30px;
`;

const Content = styled.p`
  margin: 20px 0;
  font-size: 1.25rem;
  line-height: 2.125rem;
`;

const Post = () => {
  let { id } = useParams();

  const [title, setTitle] = useState(data.find((el) => el.id == id)?.title);
  const [content, setContent] = useState(
    data.find((el) => el.id == id)?.content
  );
  const navigate = useNavigate();

  const generateContentLink = () => {
    data.forEach((el) => {
      const isExist = content.includes(el.title);

      if (isExist && el.title !== title) {
        setContent((prev) =>
          prev.replaceAll(
            el.title,
            '<a style="color: #0000EE" href=' +
              `/posts/${el.id}` +
              '>' +
              el.title +
              '</a>'
          )
        );
      }
    });
    // data.find((el) => {

    //   return false;
    // });

    return content;
  };

  useEffect(() => {
    const post = data.find((el) => el.id == id);
    setTitle(post?.title);
    setContent(post?.content);
    generateContentLink();
  }, []);

  return (
    <div>
      <div
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '30px 0',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIosIcon />
        <span style={{ fontSize: '1.125rem', marginTop: '5px' }}>
          목록으로 돌아가기
        </span>
      </div>

      <Title>{title || ''}</Title>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>

      <Link to={`/posts/edit?id=${id}`}>
        <Button
          variant='contained'
          style={{ backgroundColor: '#000', float: 'right' }}
        >
          수정
        </Button>
      </Link>
    </div>
  );
};

export default Post;
