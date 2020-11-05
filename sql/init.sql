CREATE TABLE IF NOT EXISTS person (
    userid SERIAL NOT NULL PRIMARY KEY, 
    firstname VARCHAR(30) NOT NULL, 
    lastname VARCHAR(30) NOT NULL, 
    email VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    projectid SERIAL NOT NULL PRIMARY KEY, 
    userid INT NOT NULL, 
    projectname VARCHAR(30) NOT NULL, 
FOREIGN KEY (userid) REFERENCES person (userid) ON DELETE CASCADE 
);