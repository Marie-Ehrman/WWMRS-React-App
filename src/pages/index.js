import React, { Component } from 'react';
import '../css/index.css';

import Search from './Search';
import Header from './Header';

export default class index extends Component {





    render() {
        return (
            <div>
                <Header />
                <Search />
            </div>
        )
    }
}
