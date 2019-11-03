import React from 'react';
import styled from "styled-components";
import './App.css';
import AddNewCard from './components/AddNewCard';
import ListCards from './components/ListCards';
import Panel from './components/Panel';
import { CardsProvider } from './contexts/cards-context';
import { SnackbarProvider } from 'notistack';

const Headline = styled.h3`
  flex: 1 1 100%;
  margin: 2rem 0;
`
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
      <SnackbarProvider 
        maxSnack={3}   
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
        <main>
          <Headline>Credit Card System</Headline>
          <CardsProvider>
            <Panel />
            <AddNewCard />
            <ListCards />
          </CardsProvider>
        </main>
      </SnackbarProvider>
      </header>
    </div>
  );
}

export default App;
