import ClassModule from "./countryClass.js";

let allCountries_arr = [];
const homeCountries = [
    "israel",
    "united states",
    "france",
    "united kingdom",
    "thailand",
];

export const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}
export const saveAllCountries = (_data) => {
    allCountries_arr = _data;
}

export const createHomeCountries = () => {
    document.querySelector("#id_row").innerHTML = "";
    hideLoading();
    let countries_ar = allCountries_arr.filter(item =>
        homeCountries.includes(item.name.common.toLowerCase())
    )

    let country;
    countries_ar.forEach(item => {
        country = new ClassModule("#id_row", item,getNameByCode,createCountryByCode);
        country.homeRender();
    })

}
export const createCountry = (_input) => {
    document.querySelector("#id_row").innerHTML = "";

    let arr = allCountries_arr.filter( item =>
        item.name.common.toLowerCase().includes(_input.toLowerCase()))

    if (arr.length > 0) {
        let country;
        arr.forEach(item=> {
            country = new ClassModule("#id_row", item,getNameByCode,createCountryByCode);
            country.homeRender();
        });
    } else {
        document.querySelector("#id_row").innerHTML = `<h1 class="text-white w-50 text-center">Country ${_input} is not found</h1>`;
    }
}

export const createCountryByCode = async (_code) => {
    document.querySelector("#id_row").innerHTML = "";
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    let country = new ClassModule("#id_row", data[0],getNameByCode, createCountryByCode);
    country.render();
}



export const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0].name.common;
  }



export const fillSelectBox = () => {
    console.log("dgrs");
    let select = document.querySelector("#id_select_country");
    allCountries_arr.forEach((item) => {
        select.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`;
    });
}


