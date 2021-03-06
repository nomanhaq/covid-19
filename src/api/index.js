import axios from 'axios'; 

const url = 'https://covid19.mathdro.id/api'; 

export const fetchData = async(country) => {
    let changeableUrl = url; 
    if (country){
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        //const {data: {confirmed, deaths, lastUpdate, recovered}} = await axios.get(url); 
        const {data: {confirmed, deaths, lastUpdate, recovered}} = await axios.get(changeableUrl); 
        //const modifiedData = {confirmed, deaths, lastUpdate, recovered}
        
        return {confirmed, deaths, lastUpdate, recovered}; 
        
    } catch (error) {
        console.log(error); 

    }
}

export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);
  
      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
      return error;
    }
  };

  export const fetchCountries = async () => {
      try {
        const {data : {countries}} = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name);  

      } catch (error) {

      }
  }