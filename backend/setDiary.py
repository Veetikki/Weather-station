import sqlite3
import datetime as dt
from time import sleep
import asyncio
import sys

conn = sqlite3.connect('diary.db')
loop = asyncio.get_event_loop()

def setDiary():
    currentTime = dt.datetime.now()
    data=[currentTime.strftime("%Y-%m-%d"), sys.argv[1]]
    #asyncio.sleep(0.5)    
    conn.execute("INSERT INTO DIARY (DATE, DIARY) \
            VALUES (?, ?)", data)
    conn.commit()

def main():
    try:
        loop.run_until_complete(setDiary())
    except  KeyboardInterrupt:
        print("Closing station")

if __name__=="__main__":
    main()
    loop.close()
    conn.close()
