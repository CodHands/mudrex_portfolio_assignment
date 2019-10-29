import { BASE_URL, EXCHANGE_RATES_URL, CORS_URL } from '../config';

//fetch coins data
export async function fetchCapData(){
    var response = await fetch(`${CORS_URL}${BASE_URL}cryptocurrency/listings/latest?CMC_PRO_API_KEY=8f002ce6-3925-42fd-9a35-6e973727e08e`)
    var body = await response.json();
    if(body) return body.data
}

//fetch exchange rates
export async function fetchExchangeRates(currency = 'USD'){
    var response = await fetch(`${CORS_URL}${EXCHANGE_RATES_URL}?currency=${currency}`)
    var body = await response.json();
    if(body) return body.data
}