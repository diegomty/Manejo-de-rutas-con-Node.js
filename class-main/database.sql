CREATE TABLE "students" (
	"expediente" integer PRIMARY KEY NOT NULL,
	"nombre" varchar(100) NOT NULL
);

CREATE TABLE "teachers" (
  "clave" integer PRIMARY KEY NOT NULL,
  "nombre" varchar(100) NOT NULL,
  "grado" varchar(60) NOT NULL
)

ALTER TABLE "class" ADD COLUMN  "teacher_id" 
integer NOT NULL;