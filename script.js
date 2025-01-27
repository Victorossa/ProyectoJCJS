// Credenciales 
const validUsername = "admin";
const validPassword = "12345";

// Formulario de login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("surveyContainer").style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
});

// Formulario de encuesta
document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const question = document.getElementById("question").value;
    const options = document.getElementById("options").value.split(',').map(opt => opt.trim());

    document.getElementById("survey").style.display = "block";
    document.getElementById("surveyQuestion").innerText = question;
    const surveyOptions = document.getElementById("surveyOptions");
    surveyOptions.innerHTML = '';

    const votes = Array(options.length).fill(0);
    options.forEach((option, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<button onclick="vote(${index})">${option}</button>`;
        surveyOptions.appendChild(listItem);
    });

    const ctx = document.getElementById("resultsChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: options,
            datasets: [{
                label: "Votos",
                data: votes,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });

    // Función para registrar votos
    window.vote = function(index) {
        votes[index]++;
        chart.update();

        // Guardar los datos en localStorage
        const surveyData = {
            labels: options,
            data: votes
        };
        localStorage.setItem("surveyData", JSON.stringify(surveyData));
    };
});

// Botón para ver resultados
document.getElementById("viewResults").addEventListener("click", function() {
    window.location.href = "resultados.html";
});
