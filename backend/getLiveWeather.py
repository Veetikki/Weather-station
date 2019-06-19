import sqlite3
import datetime as dt
from time import sleep
from envirophat import weather
import json
import asyncio

def temp():
    return round(weather.temperature(),2)

def press():
    return round(weather.pressure(unit='hPa'),2)
    
def getWeather():
    currentTime = dt.datetime.now()
    data=[currentTime.strftime("%Y-%m-%d"), currentTime.strftime("%H:%M") , temp(), press()]
    #asyncio.sleep(0.5)    
    my_json = json.dumps({"DATE": data[0], "CLOCK": data[1], "TEMP": data[2], "PRESS": data[3]})
    return my_json

def main():
    try:
        print(getWeather())
    except  KeyboardInterrupt:
        print("Closing station")

if __name__=="__main__":
    main()
