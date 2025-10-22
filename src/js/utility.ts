//dark mode switch
const icon = document.getElementById("icon") as HTMLSpanElement;

let currentTheme: string = "dark";

document.addEventListener("DOMContentLoaded", () => {
	//stored theme
	const storedTheme = localStorage.getItem("theme");
	if (storedTheme !== null) {
		currentTheme = storedTheme;
	} else {
		console.log("Theme is not set yet");
	}

	//add the theme class
	// get all element with dark class
	const originalDarkClassElement = document.querySelectorAll(".mode");

	//icon update and theme
	if (currentTheme === "dark") {
		icon.setAttribute("name", "moon");
		originalDarkClassElement.forEach((item) => {
			console.log(item.classList, " This is the query ", item);
			item.classList.add("dark");
		});
	} else {
		icon.setAttribute("name", "moon-outline");
		originalDarkClassElement.forEach((item) => {
			console.log(item.classList, " This is the query ", item);
			item.classList.remove("dark");
		});
	}
});

icon.addEventListener("click", (e: Event) => {
	const target = e.target as HTMLElement;
	//change the Icon
	if (target.getAttribute("name") === "moon") {
		target.setAttribute("name", "moon-outline");
	} else {
		target.setAttribute("name", "moon");
	}

	// get all element with dark class
	const originalDarkClassElement = document.querySelectorAll(".mode");

	originalDarkClassElement.forEach((item) => {
		console.log(item.classList, " This is the query ", item);
		item.classList.toggle("dark");
	});

	//set the theme in localStorage
	if (currentTheme === "dark") {
		localStorage.setItem("theme", "light");
	} else {
		localStorage.setItem("theme", "dark");
	}
});
