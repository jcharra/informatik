let current = 0;

const decimal = document.getElementById("decimal");

// All the divs for the binary representation in an array.
// We use Array.from because querySelectorAll returns a NodeList which doesn't support .map
const divs = Array.from(document.querySelectorAll(".counter > div"));

// Bind the events on each bit to toggle it
divs.forEach(div => {
    div.addEventListener("click", () => {

        div.classList.toggle("one");

        // map the divs to "1" or "0" depending on the "one" class and then join the string
        const binary = divs.map(d => d.classList.contains("one") ? "1" : "0").join("")

        current = parseInt(binary, 2);
        decimal.innerText = current.toString();
    });
});

// Event listeners for stepper buttons
document.getElementById("increase").onclick = () => step(1)
document.getElementById("decrease").onclick = () => step(-1)

// bind the scroll wheel to the decimal number
document.getElementById("decimal").onwheel = (e) =>{
    // stop the event from propagating to avoid also over-scrolling the page
    e.preventDefault();
    step(e.deltaY > 0 ? 1 : -1)
}

function step(delta) {
    // Limit the possible number to a min of 0 and a max of 255
    current += delta;
    current = current < 0 ? 255 : current;
    current = current > 255 ? 0 : current;

    decimal.innerText = current.toString();
    const bin = current.toString(2).padStart(8, "0");

    // loop over each bit and assign and toggle the "one" class only on 1 bits
    for (let i = 0; i < 8; i++) {
        const bitChar = bin[i];

        if (bitChar === "1")
            divs[i].classList.add("one");
        else
            divs[i].classList.remove("one");
    }
}
