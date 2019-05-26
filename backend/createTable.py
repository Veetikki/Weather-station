import sqlite3

conn = sqlite3.connect('weather.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE WEATHER
         (DATE TEXT NOT NULL,
         CLOCK TEXT NOT NULL,
         TEMP REAL NOT NULL,
         PRESS REAL NOT NULL,
         PRIMARY KEY (DATE, CLOCK));''')
print("Table created successfully")

conn.close()
