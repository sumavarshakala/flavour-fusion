document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("recipe-form");
    const formCard = document.getElementById("ff-form-card");
    const hero = document.getElementById("ff-hero");
    const leftCol = document.getElementById("ff-left-col");
    const rightCol = document.getElementById("ff-right-col");

    const recipePanel = document.getElementById("ff-recipe-panel");
    const recipeOutput = document.getElementById("recipe-output");

    const recipeImageWrapper = document.getElementById("recipe-image-wrapper");
    const recipeImage = document.getElementById("recipe-image");

    const generateBtn = document.getElementById("generate-btn");

    const fallbackJokes = [
    "Why do programmers hate nature? Too many bugs.",
    "Why was the JavaScript developer sad? Because he didn’t Node how to Express himself.",
    "What do you call 8 hobbits? A hob-byte.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
    "Why did the developer go broke? He used up all his cache.",
    "I told my computer I needed a break… now it won’t stop sending me KitKat ads.",
    "Why did the Python programmer wear glasses? Because he couldn’t C.",
    "My code doesn’t have bugs — it just develops random features.",
    "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
    "Why did the coder get stuck in the shower? The instructions said: lather, rinse, repeat.",
    "Why was the function always nervous? It had too many arguments.",
    "Why did the programmer quit his job? Because he didn’t get arrays.",
    "Why do Java developers wear glasses? Because they don't C#.",
    "I have a joke about UDP. You might not get it.",
    "Why are programmers so good at hide-and-seek? They always stay in the loop.",
    "What is a programmer’s favourite hangout? Foo Bar.",
    "Why did the computer sneeze? It had a bad case of megahertz.",
    "Why was the laptop cold? It forgot to close its Windows.",
    "What did the HTML say to the CSS? ‘I like your style.’",
    "Why don't programmers like to go outside? The sunlight causes too many glares.",
    "Why did the bug go to therapy? It felt like no one understood it.",
    "What’s a programmer’s favourite type of music? Algo-rhythm.",
    "Why was the array so successful? It had the right elements.",
    "Why did the coder bring a ladder to work? He heard the project had high-level problems.",
    "What did the Java code say to the C code? ‘You object too much.’",
    "Why was the computer afraid of the doctor? It didn't want to be debugged.",
    "Why did the database administrator break up? Too many relationships.",
    "Why did the bit break up with the byte? It felt overshadowed.",
    "Why do programmers love dark? Light attracts bugs.",
    "Why did the integer drown? Because it couldn’t float.",
    "What’s a programmer’s favorite place to work? The command line.",
    "Why did the developer do poorly at cooking? They kept forgetting to add the ‘break’ in their switch.",
    "Why did the app go to school? It wanted to be a little smarter.",
    "Why do coders hate beaches? Too many sandboxes.",
    "What do computers eat for a snack? Microchips.",
    "Why don’t skeletons fight? They don’t have the stomach for recursion.",
    "Why did the loop get arrested? It kept repeating its mistakes.",
    "Why did the string break up? It wasn't properly terminated.",
    "Why was the code editor feeling insecure? It had too many issues.",
    "What do you call a programmer who doesn’t comment their code? A magician."
];


    let layoutSwitched = false;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const topic = document.getElementById("topic").value.trim();
        const wordCount = document.getElementById("word_count").value.trim();

        if (!topic) {
            alert("Please enter a recipe topic.");
            return;
        }

        generateBtn.disabled = true;
        generateBtn.innerText = "Generating… 🍳";

        // RANDOM JOKE WHILE LOADING
        const localJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];

        // FIRST TIME ONLY → Slide layout
        if (!layoutSwitched) {
            if (hero) hero.classList.add("ff-hero-hidden");

            leftCol.prepend(formCard);
            formCard.classList.add("ff-form-on-left");

            layoutSwitched = true;
        }

        // Show placeholder joke while loading
        recipePanel.classList.remove("d-none");
        recipeOutput.innerHTML = `
            <strong>Cooking your recipe…</strong><br>
            Meanwhile, enjoy this joke:<br>
            <em>${localJoke}</em>
        `;

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    word_count: wordCount
                })
            });

            const data = await response.json();

            // Show image
            if (data.image_url) {
                recipeImageWrapper.classList.remove("d-none");
                recipeImage.src = data.image_url;
            }

            // Replace joke with blog
            recipeOutput.innerHTML = data.recipe_html;

        } catch (err) {
            recipeOutput.innerHTML = "Something went wrong.";
            console.error(err);
        }

        generateBtn.disabled = false;
        generateBtn.innerText = "Generate Recipe ✨";
    });
});
