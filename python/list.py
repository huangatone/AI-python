import xlsxwriter

workbook = xlsxwriter.Workbook('letters_new.xlsx')
#global worksheet
worksheet = workbook.add_worksheet()
row = 0
l_s = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
              'U','V','W','X','Y','Z','1','2','3','4','5']

def writeToFile(lt):
    global worksheet
    global row
    global l_s
    col = 0
    for i in lt:        
        worksheet.write(row, col, l_s[i])
        col +=1
        
    row += 1
    
    
    
def getIndex():    
    s_number = []
    while( len( s_number) < 25 ):
        nm = random.randint(0,30)
        if( s_number.count(nm) ==0 ):
            s_number.append(nm)
    return s_number

def getIndexAll(lt,n):
    for a1 in range(n+1,31):
        lt.append(a1)
        if(len(lt) == 25):
            writeToFile (lt)
            del lt[ len(lt) - 1]
        else:
            getIndexAll(lt,a1)
            
    del lt[ len(lt) - 1]
        
print("start - job")           

lt_25 =  []
for a1 in range(0,31):
    lt_25 =  [a1]
    getIndexAll(lt_25,a1);
    
print (row)
workbook.close()
print("end - job")
