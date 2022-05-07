let scene, camera, renderer, sphere, pointLight, sun, sunLight, star, starLight, venus, mercury, moon;

let deg = 0;
let Vdeg = 0;
let Mdeg = 0;

function init() {
    scene = new THREE.Scene();
    const background = new THREE.TextureLoader().load('/Imgs/SpaceBackground.jpeg');
    scene.background = background;

    camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antiaias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    camera.position.set(0,3,34);
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);

    const sphereTexture = new THREE.TextureLoader().load('/Imgs/EarthMap.jpeg');
    const sphereGeo = new THREE.SphereGeometry(2,32,16);
    const sphereMaterial = new THREE.MeshStandardMaterial({color:0xffffff, wireframe: false, map:sphereTexture});
    sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(0,0,0);
    sphere.roughness = 0.5;
    scene.add(sphere);

    const sunTexture = new THREE.TextureLoader().load('/Imgs/SunMap.jpeg');
    const sunGeo = new THREE.SphereGeometry(4.5, 32, 16);
    const sunMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: sunTexture});
    sun = new THREE.Mesh(sunGeo, sunMaterial);
    sun.position.set (0,0,0);
    sun.metalness = 1;
    scene.add(sun);

    const venusTexture = new THREE.TextureLoader().load('/Imgs/VenusMap.jpeg');
    const venusGeo = new THREE.SphereGeometry(1.5, 32, 16);
    const venusMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: venusTexture});
    venus = new THREE.Mesh(venusGeo, venusMaterial);
    venus.position.set(0,0,17);
    scene.add(venus);

    const mercuryTexture = new THREE.TextureLoader().load('/Imgs/MercuryMap.png');
    const mercuryGeo = new THREE.SphereGeometry(0.5, 32, 16);
    const mercuryMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map:mercuryTexture});
    mercury = new THREE.Mesh(mercuryGeo, mercuryMaterial);
    mercury.position.set(0,0,11);
    scene.add(mercury);

    const moonTexture = new THREE.TextureLoader().load('/Imgs/MoonTexture.jpeg');
    const moonGeo = new THREE.SphereGeometry(0.5, 31, 16);
    const moonMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: moonTexture});
    moon = new THREE.Mesh(moonGeo, moonMaterial);
    moon.position.set(0,0,0);
    scene.add(moon);

    pointLight = new THREE.PointLight(0xffffff, 4);
    pointLight.position.set(0, 0, 10);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(pointLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const gridHelper = new THREE.GridHelper(100, 10);
    //scene.add(gridHelper);

    const starGeo = new THREE.SphereGeometry(3,32,16);
    const starMaterial = new THREE.MeshStandardMaterial({color: 0xfff987});
    for (let i = 1; i < 5; i++) {
        if (i == 1) {
            star = new THREE.Mesh(starGeo, starMaterial);
            starLight = new THREE.PointLight(0xffffff, 0.2);
            let x = Math.floor(Math.random() * 30) + 35;
            let y = Math.floor(Math.random() * 10);
            let z = Math.floor(Math.random() * 30) + 35;
            star.position.set(x, y, z);
            starLight.position.set(x,y,z);
            scene.add(star, starLight);
            console.log(star.position);
        }
        else if (i == 2) {
            star = new THREE.Mesh(starGeo, starMaterial);
            starLight = new THREE.PointLight(0xffffff, 0.2);
            let x = Math.floor(Math.random() * -35) - 35;
            let y = Math.floor(Math.random() * -5);
            let z = Math.floor(Math.random() * 35) + 35;
            star.position.set(x, y, z);
            starLight.position.set(x,y,z);
            scene.add(star, starLight);
            console.log(star.position);
        }
        else if (i == 3) {
            star = new THREE.Mesh(starGeo, starMaterial);
            starLight = new THREE.PointLight(0xffffff, 0.2);
            let x = Math.floor(Math.random() * -35) - 35;
            let y = Math.floor(Math.random() * 5);
            let z = Math.floor(Math.random() * -35) - 35;
            star.position.set(x, y, z);
            starLight.position.set(x,y,z);
            scene.add(star, starLight);
            console.log(star.position);
        }
        else if (i == 4) {
            star = new THREE.Mesh(starGeo, starMaterial);
            starLight = new THREE.PointLight(0xffffff, 0.2);
            let x = Math.floor(Math.random() * 35) + 35;
            let y = Math.floor(Math.random() * -5);
            let z = Math.floor(Math.random() * -35) - 35;
            star.position.set(x, y, z);
            starLight.position.set(x,y,z);
            scene.add(star, starLight);
            console.log(star.position);
        }
    }
 
}

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.01;
    sphere.position.x = 30 * Math.cos(deg);
    sphere.position.z = 30 * Math.sin(deg);
    camera.position.x = 33 * Math.cos(deg-0.1);
    camera.position.z = 33 * Math.sin(deg-0.1);
    moon.position.x = sphere.position.x + 5*Math.cos(2.5*deg);
    moon.position.z = sphere.position.z + 5*Math.sin(2.5*deg);
    moon.position.y = 1.3*Math.sin(deg);
    pointLight.position.x = 10 * Math.cos(deg-0.1);
    pointLight.position.z = 10 * Math.sin(deg-0.1);
    venus.position.x = 17 * Math.cos(Vdeg);
    venus.position.z = 17 * Math.sin(Vdeg);
    mercury.position.x = 11 * Math.cos(Mdeg);
    mercury.position.z = 11 * Math.sin(Mdeg);
    //sphere.rotation.z += 0.01;

    deg += 0.01;
    Vdeg += 0.012;
    Mdeg += 0.02;
    camera.lookAt(sphere.position.x,0,sphere.position.z);
    renderer.render(scene, camera);
    //console.log("Sphere X: " + sphere.position.x, "Sphere Z: " + sphere.position.z, "Moon X: " + moon.position.x, "Moon Z: " + moon.position.z);
}

function Reveal() {
    document.getElementById("contactInfo").style.visibility = "visible";
    console.log("revealed");
}

init();
animate();