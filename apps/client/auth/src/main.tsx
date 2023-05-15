import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import '@emotion/react';

const styles = document.createElement('style');
styles.textContent = `
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    color: #333;
  }
`;

document.head.appendChild(styles);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Theme type for emotion
declare module '@emotion/react' {
  export interface Theme {
    primaryColor: string;
    secondaryColor: string;
  }
}
