/*To create this database locally in your system  follow the following steps

	1. Install PostgreSQL locally in your system . Follow the following steps to intsall it if not installed in ubuntu
		1.Open the terminal (Ctrl+Alt+T)
		2. Type $ sudo apt-get update
		3. Type $ sudo apt-get install postgresql postgresql-contrib 
	2. Switch over postgres account on your server by typing 
		$ sudo -i -u postgres
	3. Now access the postgres prompt by typing 
		$ psql

	4.Now create the database 'Transport_Mangement_System' by typing the following command
		CREATE DATABASE transport_management_system ;

	5. Type the following command to connect/select this database
		# \c transport_management_system
	
	6. To Create the relations locallcy in the system run the following queries in your system

	-----------------------------------------------------------------------------------------
	Instead of manually copy-pasting these sql statements you can execute this file your terminal
	After creating the database(After step 4) open the terminal where this file is located

	1. Connect to the relevant database eg.
		sudo -u postgres psql transport_management_system
	2.Then run
		\i database.sql
		\i insert_dummy_val.sql

	\i means execute commands from file

		All commands will be executed
*/ 

/*
DROP DATABASE transport_management_system ;
CREATE DATABASE transport_management_system ;
\c transport_management_system
*/

CREATE TABLE Stu_Per_Data (
	USN VARCHAR PRIMARY KEY NOT NULL,
	Name CHAR(30) NOT NULL,
	Email VARCHAR NOT NULL,
	Parent_name CHAR(30) ,
	Mobile_No VARCHAR NOT NULL,
	Par_Mobile_No VARCHAR ,
	Status boolean NOT NULL DEFAULT false,
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION,
	password VARCHAR 
);

CREATE TABLE USN_UID(
	USN VARCHAR REFERENCES Stu_Per_Data(USN),
	UID Serial NOT NULL PRIMARY KEY,
	UNIQUE (USN, UID)
);


CREATE TABLE Driver (
	Driver_id VARCHAR PRIMARY KEy,
	Driver_name CHAR(50),
	Mobile_No VARCHAR ,
	password VARCHAR
);

CREATE TABLE Bus (
	Bus_no VARCHAR PRIMARY KEY ,
	Capacity INT 
);


CREATE TABLE Bus_Driver(
	Driver_id VARCHAR REFERENCES Driver,
	Bus_no VARCHAR REFERENCES Bus,
	PRIMARY KEY(Driver_id, Bus_no)
);
CREATE TABLE Trip (
	 Route_no INT PRIMARY KEY,
	 No_of_stu INT ,
	 timing TIME,
	 Bus_no VARCHAR REFERENCES Bus(Bus_no),
	 Driver_id VARCHAR REFERENCES Driver (Driver_id),
	 trip_id INT,
	 trip_date DATE,
	 status BOOLEAN DEFAULT FALSE

);

CREATE TABLE Stu_Trip_Data (
	UID Serial REFERENCES USN_UID(uid) PRIMARY KEY NOT NULL ,
	timing TIME ,
	cancelled boolean DEFAULT false,
	changed boolean DEFAULT false,
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION,
	Route_no INT REFERENCES Trip(Route_no)
);


CREATE TABLE Fut_trip(
	trip_id Serial PRIMARY KEY,
	drop_pick boolean ,
	trip_date DATE,
	timing TIME
);

/* drop_pick 1=> from home
			0=> from college
*/


CREATE TABLE Cancel_trip(
	UID Serial REFERENCES USN_UID(UID),
	trip_id Serial REFERENCES Fut_trip(trip_id),
	PRIMARY KEY( UID, trip_id)

);

CREATE TABLE Chan_loc(
	UID Serial REFERENCES USN_UID(UID),
	trip_id Serial REFERENCES Fut_trip(trip_id),
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION,
	PRIMARY KEY(UID, trip_id)

);

CREATE TABLE Chan_time(
	UID Serial REFERENCES USN_UID(UID),
	trip_id Serial REFERENCES Fut_trip(trip_id),
	timing TIME,
	PRIMARY KEY (UID,trip_id)
);


CREATE TABLE College_Loc(
	latitude DOUBLE PRECISION,
	longitude DOUBLE  PRECISION,
	PRIMARY KEY(latitude, longitude)
);
--INSERT INTO College_Loc VALUES (12.9345,77.5345);

