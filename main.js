song1="";
song2="";
leftWristX=0;
leftWristY=0;

scoreLeftWristX=0;
scoreRightWristY=0;
speed=0;

scoreLeftWrist ="";
scoreRightWrist ="";


function preload()
{
    song1 = loadSound("bdayaudio.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet Is Initialized")
}


function draw()
{
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    
    song2status = song2.isPlaying();

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();

        if(song1.isPlaying())
        {
            song2.play();
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song2.isPlaying())
        {
            song1.play();
        }
    }


}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristY =" + leftWristY + "rightWristY =" + rightWristX);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("leftWristY =" + leftWristY + "rightWristX =" + rightWristX); 

    scoreLeftWrist = results[0].pose.keypoints[0].score;
    console.log("scoreLeftWrist =" + scoreLeftWrist);
}
}