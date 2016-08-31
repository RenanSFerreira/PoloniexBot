from __future__ import division

def mean(oldmean,n,x):
    return ((oldmean*n)+x)/(n+1)

currentmean=10
currentcount=5
new=4

print mean(currentmean,currentcount,new)


def likelihood(dist,data):
    p = 1
    for d in data:
        for t in dist:
            if d == t:
                p = p * dist[t]
    return p
        

tests= [(({'A':0.2,'B':0.2,'C':0.2,'D':0.2,'E':0.2},'ABCEDDECAB'), 1.024e-07),(({'Good':0.6,'Bad':0.2,'Indifferent':0.2},['Good','Bad','Indifferent','Good','Good','Bad']), 0.001728),(({'Z':0.6,'X':0.333,'Y':0.067},'ZXYYZXYXYZY'), 1.07686302456e-08),(({'Z':0.6,'X':0.233,'Y':0.067,'W':0.1},'WXYZYZZZZW'), 8.133206112e-07)]

for t,l in tests:
    if abs(likelihood(*t)/l-1)<0.01: print 'Correct'
    else: print 'Incorrect'