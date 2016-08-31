from math import sqrt

data1=[49., 66, 24, 98, 37, 64, 98, 27, 56, 93, 68, 78, 22, 25, 11]

def mean(data):
    return sum(data)/len(data)

print(mean(data1))

data1=[1,2,5,10,-20]
def median(data):
    sdata = sorted(data)
    return sdata[len(data)/2]

print(median(data1))

data1=[1,2,5,10,-20,5,5]
def mode(data):
    m
    c
    for i in range(len(data)):
        if data.count(data[i]) > c:
            c = data.count(data[i])
            m = data[i]
    return m    

print(median(mode))

data3=[13.04, 1.32, 22.65, 17.44, 29.54, 23.22, 17.65, 10.12, 26.73, 16.43]

def variance(data):
    mu = mean(data)
    return(mean([(x-mu)**2 for x in data]))

def stddev(data):
    return sqrt(variance(data))

