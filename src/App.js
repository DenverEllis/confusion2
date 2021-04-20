// External Imports
import {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

// Internal Imports
import Main from './components/MainComponent';
import './App.css';

class App extends Component{
    render() {
		return (
			<div className="App">
				<Main />
			</div>
		);
	}
}

export default App;
