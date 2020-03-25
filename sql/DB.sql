--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
  code_dep serial NOT NULL PRIMARY KEY UNIQUE,
  description varchar (255) NOT NULL UNIQUE CHECK (description <> ''),
  year integer NOT NULL
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS positions (
  code_pos serial NOT NULL PRIMARY KEY UNIQUE,
  description varchar (255) NOT NULL UNIQUE CHECK (description <> '')
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS staffs (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE,
  first_name varchar(50) NOT NULL CHECK (first_name <> ''),
  last_name varchar(50) NOT NULL CHECK (last_name <> ''),
  blood_type varchar(10) NOT NULL CHECK (blood_type <> ''),
  code_dep integer NOT NULL REFERENCES departments(code_dep) on update cascade on delete restrict
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  username varchar (20) NOT NULL UNIQUE CHECK (username <> ''),
  password varchar(255) NOT NULL CHECK (password <> ''),
  permission varchar(5) NOT NULL CHECK (permission <> ''),
  CONSTRAINT Checks_permission CHECK (
    permission = 'Admin'
    or permission = 'Edit'
    or permission = 'Read'
  )
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS carnets (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE REFERENCES staffs(cedula) on update cascade on delete cascade,
  date_of_issue date NOT NULL,
  date_of_expiration varchar (20) NOT NULL,
  id_user integer NOT NULL REFERENCES users(id) on update cascade on delete restrict,
  updatedAt date NOT NULL
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS photos (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE REFERENCES staffs(cedula) on update cascade on delete cascade,
  filename varchar (100) NOT NULL CHECK (filename <> ''),
  path varchar (100) NOT NULL CHECK (path <> ''),
  originalname varchar (100) NOT NULL CHECK (originalname <> ''),
  mimetype varchar (100) NOT NULL CHECK (mimetype <> ''),
  size integer NOT NULL
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS racs (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  year integer NOT NULL,
  cedula integer NOT NULL UNIQUE REFERENCES staffs(cedula) on update cascade on delete cascade,
  first_name varchar(50) NOT NULL CHECK (first_name <> ''),
  last_name varchar(50) NOT NULL CHECK (last_name <> ''),
  salary real NOT NULL,
  code_pos integer NOT NULL REFERENCES positions(code_pos) on update cascade on delete restrict,
  code_dep integer NOT NULL REFERENCES departments(code_dep) on update cascade on delete restrict
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS foreign_persons (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE,
  first_name varchar(50) NOT NULL CHECK (first_name <> ''),
  last_name varchar(50) NOT NULL CHECK (last_name <> ''),
  blood_type varchar(10) NOT NULL,
  Department varchar(255) NOT NULL,
  job_title varchar(255) NOT NULL
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS foreign_carnets (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE REFERENCES foreign_persons(cedula) on update cascade on delete cascade,
  date_of_issue date NOT NULL,
  date_of_expiration varchar (20) NOT NULL,
  id_user integer NOT NULL REFERENCES users(id) on update cascade on delete restrict
);
--------------------------------------------------------------
CREATE TABLE IF NOT EXISTS foreign_photos (
  id serial NOT NULL PRIMARY KEY UNIQUE,
  cedula integer NOT NULL UNIQUE REFERENCES foreign_persons(cedula) on update cascade on delete cascade,
  filename varchar (100) NOT NULL CHECK (filename <> ''),
  path varchar (100) NOT NULL CHECK (path <> ''),
  originalname varchar (100) NOT NULL CHECK (originalname <> ''),
  mimetype varchar (100) NOT NULL CHECK (mimetype <> ''),
  size integer NOT NULL
);