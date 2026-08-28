import { TestResults, canvasStatus, testSettingIsCalled, LOAD_SOUND, advanceToFrame, substituteDraw } from "https://cdn.jsdelivr.net/gh/Supportive-IDE/p5js-testing-demo@latest/p5jsTestingLibrary.js";

/**
 * A hacky solution to wait for p5js to load the canvas. Include in all exercise test files.
 */
function waitForP5() {
    const canvases = document.getElementsByTagName("canvas");
    if (canvases.length > 0) {
        clearInterval(loadTimer);
        runTests(canvases[0]);
    }
}

async function runTests(canvas) {
    canvas.style.pointerEvents = "none";
    substituteDraw();
    const resultsDiv = document.getElementById("results");
    for (const e of canvasStatus.errors) {
        TestResults.addFail(`In frame ${frameCount}, ${e}`);
    }
    TestResults.addWarning("Only a small amount of functionality can be tested for this exercise. Passing all tests doesn't necessarily mean the exercise is complete.");
    const loadInSetup = testSettingIsCalled(LOAD_SOUND.re, true, false, false);
    const loadInDraw = testSettingIsCalled(LOAD_SOUND.re, false, true, false);
    if (loadInSetup) {
        TestResults.addPass("<code>loadSound()</code> is called in <code>setup()</code>.");
    }
    if (loadInDraw) {
        TestResults.addFail("<code>loadSound()</code> should not be called in <code>draw()</code> because it will repeatedly load the sound file.");
    }
    if (!loadInSetup && !loadInDraw) {
        TestResults.addWarning("<code>loadSound()</code> does not appear to be called (this test will not detect usage of <code>loadSound()</code> outside <code>setup()</code> or <code>draw()</code>).");
    }
    if (window.hasOwnProperty("keyPressed")) {
        TestResults.addPass("<code>keyPressed()</code> is implemented.");
    } else {
        TestResults.addFail("<code>keyPressed()</code> is not implemented.");
    }
    TestResults.display(resultsDiv);
}


const loadTimer = setInterval(waitForP5, 500);
