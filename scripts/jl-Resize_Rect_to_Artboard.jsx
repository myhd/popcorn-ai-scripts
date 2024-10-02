// Illustrator Script to Resize or Create a Rectangle Matching the Artboard Size

// Get the active document
var doc = app.activeDocument;

// Get the current artboard
var currentArtboardIndex = doc.artboards.getActiveArtboardIndex();
var currentArtboard = doc.artboards[currentArtboardIndex];

// Get artboard size
var artboardBounds = currentArtboard.artboardRect; // [left, top, right, bottom]

var artboardLeft = artboardBounds[0];
var artboardTop = artboardBounds[1];
var artboardRight = artboardBounds[2];
var artboardBottom = artboardBounds[3];

// Save the original ruler units and set to points
var originalRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = RulerUnits.Points;

if (app.selection.length == 1) {
    var selectedItem = app.selection[0];
    if (selectedItem.typename == "PathItem") {
        // Expand Live Shape if necessary
        if (selectedItem.pathPoints.length == 0) {
            // Select the item and expand live shape
            selectedItem.selected = true;
            app.executeMenuCommand("ExpandLiveShape");
            selectedItem = app.selection[0]; // Update reference
        }

        // Ensure that the selected item has 4 path points
        if (selectedItem.pathPoints.length == 4 && selectedItem.closed) {
            var pathPoints = selectedItem.pathPoints;

            // Set the path points to match the artboard
            pathPoints[0].anchor = [artboardLeft, artboardTop];       // Top-left
            pathPoints[1].anchor = [artboardRight, artboardTop];      // Top-right
            pathPoints[2].anchor = [artboardRight, artboardBottom];   // Bottom-right
            pathPoints[3].anchor = [artboardLeft, artboardBottom];    // Bottom-left

            // Reset handles to anchors (straight lines)
            for (var i = 0; i < 4; i++) {
                pathPoints[i].leftDirection = pathPoints[i].anchor;
                pathPoints[i].rightDirection = pathPoints[i].anchor;
            }

            // Move the rectangle to the artboard's top-left corner
            selectedItem.position = [artboardLeft, artboardTop];

            alert("Rectangle resized to artboard size.");
        } else {
            alert("Selected path does not have 4 points or is not closed.");
        }
    } else {
        alert("Selected item is not a path.");
    }
} else {
    // No path item selected
    var makeRect = confirm("No rectangle selected. Do you want to create one?");
    if (makeRect) {
        // Create a rectangle the size of the artboard, filled with bright red
        var rect = doc.pathItems.rectangle(artboardTop, artboardLeft, artboardWidth, artboardHeight);

        // Set fill color to bright red
        var redColor = new RGBColor();
        redColor.red = 255;
        redColor.green = 0;
        redColor.blue = 0;
        rect.fillColor = redColor;

        rect.stroked = false; // No stroke
        alert("Rectangle created.");
    }
}

// Restore the original ruler units
app.preferences.rulerUnits = originalRulerUnits;
