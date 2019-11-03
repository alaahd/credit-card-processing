import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ListCards from './components/ListCards';
import { CardsProvider } from './contexts/cards-context';

import { SnackbarProvider } from 'notistack';


configure({adapter: new Adapter()});


let wrapper;
let useEffect;

beforeEach(() => {
  useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("must render the list of credit cards successfully", async () => {

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 

  const mockSuccessResponse = {
    result: []
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); 
  const mockFetchPromise = Promise.resolve({ 
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); 


  const mockedContext = {cards: [], addNewCard: jest.fn()};
  wrapper = shallow(<SnackbarProvider><CardsProvider value={mockedContext}><ListCards /></CardsProvider></SnackbarProvider>);
  // console.log(wrapper.find('SnackbarProvider'));
  expect(wrapper.find('ListCards').length).toBe(1);
});
