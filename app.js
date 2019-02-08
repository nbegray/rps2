$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDBND5iW9p_YCOaa-1i2--xkN5BbLRL4os",
        authDomain: "train-schedule-homework020819.firebaseapp.com",
        databaseURL: "https://train-schedule-homework020819.firebaseio.com",
        projectId: "train-schedule-homework020819",
        storageBucket: "",
        messagingSenderId: "196662848101"
    };
    firebase.initializeApp(config);


    var database = firebase.database();

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name").val().trim();
        var trainDest = $("#dest").val().trim();
        var trainStart = moment($("#start").val().trim(), "HH:mm").format('HH:mm'); 
        var trainFreq = $("#freq").val().trim();
        var trainArriv = $("#arrival").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: trainStart,
            frequency: trainFreq,
            arrival: trainArriv
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.frequency);
        console.log(newTrain.arrival);

        alert("New train added successfully!");

        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#dest").val("");
        $("#start").val("");
        $("#freq").val("");
        $("#arrival").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainStart = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
        var trainArriv = childSnapshot.val().arrival;

        // Employee Info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainStart);
        console.log(trainFreq);
        console.log(trainArriv);

        


        // // Calculate the months worked using hardcore math
        // // To calculate the months worked
        // var empMonths = moment().diff(moment(empStart, "X"), "months");
        // console.log(empMonths);

        // // Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainStart),
            $("<td>").text(trainFreq),
            //$("<td>").text(empMonths),
            // $("<td>").text(empRate),
            // $("<td>").text(empBilled)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // // Assumptions
    // var tFrequency = 3;

    // // Time is 3:30 AM
    // var firstTime = "03:30";

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});
