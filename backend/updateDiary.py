#!/bin/python
import sqlite3
from time import sleep
import asyncio
import sys

conn = sqlite3.connect('diary.db')

async def updateDiaryData():
    newDiary=[sys.argv[1], sys.argv[2]]
    conn.execute('''UPDATE DIARY SET DIARY = ? WHERE DATE = ?''', newDiary)
    conn.commit()

loop = asyncio.get_event_loop()

def main():
    try:
        loop.run_until_complete(updateDiaryData())
    except  KeyboardInterrupt:
        print("Closing station")
    finally: 
        loop.stop()
        loop.close()

if __name__=="__main__":
    main()
    loop.close()
