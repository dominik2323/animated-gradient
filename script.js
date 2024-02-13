import * as THREE from "https://cdn.skypack.dev/three@v0.122.0";
import sNoise from "./snoise.js";
import vertexShader from "./vertexShader.js";
import fragmentShader from "./fragmentShader.js";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rgb(r, g, b) {
  return new THREE.Vector3(r, g, b);
}
document.addEventListener("DOMContentLoaded", function (e) {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 5;

  var randomisePosition = new THREE.Vector2(1, 2);

  let geometry = new THREE.PlaneGeometry(
    window.innerWidth,
    window.innerHeight,
    100,
    100
  );
  let material = new THREE.ShaderMaterial({
    uniforms: {
      u_bg: { type: "v3", value: rgb(245, 255, 242) },
      u_bgMain: { type: "v3", value: rgb(104, 144, 217) },
      u_color1: { type: "v3", value: rgb(245, 255, 242) },
      u_color2: { type: "v3", value: rgb(161, 232, 139) },
      u_time: { type: "f", value: 30 },
      u_randomisePosition: { type: "v2", value: randomisePosition },
    },
    fragmentShader: sNoise + fragmentShader,
    vertexShader: sNoise + vertexShader,
  });

  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(500, 0, -800);
  mesh.scale.multiplyScalar(3);
  mesh.rotationX = 0.0;
  mesh.rotationY = 0.0;
  mesh.rotationZ = 0.0;
  scene.add(mesh);

  renderer.render(scene, camera);
  let t = 0;
  let j = 0;
  const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.material.uniforms.u_randomisePosition.value = new THREE.Vector2(
      j,
      Math.sin(j)
    );
    mesh.material.uniforms.u_time.value = t;

    j = j + 0.01;
    t = t + 0.05;
  };
  animate();
  window.addEventListener("resize", function (e) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    console.log(geometry);
  });
});
