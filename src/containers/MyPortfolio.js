import React, { Component } from 'react'
import Layout from './../components/Layout';
import currencyFormatter from 'currency-formatter'

//pie chart import
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Total Supply',
		'Total Sale',
		'Other Supply'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
            '#E38627',
            '#C13C37',
            '#6A2135'
		]
	}]
};

class MyPortfolio extends Component {

    constructor(props){
        super(props);
        this.state = {
            portfolio: JSON.parse(localStorage.getItem('myPortfolio'))
        }
    }

    render() {
        console.log(this.state);
        const total = this.state.portfolio.reduce((acc,x) => Number(acc) + Number(x.price), 0);
        console.log(total)
        return (
            <Layout>
            <div className="row">
                <div className="col-4">
                <div className="stats-container">
                    <h1 className="mb-0">{currencyFormatter.format(total, {code: 'INR'})}</h1>
                    <p>Total Portfolio Amount</p>
                </div>
                </div>
                <div className="col-8">
                    <div style={{width: '60%', height: '250px', margin: '0 auto'}}>
                        <Pie data={data}
                            width={200}
                            height={200}
                            options={{ maintainAspectRatio: true,
                                        legend: {
                                            display: false,
                                            position: 'top',
                                            labels: {
                                                fontFamily: 'Barlow',
                                                fontSize: 14
                                            }
                                        } 
                                }}   
                        />
                    </div>
                </div>
                </div>
            </Layout>
        )
    }
}

export default MyPortfolio;
