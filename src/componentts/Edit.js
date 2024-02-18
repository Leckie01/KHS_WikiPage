import { Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { data } from '../data';

const TitleInput = styled(Input)`
  margin-top: 30px;
  font-style: 2rem;
  width: 100%;
  height: 100px;
`;

const Content = styled(Input)`
  margin-top: 30px;
  width: 100%;
  text-align: start;
`;

const Edit = () => {
  const [searchParams] = useSearchParams();
  const [postId] = useState(searchParams.get('id'));
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSubmit = () => {
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    } else if (!content) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (
      !window.confirm(`위키 페이지를 ${postId ? '수정' : '등록'}하시겠습니까?`)
    ) {
      return;
    }

    if (postId) {
      let post = data.find((el) => el.id == postId);
      const editIndex = data.findIndex((el, i) => el.id == postId);
      post = {
        ...post,
        title,
        content,
      };
      data.splice(editIndex, 1);
      data.splice(editIndex, 0, post);
    } else {
      const [last] = data.slice(-1);
      const post = {
        id: last.id + 1,
        title,
        content,
      };

      data.push(post);
    }

    navigate('/');
  };

  useEffect(() => {
    if (postId) {
      const post = data.find((el) => el.id == postId);
      console.log(post);
      setTitle(post.title);
      setContent(post.content);
    }
  }, []);

  return (
    <div>
      <TitleInput
        inputProps={{ style: { fontSize: '2rem' } }}
        placeholder='제목을 입력해주세요.'
        size='medium'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Content
        multiline
        inputProps={{ style: { height: '350px', fontSize: '1.25rem' } }}
        placeholder='내용을 입력해주세요.'
        size='medium'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: '30px', float: 'right' }}>
        <Button
          onClick={() => navigate(-1)}
          variant='contained'
          style={{ backgroundColor: '#000' }}
        >
          취소
        </Button>
        <Button
          onClick={onSubmit}
          variant='contained'
          style={{ backgroundColor: '#000', marginLeft: '10px' }}
        >
          {postId ? '수정' : '추가'}
        </Button>
      </div>
    </div>
  );
};

export default Edit;
