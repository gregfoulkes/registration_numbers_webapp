
drop table towns;
drop table reg_numbers;

create table towns(
	id serial not null primary key,
	town_name text not null,
	town text not null
);

create table reg_numbers(
	id serial not null primary key,
	reg text not null,
	town_tag int not null,
	FOREIGN KEY (town_tag) REFERENCES towns(id)
);
