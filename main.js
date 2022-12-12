status = "";
objects = [];
alarm = "";

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - detecting person";
}

function preload(){
    alarm = loadSound("amoung us drip.mp3");
}

function draw(){
    image(video, 0, 0, 640, 420);

    if(status != ""){
        object_detector.detect(video, gotResult);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++){
            object_name = objects[i].label;
            document.getElementById("status").innerHTML = "Status - detected person";
            percent = floor(objects[i].confidence * 100);
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 10);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object_name == "person"){
                alarm.stop();
                document.getElementById("number").innerHTML = "Baby Found";
            }

            else{
                alarm.play();
                document.getElementById("number").innerHTML = "Baby not Found";
            }
        }

        if(objects.length == 0){
            alarm.play();
            document.getElementById("number").innerHTML = "Baby not Found";
        }
    }
}

function modelLoaded(){
    console.log("Model is loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}