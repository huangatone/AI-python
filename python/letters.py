import random
import datetime
import xlsxwriter




l_s = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
              'U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0']
workbook = xlsxwriter.Workbook('letters.xlsx')

exist_lt = []
def getIndex():    
    s_number = []
    while( len( s_number) < 13 ):
        nm = random.randint(0,31)
        if( s_number.count(nm) ==0 ):
            s_number.append(nm)
    return s_number


def  getLetter(lt):    
    global l_s
    letters = []
    for i in lt:
        letters.append(l_s[i])
    return letters
    

  
    
mmm = getIndex()
mmm.sort()

total = 1000



for i in range(10):
    ss = datetime.datetime.now().strftime("%Y-%m-%d-%H%M%S")
    print(ss)
    print("start ...")
    row = 0
    col = 0  
    worksheet = workbook.add_worksheet()
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
    print("end ...")
    ss = datetime.datetime.now().strftime("%Y-%m-%d-%H%M%S")
    print(ss)


print (mmm)
workbook.close()
print ("Done")
ss = datetime.datetime.now().strftime("%Y-%m-%d-%H%M%S")
print(ss)