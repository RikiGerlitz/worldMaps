export default class CountryClass {
    constructor(_parent, _item,  getNameByCode, createCountryByCode) {
        this.getNameByCode = getNameByCode;
        this.createCountryByCode = createCountryByCode;
        this.parent = _parent;
        this.name = _item.name.common;
        this.population = _item.population.toLocaleString();
        this.capital = _item.capital ? _item.capital : "none";
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        this.flag = _item.flags.png;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
        this.countryCode = _item.cca3;
        this.borders = _item.borders;
        this.map = _item.maps.googleMaps;
        this.region = _item.region;
    }
    render() {
        let div1 = document.createElement("div");
        document.querySelector(this.parent).className = "row "
        div1.className = "d-flex text-center justify-content-center ";
        document.querySelector(this.parent).append(div1);


        div1.innerHTML += `
        <div class="row w-75 bigBox" data-aos="fade-up-right" data-aos-duration="1000">
            <div class="col-xl-6 p-4 text-white">
                <h2 class="m-3 fw-bold">${this.name}</h2>
                        <table class="table table-striped table-light">
                        <tbody>
                        <tr>
                        <th scope="row">Population: </th>
                        <td> ${this.population}</td>
                        </tr>
                        <tr>
                        <th scope="row">Region: </th>
                        <td> ${this.region}</td>
                        </tr>  
                        <tr>
                        <th scope="row">Capital: </th>
                        <td> ${this.capital}</td>
                        </tr>  
                        <tr>
                        <th scope="row">Languages: </th>
                        <td> ${this.languages}</td>
                    </tr>  
                    <tr>
                    <th scope="row">Borders:   </th>
                    <td id="id_borders"></td>
                    </tr>   
                        </tbody>
                    </table>
                <img src="${this.flag}" width="100%"  alt="${this.name}_flag" >
            </div>
            <div class="col-xl-6 p-4 ">
                <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=en&z=7&amp;output=embed">
                </iframe>
            </div>
        </div>`;


        if (this.borders.length>0) {
            
            this.borders.forEach(async (item, i) => {
                let fullName = await this.getNameByCode(item);
                console.log(fullName);
                let span = document.createElement("a");
                span.innerHTML += `${fullName}`
                span.style.cursor = "pointer"
                document.querySelector("#id_borders").append(span);
                
                span.addEventListener("click",async () => {
                    console.log("sa");
                    document.querySelector(this.parent).innerHTML="";
                    await this.createCountryByCode(item);
                });

                if (i < this.borders.length - 1) {
                   span.innerHTML += ", ";
                }
                else {
                    span.innerHTML += ".";
                }
            }) 
        }
        else {
            let id_borders = document.querySelector("#id_borders")
            id_borders.innerHTML = "none";
        }


    }


    homeRender() {
        let mydiv = document.createElement("div");
        mydiv.className = "d-flex justify-content-center my-3 text-center";
        document.querySelector(this.parent).append(mydiv);
        document.querySelector(this.parent).className = "row row-cols-lg-3 row-cols-md-2 justify-content-around"
        mydiv.innerHTML += `
        <div class="card box h-100 border-0 " data-aos="flip-up" data-aos-duration="1000">
        <img src="${this.flag}" class="imgS shadow " width="100%" alt="${this.name}_flag">
        <p class="fSize  m-0 p-3">Name: ${this.name} </p>
        </div>`;

        mydiv.querySelector(".box").addEventListener("click", () => {
            document.querySelector("#id_row").innerHTML = "";
            this.render();
        })
    }

}