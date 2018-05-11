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
print("group","Sector","date","min", "max" ,"count")

curIndex = 1

def write_excel( row, g,t,d,n ,range1, range2):
    global curIndex
    for i in range(1,n+1):
        worksheet.write(curIndex, 0, g)
        worksheet.write(curIndex, 1, t)
        worksheet.write(curIndex, 2, d)
        worksheet.write(curIndex, 3, str( random.uniform(range1, range2)*100 ) )
        curIndex +=1
    print(g,t,d,range1, range2 ,n)
    return


worksheet.write(0, 0, "Group")
worksheet.write(0, 1, "Team")
worksheet.write(0, 2, "Date")
worksheet.write(0, 3, "Value")
nrow = 15
cur = 1
nn = "4/9/18"

write_excel(cur,"W1594", "Alpha",nn,nrow,0.1,0.75)
write_excel(cur,"W1594", "Gamma",nn,nrow,0.1,0.75)
write_excel(cur,"W1594", "Gamma",nn,nrow,0.7,0.9)

nrow = 36
write_excel(cur,"W1594", "Beta",nn,nrow,0.75,0.8)

nrow = 18
write_excel(cur,"w541013", "Alpha",nn,nrow,0,0.75)
write_excel(cur,"w541013", "Gamma",nn,nrow,0.1,0.75)
write_excel(cur,"w541013", "Gamma",nn,nrow,0.7,0.9)

nrow =40
write_excel(cur,"w541013", "Beta",nn,nrow,0,0.75)

write_excel(cur,"W1594", "Alpha",nn,nrow,0.75,0.8)

write_excel(cur,"W1594", "Beta",nn,nrow,0.8,1)

write_excel(cur,"w541013", "Alpha",nn,nrow,0.75,0.8)

write_excel(cur,"w541013", "Beta",nn,nrow,0,0.75)


workbook.close()   