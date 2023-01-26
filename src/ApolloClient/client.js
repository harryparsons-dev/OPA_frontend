import { ApolloClient, InMemoryCache } from '@apollo/client';
const api = process.env.REACT_APP_APIURL;




export const client = new ApolloClient({
  uri: api +'/graphql',
  cache: new InMemoryCache(),

  //link: ApolloLink.from([httpLink]),

});
