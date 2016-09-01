import requests
import json
import threading
import os
import ssl
import sys
import Queue
import numpy as np
from plotting import *
from datetime import datetime, timedelta, date, time
from threading import Event, Thread
from decimal import Decimal
from BTCHouse_API import *
from models import *
ssl._create_default_https_context = ssl._create_unverified_context

clear = lambda: os.system('cls')

script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
BTCHouse_API_rel_path = "BTCHouse_API.py"
models_rel_path = "models.py"
BTCHouse_API_path = os.path.join(script_dir, BTCHouse_API_rel_path)
models_path = os.path.join(script_dir, models_rel_path)

#Filtro de moedas a trabalhar
minPrice = Decimal(0.00000040)
minVolume = Decimal(0.6)


exec(open(BTCHouse_API_path).read())
exec(open(models_path).read())

ticker = polo.returnTicker()
selectedCurrencies = []

for pair in ticker:
    if Decimal(ticker[pair]["last"]) > minPrice and Decimal(ticker[pair]["baseVolume"]) > minVolume:    
        selectedCurrencies.append(pair)

#recuperar a estimativa de saldo
#allBalances = polo.returnCompleteBalances("all")

#btcBalance = 0
#for currencyBalance in allBalances:    
#    btcBalance += Decimal(allBalances [currencyBalance]["btcValue"])

#EstimatedHoldings.insert({ "value": btcBalance,
#                            "date": datetime.now()}).execute()

#estimatedHoldings = EstimatedHoldings.select()
#for e in estimatedHoldings:
#    print e.value + ", "  + str(e.date)
#    #.strftime('%d, %m %Y') 


start = time.mktime((datetime.now() - timedelta(days=182)).timetuple())
end = time.mktime(datetime.now().timetuple())
charts=[]
volumeList = []
dateList = []

#start_time = time.time()
#for pair in selectedCurrencies:    
#    charts.append(polo.returnChartData(pair, start, end, Period.day_1))
#elapsed_time = time.time() - start_time

#print elapsed_time


start_time = time.time()
exitFlag = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name, q):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.q = q
    def run(self):
        process_data(self.name, self.q)

def process_data(threadName, q):
    while not exitFlag:
        queueLock.acquire()
        if not workQueue.empty():
            data = q.get()
            queueLock.release()
            charts.append(polo.returnChartData(data, start, end, Period.day_1))
        else:
            queueLock.release()

threadList = ["Thread-1", "Thread-2", "Thread-3","Thread-4","Thread-5","Thread-6","Thread-7","Thread-8","Thread-9", "Thread-10", "Thread-11","Thread-12","Thread-13","Thread-14","Thread-15","Thread-16"]
queueLock = threading.Lock()
workQueue = Queue.Queue(110)
threads = []
threadID = 1

# Create new threads
for tName in threadList:
    thread = myThread(threadID, tName, workQueue)
    thread.start()
    threads.append(thread)
    threadID += 1

# Fill the queue
queueLock.acquire()
for pair in selectedCurrencies:
    workQueue.put(pair)
queueLock.release()

# Wait for queue to empty
while not workQueue.empty():
    pass

# Notify threads it's time to exit
exitFlag = 1

# Wait for all threads to complete
for t in threads:
    t.join()


elapsed_time = time.time() - start_time

print elapsed_time
















volumeList = np.full(182, 0.)

for chart in range(len(charts)):
    for item in range(len(charts[chart])):
        volumeList[item] += charts[chart][item]['volume']

for item in charts[0]:
    dateList.append(datetime.fromtimestamp(item['date']).strftime('%d/%m/%Y'))

barplot(dateList,volumeList)





