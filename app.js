$(document).ready(function () {

    // Initialize Firebase//
    var config = {
        apiKey: "AIzaSyCCjeaBFx5hQiDZlomXVFk2i7xbpehgH4Q",
        authDomain: "train-homework-fbf80.firebaseapp.com",
        databaseURL: "https://train-homework-fbf80.firebaseio.com",
        projectId: "train-homework-fbf80",
        storageBucket: "",
        messagingSenderId: "556085625199"
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




        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            start: trainStart,
            frequency: trainFreq,
            //arrival: nextTrain,
            //minutes: tMinutesTillTrain,
        };




        // Uploads employee data to the database
        database.ref().push(newTrain);



        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.frequency);



        alert("New train added successfully!");




        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#dest").val("");
        $("#start").val("");
        $("#freq").val("");

    });



    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {


        console.log(childSnapshot.val());


        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainStart = childSnapshot.val().start;
        var trainFreq = childSnapshot.val().frequency;
        var nextTrain = childSnapshot.val().arrival;
        var tMinutesTillTrain = childSnapshot.val().minutes;



        // Employee Info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainStart);
        console.log(trainFreq);
        //console.log(nextTrain);
        //console.log(tMinutesTillTrain);

        
        var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "year");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % trainFreq;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDest),
            $("<td>").text(trainStart),
            $("<td>").text(trainFreq),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain),


        );

        // Append the new row to the table

        $("#train-table > tbody").append(newRow);


        // Assumptions - logic for the table times//

        



    });






});
