import React, { Component } from 'react'
import Layout from './../components/Layout';

class MyPortfolio extends Component {

    constructor(props){
        super(props);
        this.state = {
            portfolio: JSON.parse(localStorage.getItem('myPortfolio'))
        }
    }

    render() {
        console.log(this.state);
        
        return (
            <Layout>
                my portfolio
            </Layout>
        )
    }
}

export default MyPortfolio;
