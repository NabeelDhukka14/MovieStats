import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import ErrorPage from './Components/ErrorPage';
import MainPage from './Components/MainPage'
import ErrorBoundary from './Components/ErrorBoundary';

const queryClient = new QueryClient();
function App() {

  return (
    <ErrorBoundary fallbackRender={ErrorPage}>
      <QueryClientProvider client={queryClient}>
        <MainPage/>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
