import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PokemonDetails from './components/PokemonDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'pokemon/:pokemonName',
        element: <PokemonDetails />,
      },
    ],
    errorElement: <div data-testid="not-found-page">NOT FOUND 404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>There was an error!</div>}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
