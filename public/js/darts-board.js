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
