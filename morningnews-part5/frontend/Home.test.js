import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from './components/Header';
import Home from './components/Home';
const fetch = require('node-fetch');

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import bookmarks from './reducers/bookmarks';
import user from './reducers/user';
import hiddenArticles from './reducers/hiddenArticles';

// Mock fetch
const dummyArticlesData = [
  {
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'Test author 1',
    title: 'Test title 1',
    description: 'Test description 1',
    url: 'https://test.com/url1',
    urlToImage: 'https://cdn.vox-cdn.com/thumbor/rtDU7dALLjxGLs-7_Xbon075OgY=/0x358:5000x2976/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23623361/1239951757.jpg',
    publishedAt: '2022-06-13T05:09:57Z',
    content: 'Test description 1',
  },
  {
    source: { id: 'the-verge', name: 'The Verge' },
    author: 'Test author 2',
    title: 'Test title 2',
    description: 'Test description 2',
    url: 'https://test.com/url2',
    urlToImage: 'https://cdn.vox-cdn.com/thumbor/rtDU7dALLjxGLs-7_Xbon075OgY=/0x358:5000x2976/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23623361/1239951757.jpg',
    publishedAt: '2022-06-14T05:09:57Z',
    content: 'Test description 2',
  },
];

beforeAll(() => {
  window.fetch = (url, options) => {
    if (!url.includes('localhost:3000') && !url.includes('127.0.0.1:3000')) {
      return fetch(url, options);
    }

    let mockedRes = {};

    if (!options && url.endsWith('/articles')) {
      mockedRes = { articles: dummyArticlesData };
    }

    return Promise.resolve({ json: () => Promise.resolve(mockedRes) });
  };
});

// Mock FontAwesomeIcon component
jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: (props) => <div data-testid={`FontAwesomeIcon-${props.icon.iconName}`} {...props}></div>,
  };
});

it('Hide article', async () => {
  // Complete copy in case array is modified by the student
  const dummyArticlesDataCopy = [...dummyArticlesData];

  const store = configureStore({ reducer: { bookmarks, user, hiddenArticles } });
  render(<Provider store={store}><Home /></Provider>);

	const title = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].title, 'i'));
	const description = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].description, 'i'));

	expect(title).toBeInTheDocument();
	expect(description).toBeInTheDocument();

  const hideIcon = await screen.findByTestId(`FontAwesomeIcon-eye-slash`);
  fireEvent.click(hideIcon);

  await expect(screen.findByText(new RegExp(dummyArticlesDataCopy[1].title, 'i'))).rejects.toThrow();
  await expect(screen.findByText(new RegExp(dummyArticlesDataCopy[1].description, 'i'))).rejects.toThrow();
});

it('Unhide articles', async () => {
  // Complete copy in case array is modified by the student
  const dummyArticlesDataCopy = [...dummyArticlesData];

  const store = configureStore({ reducer: { bookmarks, user, hiddenArticles } });
  render(<Provider store={store}><Header /><Home /></Provider>);

	const title = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].title, 'i'));
	const description = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].description, 'i'));

	expect(title).toBeInTheDocument();
	expect(description).toBeInTheDocument();

  const hideIcon = await screen.findByTestId(`FontAwesomeIcon-eye-slash`);
  fireEvent.click(hideIcon);

  await expect(screen.findByText(new RegExp(dummyArticlesDataCopy[1].title, 'i'))).rejects.toThrow();
  await expect(screen.findByText(new RegExp(dummyArticlesDataCopy[1].description, 'i'))).rejects.toThrow();

  const unhideIcon = await screen.findByTestId(`FontAwesomeIcon-eye`);
  // fireEvent.click(unhideIcon);

  // const titleAfterUnhide = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].title, 'i'));
  // const descriptionAfterUnhide = await screen.findByText(new RegExp(dummyArticlesDataCopy[1].description, 'i'));

  // expect(titleAfterUnhide).toBeInTheDocument();
  // expect(descriptionAfterUnhide).toBeInTheDocument();
});
