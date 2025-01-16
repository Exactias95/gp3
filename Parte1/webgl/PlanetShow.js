//PlanetShow.js
//Andrea Dainese
//Alan Bimbati
//Fabrizio Ceravolo
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var L=150;
var SpaceG = new THREE.BoxGeometry(canvasWidth*1.5,innerHeight*1.5,1);
var SpaceTexture=new THREE.TextureLoader().load('Texture/space.jpg' );
var SPTexture=new THREE.MeshBasicMaterial( { map: SpaceTexture } );
var Space = new THREE.Mesh(SpaceG, SPTexture);
//Definisco delle variabili "globali"
var camera, scene, renderer;
var cameraControls;
var effectController;
var clock = new THREE.Clock();
var ambientLight, light;
var f1,f2;
var object;
//L è la misura standard che utilizzo per gli ogetti

//definisco tutti gli oggetti in modo globale per alleggerire il programma così non deve modificarli o ridefinirli nel render
var objSfera= new THREE.SphereGeometry(L,L,L);
//texture del pianeta
var TextureMaterial;
//pianeti rocciosi
//mercurio
var MercuryTexture=new THREE.TextureLoader().load('Texture/mercurymap.bmp' );
var MTexture=new THREE.MeshBasicMaterial( { map: MercuryTexture } );
//venere 
var VenusTexture=new THREE.TextureLoader().load('Texture/venusmap.bmp' );
var VTexture=new THREE.MeshBasicMaterial( { map: VenusTexture } );
//terra
var EarthTexture=new THREE.TextureLoader().load('Texture/earthmap.bmp' );
var ETexture=new THREE.MeshBasicMaterial( { map: EarthTexture } );
//marte
var MarsTexture=new THREE.TextureLoader().load('Texture/marsmap.bmp' );
var MATexture=new THREE.MeshBasicMaterial( { map: MarsTexture } );
//luna..... aspetta un attimo io sono un satellite non un pianeta
var MoonTexture=new THREE.TextureLoader().load('Texture/moonmap.bmp' );
var MoonTexture=new THREE.MeshBasicMaterial( { map: MoonTexture } );
//pianeti gassosi
//giove
var JupiterTexture=new THREE.TextureLoader().load('Texture/jupitermap.bmp' );
var JTexture=new THREE.MeshBasicMaterial( { map: JupiterTexture } );
//saturno
var SaturnTexture=new THREE.TextureLoader().load('Texture/saturnmap.bmp' );
var STexture=new THREE.MeshBasicMaterial( { map: SaturnTexture } );
//urano
var UrnausTexture=new THREE.TextureLoader().load('Texture/uranusmap.bmp' );
var UTexture=new THREE.MeshBasicMaterial( { map: UrnausTexture } );
//nettuno
var NeptuneTexture=new THREE.TextureLoader().load('Texture/neptunemap.bmp' );
var NTexture=new THREE.MeshBasicMaterial( { map: NeptuneTexture } );
//plutone(io non dovrei essere neanche qui XD 1)non sono un pianeta 2)non sono gassoso )
var PlutoTexture=new THREE.TextureLoader().load('Texture/plutomap.bmp' );
var PTexture=new THREE.MeshBasicMaterial( { map: PlutoTexture } );   


function init()
{
	// CAMERA
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 8000);
	camera.position.set( 0, 0, 750 );

	// LIGHTS
	ambientLight = new THREE.AmbientLight( 0x333333 );
	light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );

	// RENDERER
	renderer = new THREE.WebGLRenderer(  );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColor( 0xAAAAAA);
	var container = document.getElementById('WebGL-output');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0)
	{
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	//texture
	/*PlanetTexture = new THREE.TextureLoader().load('Texture/earthmap.bmp' );
	texture=new THREE.MeshBasicMaterial( { map: PlanetTexture } );*/

	// eventi
	window.addEventListener( 'resize', onWindowResize, false );

	// GUI
	setupGui();	
}

//funzione che aggiorna la visuale della camera al variare dello schermo
function onWindowResize() 
{
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	renderer.setSize( canvasWidth, canvasHeight );
	camera.aspect = canvasWidth/ canvasHeight;
	camera.updateProjectionMatrix();
}
//funzione che imposta il menu
function setupGui() {
	effectController = 
	{
		mercurio: 	true,
		venere: 	false,
		terra: 		false,
		marte: 		false,
		giove: 		false,
		saturno: 	false,
		urano: 		false,
		nettuno: 	false,
		plutone: 	false,
		luna:		false,
		
	};

	function reset()
	{
		effectController.mercurio= 	false;
		effectController.venere= 	false;
		effectController.terra= 	false;
		effectController.marte= 	false;
		effectController.giove= 	false;
		effectController.saturno= 	false;
		effectController.urano= 	false;
		effectController.nettuno= 	false;
		effectController.plutone= 	false;
		effectController.luna= 	    false;
	}
	var gui = new dat.GUI();
	
	f1 = gui.addFolder( "Planet" );
	f1.add( effectController, "mercurio" ).name("Mercurio").onChange(function()	{reset();effectController.mercurio=true;});
	f1.add( effectController, "venere" ).name("Venere").onChange(function()		{reset();effectController.venere=true;});
	f1.add( effectController, "terra" ).name("Terra").onChange(function() 		{reset();effectController.terra=true;});
	f1.add( effectController, "marte" ).name("Marte").onChange(function() 		{reset();effectController.marte=true;});
	f1.add( effectController, "giove" ).name("Giove").onChange(function() 		{reset();effectController.giove=true;});
	f1.add( effectController, "saturno" ).name("Saturno").onChange(function() 	{reset();effectController.saturno=true;});
	f1.add( effectController, "urano").name("Urano").onChange(function() 		{reset();effectController.urano=true;});
	f1.add( effectController, "nettuno" ).name("Nettuno").onChange(function() 	{reset();effectController.nettuno=true;});
	f1.add( effectController, "plutone" ).name("Plutone").onChange(function() 	{reset();effectController.plutone=true;});
	f1.add( effectController, "luna" ).name("Luna").onChange(function() 		{reset();effectController.luna=true;});
	f1.open();
	//object.rotation.y=5;
}

function animate()
 {
	requestAnimationFrame( animate );
	render();
	//aggiorna il menu dei materiali(in modo tale che solo un materiale sia su true)
	for (var i in f1.__controllers)
	{
		f1.__controllers[i].updateDisplay();
	}

}

//funzione del render
function render() 
{
	var delta = clock.getDelta();
	//object.rotation.y=5;
	//aggiorno materiale e oggetto poi gli disegna 
	TextureMaterial = createMaterial();
	fillScene();
	renderer.render( scene, camera );
}
//funzione che crea il materiale dell'ogetto selezionato: il MeshTextureMaterial deriva da Material e permette di aggiungere le tre luci
//(ambientale, diffusa e speculare) e il livello di shininess
function createMaterial()
{
	if(effectController.mercurio){return MTexture;}
	if(effectController.venere){return VTexture;}
	if(effectController.terra){return ETexture;}
	if(effectController.marte){return MATexture;}
	if(effectController.giove){return JTexture;}
	if(effectController.saturno){return STexture;}
	if(effectController.urano){return UTexture;}
	if(effectController.nettuno){return NTexture;}
	if(effectController.plutone){return PTexture;}
	if(effectController.luna){return MoonTexture;}
}

//stampa a schermo l'ogetto e la luce
function fillScene() 
{
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );
	// LIGHTS
	scene.add( ambientLight );
	scene.add( light );

	Space.position.x=0;
    Space.position.y=0;
    Space.position.z=-5;
	//oggetto
	object = new THREE.Mesh(objSfera,TextureMaterial);
	object.position.x=0;
    object.position.y=0;
    object.position.z=0;
	//aggiungo ogetto
	scene.add( Space );
	scene.add( object );
}
//funzione main
function main()
{
	init();
	animate();
}
