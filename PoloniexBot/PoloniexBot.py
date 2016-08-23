import requests
import json
import threading
import os
import ssl
import sys
import numpy as np
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


allBalances = polo.returnCompleteBalances("all")

btcBalance = 0
for currencyBalance in allBalances:    
    btcBalance += Decimal(allBalances [currencyBalance]["btcValue"])

EstimatedHoldings.insert({ "value": btcBalance,
                            "date": datetime.now()}).execute()

start = time.mktime((datetime.now() - timedelta(days=7)).timetuple())
end = time.mktime(datetime.now().timetuple())
chartData = polo.returnChartData('BTC_XMR', start, end, Period.day_1)

a = np.array(chartData[:])
s = a[:,7]
print np.mean(s)

estimatedHoldings = EstimatedHoldings.select()
for e in estimatedHoldings:
    print e.value + ", "  + str(e.date)
    #.strftime('%d, %m %Y') 




