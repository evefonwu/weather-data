-- One month data 

select id, 
  name, 
  dateof, 
  maximum_temp, 
  minimum_temp, 
  precipitation, 
  wind_speed, 
  relative_humidity, 
  conditions 
from weather_history 
where dateof >= '06-01-2020' and dateof < '06-30-2020' 
order by dateof;

-- set variables in application code: 
-- where dateof >= $1 and dateof < $1 + interval '1 month' 
