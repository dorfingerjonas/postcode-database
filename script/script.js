window.addEventListener('load', () => {
    const xhttp = new XMLHttpRequest();
    const loader = document.getElementById('loader');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const feedbackText = document.getElementById('feedbackText');
    let startTime;
    let endTime;

    window.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
            searchButton.click();
        }
    });

    searchButton.addEventListener('click', () => {
        xhttp.open('POST', './php/getData.php', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`search=${searchInput.value}`);
        startTime = new Date();

        loader.classList.remove('hide');

        const tableWrapper = document.getElementById('tableWrapper');
        while (tableWrapper.firstChild) tableWrapper.removeChild(tableWrapper.firstChild);
    });

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const repsonse = JSON.parse(this.responseText);

            for (let i = 0; i < repsonse.length; i++) {
                const data = [
                    repsonse[i][0],
                    repsonse[i][1],
                    repsonse[i][2],
                    repsonse[i][3],
                    repsonse[i][5].replace('Politischer Bezirk', ''),
                    repsonse[i][9],
                    repsonse[i][10]
                ];

                // const countryCode = repsonse[i][0]; // Land
                // const postCode = repsonse[i][1]; // PLZ
                // const placeName = repsonse[i][2]; // Ortsname
                // const county = repsonse[i][3]; // Bundesland
                // const region = repsonse[i][5]; // Bezirk
                // const latitude = repsonse[i][9]; // Latitude
                // const longitude = repsonse[i][10]; // Longitude

                const row = document.createElement('div');

                for (let i = 0; i < data.length; i++) {
                    const dataElement = document.createElement('p');

                    dataElement.textContent = data[i];
                    
                    row.appendChild(dataElement);
                }

                row.setAttribute('class', 'row');
                document.getElementById('tableWrapper').appendChild(row);

                highlightRows();
            }

            endTime = new Date();

            feedbackText.textContent = `${repsonse.length} Ergebniss(e) in ${(endTime.getTime() - startTime.getTime()) / 1000} Sekunden.`;
        }

        loader.classList.add('hide');
    }
});

function highlightRows() {
    const tableWrapper = document.getElementById('tableWrapper');

    for (let i = 0; i < tableWrapper.children.length; i++) {
        const row = tableWrapper.children[i];
        i % 2 === 0 ? row.classList.add('highlight') : row.classList.add('lowlight');
    }
}