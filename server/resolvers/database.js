const { pool } = require("./config");

async function weather(_, { obj }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, name, dateof, maximum_temp, minimum_temp, precipitation, wind_speed, relative_humidity, conditions FROM weather_history`
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows;
  } finally {
    client.release();
  }
}

async function fromStartDate(_, { startDate }) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `
      with computed_data as 
      (
        select id, name,
          cast(dateof as date) as dateof,
          to_char(dateof, 'Dy') as day,
          maximum_temp,
          lag(maximum_temp, 1)
            over (
              partition by extract('isodow' from dateof) 
                order by dateof
            ) as last_week_maximum_temp,
          minimum_temp, precipitation, wind_speed, relative_humidity, conditions
        from weather_history 
      )
      select id, name, dateof, day, maximum_temp,
        case when maximum_temp is not null
          and maximum_temp <> 0
          then round(100.0 * (maximum_temp - last_week_maximum_temp) / maximum_temp, 2)
        end
        as "week_percentage_change",
        minimum_temp, precipitation, wind_speed, relative_humidity, conditions
      from computed_data 
      where dateof >= $1 and dateof < $1 + interval '1 month' order by dateof;        
      `,
      [startDate]
    );
    if (!result.rows || result.rows.length === 0) return [];
    return result.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  weather,
  fromStartDate,
};
