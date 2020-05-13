import React, {useState} from 'react'
import {InputGroup, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Search() {
  const [ticker, setTicker] = useState("")
  const [tickerResultList, setTickerResultList] = useState([])
  

  let searchTicker = async (e) => {
    let res = await fetch(`/fuzzy?ticker=${ticker}`);
    let json = await res.json();

    let counter = 0;
    if (json) {
    setTickerResultList(json.map(t => {
      counter++;
    return <li key={counter}><Link to={`/stock?ticker=${t[1]}`}>{t[1]}</Link></li>
    }))
  }

    // console.log(tickerResultList)
  }

  return (
    <div>
      <h2>Search for Stocks</h2> <br/>
<InputGroup className="mb-3" onKeyUp={searchTicker}
value={ticker}
onChange={e => setTicker(e.target.value)}>
    <InputGroup.Prepend>
      <InputGroup.Text id="basic-addon1">ticker</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl
      placeholder="Username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>

  <ul>{tickerResultList}</ul>
    </div>
  )
}


