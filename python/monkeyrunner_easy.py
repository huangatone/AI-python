import sys
from com.android.monkeyrunner import MonkeyRunner, MonkeyDevice
from com.android.monkeyrunner.easy import EasyMonkeyDevice
from com.android.monkeyrunner.easy import By

device = MonkeyRunner.waitForConnection()


dfautotet_path = device.shell('pm path com.sharkversion.rong.dfautotest')
MonkeyRunner.sleep(3.0)  
if dfautotet_path.startswith('package:'):
    print "myapp already installed."
else:
    print "myapp not installed, installing APKs..."
    device.installPackage('dfautotest.apk')

if device:
    #device.startActivity(component='com.weizq/com.zztzt.android.simple.app.MainActivity')
    device.startActivity(component='com.sharkversion.rong.dfautotest/com.sharkversion.rong.dfautotest.LoginActivity')
    print("OK")
    easy_device = EasyMonkeyDevice(device)
    if  not easy_device.visible(By.id('id/editText')):
    	print('Could not find the "all apps" button')
    else:
    	easy_device.type(By.id('id/editText'),'abc')

    text =  easy_device.getText(By.id('id/editText'))
    print(text )
        
    if text.encode('utf-8') == 'abc':
        print "login success"
    else:
        print "login failed"
    easy_device.touch(By.id("id/button"),easy_device.DOWN_AND_UP)  
    MonkeyRunner.sleep(3.0)  
    easy_device = EasyMonkeyDevice(device)
    text =  easy_device.getText(By.id('id/editText2'))
    print(text )
	

else:
	print ("No device")
