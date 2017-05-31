/* global window, document, THREE, requestAnimationFrame */

function init() {
  const socket = io();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0x242E41));
  renderer.setSize(window.innerWidth, window.innerHeight);

  let geo;
  let mat;

  // out zone
  geo = new THREE.CircleGeometry(235, 100);
  mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
  const out = new THREE.Mesh(geo, mat);
  scene.add(out);

  // double zone
  const double = [];
  for (let i = 0; i < 20; i += 1) {
    geo = new THREE.CircleGeometry(195, 100, (Math.PI * i) / 10, Math.PI / 10);

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
  const outerSingle = [];
  for (let i = 0; i < 20; i += 1) {
    geo = new THREE.CircleGeometry(175, 100, (Math.PI * i) / 10, Math.PI / 10);

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
  const triple = [];
  for (let i = 0; i < 20; i += 1) {
    geo = new THREE.CircleGeometry(123, 100, (Math.PI * i) / 10, Math.PI / 10);

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
  const innerSingle = [];
  for (let i = 0; i < 20; i += 1) {
    geo = new THREE.CircleGeometry(105, 100, (Math.PI * i) / 10, Math.PI / 10);

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
  const outerBull = new THREE.Mesh(geo, mat);
  outerBull.position.z = 0.4;
  outerBull.rotation.z = Math.PI / 20;
  scene.add(outerBull);

  // inner bull zone
  geo = new THREE.CircleGeometry(8, 100);
  mat = new THREE.MeshBasicMaterial({ color: 0x0B0D14 });
  const innerBull = new THREE.Mesh(geo, mat);
  innerBull.position.z = 0.5;
  innerBull.rotation.z = Math.PI / 20;
  scene.add(innerBull);

  // number
  const number = [];
  const loader = new THREE.FontLoader();
  loader.load('/js/font/helvetiker_regular.typeface.json', (font) => {
    for (let i = 1; i < 21; i += 1) {
      geo = new THREE.TextGeometry(`${i}`, {
        font,
        size: 20,
        height: 5,
      });
      mat = new THREE.MeshBasicMaterial({ color: 0xEAEBEE });
      number[i] = new THREE.Mesh(geo, mat);
      scene.add(number[i]);
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

  const spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  document.getElementById('root').appendChild(renderer.domElement);

  let status = 'wait';
  let throwData = {};
  let darts;
  socket.on('darts', (data) => {
    if (status === 'wait') {
      throwData = data;
      status = 'decide';
    }
  });

  function drawDarts() {
    // tip
    const tipGeo = new THREE.ConeGeometry(3, 30);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.rotation.x = Math.PI * (3 / 2);
    tip.position.z = 10 + 600;
    scene.add(tip);

    // barrel
    const barrelGeo = new THREE.CylinderGeometry(3, 3, 60);
    const barrelMat = new THREE.MeshBasicMaterial({ color: 0xC0C0C0 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI * (3 / 2);
    barrel.position.z = 55 + 600;
    scene.add(barrel);

    // shaft
    const shaftGeo = new THREE.CylinderGeometry(3, 2, 40);
    const shaftMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.rotation.x = Math.PI * (3 / 2);
    shaft.position.z = 105 + 600;
    scene.add(shaft);

    // flight
    let flightRGB = [];
    flightRGB[0] = parseInt(throwData.color.slice(1, 3), 16);
    flightRGB[1] = parseInt(throwData.color.slice(3, 5), 16);
    flightRGB[2] = parseInt(throwData.color.slice(5, 7), 16);
    const flightGeo = [];
    const flightMat = [];
    const flight = [];
    for (let i = 0; i < 4; i += 1) {
      flightGeo[i] = new THREE.BoxGeometry(16, 40, 1);
      flightMat[i] = new THREE.MeshBasicMaterial({
        color: `rgb(${flightRGB[0]}, ${flightRGB[1]}, ${flightRGB[2]})`,
        side: THREE.DoubleSide,
      });
      flight[i] = new THREE.Mesh(flightGeo[i], flightMat[i]);
      flight[i].rotation.x = Math.PI / 2;
      flight[i].position.z = 140 + 600;
      scene.add(flight[i]);
    }
    flight[0].position.x = 8;
    flight[1].position.y = 8;
    flight[1].rotation.y = Math.PI / 2;
    flight[2].position.x = -8;
    flight[3].position.y = -8;
    flight[3].rotation.y = -Math.PI / 2;

    return {
      tip,
      barrel,
      shaft,
      flight,
    };
  }

  function render() {
    if (status === 'decide') {
      darts = drawDarts();
      status = 'throw';
    } else if (status === 'throw') {
      if (darts.tip.position.z > 10) {
        darts.tip.position.x += throwData.x / 30;
        darts.tip.position.y += throwData.y / 30;
        darts.tip.position.z -= 20;
        darts.barrel.position.x += throwData.x / 30;
        darts.barrel.position.y += throwData.y / 30;
        darts.barrel.position.z -= 20;
        darts.shaft.position.x += throwData.x / 30;
        darts.shaft.position.y += throwData.y / 30;
        darts.shaft.position.z -= 20;
        darts.flight[0].position.x += throwData.x / 30;
        darts.flight[0].position.y += throwData.y / 30;
        darts.flight[0].position.z -= 20;
        darts.flight[1].position.x += throwData.x / 30;
        darts.flight[1].position.y += throwData.y / 30;
        darts.flight[1].position.z -= 20;
        darts.flight[2].position.x += throwData.x / 30;
        darts.flight[2].position.y += throwData.y / 30;
        darts.flight[2].position.z -= 20;
        darts.flight[3].position.x += throwData.x / 30;
        darts.flight[3].position.y += throwData.y / 30;
        darts.flight[3].position.z -= 20;
        if (darts.tip.position.z <= 610 && darts.tip.position.z > 310) {
          darts.tip.position.y += 1;
          darts.barrel.position.y += 1;
          darts.shaft.position.y += 1;
          darts.flight[0].position.y += 1;
          darts.flight[1].position.y += 1;
          darts.flight[2].position.y += 1;
          darts.flight[3].position.y += 1;
        } else if (darts.tip.position.z <= 310) {
          darts.tip.position.y -= 1;
          darts.barrel.position.y -= 1;
          darts.shaft.position.y -= 1;
          darts.flight[0].position.y -= 1;
          darts.flight[1].position.y -= 1;
          darts.flight[2].position.y -= 1;
          darts.flight[3].position.y -= 1;
        }
      } else {
        if (Math.pow(darts.tip.position.x, 2) + Math.pow(darts.tip.position.y, 2) <= 400) {
          document.getElementById('bull').play();
          while (scene.children.length > 104) {
            scene.remove(scene.children[scene.children.length - 1]);
          }
        } else {
          document.getElementById('stick').play();
        }
        status = 'wait';
      }
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

window.onload = init;
