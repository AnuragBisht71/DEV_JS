let allFilter = document.querySelectorAll(".filter");
let ticketsContainer = document.querySelector(".tickets-container");

for(let i = 0 ; i < allFilter.length ; i++) {
    allFilter[i].addEventListener("click" , selectFilter);
}

function selectFilter(e) {
    let filterSelected = e.target.classList[1];
    
    if(ticketsContainer.classList.length > 1) {
        ticketsContainer.classList.remove( ticketsContainer.classList[1] );
    }

    ticketsContainer.classList.add(filterSelected);
}