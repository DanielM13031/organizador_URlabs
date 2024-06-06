create table usuarios (
	Nombre Varchar(60) not null,
	Carrera Varchar (70) not null,
	serial_cv integer not null,
	foreign key (serial_cv) references compovault(n_serial) 
);


create table compovault(
	n_serial integer not null primary key
);

create table elemento(
	elemento varchar(250) not null,
	cantidad integer not null,
	e_serial_cv integer not null,
	foreign key (e_serial_cv) references compovault(n_serial)
);