import xlsxwriter
import pandas as pd
import sys, getopt
#xl = pd.read_excel(excel_file)

def CompareFiles( newFile, oldFile ):
    #dowork
    print(newFile, oldFile)
    pd1 = pd.read_excel(newFile)
    pd2 = pd.read_excel(oldFile)
    print("new result ---1")
    for i in pd1.index:
        x3 = pd2[ pd2['c11']==pd1['c11'][i]]

        if(x3.shape[0] ==0):
            print( "---------",pd1['c11'][i], "---------")
    print("gone result ---2")
    for i in pd2.index:
        x3 = pd1[ pd1['c11']==pd2['c11'][i]]
        if(x3.shape[0] ==0):
            print( "---------",pd2['c11'][i], "---------")
    
    
if __name__ == "__main__":
    CompareFiles(sys.argv[1],sys.argv[2])
    #CompareFiles("house-2018-09-18-084449.xlsx","house-2018-09-19-084327.xlsx")
    # main(sys.argv[1:])