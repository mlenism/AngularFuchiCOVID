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
    nombre VARCHAR(80) NOT NULL,
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
    edad SMALLINT NOT NULL,
    PRIMARY KEY (id),
	  CONSTRAINT "FK_TipoID" FOREIGN KEY (id_tipoID) REFERENCES tipoID(id),
	  CONSTRAINT "FK_medico" FOREIGN KEY (id_medico) REFERENCES profesional_salud(id)
);

CREATE TABLE ubicacion_paciente
(
    id_paciente VARCHAR(10) NOT NULL,
    id_barrio SMALLINT NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    latitud NUMERIC(10,8) NOT NULL,
    longitud NUMERIC(10,8) NOT NULL,
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

INSERT INTO universidad VALUES (1, 'Escuela Superior de Administración Pública (ESAP)');
INSERT INTO universidad VALUES (2, 'Universidad Nacional de Colombia (UNAL)');
INSERT INTO universidad VALUES (3, 'Universidad Distrital Francisco José de Caldas');
INSERT INTO universidad VALUES (4, 'Universidad Militar Nueva Granada (UMNG)');
INSERT INTO universidad VALUES (5, 'Universidad Nacional Abierta y a Distancia (UNAD)');
INSERT INTO universidad VALUES (6, 'Universidad Pedagógica Nacional');
INSERT INTO universidad VALUES (8, 'Corporación Universitaria Minuto de Dios');
INSERT INTO universidad VALUES (9, 'Colegio de Estudios Superiores de Administración (CESA)');
INSERT INTO universidad VALUES (10, 'Escuela Colombiana de Ingeniería Julio Garavito');
INSERT INTO universidad VALUES (11, 'Escuela Colombiana de Carreras Industriales (ECCI)');
INSERT INTO universidad VALUES (12, 'Politécnico Grancolombiano');
INSERT INTO universidad VALUES (13, 'Corporación Internacional para el Desarrollo Educativo (CIDE)');
INSERT INTO universidad VALUES (14, 'Corporación Univ. de Ciencia y Tecnología de Colombia');
INSERT INTO universidad VALUES (15, 'Universidad de América');
INSERT INTO universidad VALUES (16, 'Universidad de Ciencias Aplicadas y Ambientales (UDCA)');
INSERT INTO universidad VALUES (17, 'Fundación Universitaria Juan N. Corpas');
INSERT INTO universidad VALUES (18, 'Fundación Universitaria del Área Andina');
INSERT INTO universidad VALUES (19, 'Universidad de la Sabana');
INSERT INTO universidad VALUES (20, 'Corporación Eductiva Alexander Von Humboldt');
INSERT INTO universidad VALUES (21, 'Corporación Unificada Nacional de Educación Superior (CUN)');
INSERT INTO universidad VALUES (22, 'Corporación Universitaria Republicana');
INSERT INTO universidad VALUES (23, 'Corporación Tecnológica de Bogotá');
INSERT INTO universidad VALUES (24, 'Corporación Tecnológica Industrial Colombiana');
INSERT INTO universidad VALUES (25, 'Escuela Militar de Cadetes General José María Córdova');
INSERT INTO universidad VALUES (26, 'Fundación Universitaria Agraria de Colombia (Uniagraria)');
INSERT INTO universidad VALUES (27, 'Fundación Colombo Germana');
INSERT INTO universidad VALUES (28, 'Fundación Universitaria CAFAM');
INSERT INTO universidad VALUES (29, 'Fundación Universitaria Konrad Lorenz');
INSERT INTO universidad VALUES (30, 'Fundación Universitaria Los Libertadores');
INSERT INTO universidad VALUES (31, 'Fundación Universitaria Monserrate');
INSERT INTO universidad VALUES (32, 'Fundación Universitaria Panamericana');
INSERT INTO universidad VALUES (33, 'Fundación Universitaria San Alfonso');
INSERT INTO universidad VALUES (34, 'Fundación Universitaria Sanitas');
INSERT INTO universidad VALUES (35, 'Corporación Universitaria INPAHU');
INSERT INTO universidad VALUES (36, 'Politécnico Internacional');
INSERT INTO universidad VALUES (37, 'Universidad Antonio Nariño (UAN)');
INSERT INTO universidad VALUES (38, 'Universidad Autónoma de Colombia (FUAC)');
INSERT INTO universidad VALUES (39, 'Universidad de San Buenaventura (USB)');
INSERT INTO universidad VALUES (40, 'Universidad Sergio Arboleda');
INSERT INTO universidad VALUES (41, 'Universidad Católica de Pereira (UCP)');
INSERT INTO universidad VALUES (42, 'Universidad Manuela Beltrán (UMB)');
INSERT INTO universidad VALUES (43, 'Universidad Santo Tomás (USTA)');
INSERT INTO universidad VALUES (44, 'Corporación Universitaria Remington');
INSERT INTO universidad VALUES (45, 'Universidad La Gran Colombia');
INSERT INTO universidad VALUES (46, 'Universidad EAN');
INSERT INTO universidad VALUES (47, 'Universidad Incca de Colombia (UNINCCA)');
INSERT INTO universidad VALUES (48, 'Universidad Central');
INSERT INTO universidad VALUES (49, 'Universidad de los Andes');
INSERT INTO universidad VALUES (51, 'Universidad de la Salle');
INSERT INTO universidad VALUES (52, 'Universidad Externado de Colombia');
INSERT INTO universidad VALUES (53, 'Universidad El Bosque');
INSERT INTO universidad VALUES (54, 'Universidad Piloto de Colombia');
INSERT INTO universidad VALUES (55, 'Universidad del Rosario');
INSERT INTO universidad VALUES (56, 'Universidad Católica de Colombia');
INSERT INTO universidad VALUES (58, 'Pontificia Universidad Javeriana');
INSERT INTO universidad VALUES (59, 'Universidad de Bogotá "Jorge Tadeo Lozano"');
INSERT INTO universidad VALUES (61, 'Corporación Politécnico de Cundinamarca');
INSERT INTO universidad VALUES (62, 'Universidad Cooperativa de Colombia (UCC)');
INSERT INTO universidad VALUES (63, 'Universidad del Área Andina');
INSERT INTO universidad VALUES (64, 'Universitaria Agustiniana');
INSERT INTO universidad VALUES (65, 'Universidad de Boyacá');
INSERT INTO universidad VALUES (66, 'Colegio Mayor de Antioquía (COLMAYOR) ');
INSERT INTO universidad VALUES (67, 'Universidad de Antioquia (UDEA) ');
INSERT INTO universidad VALUES (68, 'Universidad del Valle');
INSERT INTO universidad VALUES (69, 'Escuela Nacional del Deporte');
INSERT INTO universidad VALUES (70, 'Institución Universitaria Antonio José Camacho');
INSERT INTO universidad VALUES (71, 'Ctro. I. de Entrenamiento e Inv. Médicas (CIDEIM)');
INSERT INTO universidad VALUES (72, 'Instituto de Bellas Artes');
INSERT INTO universidad VALUES (73, 'UNICATÓLICA Fundación Univ. Católica Lumen Gentium');
INSERT INTO universidad VALUES (74, 'Universidad Autónoma de Occidente (UAO)');
INSERT INTO universidad VALUES (75, 'Universidad del Sinú (UNISINU)');
INSERT INTO universidad VALUES (76, 'Universidad Icesi');
INSERT INTO universidad VALUES (77, 'Universidad Santiago de Cali (USC)');
INSERT INTO universidad VALUES (78, 'Fundación Universitaria San Martín');
INSERT INTO universidad VALUES (79, 'Universidad Central del Valle del Cauca');
INSERT INTO universidad VALUES (80, 'Universidad San Martín');
INSERT INTO universidad VALUES (81, 'Universidad Bautista');
INSERT INTO universidad VALUES (82, 'Universidad Católica Luis Amigó');
INSERT INTO universidad VALUES (83, 'Universidad Libre');
INSERT INTO universidad VALUES (84, 'Universidad Pontificia Bolivariana (UPB) (Palmira)');
INSERT INTO universidad VALUES (85, 'Corporación Universitaria de los Andes');
INSERT INTO universidad VALUES (86, 'Universidad del Cauca');
INSERT INTO universidad VALUES (87, 'Colegio Mayor del Cauca');
INSERT INTO universidad VALUES (88, 'Universidad de Sucre');
INSERT INTO universidad VALUES (89, 'Universidad del Tolima (UT) ');
INSERT INTO universidad VALUES (90, 'Universidad Industrial de Santander (UIS)');
INSERT INTO universidad VALUES (91, 'Universidad de Santander (UDES)');
INSERT INTO universidad VALUES (92, 'Universidad Tecnológica de Pereira (UTP) ');
INSERT INTO universidad VALUES (93, 'Instituto Tecnológico del Putumayo (ITP)');
INSERT INTO universidad VALUES (94, 'Universidad del Quindío');
INSERT INTO universidad VALUES (95, 'Universidad del Magdalena (UNIMAG)');
INSERT INTO universidad VALUES (96, 'Universidad de los Llanos');
INSERT INTO universidad VALUES (97, 'Inst. Nac. de Formación Técnica Profesional de Ciénaga (');
INSERT INTO universidad VALUES (100, 'Universidad Surcolombiana (USCO)');
INSERT INTO universidad VALUES (101, 'Universidad Nacional Abierta y a Distancia (UNAD) (Neiva)');
INSERT INTO universidad VALUES (102, 'Universidad de la Guajira');
INSERT INTO universidad VALUES (103, 'Universidad de Córdoba');
INSERT INTO universidad VALUES (104, 'Universidad Tecnológica del Chocó (UTCH) ');
INSERT INTO universidad VALUES (105, 'Universidad de la Amazonia');
INSERT INTO universidad VALUES (106, 'Universidad de Caldas ');
INSERT INTO universidad VALUES (108, 'Universidad del Atlántico ');
INSERT INTO universidad VALUES (109, 'Universidad de Cartagena');
INSERT INTO universidad VALUES (110, 'Politécnico Colombiano Jaime Isaza Cadavid');

INSERT INTO entidad_de_salud VALUES (1, 'EPS Sura');
INSERT INTO entidad_de_salud VALUES (2, 'Comfenalco valle');
INSERT INTO entidad_de_salud VALUES (3, 'Salud Total');
INSERT INTO entidad_de_salud VALUES (4, 'Emssanar');
INSERT INTO entidad_de_salud VALUES (5, 'Coomeva -christus cinergia-');
INSERT INTO entidad_de_salud VALUES (6, 'Comfandi');
INSERT INTO entidad_de_salud VALUES (7, 'Cafesalud');
INSERT INTO entidad_de_salud VALUES (8, 'Centro Medico Imbanaco');
INSERT INTO entidad_de_salud VALUES (9, 'Fundación Clínica Valle del Lili');
INSERT INTO entidad_de_salud VALUES (10, 'Clínica de Occidente');
INSERT INTO entidad_de_salud VALUES (11, 'Clínica Nuestra');
INSERT INTO entidad_de_salud VALUES (12, 'Clínica Sebastián de Belalcázar');
INSERT INTO entidad_de_salud VALUES (13, 'Cosmitet');
INSERT INTO entidad_de_salud VALUES (14, 'Dirección de Sanidad Policía Nacional');
INSERT INTO entidad_de_salud VALUES (15, 'Clínica Versalles');
INSERT INTO entidad_de_salud VALUES (16, 'Colmedica');
INSERT INTO entidad_de_salud VALUES (17, 'Profamilia');
INSERT INTO entidad_de_salud VALUES (18, 'Red de Salud de la Ladera');
INSERT INTO entidad_de_salud VALUES (19, 'Red de Salud del Centro');
INSERT INTO entidad_de_salud VALUES (20, 'Red de Salud del Norte');
INSERT INTO entidad_de_salud VALUES (21, 'Red de Salud del Oriente');
INSERT INTO entidad_de_salud VALUES (22, 'Red de Salud del Sur-Oriente');
INSERT INTO entidad_de_salud VALUES (23, 'Hospital Geriátrico y Ancianato San Miguel');
INSERT INTO entidad_de_salud VALUES (24, 'Hospital Mario Correa Rengifo');
INSERT INTO entidad_de_salud VALUES (25, 'Hospital Universitario Evaristo Garcia');
INSERT INTO entidad_de_salud VALUES (26, 'Fundación Clínica Infantil Club Noel');

INSERT INTO barrio VALUES (1, 'Terrón Colorado');
INSERT INTO barrio VALUES (2, 'Vista Hermosa');
INSERT INTO barrio VALUES (3, 'Sector Patio Bonito');
INSERT INTO barrio VALUES (4, 'Aguacatal');
INSERT INTO barrio VALUES (5, 'Santa Rita');
INSERT INTO barrio VALUES (6, 'Santa Teresita');
INSERT INTO barrio VALUES (7, 'Arboledas');
INSERT INTO barrio VALUES (8, 'Normandía');
INSERT INTO barrio VALUES (9, 'Juanambú');
INSERT INTO barrio VALUES (10, 'Centenario');
INSERT INTO barrio VALUES (11, 'Granada');
INSERT INTO barrio VALUES (12, 'Versalles');
INSERT INTO barrio VALUES (13, 'San Vicente');
INSERT INTO barrio VALUES (14, 'Santa Mónica');
INSERT INTO barrio VALUES (15, 'Prado del norte');
INSERT INTO barrio VALUES (16, 'La flora');
INSERT INTO barrio VALUES (17, 'La campiña');
INSERT INTO barrio VALUES (18, 'La Paz');
INSERT INTO barrio VALUES (19, 'El Bosque');
INSERT INTO barrio VALUES (20, 'Menga');
INSERT INTO barrio VALUES (21, 'Ciudad Los Alamos');
INSERT INTO barrio VALUES (22, 'Chipichape');
INSERT INTO barrio VALUES (23, 'Brisas de los Alamos');
INSERT INTO barrio VALUES (24, 'Urbanización La Merced');
INSERT INTO barrio VALUES (25, 'Vipasa');
INSERT INTO barrio VALUES (26, 'Urbanización La Flora');
INSERT INTO barrio VALUES (27, 'Altos de Menga');
INSERT INTO barrio VALUES (28, 'Area en desarrollo - Parque del Amor');
INSERT INTO barrio VALUES (29, 'El Nacional');
INSERT INTO barrio VALUES (30, 'El peñón');
INSERT INTO barrio VALUES (31, 'San Antonio');
INSERT INTO barrio VALUES (32, 'San Cayetano');
INSERT INTO barrio VALUES (33, 'Los Libertadores');
INSERT INTO barrio VALUES (34, 'San Juan Bosco');
INSERT INTO barrio VALUES (35, 'Santa Rosa');
INSERT INTO barrio VALUES (36, 'La merced');
INSERT INTO barrio VALUES (37, 'San Pascual');
INSERT INTO barrio VALUES (38, 'El Calvario');
INSERT INTO barrio VALUES (39, 'San Pedro');
INSERT INTO barrio VALUES (40, 'San Nicolas');
INSERT INTO barrio VALUES (41, 'El Hoyo');
INSERT INTO barrio VALUES (42, 'El Piloto');
INSERT INTO barrio VALUES (43, 'Navarro - La Chanca');
INSERT INTO barrio VALUES (44, 'Jorge Isaacs');
INSERT INTO barrio VALUES (45, 'Santander');
INSERT INTO barrio VALUES (46, 'Porvenir');
INSERT INTO barrio VALUES (47, 'Las Delicias');
INSERT INTO barrio VALUES (48, 'Manzanares');
INSERT INTO barrio VALUES (49, 'Salomia');
INSERT INTO barrio VALUES (50, 'Fátima');
INSERT INTO barrio VALUES (51, 'Sultana - Berlín - San Francisco');
INSERT INTO barrio VALUES (52, 'Popular');
INSERT INTO barrio VALUES (53, 'Ignacio Rengifo');
INSERT INTO barrio VALUES (54, 'Guillermo Valencia');
INSERT INTO barrio VALUES (55, 'La Isla');
INSERT INTO barrio VALUES (56, 'Marco Fidel Suárez');
INSERT INTO barrio VALUES (57, 'Evaristo García');
INSERT INTO barrio VALUES (58, 'La Esmeralda');
INSERT INTO barrio VALUES (59, 'Bolivariano');
INSERT INTO barrio VALUES (60, 'Olaya Herrera');
INSERT INTO barrio VALUES (61, 'Unidad Residencial Bueno Madrid');
INSERT INTO barrio VALUES (62, 'Flora Industrial');
INSERT INTO barrio VALUES (63, 'Calima');
INSERT INTO barrio VALUES (64, 'Industria de Licores');
INSERT INTO barrio VALUES (65, 'La Alianza');
INSERT INTO barrio VALUES (66, 'El Sena');
INSERT INTO barrio VALUES (67, 'Los Andes');
INSERT INTO barrio VALUES (68, 'Los Guayacanes');
INSERT INTO barrio VALUES (69, 'Chiminangos Segunda Etapa');
INSERT INTO barrio VALUES (70, 'Chiminangos Primera Etapa');
INSERT INTO barrio VALUES (71, 'Metropolitano del Norte');
INSERT INTO barrio VALUES (72, 'Los Parques - Barranquilla');
INSERT INTO barrio VALUES (73, 'Villa del Sol');
INSERT INTO barrio VALUES (74, 'Paseo de los Almendros');
INSERT INTO barrio VALUES (75, 'Los Andes B - La Riviera');
INSERT INTO barrio VALUES (76, 'Torres de Comfandi');
INSERT INTO barrio VALUES (77, 'Villa del Prado - El guabito');
INSERT INTO barrio VALUES (78, 'San Luís');
INSERT INTO barrio VALUES (79, 'Jorge Eliecer Gaitán');
INSERT INTO barrio VALUES (80, 'Paso del Comercio');
INSERT INTO barrio VALUES (81, 'Los Alcázares');
INSERT INTO barrio VALUES (82, 'Petecuy Primera Etapa');
INSERT INTO barrio VALUES (83, 'Petecuy Segunda Etapa');
INSERT INTO barrio VALUES (84, 'La Rivera Primera Etapa');
INSERT INTO barrio VALUES (85, 'Los Guaduales');
INSERT INTO barrio VALUES (86, 'Petecuy Tercera Etapa');
INSERT INTO barrio VALUES (87, 'Ciudadela Floralia');
INSERT INTO barrio VALUES (88, 'Fonaviemcali');
INSERT INTO barrio VALUES (89, 'San Luís II');
INSERT INTO barrio VALUES (90, 'Urbanización Calimio');
INSERT INTO barrio VALUES (91, 'Sector Puente del Comercio');
INSERT INTO barrio VALUES (92, 'Alfonso López P. 1a. Etapa');
INSERT INTO barrio VALUES (93, 'Alfonso López P. 2a. Etapa');
INSERT INTO barrio VALUES (94, 'Alfonso López P. 3a. Etapa');
INSERT INTO barrio VALUES (95, 'Puerto Nuevo');
INSERT INTO barrio VALUES (96, 'Puerto Mallarino');
INSERT INTO barrio VALUES (97, 'Urbanización El Angel del Hogar');
INSERT INTO barrio VALUES (98, 'Siete de Agosto');
INSERT INTO barrio VALUES (99, 'Los Pinos');
INSERT INTO barrio VALUES (100, 'San Marino');
INSERT INTO barrio VALUES (101, 'Las Ceibas');
INSERT INTO barrio VALUES (102, 'Base Aérea');
INSERT INTO barrio VALUES (103, 'Parque de la Caña');
INSERT INTO barrio VALUES (104, 'Simón Bolivar');
INSERT INTO barrio VALUES (105, 'Fepicol');
INSERT INTO barrio VALUES (106, 'Primitivo Crespo');
INSERT INTO barrio VALUES (107, 'Saavedra Galindo');
INSERT INTO barrio VALUES (108, 'Uribe Uribe');
INSERT INTO barrio VALUES (109, 'Santa Mónica Popular');
INSERT INTO barrio VALUES (110, 'La Floresta');
INSERT INTO barrio VALUES (111, 'Benjamín Herrera');
INSERT INTO barrio VALUES (112, 'Municipal');
INSERT INTO barrio VALUES (113, 'Industrial');
INSERT INTO barrio VALUES (114, 'El Troncal');
INSERT INTO barrio VALUES (115, 'Las Américas');
INSERT INTO barrio VALUES (116, 'Atanasio Girardot');
INSERT INTO barrio VALUES (117, 'Santa Fe');
INSERT INTO barrio VALUES (118, 'Chapinero');
INSERT INTO barrio VALUES (119, 'Villa Colombia');
INSERT INTO barrio VALUES (120, 'El Trébol');
INSERT INTO barrio VALUES (121, 'La Base');
INSERT INTO barrio VALUES (122, 'Urbanización La Nueva Base');
INSERT INTO barrio VALUES (123, 'Alameda');
INSERT INTO barrio VALUES (124, 'Bretaña');
INSERT INTO barrio VALUES (125, 'Junín');
INSERT INTO barrio VALUES (126, 'Guayaquil');
INSERT INTO barrio VALUES (127, 'Aranjuez');
INSERT INTO barrio VALUES (128, 'Manuel María Buenaventura');
INSERT INTO barrio VALUES (129, 'Santa Mónica Belalcázar');
INSERT INTO barrio VALUES (130, 'Belalcázar');
INSERT INTO barrio VALUES (131, 'Sucre');
INSERT INTO barrio VALUES (132, 'Barrio Obrero');
INSERT INTO barrio VALUES (133, 'El Dorado');
INSERT INTO barrio VALUES (134, 'El Guabal');
INSERT INTO barrio VALUES (135, 'La Libertad');
INSERT INTO barrio VALUES (136, 'Santa Elena');
INSERT INTO barrio VALUES (137, 'Las Acacias');
INSERT INTO barrio VALUES (138, 'Santo Domingo');
INSERT INTO barrio VALUES (139, 'Jorge Zawadsky');
INSERT INTO barrio VALUES (140, 'Olímpico');
INSERT INTO barrio VALUES (141, 'Cristóbal Colón');
INSERT INTO barrio VALUES (142, 'La Selva');
INSERT INTO barrio VALUES (143, 'Barrio Departamental');
INSERT INTO barrio VALUES (144, 'Pasoancho');
INSERT INTO barrio VALUES (145, 'Panamericano');
INSERT INTO barrio VALUES (146, 'Colseguro Andes');
INSERT INTO barrio VALUES (147, 'El Recuerdo');
INSERT INTO barrio VALUES (148, 'Aguablanca');
INSERT INTO barrio VALUES (149, 'El Prado');
INSERT INTO barrio VALUES (150, '20 De Julio');
INSERT INTO barrio VALUES (151, 'Prados de Oriente');
INSERT INTO barrio VALUES (152, 'Los Sauces');
INSERT INTO barrio VALUES (153, 'Villa del Sur');
INSERT INTO barrio VALUES (154, 'José Holguín Garcés');
INSERT INTO barrio VALUES (155, 'León XIII');
INSERT INTO barrio VALUES (156, 'José María Córdoba');
INSERT INTO barrio VALUES (157, 'San Pedro Claver');
INSERT INTO barrio VALUES (158, 'Los Conquistadores');
INSERT INTO barrio VALUES (159, 'La Gran Colombia');
INSERT INTO barrio VALUES (160, 'San Benito');
INSERT INTO barrio VALUES (161, 'Primavera');
INSERT INTO barrio VALUES (162, 'Villanueva');
INSERT INTO barrio VALUES (163, 'Asturias');
INSERT INTO barrio VALUES (164, 'Eduardo Santos');
INSERT INTO barrio VALUES (165, 'Alfonso Barberena A.');
INSERT INTO barrio VALUES (166, 'El Paraiso');
INSERT INTO barrio VALUES (167, 'Fenalco Kennedy');
INSERT INTO barrio VALUES (168, 'Nueva Floresta');
INSERT INTO barrio VALUES (169, 'Julio Rincón');
INSERT INTO barrio VALUES (170, 'Doce de Octubre');
INSERT INTO barrio VALUES (171, 'El Rodeo');
INSERT INTO barrio VALUES (172, 'Sindical');
INSERT INTO barrio VALUES (173, 'Bello Horizonte');
INSERT INTO barrio VALUES (174, 'Ulpiano Lloreda');
INSERT INTO barrio VALUES (175, 'El Vergel');
INSERT INTO barrio VALUES (176, 'El Poblado I');
INSERT INTO barrio VALUES (177, 'El Poblado II');
INSERT INTO barrio VALUES (178, 'Los Comuneros Segunda Etapa');
INSERT INTO barrio VALUES (179, 'Ricardo Balcázar');
INSERT INTO barrio VALUES (180, 'Omar Torrijos');
INSERT INTO barrio VALUES (181, 'El Diamante');
INSERT INTO barrio VALUES (182, 'Lleras Restrepo');
INSERT INTO barrio VALUES (183, 'Villa del Lago');
INSERT INTO barrio VALUES (184, 'Los Robles');
INSERT INTO barrio VALUES (185, 'Rodrigo Lara Bonillas');
INSERT INTO barrio VALUES (186, 'Charco Azul');
INSERT INTO barrio VALUES (187, 'Villablanca');
INSERT INTO barrio VALUES (188, 'Calipso');
INSERT INTO barrio VALUES (189, 'Yira Castro');
INSERT INTO barrio VALUES (190, 'Lleras Restrepo II Etapa');
INSERT INTO barrio VALUES (191, 'Marroquín III');
INSERT INTO barrio VALUES (192, 'Los Lagos');
INSERT INTO barrio VALUES (193, 'Sector Laguan del Pondaje');
INSERT INTO barrio VALUES (194, 'El Pondaje');
INSERT INTO barrio VALUES (195, 'Sector Asprosocial-Diamante');
INSERT INTO barrio VALUES (196, 'Alfonso Bonilla Aragón');
INSERT INTO barrio VALUES (197, 'Alirio Mora Beltrán');
INSERT INTO barrio VALUES (198, 'Manuela Beltrán');
INSERT INTO barrio VALUES (199, 'Las Orquídeas');
INSERT INTO barrio VALUES (200, 'José Manuel Marroquín Segunda Etapa');
INSERT INTO barrio VALUES (201, 'José Manuel Marroquín Primera Etapa');
INSERT INTO barrio VALUES (202, 'Puerta del Sol');
INSERT INTO barrio VALUES (203, 'Los Naranjos I');
INSERT INTO barrio VALUES (204, 'Promociones Populares B');
INSERT INTO barrio VALUES (205, 'Los Naranjos II');
INSERT INTO barrio VALUES (206, 'El Retiro');
INSERT INTO barrio VALUES (207, 'Comuneros I');
INSERT INTO barrio VALUES (208, 'Laureano Gómez');
INSERT INTO barrio VALUES (209, 'El Vallado');
INSERT INTO barrio VALUES (210, 'Ciudad Córdoba');
INSERT INTO barrio VALUES (211, 'Mojica');
INSERT INTO barrio VALUES (212, 'El Morichal');
INSERT INTO barrio VALUES (213, 'Mariano Ramos');
INSERT INTO barrio VALUES (214, 'República de Israel');
INSERT INTO barrio VALUES (215, 'Unión de Vivienda Popular');
INSERT INTO barrio VALUES (216, 'Antonio Nariño');
INSERT INTO barrio VALUES (217, 'Brisas del Limonar');
INSERT INTO barrio VALUES (218, 'Área desocupada');
INSERT INTO barrio VALUES (219, 'Ciudad 2000');
INSERT INTO barrio VALUES (220, 'La Alborada');
INSERT INTO barrio VALUES (221, 'La Playa');
INSERT INTO barrio VALUES (222, 'Primero de MAyo');
INSERT INTO barrio VALUES (223, 'Ciudadela Comfandi');
INSERT INTO barrio VALUES (224, 'Ciudad Universitaria');
INSERT INTO barrio VALUES (225, 'Caney');
INSERT INTO barrio VALUES (226, 'Lili');
INSERT INTO barrio VALUES (227, 'Santa Anita - La Selva');
INSERT INTO barrio VALUES (228, 'El Ingenio');
INSERT INTO barrio VALUES (229, 'Mayapan - Las Vegas');
INSERT INTO barrio VALUES (230, 'Las Quintas de Don Simón');
INSERT INTO barrio VALUES (231, 'Ciudad Capri');
INSERT INTO barrio VALUES (232, 'La Hacienda');
INSERT INTO barrio VALUES (233, 'Los Portales - Nuevo Rey');
INSERT INTO barrio VALUES (234, 'Cañaverales - Los Samanes');
INSERT INTO barrio VALUES (235, 'El Limonar');
INSERT INTO barrio VALUES (236, 'Bosques del Limonar');
INSERT INTO barrio VALUES (237, 'El Gran Limonar - Cataya');
INSERT INTO barrio VALUES (238, 'El Gran Limonar');
INSERT INTO barrio VALUES (239, 'Unicentor Cali');
INSERT INTO barrio VALUES (240, 'Ciudadela Pasoancho');
INSERT INTO barrio VALUES (241, 'Prados del Limonar');
INSERT INTO barrio VALUES (242, 'Urbanizacion San Joaquin');
INSERT INTO barrio VALUES (243, 'Buenos Aires');
INSERT INTO barrio VALUES (244, 'Barrio Caldas');
INSERT INTO barrio VALUES (245, 'Los Chorros');
INSERT INTO barrio VALUES (246, 'Meléndez');
INSERT INTO barrio VALUES (247, 'Los Farallones');
INSERT INTO barrio VALUES (248, 'Francisco Eladio Ramirez');
INSERT INTO barrio VALUES (249, 'Prados del Sur');
INSERT INTO barrio VALUES (250, 'Horizontes');
INSERT INTO barrio VALUES (251, 'Mario Correa Rengifo');
INSERT INTO barrio VALUES (252, 'Lourdes');
INSERT INTO barrio VALUES (253, 'Colinas del Sur');
INSERT INTO barrio VALUES (254, 'Alférez Real');
INSERT INTO barrio VALUES (255, 'Nápoles');
INSERT INTO barrio VALUES (256, 'El Jordán');
INSERT INTO barrio VALUES (257, 'Cuarteles Napoles');
INSERT INTO barrio VALUES (258, 'Sector Alto de los Chorros');
INSERT INTO barrio VALUES (259, 'Polvorines');
INSERT INTO barrio VALUES (260, 'Sector Meléndez');
INSERT INTO barrio VALUES (261, 'Sector Alto Jordán');
INSERT INTO barrio VALUES (262, 'Alto Nápoles');
INSERT INTO barrio VALUES (263, 'El Refugio');
INSERT INTO barrio VALUES (264, 'La cascada');
INSERT INTO barrio VALUES (265, 'El Lido');
INSERT INTO barrio VALUES (266, 'Urbanización Tequendama');
INSERT INTO barrio VALUES (267, 'Barrio Eucarístico');
INSERT INTO barrio VALUES (268, 'San Fernando Nuevo');
INSERT INTO barrio VALUES (269, 'Urbanización Nueva Granada');
INSERT INTO barrio VALUES (270, 'Santa Isabel');
INSERT INTO barrio VALUES (271, 'Bellavista');
INSERT INTO barrio VALUES (272, 'San Fernando Viejo');
INSERT INTO barrio VALUES (273, 'Miraflores');
INSERT INTO barrio VALUES (274, '3 de Julio');
INSERT INTO barrio VALUES (275, 'El Cedro');
INSERT INTO barrio VALUES (276, 'Champagnat');
INSERT INTO barrio VALUES (277, 'Urbanización Colseguros');
INSERT INTO barrio VALUES (278, 'Los Cambulos');
INSERT INTO barrio VALUES (279, 'el Mortiñal');
INSERT INTO barrio VALUES (280, 'Urbanización Militar');
INSERT INTO barrio VALUES (281, 'Cuarto de Legua - Guadalupe');
INSERT INTO barrio VALUES (282, 'Neuva Tequendama');
INSERT INTO barrio VALUES (283, 'Camino Real - Joaquín Borrero Sinisterra');
INSERT INTO barrio VALUES (284, 'Camino Real - Los Fundadores');
INSERT INTO barrio VALUES (285, 'Altos de Santa Isabel - La Morelia');
INSERT INTO barrio VALUES (286, 'Santa Barbara');
INSERT INTO barrio VALUES (287, 'Tejares - Cristales');
INSERT INTO barrio VALUES (288, 'Unidad Residencial Santiago de Cali');
INSERT INTO barrio VALUES (289, 'Unidad Residencial El Coliseo');
INSERT INTO barrio VALUES (290, 'Cañaveralejo - Seguros Patria');
INSERT INTO barrio VALUES (291, 'Cañaveral');
INSERT INTO barrio VALUES (292, 'Pampa Linda');
INSERT INTO barrio VALUES (293, 'Sector Cañaveralejo Guadalupe');
INSERT INTO barrio VALUES (294, 'U.D. Alberto Galindo - Plaza de Toros');
INSERT INTO barrio VALUES (295, 'El Cortijo');
INSERT INTO barrio VALUES (296, 'Belisario Caicedo');
INSERT INTO barrio VALUES (297, 'Siloé');
INSERT INTO barrio VALUES (298, 'Lleras Camargo');
INSERT INTO barrio VALUES (299, 'Belén');
INSERT INTO barrio VALUES (300, 'Brisas de Mayo');
INSERT INTO barrio VALUES (301, 'Tierra Blanca');
INSERT INTO barrio VALUES (302, 'Pueblo Joven');
INSERT INTO barrio VALUES (303, 'Carabineros');
INSERT INTO barrio VALUES (304, 'Venezuela - Urbanización Cañaveralejo');
INSERT INTO barrio VALUES (305, 'La Sultana');
INSERT INTO barrio VALUES (306, 'Pizamos I');
INSERT INTO barrio VALUES (307, 'Pizamos II');
INSERT INTO barrio VALUES (308, 'Calimio Desepaz');
INSERT INTO barrio VALUES (309, 'El Remanso');
INSERT INTO barrio VALUES (310, 'Los Líderes');
INSERT INTO barrio VALUES (311, 'Desepaz Invicali');
INSERT INTO barrio VALUES (312, 'Compartir');
INSERT INTO barrio VALUES (313, 'Ciudad Talanga');
INSERT INTO barrio VALUES (314, 'Villamercedes I - Villa Luz - Las Garzas');
INSERT INTO barrio VALUES (315, 'Pizamos III - Las Dalias');
INSERT INTO barrio VALUES (316, 'Potrero Grande');
INSERT INTO barrio VALUES (317, 'Ciudadela del Río');
INSERT INTO barrio VALUES (318, 'Valle Grande');
INSERT INTO barrio VALUES (319, 'Planta de Tratamiento');
INSERT INTO barrio VALUES (320, 'Urbanización Ciudad Jardín');
INSERT INTO barrio VALUES (321, 'Parcelaciones Pance');
INSERT INTO barrio VALUES (322, 'Urbanización Río Lili');
INSERT INTO barrio VALUES (323, 'Ciudad Campestre');
INSERT INTO barrio VALUES (324, 'Club Campestre');

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

INSERT INTO miembro_secretaria_salud VALUES ('1144111111', 'Juan', 'Gonzales', 'password1');
INSERT INTO miembro_secretaria_salud VALUES ('1144222222', 'Andres', 'Lopez', 'password2');
INSERT INTO miembro_secretaria_salud VALUES ('1144333333', 'Felipe', 'Ramirez', 'password3');

INSERT INTO familiar VALUES ('1044111111', 'Diego', 'Guiterrez', '1', 'correo1@gmail.com', '3151111111');
INSERT INTO familiar VALUES ('1044222222', 'Fran', 'Lenis', '2', 'correo2@gmail.com', '3152222222');
INSERT INTO familiar VALUES ('1044333333', 'Sergio', 'Toro', '3', 'correo3@gmail.com', '3153333333');
INSERT INTO familiar VALUES ('1044444444', 'Maria', 'Montes', '4', 'correo4@gmail.com', '3154444444');
INSERT INTO familiar VALUES ('1044555555', 'Adriana', 'Rosales', '5', 'correo5@gmail.com', '3155555555');
INSERT INTO familiar VALUES ('1044666666', 'Bernardo', 'Laprilla', '6', 'correo6@gmail.com', '3156666666');
INSERT INTO familiar VALUES ('1044777777', 'Benjamin', 'Leal', '1', 'correo7@gmail.com', '3157777777');
INSERT INTO familiar VALUES ('1044888888', 'Camilo', 'Dominguez', '2', 'correo8@gmail.com', '3158888888');

INSERT INTO profesional_salud VALUES ('1244111111', 'Arturo', 'Calle', '1', 1, 1, 'password1');
INSERT INTO profesional_salud VALUES ('1244222222', 'Manuel', 'Uribe', '2', 2, 2, 'password2');
INSERT INTO profesional_salud VALUES ('1244333333', 'Alvaro', 'Santos', '3', 1, 1, 'password3');
INSERT INTO profesional_salud VALUES ('1244444444', 'Francisca', 'Arana', '4', 4, 4, 'password4');

INSERT INTO ubicacion_profesional_salud VALUES ('1244111111', 1, 'Cra 1b #50-61');
INSERT INTO ubicacion_profesional_salud VALUES ('1244222222', 2, 'Cra 1c #60-72');
INSERT INTO ubicacion_profesional_salud VALUES ('1244333333', 3, 'Cra 1d #40-83');
INSERT INTO ubicacion_profesional_salud VALUES ('1244444444', 4, 'Cra 1e #30-94');

INSERT INTO paciente VALUES ('1344111111', 'Ana', 'Elias', '1', 1, 'Cali', '1244111111', 25);
INSERT INTO paciente VALUES ('1344222222', 'Laura', 'Diaz', '2', 2, 'Bogota', '1244222222', 25);
INSERT INTO paciente VALUES ('1344333333', 'Socorro', 'Mesias', '3', 2, 'Medellin', '1244333333', 28);
INSERT INTO paciente VALUES ('1344444444', 'Manuel', 'Aristizabal', '4', 3, 'Pereira', '1244444444', 31);

INSERT INTO ubicacion_paciente VALUES ('1344111111', 1, 'Cra 2b #50-61', '3.449960', '-76.510079');
INSERT INTO ubicacion_paciente VALUES ('1344222222', 2, 'Cra 2c #60-72', '3.417473', '-76.536885');
INSERT INTO ubicacion_paciente VALUES ('1344333333', 3, 'Cra 2d #40-83', '3.420687', '-76.505447');
INSERT INTO ubicacion_paciente VALUES ('1344444444', 4, 'Cra 2e #30-94', '3.369205', '-76.529340');

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

INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 36.25, 60, '155/80', 'ninguna', '2020-10-25');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 36.35, 70, '190/90', 'ninguna', '2020-10-28');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 36.45, 65, '178/87', 'ninguna', '2020-10-30');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 36.55, 62, '180/85', 'ninguna', '2020-11-02');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 34.25, 60, '155/80', 'ninguna', '2020-11-03');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 36.35, 70, '190/90', 'ninguna', '2020-11-07');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 30.45, 65, '178/87', 'ninguna', '2020-11-10');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 30.55, 62, '180/80', 'ninguna', '2020-11-11');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 30.25, 60, '155/80', 'ninguna', '2020-11-12');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 30.35, 70, '190/90', 'ninguna', '2020-11-15');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 30.45, 65, '178/80', 'ninguna', '2020-11-18');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 30.55, 62, '180/80', 'ninguna', '2020-11-18');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 30.25, 60, '155/86', 'ninguna', '2020-11-19');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 30.35, 70, '190/96', 'ninguna', '2020-11-19');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 30.45, 65, '178/86', 'ninguna', '2020-11-19');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 30.55, 62, '180/86', 'ninguna', '2020-11-20');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 30.25, 60, '155/88', 'ninguna', '2020-11-25');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 39.35, 70, '190/98', 'ninguna', '2020-11-28');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 39.45, 65, '178/87', 'ninguna', '2020-11-29');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 39.55, 62, '180/87', 'ninguna', '2020-11-30');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344111111', '1244111111', 39.25, 60, '155/88', 'ninguna', '2020-12-01');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344222222', '1244222222', 39.35, 70, '190/98', 'ninguna', '2020-12-02');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344333333', '1244333333', 39.45, 65, '178/88', 'ninguna', '2020-12-03');
INSERT INTO visita(id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones, fecha_registro) VALUES ('1344444444', '1244444444', 39.55, 62, '180/88', 'ninguna', '2020-12-03');

INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 2);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 6);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 6);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 3);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 4);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 6);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 8);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 1);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 9);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 2);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 3);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 9);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 7);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 9);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 7);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 8);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '1', 9);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 7);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('2', '1', 5);
INSERT INTO visita_dosis_diaria(id_laboratorio, id_medicamento, dosis_diaria) VALUES ('1', '2', 7);

-- TRIGGER QUE ACTUALIZA EL STOCK --
CREATE OR REPLACE FUNCTION f_stock_medicamento() RETURNS trigger AS $$
BEGIN 
  IF(TG_OP = 'INSERT') THEN 
    UPDATE laboratorio_medicamento AS labm SET stock = labm.stock - 1 WHERE id_laboratorio = new.id_laboratorio AND id_medicamento = new.id_medicamento;
  END IF;
  IF(TG_OP = 'UPDATE') THEN 
    UPDATE laboratorio_medicamento AS labm SET stock = labm.stock - 1 WHERE id_laboratorio = new.id_laboratorio AND id_medicamento = new.id_medicamento;
	  UPDATE laboratorio_medicamento AS labm SET stock = labm.stock + 1 WHERE id_laboratorio = old.id_laboratorio AND id_medicamento = old.id_medicamento;
  END IF;
  IF(TG_OP = 'DELETE') THEN 
    UPDATE laboratorio_medicamento AS labm SET stock = labm.stock + 1 WHERE id_laboratorio = old.id_laboratorio AND id_medicamento = old.id_medicamento;
  END IF;
  RETURN NULL;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER change_stock AFTER INSERT OR UPDATE OR DELETE ON visita_dosis_diaria
FOR EACH ROW EXECUTE PROCEDURE f_stock_medicamento();

-- FUNCION PARA CREAR UNA VISITA EN UNA SOLA PETICIÓN AL GESTOR DE BASES DE DATOS --
CREATE OR REPLACE FUNCTION f_setVisita(varchar,varchar,numeric,numeric,varchar,varchar,varchar,varchar,numeric) RETURNS integer as $$
DECLARE 
idpaciente ALIAS FOR $1;
idprofesionalsalud alias for $2;
temperatur alias for $3;
pes alias for $4;
presionarterial alias for $5;
observacion alias for $6;
idlaboratorio alias for $7;
idmedicamento alias for $8;
dosisdiaria alias for $9;

BEGIN 
  INSERT INTO visita (id_paciente, id_profesional_salud, temperatura, peso, presion_arterial, observaciones) 
  VALUES (idpaciente, idprofesionalsalud, temperatur, pes, presionarterial, observacion);
  
  INSERT INTO visita_dosis_diaria (id_laboratorio, id_medicamento, dosis_diaria) VALUES (idlaboratorio,idmedicamento,dosisdiaria);
  RETURN 1;
END 
$$ language plpgsql;