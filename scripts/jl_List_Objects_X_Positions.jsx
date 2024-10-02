// Name: List Object's X Positions
// Description: see above


// Illustrator script to list the geometric middle x-points
// of selected objects in millimeters
// The x-points are sorted from left to right
// Created on 2 Oct 2024

// Check if there are any selected objects
if (app.documents.length > 0 && app.activeDocument.selection.length > 0) {
    var doc = app.activeDocument;
    var sel = doc.selection;
    var middleXValues = [];

    // Conversion factor from points to millimeters
    var mmPerPoint = 25.4 / 72;

    // Loop through selected objects
    for (var i = 0; i < sel.length; i++) {
        var item = sel[i];
        var bounds = item.geometricBounds; // [x1, y1, x2, y2]
        var middleX = (bounds[0] + bounds[2]) / 2;
        var middleX_mm = middleX * mmPerPoint; // Convert to millimeters
        middleXValues.push(middleX_mm);
    }

    // Sort the x-values ascending (left to right)
    middleXValues.sort(function (a, b) { return a - b; });

    // Prepare the output string with formatted values
    var output = "";
    for (var j = 0; j < middleXValues.length; j++) {
        // Format to two decimal places
        output += middleXValues[j].toFixed(2) + " mm\n";
    }

    // Remove the last newline character if present
    if (output.charAt(output.length - 1) === "\n") {
        output = output.substring(0, output.length - 1);
    }

    // Create a dialog window to display the values
    var w = new Window("dialog", "Middle X-Values in Millimeters");
    w.orientation = "column";
    w.alignChildren = ["fill", "fill"];

    var txt = w.add("edittext", undefined, output, { multiline: true, scrolling: true });
    txt.characters = 40;
    txt.active = true; // Set focus to the text field

    var buttons = w.add("group");
    buttons.alignment = "right";

    var copyBtn = buttons.add("button", undefined, "Select All");
    copyBtn.onClick = function () {
        txt.active = true;
        txt.selectAll();
    }

    var closeBtn = buttons.add("button", undefined, "Close");
    closeBtn.onClick = function () {
        w.close();
    }

    w.show();

} else {
    alert("Please select at least one object.");
}
