import express from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 3000;
const users: any[] = [];

const csvFilePath = path.join(__dirname, 'data/CamiTracker.csv');

var count = 0;

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    row.id = count++;
    users.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.get('/tracker', (req, res) => {
  res.json(users);
});

app.get('/tracker/:name', (req, res) => {
    const userName = req.params.name;
    const user = users.filter((u) => u.infractor.toLowerCase() === userName.toLowerCase());
    res.json(user);
});

app.get('/users', (req, res) => {
    const userNames = users.map((u) => u.infractor);
    const uniqueUserNames = [...new Set(userNames)];
    res.json(uniqueUserNames);
});

app.get('/leaderboard', (req, res) => {
    const userNames = users.map((u) => u.infractor);
    const uniqueUserNames = [...new Set(userNames)];
    const leaderboard = uniqueUserNames.map((userName) => {
        const user = users.filter((u) => u.infractor === userName);
        const totalTime = user.reduce((acc, curr) => acc + parseInt(curr.tiempo), 0);
        return {
            userName,
            totalTime
        };
    });
    const sortedLeaderboard = leaderboard.sort((a, b) => b.totalTime - a.totalTime);
    res.json(sortedLeaderboard);
});


app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
