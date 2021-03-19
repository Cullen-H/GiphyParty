console.log("Let's get this party started!");

let currentRow = 0;
let currentColumn = -1;


function updateCurrentCell() {
    if (currentColumn >= 2) {
        currentRow++;
        currentColumn = 0;
        $("<tr></tr>").appendTo("#gif-table > tbody");
    } else {
        currentColumn++;
    }
}

function addGif(response) {
    let numResults = response.data.length;
    if (numResults) {
        let randomGif = Math.floor(Math.random() * numResults);
        
        let $newGif = $("<img>", { src: response.data[randomGif].images.original.url });
        let $newGifCell = $("<td></td>", { class: "gif" }).append($newGif);

        updateCurrentCell();

        $("#gif-table > tbody > tr").eq(currentRow).append($newGifCell);
    }
}

$('form').on('submit', async function(e) {
    e.preventDefault();

    const searchBox = $('#search-query');
    if (searchBox.val() !== "") {
        const response = await axios.get("http://api.giphy.com/v1/gifs/search", { params: { 
            q: searchBox.val(),
            api_key: "TatzgxgrkOgdekQm1n891QoDGIEaQwdy"
            }
        });
        // add gif to page
        addGif(response.data);
    }
    searchBox.val("");
});

$('#remove-button').on('click', function() {
    
    const gifTable = $('#gif-table > tbody');
    gifTable.empty();
    $("<tr></tr>").appendTo(gifTable);
    currentRow = 0;
    currentColumn = -1;
})
