import sqlite3
import datetime as dt
from time import sleep
from envirophat import weather
import asyncio

t = dt.datetime.now()
conn = sqlite3.connect('weather.db')

def temp():
    return round(weather.temperature(),4)

def press():
    return round(weather.pressure(unit='hPa'),4)

async def insertData():
    #await asyncio.sleep(3)
    data=[dt.datetime.now(), temp(), press()]
    print(data)
    conn.execute("INSERT INTO WEATHER (TIME,TEMP,PRESS) \
            VALUES (?, ?, ?)", data)
    conn.commit()
    #asyncio.ensure_future(insertData())

loop = asyncio.get_event_loop()

def main():
    try:
        #asyncio.ensure_future(insertData())
        #loop.run_forever()
        loop.run_until_complete(insertData())
    except KeyboardInterrupt:
        print("Closing station")
        loop.close()
        conn.close()

if __name__=="__main__":
    main()
    loop.close()
    conn.close()
