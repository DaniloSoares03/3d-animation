// Setup básico
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adicionar luzes
const ambientLight = new THREE.AmbientLight(0xafffff, 5); // Luz ambiente para iluminação geral
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 30); // Luz direcional para sombras e iluminação direta
directionalLight.position.set(5, 10, 7.5).normalize();
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xfffff, 1, 100); // Luz pontual para iluminação local
pointLight.position.set(2, 5, 3);
scene.add(pointLight);

const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 5); // Luz hemisférica para iluminação suave
scene.add(hemiLight);

// Adicionar geometrias
const geometry1 = new THREE.SphereGeometry(1, 32, 32);
const material1 = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const sphere = new THREE.Mesh(geometry1, material1);
sphere.position.set(-5, 1, 0);
scene.add(sphere);

const geometry2 = new THREE.BoxGeometry(2, 2, 2);


const textureLoader = new THREE.TextureLoader();
let cube; 
textureLoader.load('images.png', (texture) => {
    const texturedMaterial = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry2, texturedMaterial);
    cube.position.set(0, 1, 0);
    scene.add(cube);
});

const geometry3 = new THREE.CylinderGeometry(1, 1, 2, 32);
const material3 = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinder = new THREE.Mesh(geometry3, material3);
cylinder.position.set(5, 1, 0);
scene.add(cylinder);


const loader = new THREE.GLTFLoader();
let model;
let mixer; 

loader.load(
    'sigma_hypershere.glb',
    function (gltf) {
        model = gltf.scene;

        model.scale.set(10, 10, 10); 

        
        model.position.set(0, 5, 0); 
        scene.add(model);

        // Configurar o mixer para animação
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
        });

        console.log('Modelo carregado:', model);
    },
    undefined,
    function (error) {
        console.error('Erro ao carregar o modelo:', error);
    }
);

// Posicionar a câmera
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);


const clock = new THREE.Clock();

// Variáveis para oscilação
const amplitude = 2; // Amplitude do movimento
const frequency = 1; // Frequência do movimento

// Variáveis para órbita
const orbitRadius = 10; // Raio da órbita
const orbitSpeed = 0.5; // Velocidade da órbita

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    if (mixer) {
        mixer.update(clock.getDelta());
    }

    // Movimento de oscilação em fase para criar efeito de onda
    const time = clock.getElapsedTime();
    const oscillation = amplitude * Math.sin(frequency * time);

    // Aplicar fase diferente para cada geometria
    sphere.position.y = 1 + amplitude * Math.sin(frequency * time);
    if (cube) {
        cube.position.y = 1 + amplitude * Math.sin(frequency * time - Math.PI / 3); // Fase deslocada de 120 graus
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    }
    cylinder.position.y = 1 + amplitude * Math.sin(frequency * time - (2 * Math.PI / 3)); // Fase deslocada de 240 graus
    cylinder.rotation.x += 0.01;
    cylinder.rotation.y += 0.01;

    // Movimento de órbita para o modelo 3D
    if (model) {
        const orbitTime = time * orbitSpeed;
        model.position.x = orbitRadius * Math.cos(orbitTime);
        model.position.z = orbitRadius * Math.sin(orbitTime);
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}
animate();

// Responsividade
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
