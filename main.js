let scene, camera, renderer, box, heart;

let deg = 0;
let direction = 0;

function init() {
    scene = new THREE.Scene();
    
    const background = new THREE.TextureLoader().load('/Imgs/3JSbackground.jpeg');
    scene.background = background;

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({antiaias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    camera.position.set(0,3,7);

    renderer.render(scene, camera);

    const boxGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const boxMaterial = new THREE.MeshStandardMaterial({color:0xff0000});
    box = new THREE.Mesh(boxGeo, boxMaterial);
    box.position.set(0,0,0);
    box.roughness = 0.5;
    //scene.add(box);

    const x = 0, y = 0;

    const heartShape = new THREE.Shape();

    heartShape.moveTo( x + 1, y + 1 );
    heartShape.bezierCurveTo( x + 1, y + 1, x + 0.8,  y, x, y );
    heartShape.bezierCurveTo( x - 1.2, y, x - 1.2, y +  1.4,x - 1.2, y + 1.4 );
    heartShape.bezierCurveTo( x - 1.2, y + 2.2, x - .6,     y + 3.08, x + 1, y + 3.8 );
    heartShape.bezierCurveTo( x + 2.4, y + 3.08, x +     3.2, y + 2.2, x + 3.2, y + 1.4 );
    heartShape.bezierCurveTo( x + 3.2, y + 1.4, x +    3.2, y, x + 2, y );
    heartShape.bezierCurveTo( x + 1.4, y, x + 1, y +  1, x + 1, y + 1 );

    const heartGeometry = new THREE.ShapeGeometry(   heartShape );
    const heartMaterial = new THREE.MeshBasicMaterial( {     color: 0xff0000 } );
    heart = new THREE.Mesh( heartGeometry, heartMaterial     ) ;
    scene.add( heart );
    heart.position.x = 1;
    heart.position.y = 4;
    heart.rotation.z = 9.5;

    pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 1);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    //scene.add(pointLight, lightHelper);
    const gridHelper = new THREE.GridHelper();
    //scene.add(gridHelper);
}

function animate() {
    requestAnimationFrame(animate);

    //heart.rotation.x += 0.01;
    //heart.rotation.y += 0.01;
    //heart.rotation.z += 0.01;
    camera.position.x = 7 * Math.cos(deg);
    camera.position.z = 7 * Math.sin(deg)
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
    if (deg < 3.15 && direction == 0) {
        deg += 0.01;
    }
    else if (deg > 0 && direction == 1){
        deg -= 0.01;
    }
    else if (deg > 3.14) {
        direction = 1;
    }
    else if (deg < 0) {
        direction = 0;
    }
}

init();
animate();