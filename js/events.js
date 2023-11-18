import { createCountry ,createCountryByCode,createHomeCountries} from "./function.js";

export const declareEvents = () => {
 
  let search_btn = document.querySelector("#id_search_btn");
  let id_input = document.querySelector("#id_input");
  let id_select = document.querySelector("#id_select_country");
  let id_israel=document.querySelector("#id_israel")
  let id_france=document.querySelector("#id_france")
  let id_thailand=document.querySelector("#id_thailand")
  let id_UK=document.querySelector("#id_UK")
  let id_USA=document.querySelector("#id_USA")
  let id_home = document.querySelector("#id_home")

  id_select.addEventListener("change", () => {
    createCountry(id_select.value);
  })

  id_input.addEventListener("keydown",(e) => {
    console.log(e.key)
    if(e.key == "Enter"){
      createCountry(id_input.value);
     }
  })

  search_btn.addEventListener("click", () => {
    createCountry(id_input.value);
  })

  id_france.addEventListener("click", () => {
     createCountryByCode("FRA")
  })
  id_israel.addEventListener("click", () => {
     createCountryByCode("ISR")
  })
  id_thailand.addEventListener("click", () => {
     createCountryByCode("THA")
  })
  id_UK.addEventListener("click", () => {
     createCountryByCode("GBR")
  })
  id_USA.addEventListener("click", () => {
     createCountryByCode("USA")
  })

  id_home.addEventListener("click",() => {
    createHomeCountries()
  })
  
}