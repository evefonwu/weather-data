import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

// Define cascading styles - source order matters
import "normalize.css";
import "./styles/table-styles.css";
import "./styles/index.css";

// Router
import { BrowserRouter } from "react-router-dom";

// React Apollo Client
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Connect to GraphQL Server at given URI
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Wrap application with ApolloProvide and BrowserRouter
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();