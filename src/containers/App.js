import React, { Component } from 'react';
import debounce from 'lodash.debounce';

import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import CoinList from '../components/CoinList/CoinList';

class App extends Component {
  state = {
    cryptos: [
      {
        symbolPath: this.getIconPath('btc'),
        name: 'Bitcoin',
        acronym: 'BTC',
        price: 8714,
        change: 2.34,
        cap: 147379083734,
        supply: 147379083734,
      },
      {
        symbolPath: this.getIconPath('eth'),
        name: 'Etherum',
        acronym: 'ETH',
        price: 688,
        change: 2.34,
        cap: 67585640793,
        supply: 147379083734,
      },
      {
        symbolPath: this.getIconPath('neo'),
        name: 'NEO',
        acronym: 'NEO',
        price: 84,
        change: 2.34,
        cap: 5515789500,
        supply: 147379083734,
      },
      {
        symbolPath: this.getIconPath('eos'),
        name: 'EOS',
        acronym: 'EOS',
        price: 5,
        change: 2.34,
        cap: 4141934598,
        supply: 147379083734,
      },
    ],
    matchedCryptos: [],
    marketCap: 376097583984,
    searchQuery: '',
  };

  componentWillMount() {
    this.setMatchedCryptos();
  }

  getIconPath(acronym) {
    return `${window.location.origin}/icons/${acronym.toLowerCase()}.png`;
  }

  setMatchedCryptos = debounce(() => {
    const cryptos = [...this.state.cryptos];

    function isMatched(phrase) {
      const regex = new RegExp(`\\b${phrase}.*\\b`, 'i');
      return function(crypto) {
        return Object.values(crypto).some(val => regex.test(val));
      };
    }

    const isMatchedWithSearchQuery = isMatched(this.state.searchQuery);
    const matchedCryptos = cryptos.filter(isMatchedWithSearchQuery);
    this.setState({ matchedCryptos });
  }, 250);

  searchChangedHandler = event => {
    this.setState({ searchQuery: event.target.value }, this.setMatchedCryptos);
  };

  render() {
    return (
      <div>
        <Header cap={this.state.marketCap} />
        <SearchBar
          handleChange={this.searchChangedHandler}
          searchQuery={this.state.searchQuery}
        />
        <CoinList cryptos={this.state.matchedCryptos} />
      </div>
    );
  }
}

export default App;
