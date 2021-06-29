# HotJar Download Recordings actions as CSV 

HotJar recordings doesn't allow to export actions done by the user during a session;
to see them expanded,one must hover the mouse on them which is less than ideal during analysis

This script solves the problem by creating a CSV file with "action type" and "URL"


## How to Install in Chrome
1. Install the [TamperMonkey extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Once installed, click on the Extension icon and go to the Dashboard
3. Click on "Utilities" tab
4. find the field "Install from URL" 
5. paste the following URL: https://raw.githubusercontent.com/alexrah/userscript_hotjar_export_actions_csv/master/main.js

## How to use
1. log into [HotJar](https://insights.hotjar.com/login)
2. Go to "Recordings" and open an item
3. A botton labelled "Download Actions" should appear on the top right of the screen
4. Click "Actions" tab on the right sidebar
5. Click "Download Actions" to download a CSV with the data.

## Downloaded CSV filename 
the filename is the query string to append to https://insights.hotjar.com/r to match the downloaded data with the recording:

for example filename: _site=2464694&recording=6692080434.csv 
matches the recording URL: https://insights.hotjar.com/r?site=2464694&recording=6692080434


### TODO
add a column with action duration
