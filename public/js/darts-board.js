/* global window, THREE */

function init() {
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0xAAAAAA));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var geo, mat, col;

  // out zone
  geo = new THREE.CircleGeometry(235, 100);
  mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
  var out = new THREE.Mesh(geo, mat);
  scene.add(out);

  // double zone
  var double = [];
  for (var i = 0; i < 20; i++) {
    geo = new THREE.CircleGeometry(195, 100, 2 * Math.PI * i / 20, 2 * Math.PI * 1 / 20);

    if (i % 2 === 0) {
      mat = new THREE.MeshBasicMaterial({ color: 0x882629 });
    } else {
      mat = new THREE.MeshBasicMaterial({ color: 0x306651 });
    }

    double[i] = new THREE.Mesh(geo, mat);
    double[i].rotation.z = Math.PI / 20;
    scene.add(double[i]);
  }

  // outer single zone
  var outerSingle = [];
  for (var i = 0; i < 20; i++) {
    geo = new THREE.CircleGeometry(175, 100, 2 * Math.PI * i / 20, 2 * Math.PI * 1 / 20);

    if (i % 2 === 0) {
      mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
    } else {
      mat = new THREE.MeshBasicMaterial({ color: 0xEAEBEE });
    }

    outerSingle[i] = new THREE.Mesh(geo, mat);
    outerSingle[i].position.z = 0.1;
    outerSingle[i].rotation.z = Math.PI / 20;

    scene.add(outerSingle[i]);
  }

  // triple zone
  var triple = [];
  for (var i = 0; i < 20; i++) {
    geo = new THREE.CircleGeometry(123, 100, 2 * Math.PI * i / 20, 2 * Math.PI * 1 / 20);

    if (i % 2 === 0) {
      mat = new THREE.MeshBasicMaterial({ color: 0x882629 });
    } else {
      mat = new THREE.MeshBasicMaterial({ color: 0x306651 });
    }

    triple[i] = new THREE.Mesh(geo, mat);
    triple[i].position.z = 0.2;
    triple[i].rotation.z = Math.PI / 20;
    scene.add(triple[i]);
  }

  // inner single zone
  var innerSingle = [];
  for (var i = 0; i < 20; i++) {
    geo = new THREE.CircleGeometry(105, 100, 2 * Math.PI * i / 20, 2 * Math.PI * 1 / 20);

    if (i % 2 === 0) {
      mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
    } else {
      mat = new THREE.MeshBasicMaterial({ color: 0xEAEBEE });
    }

    innerSingle[i] = new THREE.Mesh(geo, mat);
    innerSingle[i].position.z = 0.3;
    innerSingle[i].rotation.z = Math.PI / 20;

    scene.add(innerSingle[i]);
  }

  // outer bull zone
  geo = new THREE.CircleGeometry(20, 100);
  mat = new THREE.MeshBasicMaterial({ color: 0x882629 });
  var outerBull = new THREE.Mesh(geo, mat);
  outerBull.position.z = 0.4;
  outerBull.rotation.z = Math.PI / 20;
  scene.add(outerBull);

  // inner bull zone
  geo = new THREE.CircleGeometry(8, 100);
  mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
  var innerBull = new THREE.Mesh(geo, mat);
  innerBull.position.z = 0.5;
  innerBull.rotation.z = Math.PI / 20;
  scene.add(innerBull);

  // number
  var number = [];
  var loader = new THREE.FontLoader();
  loader.load('/js/font/helvetiker_regular.typeface.json', function(font) {
    for(var n = 1; n < 21; n++) {
      geo = new THREE.TextGeometry(`${n}`, {
        font: font,
        size: 20,
        height: 5
      });
      mat = new THREE.MeshBasicMaterial({ color: 0xEAEBEE });
      number[n] = new THREE.Mesh(geo, mat);
      scene.add(number[n]);
    }

    // adjust each position
    number[1].position.x = 55;
    number[1].position.y = 195;
    number[2].position.x = 115;
    number[2].position.y = -183;
    number[3].position.x = -8;
    number[3].position.y = -224;
    number[4].position.x = 167;
    number[4].position.y = 114;
    number[5].position.x = -73;
    number[5].position.y = 195;
    number[6].position.x = 205;
    number[6].position.y = -11;
    number[7].position.x = -130;
    number[7].position.y = -186;
    number[8].position.x = -212;
    number[8].position.y = -75;
    number[9].position.x = -182;
    number[9].position.y = 114;
    number[10].position.x = 187;
    number[10].position.y = -75;
    number[11].position.x = -232;
    number[11].position.y = -10;
    number[12].position.x = -145;
    number[12].position.y = 164;
    number[13].position.x = 186;
    number[13].position.y = 52;
    number[14].position.x = -222;
    number[14].position.y = 55;
    number[15].position.x = 156;
    number[15].position.y = -134;
    number[16].position.x = -192;
    number[16].position.y = -134;
    number[17].position.x = -82;
    number[17].position.y = -214;
    number[18].position.x = 107;
    number[18].position.y = 165;
    number[19].position.x = 47;
    number[19].position.y = -213;
    number[20].position.x = -15;
    number[20].position.y = 204;
  });

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 800;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  document.getElementById("root").appendChild(renderer.domElement);

  render();

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}

window.onload = init;
