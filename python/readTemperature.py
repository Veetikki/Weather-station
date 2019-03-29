import sqlite3
import datetime as dt
from time import sleep
from envirophat import light, weather, motion, analog, leds
import signal, asyncio

t = dt.datetime.now()
conn = sqlite3.connect('weather.db')

def temp():
    return round(weather.temperature(),4)

def press():
    return weather.pressure(unit='hPa')

async def insertData():
    await asyncio.sleep(2)
    data=[dt.datetime().now(), temp(), press()]
    conn.execute("INSERT INTO WEATHER (DATE,TEMP,PRESS) \
      VALUES (?, ?, ?)", data)


loop = asyncio.get_event_loop()

def main():
    try:
        asyncio.ensure_future(insertData())
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        print("Closing station")
        loop.close()

if __name__ == "__main__":
	main()


