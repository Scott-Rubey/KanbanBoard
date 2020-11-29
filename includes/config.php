<?php

session_start(); 

$conn = pg_connect(sprintf("host='/cloudsql/cs465fullstackkanban:us-west1:cs465fullstackkanban' dbname=%s user=%s password=%s",
    'kanban',
    'postgres',
    'cs465psu'
));

if(!$conn) {
    die("Database connection unsuccessful.");
}
?>