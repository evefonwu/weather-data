-- adapted from Art of Postgres Free chapter https://theartofpostgresql.com/

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
where dateof >= '2020-06-01'
and dateof < '06-30-2020' 
order by dateof;