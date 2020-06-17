import React from 'react'; 
import {Cards, Charts, CountryPicker} from './components' ;
import styles from './App.module.css'; 
import { fetchData } from './api';
import image from './images/image.png';

import Bottoms from './components/Bottom/bottoms'; 
import GoogleMap from './components/Google/GoogleMap'

class App extends React.Component {
    state = { 
        data: {}, 
        country: '',
    
    }
    async componentDidMount() {
        const fetchedData = await fetchData(); 
        //console.log(data); 
        this.setState({data: fetchedData})
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);
    
        this.setState({ data, country: country });
      }
    
    render(){
        const { data, country } = this.state; 

        return (
            <div className={styles.container}>
                <img className={styles.image} src={image} alt="COVID-19"/>    
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Charts data={data} country={country}/> 
                <GoogleMap/>
                <Bottoms />
            </div>
        ) 
    }
}  

export default App; 



//import Cards from './components/Cards/Cards'; 
//import Charts from './components/Chart/Chart'; 
//import CountryPicker from './components/CountryPicker/CountryPicker'; 


