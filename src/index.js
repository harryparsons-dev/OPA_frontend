import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client';
import { client } from "./ApolloClient/client";
const root = ReactDOM.createRoot(
    document.getElementById("root")
  );
  root.render(
    <ApolloProvider client={client}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </ApolloProvider>
  );