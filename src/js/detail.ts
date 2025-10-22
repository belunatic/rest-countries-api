interface Flags {
	png: string;
	alt: string;
	svg: string;
}

interface Name {
	common: string;
	official: string;
	nativeName: unknown;
}

interface CountryDetail {
	flags: Flags;
	name: Name;
	capital: string[];
	population: number;
	region: string;
	languages: unknown;
	tld: string[];
	currencies: unknown;
	subRegion: string;
}

//DOM
const detailDiv = document.getElementById("detailDiv") as HTMLDivElement;

document.addEventListener("DOMContentLoaded", () => {
	let params = new URLSearchParams(document.location.search);
	let name = params.get("name"); // is the string "Jonathan"

	async function fetchCountryDetail() {
		try {
			const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
			if (!res.ok) {
				throw new Error(
					" Error fetching the data; Error Status :" + res.status
				);
			}
			//destructure an array
			const [data] = await res.json();
			console.log(data);
			//get the border country names
			const borderCountriesArray = await fetchBorderCountries(data.borders);
			//display the details
			detailDiv.innerHTML = displayDetails(data, borderCountriesArray);
		} catch (error) {
			console.error(error);
		}
	}

	fetchCountryDetail();
});

async function fetchBorderCountries(arr: string[]) {
	try {
		let res = await fetch(
			`https://restcountries.com/v3.1/alpha?codes=${arr.join(",")}`
		);

		if (!res?.ok) {
			throw new Error("Error Fetching data; status:" + res?.status);
		}
		const data = await res.json();
		const borderCountriesName = data.map(
			(item: CountryDetail) => item.name.common
		);
		return borderCountriesName;
	} catch (error) {
		console.error(error);
	}
}

//function to return data from the last value of a given object
function getNativeName(obj: any): string {
	let value: string = "";
	for (const [key] of Object.entries(obj)) {
		value = obj[key].common;
	}
	return value;
}
//function to return data from the last value of a given object
function getCurrency(obj: any): string {
	let value: string = "";
	for (const [key] of Object.entries(obj)) {
		value = obj[key].name;
	}
	return value;
}
//function to return data from the last value of a given object
function getLanguage(obj: any): string {
	let value: string = "";
	for (const [key] of Object.entries(obj)) {
		value = obj[key];
	}
	return value;
}

function displayDetails(data: CountryDetail, arr: string[]) {
	return `<div>
					<img
						src="
                        ${data.flags.png}"
						alt="${data.name.official}"
						class="w-full h-auto" />
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 content-center gap-y-10">
					<h2 class="text-2xl font-bold col-span-2">${data.name.common}</h2>
					<div id="leftSide">
						<p><span class="font-bold"> Native Name: </span> ${getNativeName(
							data.name.nativeName
						)}</p>
						<p><span class="font-bold"> Population: </span> ${data.population}</p>
						<p><span class="font-bold"> Region: </span> ${data.region}</p>
						<p><span class="font-bold"> Sub Region: </span> ${data.subRegion}</p>
						<p><span class="font-bold"> Capital: </span> ${data.capital}</p>
					</div>
					<div id="rightSide">
						<p><span class="font-bold"> Top Level Domain: </span> ${data.tld[0]}</p>
						<p><span class="font-bold"> Currencies: </span> ${getCurrency(
							data.currencies
						)}</p>
						<p><span class="font-bold"> Language: </span> ${getLanguage(data.languages)}</p>
					</div>
					<div id="leftFooter" class="col-span-2">
						<p class="font-bold flex flex-wrap gap-x-2 gap-y-2">
							Border Countries:&nbsp;&nbsp;&nbsp;
                            ${arr
															.map((item) => {
																return `<a href="./details.html?name=${item}"><span
                                    class="country dark mode shadow-md font-normal px-8 py-1 rounded-sm">
                                    ${item}</span
                                ></a>`;
															})
															.join("")}
							
						</p>
					</div>
				</div>`;
}
