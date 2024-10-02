// Name: Crop Artboard with Ruler Units
// Description: Resizes active artboard to fit the art (+ margins in either pixels or mm)
#target Illustrator

// Function to convert millimeters to points
function mmToPoint(mm) {
    return mm * 2.83465;
}

// Function to convert pixels to points
function pxToPoint(px) {
    return px * 0.72222; // Based on 72 points per inch
}

function main() {
    if (app.documents.length > 0) {
        var idoc = app.activeDocument;
        var rulerUnit = idoc.rulerUnits;
        var pageItemsCount = idoc.pageItems.length;

        if (pageItemsCount >= 1) {
            var msg;
            var conversionFunction;

            switch (rulerUnit) {
                case RulerUnits.Millimeters:
                    msg = "Enter Artboard Margins in mm\n";
                    conversionFunction = mmToPoint;
                    break;
                case RulerUnits.Pixels:
                    msg = "Enter Artboard Margins in pixels\n";
                    conversionFunction = pxToPoint;
                    break;
                default:
                    alert("This script supports only Millimeters and Pixels as units.");
                    return; // Exit the script
            }

            msg += "\nEnter negative numbers to cancel";

            var marginsInput = Number(Window.prompt(msg, 10, "Shrink Artboard to Fit"));
            var margins = conversionFunction(marginsInput); // Convert to points

            if (margins >= 0) {
                var activeABindex = idoc.artboards.getActiveArtboardIndex();
                var newAB = idoc.artboards[activeABindex];
                var iartBounds = idoc.visibleBounds;

                var ableft = iartBounds[0] - margins;
                var abtop = iartBounds[1] + margins;
                var abright = iartBounds[2] + margins;
                var abbottom = iartBounds[3] - margins;

                newAB.artboardRect = [ableft, abtop, abright, abbottom];

                var myZoom = idoc.activeView.zoom;
                idoc.activeView.zoom = myZoom + .01;
                idoc.activeView.zoom = myZoom;
            } else {
                alert("Operation canceled");
            }
        } else {
            alert("There is no art in the active document");
        }
    } else {
        alert("There are no open documents");
    }
}

main(); // Call the main function
