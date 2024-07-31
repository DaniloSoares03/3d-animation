# Animação WebGL com Three.js

Este projeto foi desenvolvido utilizando a biblioteca Three.js para criar uma cena 3D animada. A cena contém diferentes geometrias, materiais, uma textura e fonte de iluminação



### 1. Tipos Diferentes de Geometrias
A animação contém três tipos diferentes de geometrias:
- **Esfera** (`SphereGeometry`)
- **Cubo** (`BoxGeometry`)
- **Cilindro** (`CylinderGeometry`)

### 2. Tipos de Materiais
Dois tipos diferentes de materiais foram utilizados na cena:
- **MeshStandardMaterial**: Utilizado para a esfera e o cilindro, proporcionando iluminação e sombreamento realistas.
- **MeshBasicMaterial**: Aplicado ao cubo, juntamente com uma textura.

### 3. Textura Aplicada
a textura aplicada foi a logo do PopOs!
### 4. Fontes de Iluminação
A cena possui quatro diferentes fontes de iluminação:
- **Luz Ambiente** (`AmbientLight`): Fornece iluminação geral na cena.
- **Luz Direcional** (`DirectionalLight`): Simula a luz solar com sombras direcionais.
- **Luz Pontual** (`PointLight`): Adiciona uma fonte de luz pontual com alcance limitado.
- **Luz Hemisférica** (`HemisphereLight`): Fornece uma iluminação suave e equilibrada.

### 5. Modelo Externo
O modelo 3d utilizado no projeto é o projetil do personagem Sigma de OverWatch 2. O modelo inclui animações que são reproduzidas utilizando um `AnimationMixer`.

## Funcionalidades Adicionais

### Movimento de Órbita
O modelo 3D externo se move em uma órbita ao redor das formas geometricas presentes na cena.

### Rotação dos Objetos
Tanto o cubo quanto o cilindro giram continuamente ao longo dos eixos X e Y.
