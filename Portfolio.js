let scene, camera, renderer, sphere, pointLight, sun, sunLight, star, starLight, venus, mercury, moon;

let deg = 0;
let Vdeg = 0;
let Mdeg = 0;
let Ydeg = 0;
let radius = 40;
let rad = 4.5;
let swayDeg = -1;
let pos_y = 2;
let state = "earth";
let k = 1;

// movement stuff
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
            swayDeg += 0.0005*Math.abs(event.clientX-startX);
        }
        else if ((event.clientX - startX) < 0) {
            swayDeg -= 0.0005*Math.abs(event.clientX-startX);
        }
        if ((event.clientY - startY) > 0) {
            pos_y += k*0.001*Math.abs(event.clientY-startY);
        }
        else if ((event.clientY - startY) < 0) {
         pos_y -= k*0.001*Math.abs(event.clientY-startY);
        }
    }
});

let keyPressed = 0;

window.onkeydown = keyCheckDown;

function keyCheckDown() {
    let e = window.event;
    if (e.keyCode == '38') {
        keyPressed = 38;
    }
    else if (e.keyCode == '40') {
        keyPressed = 40;
    }
    document.body.classList.add("stop-scrolling");
}

window.onkeyup = keyCheckUp;

function keyCheckUp() {
    keyPressed = 0;
    document.body.classList.remove("stop-scrolling");
}

window.addEventListener("mousemove", function (event) {
    let x = event.clientX;
    let y = event.clientY;

    document.getElementById("planetIndicator").style = `position: absolute; left: ${x}px; top: ${y}px;`
    //document.getElementById("myCircleText").innerText = `x: ${x}, y:${y}`;
})

// Make rayCaster stuff
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

window.addEventListener( 'pointermove', onPointerMove );

window.addEventListener( 'mousedown', assignState );


function init() {
    scene = new THREE.Scene();
    const background = new THREE.TextureLoader().load('/Imgs/SpaceBackground2.png');
    scene.background = background;

    camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antiaias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    camera.position.set(0,2,33);
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);

    const sphereTexture = new THREE.TextureLoader().load('/Imgs/EarthMap.jpeg');
    const sphereGeo = new THREE.SphereGeometry(2,32,16);
    const sphereMaterial = new THREE.MeshStandardMaterial({color:0xffffff, wireframe: false, map:sphereTexture});
    sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(0,0,0);
    sphere.roughness = 1;
    sphere.metalness = 1;
    sphere.name = "Earth";
    scene.add(sphere);

    const sunTexture = new THREE.TextureLoader().load('/Imgs/Sun2Map.jpeg');
    const sunGeo = new THREE.SphereGeometry(4.5, 32, 16);
    const sunMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: sunTexture});
    sun = new THREE.Mesh(sunGeo, sunMaterial);
    sun.position.set (0,0,0);
    sun.metalness = 1;
    sun.name = "Sun";
    scene.add(sun);

    const venusTexture = new THREE.TextureLoader().load('/Imgs/VenusMap.jpeg');
    const venusGeo = new THREE.SphereGeometry(1.5, 32, 16);
    const venusMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: venusTexture});
    venus = new THREE.Mesh(venusGeo, venusMaterial);
    venus.position.set(0,0,17);
    venus.name = "Venus";
    scene.add(venus);

    const mercuryTexture = new THREE.TextureLoader().load('/Imgs/MercuryMap.png');
    const mercuryGeo = new THREE.SphereGeometry(0.5, 32, 16);
    const mercuryMaterial = new THREE.MeshStandardMaterial({color: 0xfffffff, map:mercuryTexture});
    mercury = new THREE.Mesh(mercuryGeo, mercuryMaterial);
    mercury.position.set(0,0,11);
    mercury.name = "Mercury";
    scene.add(mercury);

    const moonTexture = new THREE.TextureLoader().load('/Imgs/MoonTexture.jpeg');
    const moonGeo = new THREE.SphereGeometry(0.5, 31, 16);
    const moonMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: moonTexture});
    moon = new THREE.Mesh(moonGeo, moonMaterial);
    moon.position.set(0,0,0);
    moon.roughness = 1;
    moon.metalness = 0;
    moon.name = "Moon";
    scene.add(moon);

    pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 0, 0);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    //scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const gridHelper = new THREE.GridHelper(100, 10);
    //scene.add(gridHelper);

    sunLight1 = new THREE.PointLight(0xffffff, 0.5);
    sunLight1.position.set(0,10,0);
    scene.add(sunLight1);
    sunLight2 = new THREE.PointLight(0xffffff, 0.5);
    sunLight2.position.set(10,0,0);
    scene.add(sunLight2);
    sunLight3 = new THREE.PointLight(0xffffff, 0.5);
    sunLight3.position.set(-10,0,0);
    scene.add(sunLight3);
    sunLight4 = new THREE.PointLight(0xffffff, 0.5);
    sunLight4.position.set(0,0,10);
    scene.add(sunLight4);
    sunLight5 = new THREE.PointLight(0xffffff, 0.5);
    sunLight5.position.set(0,0,-10);
    scene.add(sunLight5);
    sunLight6 = new THREE.PointLight(0xffffff, 0.5);
    sunLight6.position.set(0,-10,0);
    scene.add(sunLight6);


    /*const testGeo = new THREE.SphereGeometry(1, 31, 16);
    const testMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
    testSphere = new THREE.Mesh(testGeo, testMaterial);
    testSphere.position.set(0,3,33);
    scene.add(testSphere);*/

    const starGeo = new THREE.SphereGeometry(0.5,32,16);
    const starMaterial = new THREE.MeshStandardMaterial({color: 0xfff987});
    for (let i = 1; i <= 120; i++) {
        star = new THREE.Mesh(starGeo, starMaterial);
        let randX = 75 * Math.cos(Math.random() * Math.PI);
        let randY = Math.random();
        let x, z;
        if (randX >= 0 && randY > 0.5) {
            x = randX + (Math.random() * 200);
            z = Math.sqrt((75**2) - (randX**2)) + (Math.random() * 200);
        }
        else if (randX >= 0 && randY <= 0.5) {
            x = randX + (Math.random() * 200);
            z = -1 * Math.sqrt((75**2) - (randX**2)) - (Math.random() * 200);
        }
        else if (randX < 0 && randY > 0.5) {
            x = randX - (Math.random() * 200);
            z = Math.sqrt((75**2) - (randX**2)) + (Math.random() * 200);
        }
        else if (randX < 0 && randY ) {
            x = randX - (Math.random() * 200);
            z = -1 * Math.sqrt((75**2) - (randX**2)) - (Math.random() * 200);
        }
        let y = Math.floor(30 * Math.sin(Math.random() * 2 * Math.PI));
        star.position.set(x, y, z);
        if (i % 4) {
           starLight = new THREE.PointLight(0xffffff, 0.025);
           starLight.position.set(x,y,z);
        }
        scene.add(star, starLight);
        console.log(star.position);
    }
 
}

/*function overRuleViewPoint() {
    let earthCheck = document.getElementById("checkEarth").checked;
    let venusCheck = document.getElementById("checkVenus").checked;
    let mercuryCheck = document.getElementById("checkMercury").checked;
    if (state == "earth" && venusCheck == true) {
        document.getElementById("checkEarth").checked = false;
        state = "venus";
    }
    else if (state == "earth" && mercuryCheck == true) {
        document.getElementById("checkEarth").checked = false;
        state = "mercury";
    }
    else if (state == "venus" && earthCheck == true) {
        document.getElementById("checkVenus").checked = false;
        state = "earth";
    }
    else if (state == "venus" && mercuryCheck == true) {
        document.getElementById("checkVenus").checked = false;
        state = "mercury";
    }
    else if (state = "mercury" && earthCheck == true) {
        document.getElementById("checkMercury").checked = false;
        state = "earth";
    }
    else if (state = "mercury" && venusCheck == true) {
        document.getElementById("checkMercury").checked = false;
        state = "venus";
    }
    if (state == "earth") {
        document.getElementById("checkEarth").checked = true;
    }
    else if (state == "venus") {
        document.getElementById("checkVenus").checked = true;
    }
    else if (state == "mercury") {
        document.getElementById("checkMercury").checked = true;
    }
    //console.log(state);
}*/

function checkRays() {
    let pI = document.getElementById("planetIndicator");
    raycaster.setFromCamera(pointer, camera);
    let intersects = raycaster.intersectObjects( scene.children );

    if (intersects.length > 0) {
        for (let i = 0; i < intersects.length; i++) {
            if (intersects[i].object.name == "Earth") {
                pI.innerText = "Earth";
                pI.style.color = "#55ff66";
            }
            else if (intersects[i].object.name == "Venus") {
                pI.innerText = "Venus";
                pI.style.color = "red";
            }
            else if (intersects[i].object.name == "Mercury") {
                pI.innerText = "Mercury";
                pI.style.color = "lightblue";
            }
            else if (intersects[i].object.name == "Sun") {
                pI.innerText = "Sun";
                pI.style.color = "white";
            }
            else if (intersects[i].object.name == "Moon") {
                pI.innerText = "Moon";
                pI.style.color = "#dddddd";
            }
        }
    }
    else {
        document.getElementById("planetIndicator").innerText = "";
    }
}

function assignState() {
    let preState = state;
    if (document.getElementById("planetIndicator").innerText == "Earth") {
        state = "earth";
    }
    else if (document.getElementById("planetIndicator").innerText == "Venus") {
        state = "venus";
    }
    else if (document.getElementById("planetIndicator").innerText == "Mercury") {
        state = "mercury";
    }
    else if (document.getElementById("planetIndicator").innerText == "Sun") {
        state = "sun";
    }
    else if (document.getElementById("planetIndicator").innerText == "Moon") {
        state = "moon";
    }
    if (preState != state) {
        pos_y = 2;
        rad = 4.5;
        swayDeg = -1;
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (mouseDown > 1) {
        mouseDown = 0;
    }
    if (mouseDown < 1) {
        mouseDown = 0;
    }
    if (keyPressed == 38) {
        rad -= 0.25;
    }
    else if(keyPressed == 40) {
        rad += 0.25;
    }

    sphere.rotation.y += 0.01;
    sphere.position.x = 30 * Math.cos(deg);
    sphere.position.z = 30 * Math.sin(deg);

    let simCheck = document.getElementById("sim").checked;
    if (simCheck == true) {
        document.getElementById("swipeZone").style.zIndex = "100";
        document.getElementById("simSwitch").style.zIndex = "101";
        document.getElementById("planetIndicator").style.visibility = "visible";
        //overRuleViewPoint();
        checkRays();
        //document.getElementById("earthDiv").style.visibility = "visible";
        //document.getElementById("venusDiv").style.visibility = "visible";
        //document.getElementById("mercuryDiv").style.visibility = "visible";
        document.getElementById("simSwitch").innerHTML = "ON";
        document.getElementById("directions").style.visibility = "visible";
        document.getElementById("about").style.visibility = "hidden";
        //if (document.getElementById("checkEarth").checked == true) {
        if (state == "earth") {
            let k = 1;
            camera.position.x = sphere.position.x + (rad*Math.cos(deg + parseFloat(swayDeg)));
            camera.position.z = sphere.position.z + (rad*Math.sin(deg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.lookAt(sphere.position.x,0,sphere.position.z);
        }
        //else if (document.getElementById("checkVenus").checked == true) {
        else if (state == "venus") {
            let k =1;
            camera.position.x = venus.position.x + (rad*Math.cos(Vdeg + parseFloat(swayDeg)));
            camera.position.z = venus.position.z + (rad*Math.sin(Vdeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.lookAt(venus.position.x, 0, venus.position.z);
        }
        else if (state == "mercury") {
            let k =1;
            camera.position.x = mercury.position.x + (rad*Math.cos(Mdeg + parseFloat(swayDeg)));
            camera.position.z = mercury.position.z + (rad*Math.sin(Mdeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.lookAt(mercury.position.x, 0, mercury.position.z);
        }
        else if (state == "sun") {
            k = 2;
            camera.position.x = (40+rad) * Math.cos(parseFloat(swayDeg));
            camera.position.z = (40+rad) * Math.sin(parseFloat(swayDeg));
            camera.position.y = pos_y;
            camera.lookAt(0,0,0);
        }
        else if (state == "moon") {
            k = 0.1;
            camera.position.x = moon.position.x + (rad*Math.cos( (2*deg) + parseFloat(swayDeg) ));
            camera.position.y = moon.position.y + pos_y - 1.5;
            camera.position.z = moon.position.z + (rad*Math.sin( (2*deg) + parseFloat(swayDeg) ))
            camera.lookAt(moon.position.x, moon.position.y, moon.position.z);
        }
    }
    else {
        let k =1;
        document.getElementById("swipeZone").style.zIndex = "initial";
        document.getElementById("sim").style.zIndex = "initial";
        camera.position.x = 35 * Math.cos(deg - 0.1);
        camera.position.z = 35 * Math.sin(deg - 0.1);
        camera.position.y = 2;
        camera.lookAt(sphere.position.x, 0, sphere.position.z);
        //document.getElementById("earthDiv").style.visibility = "hidden";
        //document.getElementById("venusDiv").style.visibility = "hidden";
        //document.getElementById("mercuryDiv").style.visibility = "hidden";
        document.getElementById("simSwitch").innerHTML = "OFF";
        document.getElementById("directions").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "visible";
        document.getElementById("planetIndicator").style.visibility = "hidden";
        rad = 5;
    }
    //testSphere.position.x = sphere.position.x + (3*Math.cos(deg + parseFloat(swayDeg)));
    //testSphere.position.z = sphere.position.z + (3*Math.sin(deg + parseFloat(swayDeg)));
    moon.position.x = sphere.position.x + 5*Math.cos(2 * deg);
    moon.position.z = sphere.position.z + 5*Math.sin(2 * deg);
    moon.position.y = 1.3*Math.sin(deg);
    //pointLight.position.x = 10 * Math.cos(deg-0.1);
    //pointLight.position.z = 10 * Math.sin(deg-0.1);
    venus.position.x = 17 * Math.cos(Vdeg);
    venus.position.z = 17 * Math.sin(Vdeg);
    mercury.position.x = 11 * Math.cos(Mdeg);
    mercury.position.z = 11 * Math.sin(Mdeg);
    mercury.rotation.y -= 0.02;
    //sphere.rotation.z += 0.01;

    if(deg < Math.PI * 2) {
        deg += 0.01;
    }
    else if (deg >= Math.PI * 2) {
        deg = 0;
    }
    Vdeg += 0.012;
    Mdeg += 0.02;
    //camera.lookAt(0,0,0);

    renderer.render(scene, camera);
    //console.log("Sphere X: " + sphere.position.x, "Sphere Z: " + sphere.position.z, "Moon X: " + moon.position.x, "Moon Z: " + moon.position.z);
    //console.log("value:" + swayDeg + "X:" + testSphere.position.x, "Z:" + testSphere.position.z);
    //console.log(parseFloat(swayDeg));
}



function Reveal() {
    document.getElementById("contactInfo").style.visibility = "visible";
    console.log("revealed");
}

init();
animate();