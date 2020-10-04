require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");
const { weather, fromStartDate } = require("./resolvers/database");

const typeDefs = gql`
  type Query {
    weather: [DataPoint]
    fromStartDate(startDate: String!): [DataPoint]
  }

  type DataPoint {
    id: ID!
    name: String!
    dateof: String!
    day: String
    maximum_temp: Float
    minimum_temp: Float
    precipitation: Float
    wind_speed: Float
    relative_humidity: Float
    conditions: String
    week_percentage_change: String
  }
`;

const resolvers = {
  Query: {
    weather,
    fromStartDate,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Database username: ${process.env.USERNAME}`);
  console.log(`Server running at ${url}`);
});

/* Start server and run GraphQL at playground 

Set query variables: 

{
  "startDate": "07-01-2020"
}

Run query: 

query($startDate: String!) {
  fromStartDate(startDate: $startDate) {
    name
    dateof
  }
}
*/
