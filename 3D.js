// initialize variables
let scene, camera, renderer, sphere, pointLight, tick, text;
let spheres = {};
let bgState = 0;
let deg = -25;
let vol = 0;
let leftBound = 0;
let rightBound = 0;
let rad = 50;
let keyPressed = 0;

// check for changes in inputs

document.getElementById("funct").addEventListener("input", function(){
    console.log("eventFired");
    const div = document.getElementById("funky");
    if (document.getElementById("funct").value == "null") {
        while (div.firstChild) {
            div.removeChild(div.lastChild);
        }
        document.getElementById("function").innerText = "";
        clearSpheres();
        //alert("select a type of function");
    }
    else if (document.getElementById("funct").value == "sqrt") {
        while (div.firstChild) {
            div.removeChild(div.lastChild);
        }
        clearSpheres();
        const shiftLabel = document.createElement("label");
        const shiftLabelNode = document.createTextNode("Shift: ");
        const shiftElmt = document.createElement("input");
        shiftElmt.setAttribute("id", "inputS");
        shiftElmt.setAttribute("value", "0");
        shiftElmt.addEventListener("input", clearSpheres);
        shiftLabel.appendChild(shiftLabelNode);
        shiftLabel.setAttribute("id", "SLabel");
        div.appendChild(shiftLabel);
        div.appendChild(shiftElmt);
        const labelA = document.createElement("label");
        const labelANode = document.createTextNode("A: ");
        const ElmtA = document.createElement("input");
        ElmtA.setAttribute("id", "inputAmp");
        ElmtA.setAttribute("value", "1");
        ElmtA.addEventListener("input", clearSpheres);
        labelA.appendChild(labelANode);
        labelA.setAttribute("id", "AmpLabel");
        div.appendChild(labelA);
        div.appendChild(ElmtA);
        clearSpheres();
    }
    else if (document.getElementById("funct").value == "poly") {
        while (div.firstChild) {
            div.removeChild(div.lastChild);
        }
        const nLabel = document.createElement("label");
        const node = document.createTextNode("Nth power: ");
        const nInput = document.createElement("input");
        nLabel.setAttribute("id", "polyLabel");
        nLabel.appendChild(node);
        nInput.setAttribute("id", "n");
        nInput.addEventListener("input", ()=>{
            if (document.getElementsByClassName("Lbl").length > 0) {
                let labels = document.getElementsByClassName("Lbl");
                for (let j = 0; j < labels.length; j++) {
                    if (labels[j]){div.removeChild(labels[j])};
                }
            }
            if (document.getElementsByClassName("a").length > 0) {
                let elements = document.getElementsByClassName("a");
                for (let n = 0; n < elements.length; n++) {
                    if (elements[n]){div.removeChild(elements[n])}
                }
            }
            for (let i = 0; i < parseFloat(document.getElementById("n").value); i++) {
                let Lbl = document.createElement("label");
                let textNode = document.createTextNode(` a${i+1}`);
                let Ainput = document.createElement("input");
                Lbl.setAttribute("class", "Lbl");
                Lbl.setAttribute("id", `Lbl${i}`);
                Lbl.appendChild(textNode);
                Ainput.setAttribute("class", "a");
                Ainput.setAttribute("id", `a${i}`);
                Ainput.addEventListener("input", clearSpheres);
                div.appendChild(Lbl);
                div.appendChild(Ainput);
            }     
            clearSpheres();
        });
        div.appendChild(nLabel);
        div.appendChild(nInput);
        clearSpheres();
    }
    else if (document.getElementById("funct").value == "log") {
        while (div.firstChild) {
            div.removeChild(div.lastChild);
        }
        const SLogLabel = document.createElement("label");
        const SLogLabelNode = document.createTextNode("Shift: ");
        const SLogElmt = document.createElement("input");
        SLogLabel.setAttribute("id", "sLogLabel");
        SLogLabel.appendChild(SLogLabelNode);
        SLogElmt.setAttribute("id", "Slog");
        SLogElmt.addEventListener("input", clearSpheres);
        SLogElmt.setAttribute("value", "0");
        div.appendChild(SLogLabel);
        div.appendChild(SLogElmt);
        const ALogLabel = document.createElement("label");
        const ALogLabelNode = document.createTextNode("A: ");
        const ALogElmt = document.createElement("input");
        ALogLabel.setAttribute("id", "aLogLabel");
        ALogLabel.appendChild(ALogLabelNode);
        ALogElmt.setAttribute("id", "Alog");
        ALogElmt.setAttribute("value", "1");
        ALogElmt.addEventListener("input", clearSpheres);
        div.appendChild(ALogLabel);
        div.appendChild(ALogElmt);
        clearSpheres();
    }
})
document.getElementById("slider").addEventListener("input", function() {clearSpheres(); document.getElementById("y_int").innerHTML = `${document.getElementById("slider").value}`;});
document.getElementById("leftB").addEventListener("input", clearSpheres);
document.getElementById("rightB").addEventListener("input", clearSpheres);

// check for arrow keypresses

window.onkeydown = keyCheckDown;

function keyCheckDown() {
    let e = window.event;
    if (e.keyCode == '39') {
        keyPressed = 39
    }
    else if (e.keyCode == '37') {
        keyPressed = 37;
    }
    else if (e.keyCode == '38') {
        keyPressed = 38;
    }
    else if (e.keyCode == '40') {
        keyPressed = 40;
    }
}

window.onkeyup = keyCheckUp;

function keyCheckUp() {
    keyPressed = 0;
}

// handle click & drag function

let startX;
let startY;
let mouseDown = 0;
document.getElementById("swipeZone").addEventListener('mousedown', function (event) {
    mouseDown++;
    startX = event.pageX;
    startY = event.pageY;
});
document.getElementById("swipeZone").addEventListener('mouseup', ()=>{
    mouseDown--;
});
document.getElementById("swipeZone").addEventListener('mousemove', function (event) {
    if (mouseDown > 0) {
        if ((event.clientX - startX) > 0) {
            tick -= 0.0005*Math.abs(event.clientX-startX);
        }
        else if ((event.clientX - startX) < 0) {
            tick += 0.0005*Math.abs(event.clientX-startX);
        }
        if ((event.clientY - startY) > 0) {
            deg += 0.01*Math.abs(event.clientY-startY);
        }
        else if ((event.clientY - startY) < 0) {
            deg -= 0.01*Math.abs(event.clientY-startY);
        }
    }
});

//Attempt to make a wheel zoomeffect
document.getElementById("body").addEventListener("wheel", function (event) {
    if (event.deltaY > 0) {
        rad += 1;
    }
    else if (event.deltaY < 0) {
        rad -= 1;
    }
});

// initialize ThreeJS

const Lightbackground = new THREE.TextureLoader().load('/lighterBackground.webp');
const Darkbackground = new THREE.TextureLoader().load('/darkBackgroundImg.jpeg');

function init() {
    scene = new THREE.Scene();
    scene.background = Lightbackground;
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antiaias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    camera.position.set(0,50,35);
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);

    pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0,10,0);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const gridHelper = new THREE.GridHelper(100,10, 0xff0000, 0xffffff);
    scene.add(gridHelper);

    /*const ballGeo = new THREE.SphereGeometry(10, 256, 128);
    const ballMaterial = new THREE.MeshStandardMaterial({color: 0xFF00FF});
    const ball1 = new THREE.Mesh(ballGeo, ballMaterial);
    const ball2 = new THREE.Mesh(ballGeo, ballMaterial);
    ball1.position.set(35, 0, -5);
    ball2.position.set(35, 0, 5);
    scene.add(ball1, ball2);*/

    tick = 0;
}

// ThreeJS Functions

function computeVol(numSpheres) {
    for (let i = 1; i <= numSpheres; i++) {
        if (spheres[`sphere${i}`]) {
            vol += ((Math.abs(spheres[`sphere${i}`].position.z)+Math.abs(spheres[`sphere${i-1}`].position.z))/2)**2;
        }
    }
    vol = Math.round(vol * 1000)/1000;
}

function assignColor(y) {
    if (y > 50) {
        return new THREE.MeshStandardMaterial({ color: `hsl(${360}, 100%, 50%)`});
    }
    else if (y < -50) {
        return new THREE.MeshStandardMaterial({ color: `hsl(${0}, 100%, 50%)`});
    }
    else {
        return new THREE.MeshStandardMaterial({ color: `hsl(${Math.floor((y+50) * 3.6)}, 100%, 50%)`});
    }
}

function createSqrtSpheres(s, k, a, leftB, rightB) {
    const numSpheres = rightB - leftB;
    const shiftingConstant = leftB;
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
    let sphereMaterial = new THREE.MeshStandardMaterial({color: 0x00ffff});
    if (Object.keys(spheres).length < 1) {
        for (let n = 0; n < 40; n++) {
            //sphereMaterial = new THREE.MeshStandardMaterial({ color: `hsl(${18*n}, 100%, 50%)`});
            for (var i = 0; i <= numSpheres; i++) {
                let y = (Math.sin(n*Math.PI/20)*(-a*Math.sqrt((i+shiftingConstant)+s)-k));
                sphereMaterial = assignColor(y);
                sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
                sphere.position.set((i+shiftingConstant), (-Math.sin(n*Math.PI/20)*(-a*Math.sqrt((i+shiftingConstant)+s)-k)), (Math.cos(n*Math.PI/20)*(-a*Math.sqrt((i+shiftingConstant)+s)-k)));
                spheres[`sphere${i+((numSpheres+1)*n)}`] = sphere;
                //console.log((i+((numSpheres+1)*n)), sphere);
            }
        }
        let h = 0;
        function myLoop() {
            setTimeout(()=> {
                if (h <= numSpheres) {
                    scene.add(spheres[`sphere${h}`]);
                    h++;
                }
                else {
                    for (l = 0; l <= numSpheres; l++) {
                        scene.add(spheres[`sphere${h+l}`]);
                    }
                    h += numSpheres;
                }
                if (h < Object.keys(spheres).length) {
                    myLoop();
                }
            }, 50);
        }
        myLoop();
        computeVol(rightB-leftB);
    }
}

function createPolySpheres() {
    let leftBound = parseFloat(document.getElementById("leftB").value);
    let rightBound = parseFloat(document.getElementById("rightB").value);
    let numSpheres = 2*(rightBound - leftBound);
    let n = parseFloat(document.getElementById("n").value);
    let y_int = parseFloat(document.getElementById("slider").value);
    let y = 0;
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
    let sphereMaterial = new THREE.MeshStandardMaterial({color: 0x00FFFF});
    let a = [];
    for (let p = 0; p < n; p++) {
        a[p] = parseFloat(document.getElementsByClassName("a")[p].value);
    }
    if (Object.keys(spheres).length < 1) {
        for (let k = 0; k < 40; k++) {
            for (let i = 0; i <= numSpheres; i++) {
                y = 0;
                for (let l = 0; l < n; l++) {
                    y += a[l]*(i/2+leftBound)**(n-l)
                }
                y += y_int;
                sphereMaterial = assignColor(Math.sin(k*Math.PI/20)*y);
                sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
                sphere.position.set((i/2 + leftBound), -Math.sin(k*Math.PI/20)*y, -Math.cos(k*Math.PI/20)*y);
                spheres[`sphere${i+((numSpheres+1)*k)}`] = sphere;
            }
        }
        let h = 0;
        function myLoop() {
            setTimeout(()=> {
                if (h <= numSpheres) {
                    scene.add(spheres[`sphere${h}`]);
                    h++;
                }
                else {
                    for (l = 0; l < numSpheres; l++) {
                        scene.add(spheres[`sphere${h+l}`]);
                    }
                    h += numSpheres;
                }
                if (h < Object.keys(spheres).length) {
                    myLoop();
                }
            }, 50);
        }
        myLoop();
        computeVol(rightB-leftB);
    }
}

function createLogSpheres() {
    let leftBound = parseFloat(document.getElementById("leftB").value);
    let rightBound = parseFloat(document.getElementById("rightB").value);
    let numSpheres = rightBound - leftBound;
    let y_int = parseFloat(document.getElementById("slider").value);
    let a = parseFloat(document.getElementById("Alog").value);
    let s = parseFloat(document.getElementById("Slog").value);
    const sphereGeo = new THREE.SphereGeometry(0.5, 32, 16);
    let sphereMaterial = new THREE.MeshStandardMaterial({color: 0x00FFFF});
    if (Object.keys(spheres).length < 1) {
        for (let n = 0; n < 40; n++) {
            for (var i = 0; i <= numSpheres; i++) {
                let y = (Math.sin(n*Math.PI/20)*(-a*Math.log((i + leftBound) + s)-y_int));
                sphereMaterial = assignColor(y);
                sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
                sphere.position.set((i+leftBound), -y, (Math.cos(n*Math.PI/20)*(-a*Math.log((i + leftBound) + s)-y_int)));
                spheres[`sphere${i+((numSpheres+1)*n)}`] = sphere;
            }
        }
        let h = 0;
        function myLoop() {
            setTimeout(()=> {
                if (h <= numSpheres) {
                    scene.add(spheres[`sphere${h}`]);
                    h++;
                }
                else {
                    for (l = 0; l <= numSpheres; l++) {
                        scene.add(spheres[`sphere${h+l}`]);
                    }
                    h += numSpheres;
                }
                if (h < Object.keys(spheres).length) {
                    myLoop();
                }
            }, 50);
        }
        myLoop();
        computeVol(numSpheres);
    }

}

function clearSpheres() {
    for (let n = 0; n <= Object.keys(spheres).length; n++){
        scene.remove(spheres[`sphere${n}`]);
    }
    spheres = {};
    vol = 0;
    document.getElementById("function").innerText = "";
}

function animate() {
    requestAnimationFrame(animate);
    if (mouseDown > 1) {
        mouseDown = 0;
    }
    if (mouseDown < 1) {
        mouseDown = 0;
    }
    camera.position.set((rad)*Math.sin(tick), 75+deg, (rad)*Math.cos(tick));
    //console.log(camera.position);
    camera.lookAt(0,0,0);
    let type = document.getElementById("funct").value;
    let y_int = document.getElementById("slider").value;
    leftB = Math.floor(parseFloat(document.getElementById("leftB").value));
    rightB = Math.floor(parseFloat(document.getElementById("rightB").value));
    if (type == "sqrt") {
        let s = parseFloat(document.getElementById("inputS").value);
        let amp = parseFloat(document.getElementById("inputAmp").value);
        createSqrtSpheres(s, parseFloat(y_int), amp, leftB, rightB);
        if (amp == 1 && y_int == "0" && s == 0) {
            document.getElementById("function").innerText = `y = √x`;
        }
        else if (amp == 1 && y_int == "0") {
            document.getElementById("function").innerText = `y = √(x+${s})`;
        }
        else if (y_int == "0" && s == 0) {
            document.getElementById("function").innerText = `y = ${amp}√x`;
        }
        else if (amp == 1 && s == 0) {
            document.getElementById("function").innerText = `y = √x + ${y_int}`;
        }
        else if (amp == 1) {
            document.getElementById("function").innerText = `y = √(x+${s}) + ${y_int}`;
        }
        else if (y_int == "0") {
            document.getElementById("function").innerText = `y = ${amp}√(x+${s})`;
        }
        else if (s == 0) {
            document.getElementById("function").innerText = `y = ${amp}√x + ${y_int}`;
        }
        else {
            document.getElementById("function").innerText = `y = ${amp}√(x+${s}) + ${y_int}`;
        }
    }
    else if (type == "poly") {
        createPolySpheres();
        let functioner = "y = ";
        for (let i = 0; i < parseFloat(document.getElementById("n").value); i++) {
            if (i == 0) {
                if (parseFloat(document.getElementById(`a${i}`).value) != 0) {
                    functioner += `${document.getElementById(`a${i}`).value}x<sup>${parseFloat(document.getElementById("n").value)-i}</sup>`;
                }
            }
            else {
                if (parseFloat(document.getElementById(`a${i}`).value) != 0) {
                functioner += ` + ${document.getElementById(`a${i}`).value}x<sup>${parseFloat(document.getElementById("n").value)-i}</sup>`;}
            }
        }
        if (parseFloat(y_int) == 0) {
            functioner += ``;
        }
        else if (parseFloat(y_int) < 0) {
            functioner += ` - ${Math.abs(parseFloat(y_int))}`;
        }
        else if (parseFloat(y_int) > 0) {
            functioner += ` + ${Math.abs(parseFloat(y_int))}`;
        }
        document.getElementById("function").innerHTML = functioner;
    }
    else if (type == "log"){
        createLogSpheres();
        if (document.getElementById("Alog").value == "1" && document.getElementById("Slog").value == "0" && y_int == "0") {
            document.getElementById("function").innerHTML = "y = ln(x)";
        }
        else if (document.getElementById("Alog").value == "1" && document.getElementById("Slog").value == "0") {
            document.getElementById("function").innerHTML = `y = ln(x) + ${y_int}`;
        }
        else if (document.getElementById("Alog").value == "1" && y_int == "0") {
            document.getElementById("function").innerHTML =`y = ln(x + ${document.getElementById(Slog).value})`;
        }
        else if (document.getElementById("Slog").value == "0" && y_int == "0") {
            document.getElementById("function").innerHTML = `y = ${document.getElementById("Alog").value}ln(x)`;
        }
        else if (document.getElementById("Slog").value == "0") {
            document.getElementById("function").innerHTML = `y = ${document.getElementById("Alog").value}ln(x) + ${y_int}`;
        } 
        else if (y_int == "0") {
            document.getElementById("function").innerHTML = `y = ${document.getElementById("Alog").value}ln(x + ${document.getElementById("Slog").value})`;
        }
        else if (document.getElementById("Alog").value == "1") {
            document.getElementById("function").innerHTML = `y = ln(x + ${document.getElementById("Slog").value}) + ${y_int}`;
        }
        else {
            document.getElementById("function").innerHTML = `y = ${document.getElementById("Alog").value}ln(x + ${document.getElementById("Slog").value}) + ${y_int}`;
        }

    }
    document.getElementById("vol").innerText = `Volume ≈ ${vol}π`;

    if (keyPressed == 40) {
        rad += 1;
    }
    else if (keyPressed == 38) {
        rad -= 1;
    }
    else if (keyPressed == 39) {
        tick += 0.025;
    } 
    else if (keyPressed == 37) {
        tick -= 0.025;
    }

    renderer.render(scene, camera);
}

function changeBG() {
    if (bgState == 0) {
        bgState = 1;
        scene.background = Darkbackground;
        document.getElementById("body").style.color = 'white';
        document.getElementById("change").innerText = "Light Theme";
    }
    else if (bgState == 1) {
        bgState = 0;
        scene.background = Lightbackground;
        document.getElementById("body").style.color = "rgb(52,52,52)";
        document.getElementById("change").innerText = "Dark Theme";
    }
}

init();
animate();