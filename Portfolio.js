let scene, camera, renderer, sphere, pointLight, sun, sunLight, star, starLight, venus, mercury, moon;

let deg = 0;
let Vdeg = 0;
let Mdeg = 0;
let Ydeg = 0;
let marsDeg = 0;
let jupiterDeg = 0;
let saturnDeg = 7*Math.PI/6;
let uranusDeg = Math.PI/1.5;
let neptuneDeg = -1*Math.PI/4
let plutoDeg = 0;
let radius = 40;
let rad = 4.5;
let swayDeg = -1;
let pos_y = 2;
let state = "earth";
let k = 1;
let t = 1;

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
    const sunGeo = new THREE.SphereGeometry(10, 32, 16);
    const sunMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: sunTexture});
    sun = new THREE.Mesh(sunGeo, sunMaterial);
    sun.position.set (0,0,0);
    sun.metalness = 1;
    sun.name = "Sun";
    scene.add(sun);

    const venusTexture = new THREE.TextureLoader().load('/Imgs/VenusMap2.jpg');
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

    const marsTexture = new THREE.TextureLoader().load('/Imgs/Mars_Map.webp');
    const marsGeo = new THREE.SphereGeometry(1.75, 32, 16);
    const marsMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: marsTexture});
    mars = new THREE.Mesh(marsGeo, marsMaterial);
    mars.position.set(0,0,0);
    mars.name = "Mars";
    scene.add(mars);

    const jupiterTexture = new THREE.TextureLoader().load('/Imgs/Jupiter_map.jpg');
    const jupiterGeo = new THREE.SphereGeometry(5, 32, 16);
    const jupiterMaterial = new THREE.MeshStandardMaterial({color: 0xaaaaaa, map: jupiterTexture});
    jupiter = new THREE.Mesh(jupiterGeo, jupiterMaterial);
    jupiter.position.set(0,0,0);
    jupiter.name = "Jupiter";
    scene.add(jupiter);

    const saturnTexture = new THREE.TextureLoader().load('/Imgs/SaturnMap.jpg');
    const saturnGeo = new THREE.SphereGeometry(4.5, 32, 16);
    const saturnMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: saturnTexture});
    saturn = new THREE.Mesh(saturnGeo, saturnMaterial);
    saturn.position.set(0,0,0);
    saturn.name = "Saturn";
    scene.add(saturn);
    const saturnRingTexture = new THREE.TextureLoader().load('/Imgs/SaturnRingMap2.png');
    const saturnRingGeo = new THREE.RingGeometry(5.5, 7, 32);
    const saturnRingMaterial = new THREE.MeshStandardMaterial({color: 0xffffaa, side: THREE.DoubleSide, map:saturnRingTexture});
    saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMaterial);
    saturnRing.rotation.x = (Math.PI)/2;
    scene.add(saturnRing);

    const uranusTexture = new THREE.TextureLoader().load('/Imgs/UranusMap.jpg');
    const uranusGeo = new THREE.SphereGeometry(3.5, 32, 16);
    const uranusMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map:uranusTexture});
    uranus = new THREE.Mesh(uranusGeo, uranusMaterial);
    uranus.position.set(0,0,0);
    uranus.name = "Uranus";
    scene.add(uranus);
    const uranusRingTexture = new THREE.TextureLoader().load('/Imgs/UranusRingMap.jpg');
    const uranusRingGeo = new THREE.RingGeometry(4.5, 5.25, 32, 16);
    const uranusRingMaterial = new THREE.MeshStandardMaterial({color: 0x99aaff, side: THREE.DoubleSide, metalness: 0.5});
    uranusRing = new THREE.Mesh(uranusRingGeo, uranusRingMaterial);
    scene.add(uranusRing);

    const neptuneTexture = new THREE.TextureLoader().load('Imgs/neptuneMap.png');
    const neptuneGeo = new THREE.SphereGeometry(2.75, 32, 16);
    const neptuneMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map:neptuneTexture});
    neptune = new THREE.Mesh(neptuneGeo, neptuneMaterial);
    neptune.position.set(0,0,0);
    neptune.name = "Neptune";
    scene.add(neptune);
    
    const plutoTexture = new THREE.TextureLoader().load('/Imgs/plutoMap.jpg');
    const plutoGeo = new THREE.SphereGeometry(0.75, 32, 16);
    const plutoMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: plutoTexture});
    pluto = new THREE.Mesh(plutoGeo, plutoMaterial);
    pluto.name = "Pluto";
    scene.add(pluto);

    pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 0, 0);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    //scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.875);
    scene.add(ambientLight);
    const gridHelper = new THREE.GridHelper(100, 10);
    //scene.add(gridHelper);

    sunLight1 = new THREE.PointLight(0xffffff, 0.5);
    sunLight1.position.set(0,20,0);
    scene.add(sunLight1);
    sunLight2 = new THREE.PointLight(0xffffff, 0.5);
    sunLight2.position.set(20,0,0);
    scene.add(sunLight2);
    sunLight3 = new THREE.PointLight(0xffffff, 0.5);
    sunLight3.position.set(-20,0,0);
    scene.add(sunLight3);
    sunLight4 = new THREE.PointLight(0xffffff, 0.5);
    sunLight4.position.set(0,0,20);
    scene.add(sunLight4);
    sunLight5 = new THREE.PointLight(0xffffff, 0.5);
    sunLight5.position.set(0,0,-20);
    scene.add(sunLight5);
    sunLight6 = new THREE.PointLight(0xffffff, 0.5);
    sunLight6.position.set(0,-20,0);
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
        let randX = 100 * Math.cos(Math.random() * Math.PI);
        let randY = Math.random();
        let x, z;
        if (randX >= 0 && randY > 0.5) {
            x = randX + (Math.random() * 200);
            z = Math.sqrt((100**2) - (randX**2)) + (Math.random() * 200);
        }
        else if (randX >= 0 && randY <= 0.5) {
            x = randX + (Math.random() * 200);
            z = -1 * Math.sqrt((100**2) - (randX**2)) - (Math.random() * 200);
        }
        else if (randX < 0 && randY > 0.5) {
            x = randX - (Math.random() * 200);
            z = Math.sqrt((100**2) - (randX**2)) + (Math.random() * 200);
        }
        else if (randX < 0 && randY ) {
            x = randX - (Math.random() * 200);
            z = -1 * Math.sqrt((100**2) - (randX**2)) - (Math.random() * 200);
        }
        let y = Math.floor(40 * Math.sin(Math.random() * 2 * Math.PI));
        star.position.set(x, y, z);
        if (i % 4) {
           starLight = new THREE.PointLight(0xffffff, 0.005);
           starLight.position.set(x,y,z);
        }
        scene.add(star, starLight);
        //console.log(star.position);
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
            else if (intersects[i].object.name == "Mars") {
                pI.innerText = "Mars";
                pI.style.color = "#ff9900";
            }
            else if (intersects[i].object.name == "Jupiter") {
                pI.innerText = "Jupiter";
                pI.style.color = "#ffff00";
            }
            else if (intersects[i].object.name == "Saturn") {
                pI.innerText = "Saturn";
                pI.style.color = "#ffff99";
            }
            else if (intersects[i].object.name == "Uranus") {
                pI.innerText = "Uranus";
                pI.style.color = "#77aaff";
            }
            else if (intersects[i].object.name == "Neptune") {
                pI.innerText = "Neptune";
                pI.style.color = "#0044ff";
            }
            else if (intersects[i].object.name == "Pluto") {
                pI.innerText = "Pluto";
                pI.style.color = "#bb33ff";
            }
        }
    }
    else {
        document.getElementById("planetIndicator").innerText = "";
    }
}

function assignState() {
    let preState = state;
    let PIText = document.getElementById("planetIndicator").innerText;
    if (PIText == "Earth") {
        state = "earth";
    }
    else if (PIText == "Venus") {
        state = "venus";
    }
    else if (PIText == "Mercury") {
        state = "mercury";
    }
    else if (PIText == "Sun") {
        state = "sun";
    }
    else if (PIText == "Moon") {
        state = "moon";
    }
    else if (PIText == "Mars") {
        state = "mars";
    }
    else if (PIText == "Jupiter") {
        state = "jupiter";
    }
    else if (PIText == "Saturn") {
        state = "saturn";
    }
    else if (PIText == "Uranus") {
        state = "uranus";
    }
    else if (PIText == "Neptune") {
        state = "neptune";
    }
    else if (PIText == "Pluto") {
        state = "pluto";
    }
    if (preState != state) {
        pos_y = 2;
        rad = 4.5;
        if (PIText == "Jupiter" || PIText == "Saturn" || PIText == "Uranus") {
            rad = 10;
        }
        else if (PIText == "Neptune") {
            rad = 7;
        }
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

    sphere.rotation.y += t*0.02;
    sphere.position.x = 40 * Math.cos(deg);
    sphere.position.z = 40 * Math.sin(deg);

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
        document.getElementById("timeSliderDiv").style.visibility = "visible";
        t = parseFloat(document.getElementById("timeSlider").value);
        let timeFactor = Math.floor((365.25/10.33)*t);
        document.getElementById("timeDisp").innerText = `${timeFactor} days/second`    

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
        else if (state == "mars") {
            k = 1;
            camera.position.x = mars.position.x + (rad*Math.cos(marsDeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.position.z = mars.position.z + (rad*Math.sin(marsDeg + parseFloat(swayDeg)));
            camera.lookAt(mars.position.x, mars.position.y, mars.position.z);
        }
        else if (state == "jupiter") {
            k = 1;
            camera.position.x = jupiter.position.x + (rad*Math.cos(jupiterDeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.position.z = jupiter.position.z + (rad*Math.sin(jupiterDeg + parseFloat(swayDeg)));
            camera.lookAt(jupiter.position.x, jupiter.position.y, jupiter.position.z);
        }
        else if (state == "saturn") {
            k = 1;
            camera.position.x = saturn.position.x + (rad*Math.cos(saturnDeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.position.z = saturn.position.z + (rad*Math.sin(saturnDeg + parseFloat(swayDeg)));
            camera.lookAt(saturn.position.x, saturn.position.y, saturn.position.z);
        }
        else if (state == "uranus") {
            k = 1;
            camera.position.x = uranus.position.x + (rad*Math.cos(uranusDeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.position.z = uranus.position.z + (rad*Math.sin(uranusDeg + parseFloat(swayDeg)));
            camera.lookAt(uranus.position.x, uranus.position.y, uranus.position.z);
        }
        else if (state == "neptune") {
            k = 1;
            camera.position.x = neptune.position.x + (rad*Math.cos(neptuneDeg + parseFloat(swayDeg)));
            camera.position.y = pos_y;
            camera.position.z = neptune.position.z + (rad*Math.sin(neptuneDeg + parseFloat(swayDeg)));
            camera.lookAt(neptune.position.x, neptune.position.y, neptune.position.z);
        }
        else if (state == "pluto") {
            k = 0.1;
            camera.position.x = pluto.position.x + (rad*Math.cos(plutoDeg + parseFloat(swayDeg)));
            camera.position.y = pluto.position.y + pos_y;
            camera.position.z = pluto.position.z + (rad*Math.sin(plutoDeg + parseFloat(swayDeg)));
            camera.lookAt(pluto.position.x, pluto.position.y, pluto.position.z);
        }
    }
    else {
        let k =1;
        document.getElementById("swipeZone").style.zIndex = "initial";
        document.getElementById("sim").style.zIndex = "initial";
        camera.position.x = 45 * Math.cos(deg - 0.1);
        camera.position.z = 45 * Math.sin(deg - 0.1);
        camera.position.y = 2;
        camera.lookAt(sphere.position.x, 0, sphere.position.z);
        //document.getElementById("earthDiv").style.visibility = "hidden";
        //document.getElementById("venusDiv").style.visibility = "hidden";
        //document.getElementById("mercuryDiv").style.visibility = "hidden";
        document.getElementById("simSwitch").innerHTML = "OFF";
        document.getElementById("directions").style.visibility = "hidden";
        document.getElementById("about").style.visibility = "visible";
        document.getElementById("planetIndicator").style.visibility = "hidden";
        document.getElementById("timeSliderDiv").style.visibility = "hidden";
        rad = 5;
        t = 1;
    }
    //testSphere.position.x = sphere.position.x + (3*Math.cos(deg + parseFloat(swayDeg)));
    //testSphere.position.z = sphere.position.z + (3*Math.sin(deg + parseFloat(swayDeg)));
    moon.position.x = sphere.position.x + 5*Math.cos(2 * deg);
    moon.position.z = sphere.position.z + 5*Math.sin(2 * deg);
    moon.position.y = 1.3*Math.sin(deg);
    //pointLight.position.x = 10 * Math.cos(deg-0.1);
    //pointLight.position.z = 10 * Math.sin(deg-0.1);
    venus.position.x = 27 * Math.cos(Vdeg);
    venus.position.z = 27 * Math.sin(Vdeg);
    mercury.position.x = 21 * Math.cos(Mdeg);
    mercury.position.z = 21 * Math.sin(Mdeg);
    mercury.rotation.y -= t*0.02;
    mars.position.x = 55 * Math.cos(marsDeg);
    mars.position.z = 55 * Math.sin(marsDeg);
    mars.rotation.y += t*0.01;
    jupiter.position.x = 70 * Math.cos(jupiterDeg);
    jupiter.position.z = 70 * Math.sin(jupiterDeg);
    jupiter.rotation.y += t*0.0005
    saturn.position.x = 90 * Math.cos(saturnDeg);
    saturn.position.z = 90 * Math.sin(saturnDeg);
    saturn.position.y = -0.5;
    saturn.rotation.y += t*0.001;
    saturnRing.position.x = saturn.position.x;
    saturnRing.position.z = saturn.position.z;
    saturnRing.position.y = saturn.position.y;
    uranus.position.x = 105 * Math.cos(uranusDeg);
    uranus.position.z = 105 * Math.sin(uranusDeg);
    uranus.rotation.y += t*0.003;
    uranusRing.position.x = uranus.position.x;
    uranusRing.position.z = uranus.position.z;
    uranusRing.rotation.x = Math.PI/4;
    neptune.position.x = 120 * Math.cos(neptuneDeg);
    neptune.position.z = 120 * Math.sin(neptuneDeg);
    neptune.rotation.y += t*0.005;
    let plutoRad = (135*(1-((.15)**2)))/(1+(0.15*Math.cos(plutoDeg)));
    pluto.position.x = (plutoRad) * Math.cos(plutoDeg)
    pluto.position.y = (plutoRad) * Math.tan(Math.cos(plutoDeg)*(17*Math.PI/180));
    pluto.position.z = (plutoRad) * Math.sin(plutoDeg)
    //sphere.rotation.z += 0.01;

    if(deg < Math.PI * 2) {
        deg += t*0.01;
    }
    else if (deg >= Math.PI * 2) {
        deg = 0;
    }
    Vdeg += t*0.012;
    Mdeg += t*0.02;
    marsDeg += t*0.005;
    jupiterDeg += t*0.00085;
    saturnDeg += t*0.00034;
    uranusDeg += t*0.00012;
    neptuneDeg += t*0.00000017;
    plutoDeg += t*0.00000011;
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