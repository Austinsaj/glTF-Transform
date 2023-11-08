import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometry for the steel building
const steelBuildingGeometry = new THREE.BoxGeometry(10, 20, 5);

// Create materials for the steel building
const steelMaterial = new THREE.MeshStandardMaterial({
 color: 'gray',
 metalness: 1,
 roughness: 0.5
});

// Create a mesh for the steel building and apply the materials
const steelBuildingMesh = new THREE.Mesh(steelBuildingGeometry, steelMaterial);
scene.add(steelBuildingMesh);

// Create lights for the scene
const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(ambientLight, directionalLight);

// Create an animation loop
function animate() {
 requestAnimationFrame(animate);

 // Update the animation (e.g., progressing steel building)
 // ...
