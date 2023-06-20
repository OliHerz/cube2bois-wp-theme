import * as THREE from 'https://cdn.skypack.dev/three@0.132.0';

// import {
//   OrbitControls
// } from 'https://cdn.skypack.dev/three@0.132.00/examples/jsm/controls/OrbitControls.js';
import {
  GLTFLoader
} from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/loaders/GLTFLoader.js';
import {
  TWEEN
} from 'https://cdn.skypack.dev/three@0.132.0/examples/jsm/libs/tween.module.min';
// import { gsap } from "https://cdn.skypack.dev/gsap";

document.querySelector('.progression')

const CLOISONSIZE = 0.943
const CLOISONWIDTH = 0.019
const SIDEFOOTWIDTH = 0.0652474

const SIDEFOOTINSIDEHEIGHTZ = 0.085
const SIDEFOOTINSIDEHEIGHTX = 0.081
const SIDEFOOTHEIGHT = 0.099
const ENSEIGNEWIDTH = 0.050
const COLUMNWIDTH = 0.1
const STANDHEIGHT = 2.40

const SPACEBETWEENSTANDS = 15


let inputName = document.querySelector('.input-name')


const progressionText = document.querySelector('.progression')
let standsId = []

class Stand {
  constructor(right1, right2, right3, right4, left1, left2, left3, left4, back1, back2, back3, back4, structure, stand) {
    this.config = [right1, right2, right3, right4, left1, left2, left3, left4, back1, back2, back3, back4, structure]

    this.stand = stand
  }
}

let currentStands = []


let stands = []
let currentStand = 0
let currentConfigId = null
const urlParams = new URLSearchParams(window.location.search)
let defaultStand = null
fetch(`${igData.root_url}/wp-json/wp/v2/stand/179?acf_format=standard`)
    .then(response => response.json())
    .then(stand => {
      defaultStand = stand
      
    })
.then( res => {if(urlParams.get('id')){


currentConfigId = urlParams.get('id')


fetch(`${igData.root_url}/wp-json/wp/v2/config/${currentConfigId}?acf_format=standard`,{
  headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
  
})
.then(response => response.json())
.then(config => {
  if(igData.current_user_id != config.author){


    window.location = `${igData.get_site_url}/configurateur`
  }

  inputName.value = config.title.rendered
  let i = 0
  for(let key in config.acf){
    if(config.acf[key]){
      let j = i
      currentStands[j] = new Stand()
    let currentStandId = config.acf[key][0].ID
    fetch(`${igData.root_url}/wp-json/wp/v2/stand/${currentStandId}?acf_format=standard`,{
      headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
    })
    .then(response => response.json())
    .then(stand => {
      stands[j] = stand
      
      currentStands[j].stand = stand
      standsId.push(stand.id)


    })
    i++
    console.log('load stand')

    
  }
}
})
.then(e => {
  createScene()
});
} else {
  if(inputName){

    inputName.value = 'Nouvelle config'
  }

      currentStands[0] = new Stand()
      currentStands[0].stand = JSON.parse(JSON.stringify(defaultStand))
      
      createScene()
  
}})
const createScene = () => {
  currentStands.forEach(stand => {
    stand.models = {}
  stand.models.structure = new THREE.Group()
  stand.models.sign = new THREE.Group()
  stand.models.rightArray = [null,null,null]
  stand.models.right = new THREE.Group()
  stand.models.right.rotateY(Math.PI * 0.5)
  stand.models.right.position.y = SIDEFOOTHEIGHT
  stand.models.right.position.z = - SIDEFOOTINSIDEHEIGHTZ - ENSEIGNEWIDTH
  stand.models.leftArray = [null,null,null]
  stand.models.left = new THREE.Group()
  stand.models.left.rotateY(Math.PI * 0.5)
  stand.models.left.position.x = SIDEFOOTINSIDEHEIGHTX - CLOISONWIDTH
  stand.models.left.position.y =  SIDEFOOTHEIGHT
  stand.models.left.position.z = - SIDEFOOTINSIDEHEIGHTZ - ENSEIGNEWIDTH
  stand.models.backArray = [null,null,null]
  stand.models.back = new THREE.Group()
  stand.models.back.position.x = SIDEFOOTWIDTH
  stand.models.back.position.y =  SIDEFOOTHEIGHT
  
})

let stand1 = new THREE.Group()
scene.add(stand1)
stand1.add(currentStands[0].models.structure)
stand1.add(currentStands[0].models.sign)
stand1.add(currentStands[0].models.right)
stand1.add(currentStands[0].models.left)
stand1.add(currentStands[0].models.back)
stand1.position.y = -1.5
if(Object.keys(currentStands).length >= 2) {
let stand2 = new THREE.Group()
scene.add(stand2)
stand2.add(currentStands[1].models.structure)
stand2.add(currentStands[1].models.sign)
stand2.add(currentStands[1].models.right)
stand2.add(currentStands[1].models.left)
stand2.add(currentStands[1].models.back)
stand2.position.y = -1.5
stand2.position.x = SPACEBETWEENSTANDS
}
if(Object.keys(currentStands).length >= 3) {

let stand3 = new THREE.Group()
scene.add(stand3)
stand3.add(currentStands[2].models.structure)
stand3.add(currentStands[2].models.sign)
stand3.add(currentStands[2].models.right)
stand3.add(currentStands[2].models.left)
stand3.add(currentStands[2].models.back)
stand3.position.y = -1.5
stand3.position.x = SPACEBETWEENSTANDS * 2
}

  loadModel()
  .then(e =>{
    
    for(let i = 0; i < Object.keys(currentStands).length; i++){
    createStand(i)
    }
  })
}
const postId = 179;


const nonce = igData.nonce;






let INTERSECTED


const selectSize = document.querySelectorAll('input[name = "size"]')

const leftTextures = document.querySelector('.leftTextures')
const rightTextures = document.querySelector('.rightTextures')



const saveIcon= document.querySelector('.fa-save')

if(saveIcon){

  saveIcon.addEventListener('click', function(e){
    e.preventDefault()
    saveIcon.classList.add('saving')
    
    let content = {}
    let promises = []

    for(let i = 0; i < Object.keys(currentStands).length; i++){
      let createPromise = function(i){

      
      if(standsId[i]){
        let promise = fetch(`${igData.root_url}/wp-json/wp/v2/stand/${currentStands[i].stand.id}?acf_format=standard&embed`, {
          method: 'POST',
          body: JSON.stringify({
            "title": `${inputName.value} - stand ${i+1}`,
          acf: {
            structure: currentStands[i].config.structure.id,
            droit_1 : currentStands[i].config.right1.id,
            droit_2 : currentStands[i].config.right2.id,
            droit_3 : currentStands[i].config.right3.id,
            droit_4 : currentStands[i].config.right4.id,
            gauche_1 : currentStands[i].config.left1.id,
            gauche_2 : currentStands[i].config.left2.id,
            gauche_3 : currentStands[i].config.left3.id,
            gauche_4 : currentStands[i].config.left4.id,
            arriere_1 : currentStands[i].config.back1.id,
            arriere_2 : currentStands[i].config.back2.id,
            arriere_3 : currentStands[i].config.back3.id,
            arriere_4 : currentStands[i].config.back4.id,
            cloison_droite : currentStands[i].stand.acf.cloison_droite,
            cloison_gauche : currentStands[i].stand.acf.cloison_gauche,
            sign : currentStands[i].stand.acf.sign,
            size : currentStands[i].config.size,
          }
        }),
        headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
      })
        .then(response =>
          response.json())
        .then(data => {
          console.log('Success:', data)
          currentStands[i].stand.id = data.id
          

          
          if(i === 0){
            content.stand_1 = [
              currentStands[0].stand.id,
            ]
          } else if (i === 1){
            content.stand_2 = [
              currentStands[1].stand.id,
            ]
          }   else if (i === 2){
            content.stand_3 = [
              currentStands[2].stand.id,
            ]
          }
        })
        .catch(error => console.error('Error:', error)); 
        promises.push(promise)
      } else{
        let promise = fetch(`${igData.root_url}/wp-json/wp/v2/stand/?acf_format=standard&embed`, {
          method: 'POST',
          body: JSON.stringify({
          "title": `${inputName.value} - stand ${i+1}`,

          "status": "private",
          acf: {
            structure: currentStands[i].config.structure.id,
            droit_1 : currentStands[i].config.right1.id,
            droit_2 : currentStands[i].config.right2.id,
            droit_3 : currentStands[i].config.right3.id,
            droit_4 : currentStands[i].config.right4.id,
            gauche_1 : currentStands[i].config.left1.id,
            gauche_2 : currentStands[i].config.left2.id,
            gauche_3 : currentStands[i].config.left3.id,
            gauche_4 : currentStands[i].config.left4.id,
            arriere_1 : currentStands[i].config.back1.id,
            arriere_2 : currentStands[i].config.back2.id,
            arriere_3 : currentStands[i].config.back3.id,
            arriere_4 : currentStands[i].config.back4.id,
            cloison_droite : currentStands[i].stand.acf.cloison_droite,
            cloison_gauche : currentStands[i].stand.acf.cloison_gauche,
            sign : currentStands[i].stand.acf.sign,
            size : currentStands[i].config.size,
          }
        }),
        headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data)
          currentStands[i].stand.id = data.id
          standsId.push(data.id)
          
          if(i === 0){
            content.stand_1 = [
              currentStands[0].stand.id,
            ]
          } else if (i === 1){
            content.stand_2 = [
              currentStands[1].stand.id,
            ]
          }   else if (i === 2){
            content.stand_3 = [
              currentStands[2].stand.id,
            ]
          }
        })
        .catch(error => console.error('Error:', error)); 
        promises.push(promise)
      }
      }
      createPromise(i)
}
Promise.all(promises)
.then(results => {
  if(!currentConfigId){

    fetch(`${igData.root_url}/wp-json/wp/v2/config/?acf_format=standard&embed`, {
      method: 'POST',
      body: JSON.stringify({
        "title": inputName.value,

        "status": "private",
        acf: content
      }),
      headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success config:', data)
      currentConfigId = data.id
      let newUrl = `${window.location.href}?id=${data.id}`
      window.history.pushState({path: newUrl}, '', newUrl)

    })
  } else{
    console.log('content', content)
    content.stand_2 ? '' : content.stand_2 = null
    content.stand_3 ? '' : content.stand_3 = null
  fetch(`${igData.root_url}/wp-json/wp/v2/config/${currentConfigId}`, {
    method: 'POST',
    body: JSON.stringify({
      "title": inputName.value,
      acf: content
    }),
    headers: { 'Content-Type': 'application/json',  'X-WP-Nonce': nonce }
  }).then(response => response.json())
  .then(data => {
    console.log('Success config:', data)
  })
}
saveIcon.classList.remove('saving')
})


})
}















  


const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', function(event) {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
})

// Debug
// const gui = new GUI()
// gui.add(document, 'title')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */

const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = function(url, itemsLoaded, itemsTotal) {
  
}

loadingManager.onLoad = function() {
  window.setTimeout(() =>
        {

            setTimeout(() => {
              let conteneurChargement = document.querySelector('.conteneur_chargement')
              conteneurChargement.classList.add('inactive')
              document.querySelector('.conteneur_config').classList.add('active')
              
              setTimeout(() => {
                
                conteneurChargement.classList.remove('active')
              }, 3000);
              resizeElement()
            }, 1000);
            
        }, 500)
        
  console.log('Loading complete!')
  currentStands.forEach(el => {

    if(el.stand.acf.cloison_droite){
      
      el.models.rightArray.forEach(element => {
  
        el.models.right.add(element)
  
      });
    }
    if(el.stand.acf.cloison_gauche){
      el.models.leftArray.forEach(element => {
        el.models.left.add(element)

    });
  }
  el.models.backArray.forEach(element => {
    el.models.back.add(element)

    });

    let xPos = 0
  el.models.right.children.forEach(element => {
    element.position.x = xPos
    xPos += CLOISONSIZE
  });
  xPos = 0
  el.models.left.children.forEach(element => {
    element.position.x = xPos
    xPos += CLOISONSIZE
  });
  xPos = 0
  el.models.back.children.forEach(element => {
    element.position.x = xPos
    xPos += CLOISONSIZE
  });
  })


  scene.traverse(child => {
    if (child.material){
      child.material.metalness = 0
    }
  })
  


  
}
loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
        const progressRatio = itemsLoaded / itemsTotal
}

loadingManager.onError = function(url) {

}

const gltfLoader = new GLTFLoader(loadingManager)



// Récupérer un modele via API
let cloisons = {}
let structures = {}

const loadModel = async () => {
  try {
    let res
    let data
    let resPromise1 = fetch(`${igData.root_url}/wp-json/wp/v2/structure?acf_format=standard`);


  

    let resPromise2 = fetch(`${igData.root_url}/wp-json/wp/v2/model?acf_format=standard`);

    
    
    const [res1, res2] = await Promise.all([resPromise1, resPromise2])
    const data1 = await res1.json()
    const data2 = await res2.json()
    structures = data1
    cloisons = data2

  } catch (e) {
    console.log('error', e);
  }
}


const createStand = (numStand) => {

  createStructure(numStand)
  createBackSide(numStand)
  createRightSide(numStand)
  createLeftSide(numStand)
  createHTML()

 
    


    let xPos = 0
  
  
    currentStands[numStand].models.right.children.forEach(el => {
      el.position.x = xPos
      xPos += CLOISONSIZE
    });
    
  
  }

  const createStructure = (numStand) => {
    currentStands[numStand].config.structure = structures.filter(structure => structure.id == currentStands[numStand].stand.acf.structure[0].ID)[0]

    loadGltf(numStand, currentStands[numStand].config.structure.acf.modele_glb.url, 'structure')

    if(currentStands[numStand].stand.acf.sign){
      loadGltf(numStand, currentStands[numStand].config.structure.acf.sign_model.url, 'sign')
    }


    currentStands[numStand].config.innerStandSize = currentStands[numStand].config.structure.acf.size
    if(numStand === 0){

      camera.position.x = parseFloat(currentStands[currentStand].config.innerStandSize)/2 + currentStand * SPACEBETWEENSTANDS
    }

    currentStands[numStand].models.right.position.x = +currentStands[numStand].config.innerStandSize  + COLUMNWIDTH * 2 - SIDEFOOTWIDTH
    currentStands[numStand].models.back.position.z = -currentStands[numStand].config.innerStandSize - COLUMNWIDTH * 2 - ENSEIGNEWIDTH + SIDEFOOTINSIDEHEIGHTZ + CLOISONWIDTH
  }

  const createRightSide = (numStand) => {
    currentStands[numStand].config.right1 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.droit_1[0].ID)[0]
    currentStands[numStand].config.right2 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.droit_2[0].ID)[0]
    currentStands[numStand].config.right3 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.droit_3[0].ID)[0]
    currentStands[numStand].config.right4 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.droit_4[0].ID)[0]
    if(currentStands[numStand].stand.acf.cloison_droite){
      loadGltf(numStand, currentStands[numStand].config.right1.acf.modele_glb.url, 'right', 0)
      loadGltf(numStand, currentStands[numStand].config.right2.acf.modele_glb.url, 'right', 1)
      loadGltf(numStand, currentStands[numStand].config.right3.acf.modele_glb.url, 'right', 2)
      if(currentStands[numStand].config.innerStandSize > 3){
        loadGltf(numStand, currentStands[numStand].config.right4.acf.modele_glb.url, 'right', 3)
      }

      }
    }

  const createLeftSide = (numStand) => {
    currentStands[numStand].config.left1 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.gauche_1[0].ID)[0]
    currentStands[numStand].config.left2 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.gauche_2[0].ID)[0]
    currentStands[numStand].config.left3 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.gauche_3[0].ID)[0]
    currentStands[numStand].config.left4 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.gauche_4[0].ID)[0]


    if(currentStands[numStand].stand.acf.cloison_gauche){
      loadGltf(numStand, currentStands[numStand].config.left1.acf.modele_glb.url, 'left', 0)
      loadGltf(numStand, currentStands[numStand].config.left2.acf.modele_glb.url, 'left', 1)
      loadGltf(numStand, currentStands[numStand].config.left3.acf.modele_glb.url, 'left', 2)
      if(currentStands[numStand].config.innerStandSize > 3){
        loadGltf(numStand, currentStands[numStand].config.left4.acf.modele_glb.url, 'left', 3)
      }
    }
  }
  const createBackSide = (numStand) => {
    currentStands[numStand].config.back1 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.arriere_1[0].ID)[0]
    currentStands[numStand].config.back2 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.arriere_2[0].ID)[0]
    currentStands[numStand].config.back3 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.arriere_3[0].ID)[0]
    currentStands[numStand].config.back4 = cloisons.filter(cloison => cloison.id === currentStands[numStand].stand.acf.arriere_4[0].ID)[0]

    loadGltf(numStand, currentStands[numStand].config.back1.acf.modele_glb.url, 'back', 0)
    loadGltf(numStand, currentStands[numStand].config.back2.acf.modele_glb.url, 'back', 1)
    loadGltf(numStand, currentStands[numStand].config.back3.acf.modele_glb.url, 'back', 2)
    if(currentStands[numStand].config.innerStandSize > 3){
      loadGltf(numStand, currentStands[numStand].config.back4.acf.modele_glb.url, 'back', 3)
      currentStands[numStand].config.size = 4
    }  else {
      currentStands[numStand].config.size = 3

    }
  }


const loadGltf = async (numStand, modelUrl, type, n) =>{

  gltfLoader.load(
    modelUrl,
    (gltf) => {
      let xPos = 0
      switch (type) {
        case 'structure':
          currentStands[numStand].models.structure.add(gltf.scene)

          break;
        case 'sign':
          currentStands[numStand].models.sign.add(gltf.scene)
          currentStands[numStand].models.sign.position.y = STANDHEIGHT
          currentStands[numStand].models.sign.position.z = 0.01


          break;
        case 'back':

          currentStands[numStand].models.backArray[n] = gltf.scene
          // }
          break;
        case 'right':


            currentStands[numStand].models.rightArray[n] = gltf.scene


          break;
        case 'left':

          currentStands[numStand].models.leftArray[n] = gltf.scene
          // }
          break;
      
        default:
          console.log('autre')
          break;
      }
    }
  )
}

const sizes = {
  width: document.querySelector('.rendu-configurateur').offsetWidth,
  height: document.querySelector('.rendu-configurateur').offsetHeight,
}
document.body.style.overflow = "hidden"



function resizeElement() {
if (window.visualViewport.width >= 525) {

    sizes.width = document.querySelector('.rendu-configurateur').offsetWidth
    sizes.height = document.querySelector('.rendu-configurateur').offsetHeight
    camera.position.z = 4


} else {


   sizes.width = document.querySelector('.rendu-configurateur').offsetWidth
    sizes.height = document.querySelector('.rendu-configurateur').offsetHeight
    camera.position.z = 3
}
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


}





window.addEventListener('resize', () => {

  resizeElement()

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  canvas.style.width = sizes.width
  canvas.style.height = sizes.height
})

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0xffffff, 2.1)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)

directionalLight.position.set(2, 2, 3)
scene.add(directionalLight)

const helper = new THREE.DirectionalLightHelper(directionalLight, 1)
// scene.add(helper)

// const textureLoader = new THREE.TextureLoader()
// const texture = textureLoader.load('/IGexpo/wp-content/themes/IGTheme/static/textures/jpg/grass.jpg')
// const floor = new THREE.Mesh(
//   new THREE.PlaneGeometry(100, 100),
//   new THREE.MeshStandardMaterial({
//       map: texture
//   })
// )
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.x = 20
// texture.repeat.y = 20
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// floor.position.y = -1.5
// scene.add(floor)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4
// camera.position.y = 0.5
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// // controls.target.set(0, 0, 0)
// controls.maxDistance = 6
// controls.maxPolarAngle = Math.PI / 2
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: canvas,
  antialias: true,
})

// renderer.setClearColor(0xb9defe)
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding

renderer.toneMapping = THREE.LinearToneMapping

renderer.toneMappingExposure = 1.76


resizeElement()


  /**
   * Animate
   */
  const clock = new THREE.Clock()
  let previousTime = 0

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    TWEEN.update()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()


  let standSelect = null
const iconStands = document.querySelectorAll('.iconStands')
const AddIconStandsHTML = () => {
iconStands.forEach(el => {
  el.innerHTML = `
  <i data-stand="0" class="fa-solid fa-house icon"> </i>
  `
  if(Object.keys(currentStands).length === 1){
    el.innerHTML += `
    <i class="fa-solid fa-plus icon croix add-stand"></i>
    <i class="fa-solid fa-plus icon croix inactive "></i>
  `
  } else if(Object.keys(currentStands).length === 2){
    el.innerHTML += `
  <i data-stand="1" class="fa-solid fa-house icon  "> </i>
  <i class="fa-solid fa-plus icon croix add-stand"></i>
  `
  } else if(Object.keys(currentStands).length === 3){
    el.innerHTML += `
  <i data-stand="1" class="fa-solid fa-house icon "> </i>
  <i data-stand="2" class="fa-solid fa-house icon "> </i>
  `
  } 
})
standSelect = document.querySelectorAll('.fa-house')
standSelect[currentStand].classList.toggle('active')

}
  
const typeCloisons = document.querySelector('.cloison-cont')
const dimensionCont = document.querySelector('.dimension-cont')
const sideCont = document.querySelector('.side-cont')


const createDimensionHTML = () => {
  if(currentStands[currentStand].config.size === 3){

    dimensionCont.innerHTML = `
    <div class="quatre">
    <input class="config-button" type="radio" name="size" id="size3" value="3" checked>
    <label for="size3">3 × 3</label>
    </div>
    
    <div class="trois">
    <input class="config-button" type="radio" name="size" id="size4" value="4">
    <label for="size4">4 × 4</label>
    </div>
    `
  } else{
    dimensionCont.innerHTML = `
    <div class="quatre">
    <input class="config-button" type="radio" name="size" id="size3" value="3">
    <label for="size3">3 × 3</label>
    </div>
    
    <div class="trois">
    <input class="config-button" type="radio" name="size" id="size4" value="4" checked>
    <label for="size4">4 × 4</label>
    </div>
    `
  }

  
  const selectSize = document.querySelectorAll('input[name = "size"]')

  for (let button of selectSize) {
    button.addEventListener("change", function() {
  
      let sizeChange = parseFloat(button.value)
      let updatedFieldValue
      if (sizeChange === 3){
        updatedFieldValue = '170'
      } else{
        updatedFieldValue = '171'
      }
  
    
    currentStands[currentStand].stand.acf.structure[0].ID = updatedFieldValue
    currentStands[currentStand].models.rightArray = [null,null,null]
    currentStands[currentStand].models.leftArray = [null,null,null]
    currentStands[currentStand].models.backArray = [null,null,null]
  
    currentStands[currentStand].models.structure.clear()
    currentStands[currentStand].models.sign.clear()
    currentStands[currentStand].models.right.clear()
    currentStands[currentStand].models.left.clear()
    currentStands[currentStand].models.back.clear()
    createStand(currentStand)
  
  })
  }
}

let toggleLeft = null
let toggleRight = null
const createSideHTML = () => {
  sideCont.innerHTML = `
  <div class="gauche">
    <input class="config-button" type="checkbox" name="toggleLeft" id="toggleLeft">
    <label for="toggleLeft">Gauche</label><br>
    </div>
    <div class="droite">
    <input class="config-button" type="checkbox" name="toggleRight" id="toggleRight">
    <label for="toggleRight">Droite</label><br>
    </div>
  `

    toggleLeft = document.querySelector('input[name = "toggleLeft"')
    toggleRight = document.querySelector('input[name = "toggleRight"')

    if(currentStands[currentStand].stand.acf.cloison_gauche){
      toggleLeft.checked = !toggleLeft.checked
    }
    if(currentStands[currentStand].stand.acf.cloison_droite){
      toggleRight.checked = !toggleRight.checked
    }

  toggleLeft.addEventListener('change', function() {
    currentStands[currentStand].stand.acf.cloison_gauche = !currentStands[currentStand].stand.acf.cloison_gauche
    currentStands[currentStand].models.left.clear()
    createLeftSide(currentStand)
   
    createHTML()
  })
  
  toggleRight.addEventListener('change', function() {
    currentStands[currentStand].stand.acf.cloison_droite = !currentStands[currentStand].stand.acf.cloison_droite
    currentStands[currentStand].models.right.clear()
    createRightSide(currentStand)
    createHTML()
  
  })

}


const createCloisonHTML = () => {
  typeCloisons.innerHTML = ''
  cloisons.forEach(cloison => {

    let innerRSideHTML = ''
    for(let i = 1; i <= Math.ceil(currentStands[currentStand].config.innerStandSize); i++){
      innerRSideHTML += `
      <p class="button-change" data-type="${cloison.slug}" data-side="cloison-droite" data-index="${i}">${i}</p>
      `
    }
    let innerLSideHTML = ''
    for(let i = 1; i <= Math.ceil(currentStands[currentStand].config.innerStandSize); i++){
      innerLSideHTML += `
      <p class="button-change" data-type="${cloison.slug}" data-side="cloison-gauche" data-index="${i}">${i}</p>
      `
    }
    let innerBSideHTML = ''
    innerBSideHTML += `
    <div class="parametres-partie">
              <p> Fond</p>
            <div class="param active">
    `
    for(let i = 1; i <= Math.ceil(currentStands[currentStand].config.innerStandSize); i++){
      innerBSideHTML += `
      
      <p class="button-change" data-type="${cloison.slug}" data-side="cloison-arriere" data-index="${i}">${i}</p>
      `
    }
    innerBSideHTML += `
    </div>
    </div>
    `
    let sideOptionHTML = ''
        if (currentStands[currentStand].stand.acf.cloison_droite){
          sideOptionHTML += `
          <div class="parametres-partie">
              <p> Droite</p>
            <div class="param">
          ${innerRSideHTML}
          </div>
          </div>
          `
        }
        if (currentStands[currentStand].stand.acf.cloison_gauche){
          sideOptionHTML += `
          <div class="parametres-partie">
              <p> Gauche</p>
            <div class="param">
          ${innerLSideHTML}
          </div>
          </div>
          `
        }
        typeCloisons.innerHTML += `
        <div class="contenu-btn">
          <p class="info-button"> ${cloison.title.rendered}</p>
        <div class="parametres-cont active">
        
          ${sideOptionHTML}
          
          ${innerBSideHTML}
    `
    let listParamCont = document.querySelectorAll('.parametres-cont')
    let listCloisons = document.querySelectorAll('.details')
    listCloisons.forEach(cloison => {
      cloison.addEventListener('click', function(e){
        e.preventDefault()
        let paramCont = this.parentNode.querySelector('.parametres-cont')
        if(paramCont.classList.contains('active')){
          paramCont.classList.remove('active')
          cloison.classList.remove('active')
        } else {
          listParamCont.forEach(element => {
            element.classList.remove('active')
          });
          paramCont.classList.toggle('active')

          listCloisons.forEach(element => {
            element.classList.remove('active')
          });
          cloison.classList.toggle('active')
        }
        
      })
    });
  })
}


let toggleSign = null
const options = document.querySelector('.options-cont')
const createOptionsHTML = () => {
options.innerHTML = `
<div class="gauche">
    <input class="config-button" type="checkbox" name="toggleSign" id="toggleSign">
    <label for="toggleSign">Enseigne</label><br>
    </div>
`

toggleSign = document.querySelector('input[name = "toggleSign"')

if(currentStands[currentStand].stand.acf.sign){
  toggleSign.checked = !toggleSign.checked
}
toggleSign.addEventListener('change', function() {
  currentStands[currentStand].stand.acf.sign = !currentStands[currentStand].stand.acf.sign
  if(currentStands[currentStand].stand.acf.sign){
    loadGltf(currentStand, currentStands[currentStand].config.structure.acf.sign_model.url, 'sign')
  }else {
    currentStands[currentStand].models.sign.clear()
  }

 
  createHTML()
})
}





const createHTML = () => {
  createDimensionHTML()
  createSideHTML()
  AddIconStandsHTML()
  createAddStandEvent()
  createOptionsHTML()
  createCloisonHTML()

  for(let i = 1; i <= currentStands[currentStand].config.size; i++ ){
    let attrName = 'right' + i
    let attrValue = currentStands[currentStand].config[attrName]
    let slugValue = attrValue.slug

    let cloisonBtn = document.querySelector(`[data-type="${slugValue}"][data-side="cloison-droite"][data-index="${i}"]`)

    if(cloisonBtn){

      cloisonBtn.classList.add('active')
    }
  }
  for(let i = 1; i <= currentStands[currentStand].config.size; i++ ){
    let attrName = 'left' + i
    let attrValue = currentStands[currentStand].config[attrName]
    let slugValue = attrValue.slug


    let cloisonBtn = document.querySelector(`[data-type="${slugValue}"][data-side="cloison-gauche"][data-index="${i}"]`)

    if(cloisonBtn){

      cloisonBtn.classList.add('active')
    }
  }
  for(let i = 1; i <= currentStands[currentStand].config.size; i++ ){
    let attrName = 'back' + i
    let attrValue = currentStands[currentStand].config[attrName]
    let slugValue = attrValue.slug


    let cloisonBtn = document.querySelector(`[data-type="${slugValue}"][data-side="cloison-arriere"][data-index="${i}"]`)

    if(cloisonBtn){

      cloisonBtn.classList.add('active')
    }
  }

    buttonsChange = document.querySelectorAll(".button-change")

  buttonsChange.forEach(button => {
    button.addEventListener("click", function(e) {


      let sideTarget = null
      let sideTargetName = null
      let indexTarget = parseInt(e.target.dataset.index) - 1
      if(e.target.dataset.side === "cloison-droite"){
        sideTarget = currentStands[currentStand].models.right
        sideTargetName = 'right'
        
      } else if(e.target.dataset.side === "cloison-gauche"){
        sideTarget = currentStands[currentStand].models.left
        sideTargetName = 'left'
      } else {
        sideTarget = currentStands[currentStand].models.back
        sideTargetName = 'back'
      }

      if(sideTargetName === 'right') {
        if (indexTarget === 0){
        currentStands[currentStand].config.right1 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 1){
          currentStands[currentStand].config.right2 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 2){
          currentStands[currentStand].config.right3 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 3){
          currentStands[currentStand].config.right4 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        }
      } else if(sideTargetName === 'left') {
        if (indexTarget === 0){
          currentStands[currentStand].config.left1 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 1){
          currentStands[currentStand].config.left2 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 2){
          currentStands[currentStand].config.left3 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 3){
          currentStands[currentStand].config.left4 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        }
      }else if(sideTargetName === 'back') {
        if (indexTarget === 0){
          currentStands[currentStand].config.back1 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 1){
          currentStands[currentStand].config.back2 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 2){
          currentStands[currentStand].config.back3 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        } else if (indexTarget === 3){
          currentStands[currentStand].config.back4 = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]
        }
    }
    let modelTarget = cloisons.filter(cloison => cloison.slug === e.target.dataset.type)[0]

    // sideTarget.children[indexTarget].clear()
    sideTarget.clear()
    loadGltf(currentStand, modelTarget.acf.modele_glb.url, sideTargetName, indexTarget)
    createHTML()

    })
  })

}






const typeCloison = document.querySelector('.type-cloison')
let buttonsChange = null




let menuDim = document.querySelector('.menu-dimension')
let menuConfig = document.querySelector('.menu-config')
let btnNextDim = document.querySelector('.btn-next-dimension')
let btnPrevConfig = document.querySelector('.btn-prev-config')
let toggleMenu = function(e){
  e.preventDefault()
  menuDim.classList.toggle('visible')
  menuConfig.classList.toggle('visible')
}

let listConfigPerso = document.querySelectorAll('.ss-button-conf')
let btnDetails = document.querySelectorAll('.button-config')
btnDetails.forEach(el => {
  el.addEventListener('click', function(e){
    e.preventDefault()
    if(!el.classList.contains('active')){
      btnDetails.forEach(btnDetail => {
      btnDetail.classList.remove('active')
      })
    }
    el.classList.toggle('active')
    let parentConfigPerso = this.parentNode.querySelector('.ss-button-conf')
    if(parentConfigPerso){

      if(!parentConfigPerso.classList.contains('active')){
        listConfigPerso.forEach(el => {
          el.classList.remove('active')
        })
      }
      parentConfigPerso.classList.toggle('active')
    }
  })
})




function tweenCameraHorizontal(targetX) {
  new TWEEN.Tween(camera.position)
    .to({ x: targetX }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start();
}


const createAddStandEvent = () => {


  standSelect.forEach(el => {
    el.addEventListener('click', function(e){

      currentStand = parseInt(e.target.dataset.stand)
      createHTML()


        
      tweenCameraHorizontal(parseFloat(currentStands[currentStand].config.innerStandSize)/2 + currentStand * SPACEBETWEENSTANDS)
    })
  })

  let addStand = document.querySelectorAll('.add-stand')
  addStand.forEach(el => {
  el.addEventListener('click', function(e){
    e.preventDefault()
    if (Object.keys(currentStands).length < 3){
      
      
      currentStands.push(new Stand)
      currentStand = Object.keys(currentStands).length - 1


      currentStands[Object.keys(currentStands).length - 1].stand = JSON.parse(JSON.stringify(defaultStand))
      currentStands[Object.keys(currentStands).length - 1].models = {}
    currentStands[Object.keys(currentStands).length - 1].models.structure = new THREE.Group()
    currentStands[Object.keys(currentStands).length - 1].models.sign = new THREE.Group()
    currentStands[Object.keys(currentStands).length - 1].models.rightArray = [null,null,null]
    currentStands[Object.keys(currentStands).length - 1].models.right = new THREE.Group()
    currentStands[Object.keys(currentStands).length - 1].models.right.rotateY(Math.PI * 0.5)
    currentStands[Object.keys(currentStands).length - 1].models.right.position.y = SIDEFOOTHEIGHT
    currentStands[Object.keys(currentStands).length - 1].models.right.position.z = - SIDEFOOTINSIDEHEIGHTZ - ENSEIGNEWIDTH
    currentStands[Object.keys(currentStands).length - 1].models.leftArray = [null,null,null]
    currentStands[Object.keys(currentStands).length - 1].models.left = new THREE.Group()
    currentStands[Object.keys(currentStands).length - 1].models.left.rotateY(Math.PI * 0.5)
    currentStands[Object.keys(currentStands).length - 1].models.left.position.x = SIDEFOOTINSIDEHEIGHTX - CLOISONWIDTH
    currentStands[Object.keys(currentStands).length - 1].models.left.position.y =  SIDEFOOTHEIGHT
    currentStands[Object.keys(currentStands).length - 1].models.left.position.z = - SIDEFOOTINSIDEHEIGHTZ - ENSEIGNEWIDTH
    currentStands[Object.keys(currentStands).length - 1].models.backArray = [null,null,null]
    currentStands[Object.keys(currentStands).length - 1].models.back = new THREE.Group()
    currentStands[Object.keys(currentStands).length - 1].models.back.position.x = SIDEFOOTWIDTH
    currentStands[Object.keys(currentStands).length - 1].models.back.position.y =  SIDEFOOTHEIGHT
    
    if (Object.keys(currentStands).length === 2){
      let stand2 = new THREE.Group()
  scene.add(stand2)
  stand2.add(currentStands[1].models.structure)
  stand2.add(currentStands[1].models.sign)
  stand2.add(currentStands[1].models.right)
  stand2.add(currentStands[1].models.left)
  stand2.add(currentStands[1].models.back)
  stand2.position.y = -1.5
  stand2.position.x = SPACEBETWEENSTANDS
      createStand(1)
    } else if (Object.keys(currentStands).length === 3){
      let stand3 = new THREE.Group()
  scene.add(stand3)
  stand3.add(currentStands[2].models.structure)
  stand3.add(currentStands[2].models.sign)
  stand3.add(currentStands[2].models.right)
  stand3.add(currentStands[2].models.left)
  stand3.add(currentStands[2].models.back)
  stand3.position.y = -1.5
  stand3.position.x = SPACEBETWEENSTANDS * 2
      createStand(2)
    }
  } 


  tweenCameraHorizontal(parseFloat(currentStands[currentStand].config.innerStandSize)/2 + currentStand * SPACEBETWEENSTANDS)

  })
})
}

const deleteButton = document.querySelector('.fa-trash')
const deleteStand = () => {
  if(Object.keys(currentStands).length >= 2) {

    currentStands[Object.keys(currentStands).length-1].models.rightArray = [null,null,null]
    currentStands[Object.keys(currentStands).length-1].models.leftArray = [null,null,null]
    currentStands[Object.keys(currentStands).length-1].models.backArray = [null,null,null]

    currentStands[Object.keys(currentStands).length-1].models.structure.clear()
    currentStands[Object.keys(currentStands).length-1].models.sign.clear()
    currentStands[Object.keys(currentStands).length-1].models.right.clear()
    currentStands[Object.keys(currentStands).length-1].models.left.clear()
    currentStands[Object.keys(currentStands).length-1].models.back.clear()

    
    if(currentStand == Object.keys(currentStands).length-1){
      currentStand--
      
      tweenCameraHorizontal(parseFloat(currentStands[currentStand].config.innerStandSize)/2 + currentStand * SPACEBETWEENSTANDS)
      
    }
    currentStands.splice(Object.keys(currentStands).length-1, 1)
    createHTML()
  }
}
deleteButton.addEventListener('click', function() {
  deleteStand()
})



// gui.add(directionalLight.position, 'x').min(-3).max(3).step(0.01).name('lightX')
// gui.add(directionalLight.position, 'y').min(0).max(10).step(0.01).name('lightY')
// gui.add(directionalLight.position, 'z').min(1).max(5).step(0.01).name('lightZ')
// gui.add(directionalLight, 'intensity').min(1).max(5).step(0.01).name('lightIntensity')
// gui.add(renderer, 'toneMappingExposure').min(0).max(5).step(0.01).name('toneMappingExposure')

