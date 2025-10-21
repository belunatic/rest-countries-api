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
	language: unknown;
	tld: string[];
	currencies: unknown;
	subRegion: string;
}

type Border = {
	borders: string[];
};

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
			const nativeName = getNativeName(data.name.nativeName);
			const getBorderCountriesArray = await fetchBorderCountries(data.borders);
			console.log(data, data.name, data.borders, nativeName);
		} catch (error) {
			console.error(error);
		}
	}

	fetchCountryDetail();
});

async function fetchBorderCountries(arr: Border) {
	try {
		const res = await fetch(
			`https://restcountries.com/v3.1/alpha?codes=${arr.join(",")}`
		);

		if (!res.ok) {
			throw new Error("Error Fetching data; status:" + res.status);
		}
		const data = await res.json();
		const borderCountriesName = data.map((item) => item.name.common);
		console.log(borderCountriesName);
	} catch (error) {
		console.error(error);
	}
}

function getNativeName(names: any): string {
	let nativeName: string = "";
	for (const [key] of Object.entries(names)) {
		nativeName = names[key].common;
	}
	return nativeName;
}
