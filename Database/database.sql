CREATE TABLE tipoID
(
    id CHAR NOT NULL,
    nombre VARCHAR(35) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreTipoID" UNIQUE (nombre)
);

CREATE TABLE laboratorio
(
    id CHAR NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreLab" UNIQUE (nombre)
);

CREATE TABLE medicamento
(
    id CHAR NOT NULL,
    nombre VARCHAR(16) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreMed" UNIQUE (nombre)
);

CREATE TABLE universidad
(
    id SMALLINT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreUni" UNIQUE (nombre)
);

CREATE TABLE entidad_de_salud
(
    id SMALLINT NOT NULL,
    nombre VARCHAR(70) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreEnt" UNIQUE (nombre)
);

CREATE TABLE barrio
(
    id SMALLINT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT "UC_nombreBar" UNIQUE (nombre)
);

CREATE TABLE miembro_secretaria_salud
(
    id VARCHAR(10) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    contrasenia VARCHAR(25) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE familiar
(
    id VARCHAR(10) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    id_tipoID CHAR NOT NULL,
    email VARCHAR(50) NOT NULL,
    telefono VARCHAR(14) NOT NULL,
    PRIMARY KEY (id),
	  CONSTRAINT "FK_TipoID" FOREIGN KEY (id_tipoID) REFERENCES tipoID(id)
);

CREATE TABLE laboratorio_medicamento
(
    id_laboratorio CHAR NOT NULL,
    id_medicamento CHAR NOT NULL,
    stock SMALLINT NOT NULL,
    PRIMARY KEY (id_laboratorio, id_medicamento),
	  CONSTRAINT "FK_laboratorio" FOREIGN KEY (id_laboratorio) REFERENCES laboratorio(id),
	  CONSTRAINT "FK_medicamento" FOREIGN KEY (id_medicamento) REFERENCES medicamento(id)
);

CREATE TABLE profesional_salud
(
    id VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    id_tipoID CHAR NOT NULL,
    id_universidad SMALLINT NOT NULL,
    id_entidad SMALLINT NOT NULL,
    contrasenia VARCHAR(25) NOT NULL,
    PRIMARY KEY (id),
	  CONSTRAINT "FK_TipoID" FOREIGN KEY (id_tipoID) REFERENCES tipoID(id),
	  CONSTRAINT "FK_universidad" FOREIGN KEY (id_universidad) REFERENCES universidad(id),
	  CONSTRAINT "FK_entidad" FOREIGN KEY (id_entidad) REFERENCES entidad_de_salud(id)
);

CREATE TABLE ubicacion_profesional_salud
(
    id_profesional_salud VARCHAR(10) NOT NULL,
    id_barrio SMALLINT NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_profesional_salud, id_barrio),
	  CONSTRAINT "FK_profesional" FOREIGN KEY (id_profesional_salud) REFERENCES profesional_salud(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	  CONSTRAINT "FK_barrio" FOREIGN KEY (id_barrio) REFERENCES barrio(id)
);

CREATE TABLE paciente
(
    id VARCHAR(10) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    id_tipoID CHAR NOT NULL,
    numeroDeIntegrantes SMALLINT NOT NULL,
    ciudad_contagio VARCHAR(50) NOT NULL,
    id_medico VARCHAR(10) NOT NULL,
    PRIMARY KEY (id),
	  CONSTRAINT "FK_TipoID" FOREIGN KEY (id_tipoID) REFERENCES tipoID(id),
	  CONSTRAINT "FK_medico" FOREIGN KEY (id_medico) REFERENCES profesional_salud(id)
);

CREATE TABLE ubicacion_paciente
(
    id_paciente VARCHAR(10) NOT NULL,
    id_barrio SMALLINT NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    geolocalizacion VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_paciente),
	  CONSTRAINT "FK_paciente" FOREIGN KEY (id_paciente) REFERENCES paciente(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	  CONSTRAINT "FK_barrio" FOREIGN KEY (id_barrio) REFERENCES barrio(id)
);

CREATE TABLE paciente_familiar
(
    id_paciente VARCHAR(10) NOT NULL,
    id_familiar VARCHAR(10) NOT NULL,
    parentesco VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_paciente, id_familiar),
	  CONSTRAINT "FK_paciente" FOREIGN KEY (id_paciente) REFERENCES paciente(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	  CONSTRAINT "FK_familiar" FOREIGN KEY (id_familiar) REFERENCES familiar(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE registro_profesional_salud
(
    id_miembro_secretaria_salud VARCHAR(10) NOT NULL,
    id_profesional_salud VARCHAR(10) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_registro TIME NOT NULL DEFAULT CURRENT_TIME,
    PRIMARY KEY (id_miembro_secretaria_salud, id_profesional_salud),
	  CONSTRAINT "FK_miembro" FOREIGN KEY (id_miembro_secretaria_salud) REFERENCES miembro_secretaria_salud(id),
	  CONSTRAINT "FK_profesional" FOREIGN KEY (id_profesional_salud) REFERENCES profesional_salud(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE registro_paciente
(
    id_miembro_secretaria_salud VARCHAR(10) NOT NULL,
    id_paciente VARCHAR(10) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_registro TIME NOT NULL DEFAULT CURRENT_TIME,
    PRIMARY KEY (id_miembro_secretaria_salud, id_paciente),
	  CONSTRAINT "FK_miembro" FOREIGN KEY (id_miembro_secretaria_salud) REFERENCES miembro_secretaria_salud(id),
	  CONSTRAINT "FK_paciente" FOREIGN KEY (id_paciente) REFERENCES paciente(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE visita
(
    id SERIAL NOT NULL,
    id_paciente VARCHAR(10) NOT NULL,
    id_profesional_salud VARCHAR(10) NOT NULL,
    temperatura REAL NOT NULL,
    peso SMALLINT NOT NULL,
    presion_arterial VARCHAR(10) NOT NULL,
    observaciones VARCHAR(500) NOT NULL,
    fecha_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    hora_registro TIME NOT NULL DEFAULT CURRENT_TIME,
    PRIMARY KEY (id),
	  CONSTRAINT "FK_paciente" FOREIGN KEY (id_paciente) REFERENCES paciente(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	  CONSTRAINT "FK_profesional_salud" FOREIGN KEY (id_profesional_salud) REFERENCES profesional_salud(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE visita_dosis_diaria
(
    id_visita SERIAL NOT NULL,
    id_laboratorio CHAR NOT NULL,
    id_medicamento CHAR NOT NULL,
    dosis_diaria SMALLINT NULL,
    PRIMARY KEY (id_visita),
	  CONSTRAINT "FK_visita" FOREIGN KEY (id_visita) REFERENCES visita(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	  CONSTRAINT "FK_id_laboratorio" FOREIGN KEY (id_laboratorio) REFERENCES laboratorio(id),
	  CONSTRAINT "FK_id_medicamento" FOREIGN KEY (id_medicamento) REFERENCES medicamento(id)
);

INSERT INTO tipoID VALUES ('1', 'cedula de ciudadanía');
INSERT INTO tipoID VALUES ('2', 'cedula extranjera');
INSERT INTO tipoID VALUES ('3', 'numero de identificación personal');
INSERT INTO tipoID VALUES ('4', 'numero de identificación tributaria');
INSERT INTO tipoID VALUES ('5', 'tarjeta de identidad');
INSERT INTO tipoID VALUES ('6', 'pasaporte');

INSERT INTO laboratorio VALUES ('1', 'labo1');
INSERT INTO laboratorio VALUES ('2', 'labo2');
INSERT INTO laboratorio VALUES ('3', 'labo3');
INSERT INTO laboratorio VALUES ('4', 'labo4');

INSERT INTO medicamento VALUES ('1', 'Mixamorranilo300');
INSERT INTO medicamento VALUES ('2', 'Choclometanol800');
INSERT INTO medicamento VALUES ('3', 'Chichanosol800');

INSERT INTO universidad VALUES (1, 'Universidad Nacional de Colombia');
INSERT INTO universidad VALUES (2, 'Universidad de Antioquia');
INSERT INTO universidad VALUES (3, 'Universidad del Valle');
INSERT INTO universidad VALUES (4, 'Universidad de los Andes');
INSERT INTO universidad VALUES (5, 'Universidad Javeriana');
INSERT INTO universidad VALUES (6, 'Universidad Icesi');

INSERT INTO entidad_de_salud VALUES (1, 'EPS Sura');
INSERT INTO entidad_de_salud VALUES (2, 'Comfenalco valle');
INSERT INTO entidad_de_salud VALUES (3, 'Salud Total');
INSERT INTO entidad_de_salud VALUES (4, 'Emssanar');
INSERT INTO entidad_de_salud VALUES (5, 'Coomeva -christus cinergia-');
INSERT INTO entidad_de_salud VALUES (6, 'Comfandi');
INSERT INTO entidad_de_salud VALUES (7, 'Cafesalud');
INSERT INTO entidad_de_salud VALUES (8, 'Centro Medico Imbanaco');
INSERT INTO entidad_de_salud VALUES (9, 'Fundación Clínica Valle del Lili');

INSERT INTO barrio VALUES (1, 'Terrón Colorado');
INSERT INTO barrio VALUES (2, 'Vista Hermosa');
INSERT INTO barrio VALUES (3, 'Sector Patio Bonito');
INSERT INTO barrio VALUES (4, 'Aguacatal');
INSERT INTO barrio VALUES (5, 'Santa Rita');
INSERT INTO barrio VALUES (6, 'Santa Teresita');
INSERT INTO barrio VALUES (7, 'Arboledas');
INSERT INTO barrio VALUES (8, 'Normandía');

INSERT INTO laboratorio_medicamento VALUES ('1', '1', 110);
INSERT INTO laboratorio_medicamento VALUES ('1', '2', 120);
INSERT INTO laboratorio_medicamento VALUES ('1', '3', 130);
INSERT INTO laboratorio_medicamento VALUES ('2', '1', 140);
INSERT INTO laboratorio_medicamento VALUES ('2', '2', 150);
INSERT INTO laboratorio_medicamento VALUES ('2', '3', 160);
INSERT INTO laboratorio_medicamento VALUES ('3', '1', 170);
INSERT INTO laboratorio_medicamento VALUES ('3', '2', 180);
INSERT INTO laboratorio_medicamento VALUES ('3', '3', 190);
INSERT INTO laboratorio_medicamento VALUES ('4', '1', 200);
INSERT INTO laboratorio_medicamento VALUES ('4', '2', 210);
INSERT INTO laboratorio_medicamento VALUES ('4', '3', 220);

INSERT INTO miembro_secretaria_salud VALUES ('1144111111', 'nombre_secretario1', 'apellido_secretario1', 'password1');
INSERT INTO miembro_secretaria_salud VALUES ('1144222222', 'nombre_secretario2', 'apellido_secretario2', 'password2');
INSERT INTO miembro_secretaria_salud VALUES ('1144333333', 'nombre_secretario3', 'apellido_secretario3', 'password3');

INSERT INTO familiar VALUES ('1044111111', 'nombre_familiar1', 'apellido_familiar1', '1', 'correo1@gmail.com', '3151111111');
INSERT INTO familiar VALUES ('1044222222', 'nombre_familiar2', 'apellido_familiar2', '2', 'correo2@gmail.com', '3152222222');
INSERT INTO familiar VALUES ('1044333333', 'nombre_familiar3', 'apellido_familiar3', '3', 'correo3@gmail.com', '3153333333');
INSERT INTO familiar VALUES ('1044444444', 'nombre_familiar4', 'apellido_familiar4', '4', 'correo4@gmail.com', '3154444444');
INSERT INTO familiar VALUES ('1044555555', 'nombre_familiar5', 'apellido_familiar5', '5', 'correo5@gmail.com', '3155555555');
INSERT INTO familiar VALUES ('1044666666', 'nombre_familiar6', 'apellido_familiar6', '6', 'correo6@gmail.com', '3156666666');
INSERT INTO familiar VALUES ('1044777777', 'nombre_familiar7', 'apellido_familiar7', '1', 'correo7@gmail.com', '3157777777');
INSERT INTO familiar VALUES ('1044888888', 'nombre_familiar8', 'apellido_familiar8', '2', 'correo8@gmail.com', '3158888888');

INSERT INTO profesional_salud VALUES ('1244111111', 'nombre_profesional1', 'apellido_profesional1', '1', 1, 1, 'password1');
INSERT INTO profesional_salud VALUES ('1244222222', 'nombre_profesional2', 'apellido_profesional2', '2', 2, 2, 'password2');
INSERT INTO profesional_salud VALUES ('1244333333', 'nombre_profesional3', 'apellido_profesional3', '3', 1, 1, 'password3');
INSERT INTO profesional_salud VALUES ('1244444444', 'nombre_profesional4', 'apellido_profesional4', '4', 4, 4, 'password4');

INSERT INTO ubicacion_profesional_salud VALUES ('1244111111', 1, 'Cra 1b #50-61');
INSERT INTO ubicacion_profesional_salud VALUES ('1244222222', 2, 'Cra 1c #60-72');
INSERT INTO ubicacion_profesional_salud VALUES ('1244333333', 3, 'Cra 1d #40-83');
INSERT INTO ubicacion_profesional_salud VALUES ('1244444444', 4, 'Cra 1e #30-94');

INSERT INTO paciente VALUES ('1344111111', 'nombre_paciente1', 'apellido_paciente1', '1', 1, 'Cali', '1244111111');
INSERT INTO paciente VALUES ('1344222222', 'nombre_paciente2', 'apellido_paciente2', '2', 2, 'Bogota', '1244222222');
INSERT INTO paciente VALUES ('1344333333', 'nombre_paciente3', 'apellido_paciente3', '3', 2, 'Medellin', '1244333333');
INSERT INTO paciente VALUES ('1344444444', 'nombre_paciente4', 'apellido_paciente4', '4', 3, 'Pereira', '1244444444');

INSERT INTO ubicacion_paciente VALUES ('1344111111', 1, 'Cra 2b #50-61', '3°28 02.3 N 76°30 05.8 W');
INSERT INTO ubicacion_paciente VALUES ('1344222222', 2, 'Cra 2c #60-72', '3°27 58.8 N 76°29 37.6 W');
INSERT INTO ubicacion_paciente VALUES ('1344333333', 3, 'Cra 2d #40-83', '3°28 09.2 N 76°29 21.0 W');
INSERT INTO ubicacion_paciente VALUES ('1344444444', 4, 'Cra 2e #30-94', '3°27 33.2 N 76°30 48.6 W');

INSERT INTO paciente_familiar VALUES ('1344111111', '1044111111', 'hermano');
INSERT INTO paciente_familiar VALUES ('1344222222', '1044222222', 'primo');
INSERT INTO paciente_familiar VALUES ('1344222222', '1044333333', 'sobrino');
INSERT INTO paciente_familiar VALUES ('1344333333', '1044444444', 'padre');
INSERT INTO paciente_familiar VALUES ('1344333333', '1044555555', 'madre');
INSERT INTO paciente_familiar VALUES ('1344444444', '1044666666', 'nieto');
INSERT INTO paciente_familiar VALUES ('1344444444', '1044777777', 'abuelo');
INSERT INTO paciente_familiar VALUES ('1344444444', '1044888888', 'tio');

INSERT INTO registro_profesional_salud(id_miembro_secretaria_salud, id_profesional_salud) VALUES ('1144111111', '1244111111');
INSERT INTO registro_profesional_salud(id_miembro_secretaria_salud, id_profesional_salud) VALUES ('1144222222', '1244222222');
INSERT INTO registro_profesional_salud(id_miembro_secretaria_salud, id_profesional_salud) VALUES ('1144333333', '1244333333');
INSERT INTO registro_profesional_salud(id_miembro_secretaria_salud, id_profesional_salud) VALUES ('1144111111', '1244444444');

INSERT INTO registro_paciente(id_miembro_secretaria_salud, id_paciente) VALUES ('1144111111', '1344111111');
INSERT INTO registro_paciente(id_miembro_secretaria_salud, id_paciente) VALUES ('1144222222', '1344222222');
INSERT INTO registro_paciente(id_miembro_secretaria_salud, id_paciente) VALUES ('1144333333', '1344333333');
INSERT INTO registro_paciente(id_miembro_secretaria_salud, id_paciente) VALUES ('1144111111', '1344444444');

INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) VALUES ('1344111111', '1244111111', 36.25, 60, '155/80', 'ninguna');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) VALUES ('1344222222', '1244222222', 36.35, 70, '190/90', 'ninguna');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) VALUES ('1344333333', '1244333333', 36.45, 65, '178/87', 'ninguna');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) VALUES ('1344444444', '1244444444', 36.55, 62, '180/85', 'ninguna');

INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 2);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 6);