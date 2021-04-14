// External Imports
import {Component} from 'react';

// Internal Imports
import Main from './components/MainComponent';
import { DISHES } from "./shared/dishes";
import './App.css';

class App extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES
		};
	}

    render() {
		return (
			<div className="App">
				<Main />
			</div>
		);
	}
}

export default App;
