const icon = document.getElementById("icon") as HTMLSpanElement;
// get all element with dark class
const originalDarkClassElement = document.querySelectorAll(".dark");

icon.addEventListener("click", (e: Event) => {
	const target = e.target as HTMLElement;
	//change the Icon
	if (target.getAttribute("name") === "moon") {
		target.setAttribute("name", "moon-outline");
	} else {
		target.setAttribute("name", "moon");
	}

	originalDarkClassElement.forEach((item) => {
		console.log(item.classList, " This is the query ", item);
		item.classList.toggle("dark");
	});
});
