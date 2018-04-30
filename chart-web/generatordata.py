# import libraries

from bs4 import BeautifulSoup
import json
import sys
import datetime
#python 3
from urllib.request import urlopen 
#python 2
#import urllib2

import xlsxwriter
import random

ss = datetime.datetime.now().strftime("%Y-%m-%d-%H%M%S")
nn = datetime.datetime.now().strftime("%Y/%m/%d")

workbook = xlsxwriter.Workbook('test-'+ ss+'.xlsx')
#global worksheet
worksheet = workbook.add_worksheet()
print("group","team","date","min", "max" ,"count")

def write_excel( row, g,t,d,n ,range1, range2):
    for i in range(1,n+1):
        worksheet.write(row, 0, g)
        worksheet.write(row, 1, t)
        worksheet.write(row, 2, d)
        worksheet.write(row, 3, str( random.uniform(range1, range2)*100 ) + "%")
        row +=1
    print(g,t,d,range1, range2 ,n)
    return


worksheet.write(0, 0, "Group")
worksheet.write(0, 1, "Team")
worksheet.write(0, 2, "Date")
worksheet.write(0, 3, "Value")
nrow = 48
cur = 1
nn = "4/9/18"

write_excel(cur,"W1594", "Alpha",nn,nrow,0.1,0.5)

cur += nrow

nrow = 36
write_excel(cur,"W1594", "Beta",nn,nrow,0.75,0.8)

cur += nrow

nrow = 18
write_excel(cur,"w541013", "Alpha",nn,nrow,0,0.75)

cur += nrow

nrow =40
write_excel(cur,"w541013", "Beta",nn,nrow,0,0.75)
cur += nrow
write_excel(cur,"W1594", "Beta",nn,nrow,0.8,1)
cur += nrow
write_excel(cur,"w541013", "Alpha",nn,nrow,0.75,0.8)
cur += nrow
write_excel(cur,"w541013", "Beta",nn,nrow,0,0.75)

workbook.close()   