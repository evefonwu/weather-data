import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { format } from "date-fns";
import Conditions from "./Conditions";

const FROM_START_DATE_QUERY = gql`
  query FromStartDate($startDate: String!) {
    fromStartDate(startDate: $startDate) {
      id
      name
      dateof
      day
      maximum_temp
      minimum_temp
      precipitation
      wind_speed
      relative_humidity
      conditions
      week_percentage_change
    }
  }
`;

function Weather() {
  const [startDate, setStartDate] = useState("07-01-2020");
  const [isGrid, setIsGrid] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setStartDate(event.target.value);
  };

  const toggleGrid = () => {
    setIsGrid((prev) => !prev);
  };

  return (
    <div>
      <div className="month-selection">
        <div>
          <h3 className="section-title">Choose a month for weather data</h3>
          <select name="month-menu" value={startDate} onChange={handleChange}>
            <option value="06-01-2020">June 2020</option>
            <option value="07-01-2020">July 2020</option>
            <option value="08-01-2020">August 2020</option>
          </select>
          <div onClick={toggleGrid} className="toggle">
            {isGrid ? "Table view" : "Grid view"}
          </div>
        </div>
      </div>

      <Query query={FROM_START_DATE_QUERY} variables={{ startDate }}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
          return (
            <div className="container">
              {isGrid ? (
                <div className="weather-container">
                  {data.fromStartDate.map((dataPoint) => (
                    <div key={dataPoint.id} className="weather-item">
                      {/* format: July 2nd */}
                      {
                        <div className="weather-date">
                          {format(
                            new Date(parseInt(dataPoint.dateof)),
                            "MMMM do"
                          )}
                        </div>
                      }
                      <div className="temp max">{dataPoint.maximum_temp}</div>
                      <div className="temp min">{dataPoint.minimum_temp}</div>
                      <div className="weather-conditions">
                        <Conditions description={dataPoint.conditions} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Day</th>
                      <th>Max temp</th>
                      <th>Max temp weekly change %</th>
                      <th>Min temp</th>
                      <th>Precipitation</th>
                      <th>Wind Speed</th>
                      <th>Relative Humidity</th>
                      <th>Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.fromStartDate.map((dataPoint) => (
                      <tr key={dataPoint.id}>
                        <td>{dataPoint.name}</td>
                        {/* format: 7/2/2020 */}
                        <td>
                          {format(
                            new Date(parseInt(dataPoint.dateof)),
                            "M/d/yyyy"
                          )}
                        </td>
                        <td>{dataPoint.day}</td>
                        <td>{dataPoint.maximum_temp}</td>
                        <td>
                          {dataPoint.week_percentage_change
                            ? `${dataPoint.week_percentage_change} %`
                            : "N/A"}
                        </td>
                        <td>{dataPoint.minimum_temp}</td>
                        <td>{dataPoint.precipitation}</td>
                        <td>{dataPoint.wind_speed}</td>
                        <td>{dataPoint.relative_humidity}</td>
                        <td>{dataPoint.conditions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
}

export default Weather;
