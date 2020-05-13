const path = require('path')
const fs = require('fs');
let fuzzy = require('fuzzyset.js');
let yahooFinance = require('yahoo-finance');
let express = require('express');
let app = express();
let port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'build'))) // serve react app

const tickerSymbolsObject = (() => {
  let symbols = fs.readFileSync('tickerSymbols.txt').toString();

  // clean
  let symbolsObject = symbols.split('\n').map(line => {
    let parts = line.split('\t');
    let ticker = parts[0];
    let company = parts[1];

    return {
      ticker,
      company
    }
  });

  return symbolsObject;
})();

const tickerSymbolsArray = (() => {
  let a = []
  for (let obj of tickerSymbolsObject) {
    a.push(obj.ticker)
  }
  return a;
})();



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/fuzzy', (req, res) => {
  let ticker = req.query.ticker;
  let fuzzySet = fuzzy(tickerSymbolsArray);
  let results = fuzzySet.get(ticker);
  res.json(results)
})

app.get('/stock', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/stockinfo', (req, res) => {
  let ticker = req.query.ticker;

  yahooFinance.quote({
    symbol: ticker,
    modules: ['price', 'summaryDetail'] // see the docs for the full list
  }, function (err, quotes) {
    if (err) {
      console.log(err);
    }

    res.json(quotes);
  });
})

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.get('/a', (req, res) => {
  res.json({
    hey: 'warren'
  });
})

app.listen(port, () => console.log(`🐊 app listening at http://localhost:${port}`))



// This replaces the deprecated snapshot() API
yahooFinance.quote({
  symbol: 'AAPL',
  modules: ['price', 'summaryDetail'] // see the docs for the full list
}, function (err, quotes) {
  // ...
});