import random

import xlsxwriter
import random


l_s = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
              'U','V','W','X','Y','Z','1','2','3','4','5']
workbook = xlsxwriter.Workbook('letters.xlsx')
worksheet = workbook.add_worksheet()
exist_lt = []
def getIndex():    
    s_number = []
    while( len( s_number) < 20 ):
        nm = random.randint(0,30)
        if( s_number.count(nm) ==0 ):
            s_number.append(nm)
    return s_number


def  getLetter(lt):    
    global l_s
    letters = []
    for i in lt:
        letters.append(l_s[i])
    return letters
    

row = 0
col = 0    
    
mmm = getIndex()
mmm.sort()

total = 100000

while( row < total):
    lt_index = getIndex()
    s_lt = list(lt_index)
    s_lt.sort()
    if( exist_lt.count(s_lt) >0):
        continue
    exist_lt.append(s_lt)
    col = 0
    for i in lt_index:        
        worksheet.write(row, col, l_s[i])
        col +=1
    #print(row)    
    row +=1
print (mmm)
workbook.close()
print ("Done")