//Vars
let counter = 0;
let doStars = true;
let min = 30; //50
let max = 50; //100

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function toggleStars() {
    doStars = !doStars;
    console.log(doStars);
}

function clamp(value, min, max) {
    //Why isn't this built in?
    if (value < min) {
        return min;
    } else if (value > max) {
        return max;
    } else {
        return value;
    }
}

function addStar(left, top) {
    //Creation
    let star = document.createElement("div");
    star.id = "star";

    // Styling
    star.style.width = clamp(random(1, 8) * random(0.7, 1), 2, 8) + "px";
    star.style.animationDuration = random(3.0, 5.0) + "s";
    star.style.top = screen.height * (top / 100) + "px";
    star.style.animationDelay = random(1.0, 3.0) + "s"
    star.style.rotate = random(0, 360) + "deg";
    star.style.left = left + "%";

    //Adding to page
    document.getElementById("stars").appendChild(star);
    counter++;
}

function moveStars() {
    if (doStars) {
        //Get stars
        let stars = document.getElementById("stars").children;

        //Loop through them all
        for (let i = 0; i < stars.length; i++) {
            let star = stars[i];

            //Move upwards
            star.style.top = (parseInt(star.style.top) - (parseInt(star.style.width) / 10)) + "px";

            //Remove if on top edge
            if (parseInt(star.style.top) < 1) {
                star.parentElement.removeChild(star);
                counter--;
                i--;
            }
        }

        //Add stars
        if ((random(1, 25) == 25 && counter < max) || counter < min) {
            addStar(random(0, 100), 100)
        }

        //Update counter
        document.getElementById("counter").innerHTML = counter;
    }

    //Call next frame
    requestAnimationFrame(moveStars)
}

//Create stars on page load
for (let i = 0; i < random(min,max); i++) { //80, 150
    addStar(random(0, 100), random(0, 100));
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("You're a star :3")

    //Star animation
    requestAnimationFrame(moveStars)
});