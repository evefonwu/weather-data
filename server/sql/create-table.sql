drop table weather_history;

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
