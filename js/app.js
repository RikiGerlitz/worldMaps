import { fillSelectBox ,saveAllCountries ,createHomeCountries ,showLoading} from "./function.js";
import { declareEvents } from "./events.js";

const init = () => {
    doApi();
    declareEvents()
}




const doApi = async() => {
    showLoading();
   
    let url = `https://restcountries.com/v3.1/all?fields=name,region,population,capital,languages,flags,latlng,cca3,borders,maps`;

    let resp = await fetch(url);
     console.log(resp);
     let data = await resp.json();
     console.log(data);

     saveAllCountries(data);
     fillSelectBox();
     createHomeCountries();

}


init();