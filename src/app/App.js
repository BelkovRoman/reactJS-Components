import React, { Component } from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className='app'>
                <div className='wrapper'>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default App;
