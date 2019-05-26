import sqlite3

conn = sqlite3.connect('weather.db')
print("Opened database successfully")

conn.execute('''CREATE TABLE WEATHER
         (DATE TEXT PRIMARY KEY NOT NULL,
         CLOCK TEXT PRIMARY KEY NOT NULL,
         TEMP REAL NOT NULL,
         PRESS REAL NOT NULL);''')
print("Table created successfully")

conn.close()