import React, { Component } from 'react'
import Layout from './../components/Layout';

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
        
        return (
            <Layout>
                <div style={{width: '250px', height: '250px', margin: '0 auto'}}>
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
            </Layout>
        )
    }
}

export default MyPortfolio;
