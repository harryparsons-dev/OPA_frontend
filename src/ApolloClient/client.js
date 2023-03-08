import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const api = process.env.REACT_APP_APIURL;
const token = process.env.REACT_APP_TOKEN;

const httpLink = createHttpLink({
  uri: api + "/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

  //link: ApolloLink.from([httpLink]),
});
