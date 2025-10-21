const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.minDistance = 2;
controls.maxDistance = 10;

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const sides = 12;
const radius = 1;
const height = 1.5;

for (let i = 0; i < sides; i++) {
  const angle = (i / sides) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  const geometry = new THREE.PlaneGeometry(1, height);
  const color = new THREE.Color(`hsl(${(i * 30) % 360}, 70%, 60%)`);
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
  const panel = new THREE.Mesh(geometry, material);

  panel.position.set(x, 0, z);
  panel.lookAt(0, 0, 0);
  scene.add(panel);
}

const topGeo = new THREE.CircleGeometry(radius, 32);
const topMat = new THREE.MeshBasicMaterial({ color: 0xffdce0, side: THREE.DoubleSide });
const topDisk = new THREE.Mesh(topGeo, topMat);
topDisk.rotation.x = -Math.PI / 2;
topDisk.position.y = height / 2;
scene.add(topDisk);

const bottomDisk = topDisk.clone();
bottomDisk.position.y = -height / 2;
scene.add(bottomDisk);
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

