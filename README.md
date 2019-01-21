# Vote Scraper
This is a simple script which scrapes the Robot Events website to calculate the number of votes accrued by each entry of a given VEX online challenge. By default the script displays votes for the Dell Robotics Team Website Challenge

## Installation
This script requires Node.js to run
[Download Here](https://nodejs.org/en/)

If git is installed on your computer you can install the script with these commands in the command line
```
git clone https://github.com/GreenNick/site-vote-scraper.git
cd site-vote-scraper
npm install
```

## Running
Once everything is installed, the script can be run from the command line in the downloaded folder like so:
```
node app.js
```
The script will take a few seconds to fetch the data. Once this is complete all the entries will printed to console in the order of their vote totals.

## Selecting an Online Challenge
In order to choose an online challenge to check, you must change the URL variable at the top of the app.js file.
By default the variable looks like this:
```
const URL = 'https://challenges.robotevents.com/challenge/95/entry'
```
Change the url in the quotes to the url of the first page of the entry list of whichever challenge you would like to use. Then save the file and run the app as normal.