look at handleTermChange   a function of parent componet    
look at onInputChange      a function of child component      
look at onChange           DOM method, or React method?
look at onTermChange       prop


//src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';

class App extends React.Component {
  handleTermChange(term) {
    console.log(term);
  }

  render() {
    return (
      <div>
        <SearchBar onTermChange={this.handleTermChange} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

//the parent component, App, passes it's' method, handleTermChange,
to the child component, Searchbar.



//src/components/SearchBar.js

import React from 'react';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        //this sets the state of the child component.
        this.setState({term});
        //this passes the data to the parent.
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <input onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }
}

export default SearchBar;











