$.get("https://jsonplaceholder.typicode.com/users").then(function (data) {
    createTable();
    sortData(data, "asc", "id");
    renderData(data);

    $(".table").on("click", "th", function (event) {
        let createUrl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        let sortUrl = createUrl + `?col=${event.target.textContent}`;
        let value = event.target.innerHTML;
        let className = event.target.className;

        history.pushState(null, null, sortUrl);
        className = className === "desc" || !className ? "asc" : "desc";
        sortUrl = sortUrl + `&sort=${className}`;
        document.querySelector(".url").innerHTML = sortUrl;

        sortData(data, className, value);
        renderData(data, value, className);
    });
});

function createTable() {
    let table = $(`<table>`).css({border: "1px solid black"});
    table.addClass("table");
    $("body").append(table);
}

function renderData(data, fieldSort, typeSort) {
    $(".table").empty();
    let table = $(`.table`);
    let tbody = $(`<tbody>`);
    let row = $(`<tr>`);

    $.each(data[0], function (key, value) {
        if (typeof value !== "object") {
            heading = $(
                `<th class='${fieldSort === key ? typeSort : ""}'>${key}</th>`
            ).css({
                border: "1px solid black",
                "background-color": "lightgray"
            });
            row.append(heading);
        }
        tbody.append(row);
        table.append(tbody);
    });
    $.each(data, function (index, item) {
        let row = $(`<tr>`);
        $.each(item, function (index, value) {
            if (typeof value !== "object") {
                field = $(`<td>${value}</td>`).css({border: "1px solid black"});
                row.append(field);
            }
        });
        tbody.append(row);
        table.append(tbody);
    });
    $("body").append(table);
}

function sortData(data, type, field) {
    if (!field) {
        return data;
    }
    if (type == "asc") {
        data.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < b[field]) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    if (type == "desc") {
        data.sort((a, b) => {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}


