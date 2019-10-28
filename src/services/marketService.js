import { BASE_URL, EXCHANGE_RATES_URL } from '../config';

export async function fetchCapData(){
    var response = await fetch(`https://cors-anywhere.herokuapp.com/${BASE_URL}/cryptocurrency/listings/latest?CMC_PRO_API_KEY=8f002ce6-3925-42fd-9a35-6e973727e08e`)
    var body = await response.json();
    if(body) return body.data
}

export async function fetchExchangeRates(){
    var response = await fetch(`https://cors-anywhere.herokuapp.com/${EXCHANGE_RATES_URL}`)
    var body = await response.json();
    if(body) return body.data
}