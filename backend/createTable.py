import sqlite3

conn = sqlite3.connect('weather.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE WEATHER
         (DATE TEXT NOT NULL,
         CLOCK TEXT NOT NULL,
         TEMP REAL NOT NULL,
         PRESS REAL NOT NULL,
         PRIMARY KEY (DATE, CLOCK),
         FOREIGN KEY (DATE) REFERENCES DIARY(DATE));''')
print("Table Weather created successfully")

conn.execute('''CREATE TABLE DIARY
         (DATE TEXT NOT NULL,
         DIARY TEXT NOT NULL,
         PRIMARY KEY (DATE));''')
print("Table Diary created successfully")
conn.close()
