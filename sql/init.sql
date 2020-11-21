CREATE TABLE IF NOT EXISTS person (
    userid SERIAL NOT NULL PRIMARY KEY, 
    alias VARCHAR(100) NOT NULL, 
    email VARCHAR(40) NOT NULL,
    imageurl VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS project (
    projectid SERIAL NOT NULL PRIMARY KEY, 
    userid INT NOT NULL, 
    projectname VARCHAR(30) NOT NULL, 
    modified DATE NOT NULL, 
FOREIGN KEY (userid) REFERENCES person (userid) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS task (
    projectid INT NOT NULL, 
    taskname VARCHAR(50),
    taskdescription VARCHAR(255),
    taskpriority VARCHAR(100) NOT NULL, 
    taskstatus VARCHAR(100) NOT NULL, 
    startdate DATE NOT NULL, 
    enddate DATE NOT NULL, 
FOREIGN KEY (projectid) REFERENCES project (projectid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS collaborators (
    projectid INT NOT NULL, 
    userid INT NOT NULL,  
FOREIGN KEY (projectid) REFERENCES project (projectid) ON DELETE CASCADE,
FOREIGN KEY (userid) REFERENCES person (userid) ON DELETE CASCADE    
);