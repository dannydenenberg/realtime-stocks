import React, {useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom';

// TODO: put stock info in variables before in HTML

const pollingIntervalInMilliseconds = 8000;


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function appendPowerOfTenValue (labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));
}

async function  generateStockHTML() {
  let res = await fetch(`/stockinfo${document.location.search}`)
  let json = await res.json();

  let price = json.price;
  let summaryDetail = json.summaryDetail;

  console.log(json);

 return (
      <div>
  <h1>{price.symbol}</h1>
  <span  style={{color: "#909090e6"}}>{price.shortName}</span>
  
  <br/>
  <h3 style={{marginBottom: 0,display: "inline"}}>{numberWithCommas(price.regularMarketPrice.toFixed(2))}</h3>
{ price.regularMarketChange < 0 ? 

    <span style={{paddingLeft: "10px", color: "red"}}>{price.regularMarketChange.toFixed(2)} ({(price.regularMarketChangePercent * 100).toFixed(2)}%)</span>
  
    :

    <span style={{paddingLeft: "10px", color: "green"}}>+{price.regularMarketChange.toFixed(2)} ({(price.regularMarketChangePercent * 100).toFixed(2)}%)</span>

}
  <br/>
  
  <span  style={{color: "#909090e6",fontSize: ".78em"}}>At close: 4:00PM EDT</span>
  <Table responsive>
<tbody>
  <tr>

    <td>Market Cap</td>
    <td><strong>{numberWithCommas(price.marketCap)}</strong></td>

  </tr>
  <tr>

    <td>Previous Close</td>
    <td><strong>{numberWithCommas(summaryDetail.previousClose)}</strong></td>

  </tr>
  <tr>

    <td>Open</td>
    <td><strong>{numberWithCommas(summaryDetail.open)}</strong></td>
 
  </tr>
  <tr>

    <td>Bid</td>
  <td><strong>{numberWithCommas(summaryDetail.bid)} x {summaryDetail.bidSize}</strong></td>
 
  </tr>
  <tr>

    <td>Ask</td>
    <td><strong>{numberWithCommas(summaryDetail.ask)} x {summaryDetail.askSize}</strong></td>
 
  </tr>
  <tr>

<td>Day's Range</td>
<td><strong>{numberWithCommas(summaryDetail.dayLow)} - {numberWithCommas(summaryDetail.dayHigh)}</strong></td>

</tr>
<tr>

<td>52 Week Range</td>
<td><strong>{numberWithCommas(summaryDetail.fiftyTwoWeekLow)} - {numberWithCommas(summaryDetail.fiftyTwoWeekHigh)}</strong></td>

</tr>
<tr>

<td>Beta</td>
<td><strong>{summaryDetail.beta}</strong></td>

</tr>
</tbody>
</Table>
      </div>
    )
}
   







export default function Stock() {
  const [stockInformation, setStockInformation] = useState(null)


  // on mount
  useEffect( () => {
    // get info initially
    (async () =>{
      setStockInformation(await generateStockHTML());
    })()

    // get info every `pollingIntervalInMilliseconds` time 
    const interval = setInterval(() => {  //assign interval to a variaable to clear it
      (async () =>{
        setStockInformation(await generateStockHTML());
      })()
}, pollingIntervalInMilliseconds)

  // importnat 
  return () => clearInterval(interval); //This is important
  }, []) // add an argument of [] to useEffect to stop it from constantly reloading

  return (
    <div>
      <Link to="/">Search</Link>
      {stockInformation}
    </div>
  )
}
