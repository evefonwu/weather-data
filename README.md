# Weather-Data

A simple weather data display by month with weekly changes in percentage for maximum temperature of each day

User interface:

- Select month for weather data

- Display table view

- Display grid view with icons

SQL in application code:

- Get exact dataset defined by date range of a month

- Compute week over week percentage change on maximum temperature

with React, GraphQL, Apollo, PostgreSQL, Node

## Installation

#### Install Postgres

Download and install [Postgres](https://www.postgresql.org/download/)

Note credentials and name you choose for it during installation

For example, you named it 'local-db' at installation

#### Store your database credentials

Create a .env file at the root directory of the server folder to store your database credentials

Open up pgAdmin, that came with the Postgres installation

Double-click 'local-db' and create a database under it named 'dev'

The example .env file would be:

```bash
HOST=localhost
PORT=5432
DB_NAME=dev
USERNAME=postgres
PASSWORD=yourpassword
```

#### Create table

Run the following in pgAdmin to create the table to import weather data into with matching columns

```sql
CREATE TABLE IF NOT EXISTS weather_history
(
	id serial not null primary key,
	name varchar(36) not null,
	dateof timestamp not null,
	maximum_temp numeric(5,2),
	minimum_temp numeric(5,2),
	temp numeric(5,2),
	wind_chill numeric(5,2),
	heat_index numeric(5,2),
	precipitation numeric(5,2),
	snow_depth numeric(5,2),
	wind_speed numeric(5,2),
	wind_gust numeric(5,2),
	visibility numeric(5,2),
	cloud_cover numeric(5,2),
	relative_humidity numeric(5,2),
	conditions varchar(36)
);

```

#### Import data from CSV file

Locate sample weather data at
./server/csv/visual_crossing_weather_ny.csv

Weather data is from [Visual Crossing Weather Data](https://www.visualcrossing.com/weather-data)

Import CSV with pgAdmin with [postgresqltutorial](https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/)

#### Install node project dependencies

```bash
cd server
npm install
```

#### Client-side installation

Install React application dependencies

```
npm install
```

## Usage

Start the server. Once the server starts, you should see the GraphQL playground running at http://localhost:4000

```bash
cd server
npx nodemon ./graphql.js
```

Start the React application

```bash
npm start
```

## Troubleshot

Cannot connect to database

- Make sure the .env file is at the root directory of the server folder

Problem importing CSV file

- Is the 'id' column unchecked? From the 'Columns' tab of the 'Import/Export' dialog box in pgAdmin, uncheck the 'id' column. Import starts from column 'name'. There is no 'id' column in the CSV. More on importing CSV file into Postgres from [postgrestutorial](https://www.postgresqltutorial.com/import-csv-file-into-posgresql-table/)

Problem writing client gql query

- Check gql query syntax on the playground. Check the arguments into gql query variables are coming from local variables, React state or props?

Problem writing SQL queries

- Try using a SQL notepad or the scratch pad in pgAdmin to build up your queries. More on SQL from [artofpostgresql](https://theartofpostgresql.com/)

- Check the resultset with each iteration of SQL code and start with constant strings. Replace constant strings later with variables in application code

## Roadmap

- Add weather data from other cities ?
- Add weather forecasts ?
- Different analytics queries ?

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
