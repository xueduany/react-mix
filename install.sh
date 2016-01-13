#!/bin/sh 
osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\";cd reactnative;npm install;exit;"
end tell

tell application "Terminal"
    do script "npm install;exit;"
end tell

END