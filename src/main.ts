//DOM
const resultDiv = document.getElementById("resultDiv") as HTMLDivElement;
const regionSelect = document.getElementById("regions") as HTMLSelectElement;

interface Flags {
	png: string;
	alt: string;
	svg: string;
}

interface Name {
	common: string;
	official: string;
}

interface AllCountries {
	flags: Flags;
	name: Name;
	capital: string[];
	population: number;
	region: string;
}

//store the original data
let allCountries: AllCountries[] = [];

//DOM COntent Loaded
document.addEventListener("DOMContentLoaded", fetchData);

async function fetchData(): Promise<void> {
	try {
		const res = await fetch(
			"https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
		);
		if (!res.ok) {
			throw new Error("Error fetching data, status: " + res.status);
		}

		allCountries = await res.json();
		console.log(allCountries);
		const results = displayAllCountries(allCountries);
		resultDiv.innerHTML = results;
	} catch (error) {
		console.error(error);
	}
}

function displayAllCountries(data: AllCountries[]): string {
	return data
		.map((item) => {
			return `<div
					class="country dark flex flex-col gap-y-4 rounded-lg shadow-lg pb-8 overflow-hidden">
					
                        <div class="h-48 w-full" style="background:url(${item.flags.png});background-size:cover;background-repeat: no-repeat; 	
background-position: center; "></div>
					<div class="px-6">
						<p class="font-bold text-lg py-3">${item.name.official}</p>
						<p class="text-sm"><span class="font-bold">Population:</span> ${item.population}</p>
						<p class="text-sm"><span class="font-bold">Region:</span> ${item.region}</p>
						<p class="text-sm"><span class="font-bold">Capital:</span> ${item.capital[0]}</p>
					</div>
				</div>`;
		})
		.join("");
}

//filter by region
regionSelect.addEventListener("change", filterByRegion);

function filterByRegion(e: Event): void {
	//option 1
	//Narrowing
	// if (e.target instanceof HTMLSelectElement) {
	// 	console.log("Region selected:", e.target.value);
	// }

	//option 2
	const target = e.target as HTMLSelectElement;
	const selectedRegion = target.value;

	//filter the countries
	let filteredCountries: AllCountries[] = [];

	if (!selectedRegion) {
		filteredCountries = allCountries;
	} else {
		filteredCountries = allCountries.filter((item) => {
			console.log(item.region.toLowerCase());
			return item.region.toLowerCase() === selectedRegion.toLowerCase();
		});
	}
	console.log(filteredCountries);
	const results = displayAllCountries(filteredCountries);
	resultDiv.innerHTML = results;
}
