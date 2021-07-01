song = "";
status = "";
score_left = 0;


leftwristX = 0;
leftwristY = 0;
score_right = 0;

rightwristX = 0;
rightwristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        score_left = results[0].pose.keypoints[9].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        score_right = results[0].pose.keypoints[9].score;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightwristX = " + rightwristX + "rightwristy = " + rightwristY)
    }
}

function modelloaded() {
    console.log("Posenet is initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    status = song1.isPlaying();
    status2 = song2.isPlaying();
    if (score_left > 0.2) {
        song2.stop();

        circle(leftwristX, leftwristY, 20);

        if (status == "false") {
            song1.play();
        }
    }

    if (score_right > 0.2) {
        song1.stop();

        circle(rightwristX, rightwristY, 20);

        if (status2 == "false") {
            song2.play();
        }
    }


}

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("music.mp3");
}