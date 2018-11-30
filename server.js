// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservation and waitlist data
// =============================================================
const tables = [
    // {
    //     routeName: "briantracy",
    //     name: "Brian Tracy",
    //     phone: "312-333-2233",
    //     email: "briantracy@example.com",
    //     id: "0020"
    // }
];

const waiting = [
    // {
    //     routeName: "monicalewinsky",
    //     name: "Monica Lewinski",
    //     phone: "312-111-9933",
    //     email: "monicalewinsky@example.com",
    //     id: "1154"
    // }
];

// Routes
// =============================================================
//Send html to display home page -> index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

//Send html to display tables -> reserve.html
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

//Send html to display -> view.html
app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

// Send ajax of all 'tables' to the page
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});
// Send ajax of all 'waiting' to the page
app.get("/api/waiting", function (req, res) {
    return res.json(waiting);
});

// Create new reservation - takes in JSON input
app.post("/api/reservations", function (req, res) {
    // body parese with middleware
    let newReservation = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    if (tables.length < 2) {

        console.log(newReservation);

        tables.push(newReservation);

        return res.json(true);

    } else {

        console.log(newReservation);

        waiting.push(newReservation);

        return res.json(false);

    }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
