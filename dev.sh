#!/bin/sh 
osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\";cd reactnative;react-native start;exit;"
end tell

tell application "Terminal"
    do script "cd \"`pwd`\";node react.css.build.js"
end tell

tell application "Terminal"
   	do script "cd \"`pwd`\";webpack -w -d"
end tell

END