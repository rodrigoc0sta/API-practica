document.addEventListener("DOMContentLoaded", () => {
    const word = document.getElementById("field");
    const btn = document.getElementById("src");
    const mostrar = document.getElementById("show");

    function wordshow() {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) { 
                    const wordInfo = data[0];
                    mostrar.innerHTML = `
                    <div>    
                    <h3 class="mb-3">La palabra que usted buscó fue: ${word.value}</h3>
                        <p class="lead"><strong>¿Qué significa?</strong></p>
                        
                        <ul class="list-group" id="definitions-list">
                            <li class="list-group-item">${wordInfo.meanings[0].definitions[0].definition}</li>
                            <li class="list-group-item">${wordInfo.meanings[0].definitions[1].definition}</li>
                        </ul>
                        
                        <p class="mt-3"><strong>Y cómo se pronuncia esta palabra?</strong></p>
                        <audio controls>
                            <source src="${wordInfo.phonetics[1].audio}" type="audio/mpeg">
                            Tu navegador no admite el elemento de audio.
                        </audio>
                        <p class="mt-3 small text-danger">Api en plena expansión, es posible que se presenten fallas al momento de encontrar el audio.</p>
                        </div>
                    `;
                } else {
                    mostrar.innerHTML = `
                        <h3 class="mb-3">La palabra que usted buscó fue: ${word.value}</h3>
                        <p class="lead"><strong>Palabra no encontrada.</strong></p>
                    `;
                }
            })
            .catch(err => console.log(err));
    }

    btn.addEventListener("click", () => {
        wordshow();
    });
});
