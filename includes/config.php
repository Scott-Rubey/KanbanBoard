<?php

session_start(); 

$conn = pg_connect(sprintf('host=127.0.0.1 port=5432 dbname=%s user=%s password=%s',
    'kanban',
    'postgres',
    'cs465psu'
));

if(!$conn) {
    die("Database connection unsuccessful.");
}

?>