# models.py
import peewee

database = peewee.SqliteDatabase("polo.db")

########################################################################
class BaseModel(peewee.Model):
    class Meta:
        database = database
        
class Pair(BaseModel):
	"""
	ORM model of the Pair table
	"""
	name = peewee.CharField()
	low24hr = peewee.CharField()
	high24hr = peewee.CharField()
	date = peewee.DateField()

class EstimatedHoldings(BaseModel):
    value = peewee.CharField()
    date = peewee.DateTimeField()

class MyCurrencyPosition(BaseModel):
    currency = peewee.CharField()
    available = peewee.CharField()
    onOrders = peewee.CharField()
    btcValue = peewee.CharField()

class Period:
    min_5 = 300
    min_15 = 900
    min_30 = 1800
    hr_2 = 7200
    hr_4 = 14400
    day_1 = 86400

if __name__ == "__main__":
	try:
		Pair.create_table(True)
	except peewee.OperationalError:
		print "Pair table already exists!"
	try:
		EstimatedHoldings.create_table(True)
	except peewee.OperationalError:
		print "MyPosition table already exists!"
	try:
		MyCurrencyPosition.create_table(True)
	except peewee.OperationalError:
		print "MyCurrencyPosition table already exists!"
