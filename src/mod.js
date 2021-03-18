const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load( './src/floppa.png' );

const geometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshBasicMaterial( {map: texture} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );

	requestAnimationFrame( animate );
}
animate();