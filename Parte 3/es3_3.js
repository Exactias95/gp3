//Terzo esercizio terza esercitazione 2016
// Forma Cilindro

// Alan Bimbati
// Andrea Dainese
// Fabrizio Ceravolo

	function main(){
		
		var stats, scene, renderer, camera, cameraControl;

		if( !init() )	animate();

		// inizializzo la scena
		function init(){

			renderer = new THREE.WebGLRenderer();
			renderer.setClearColor( 0xFFFFFF, 1.0 );			
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.getElementById('canvas').appendChild(renderer.domElement);

			// Stats Js
			stats = new Stats();
			stats.domElement.style.position	= 'absolute';
			stats.domElement.style.left	= '0px';
			stats.domElement.style.top = '0px';
			
			document.getElementById('Stats-output').appendChild( stats.domElement );

			// creo la scena
			scene = new THREE.Scene();

			// metto la camera in modo correttp nella scena
			camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 10000 );
			camera.position.set(0, 0, 7);
			camera.lookAt(scene.position)
			scene.add(camera);

			var light	= new THREE.DirectionalLight( 0x404040 , 3 );
			light.position.set( 1, 1, 0 ).normalize();
			scene.add( light );
			
			var light	= new THREE.DirectionalLight( 0x404040 , 3 );
			light.position.set( -1, 1, 0 ).normalize();
			scene.add( light );
			
			var light	= new THREE.PointLight( 0x404040 , 15, 25 );
			light.position.set( 0, -3, 0 );
			scene.add( light );
			
			var light	= new THREE.PointLight( 0x404040 , 15, 25 );
			light.position.set( 3, 3, 0 );
			scene.add( light );
			
			scene.fog = new THREE.FogExp2( 0x000000, 0.15 );

			// creo il tunnel con un semplice cilindro
			var geometry = new THREE.CylinderGeometry( 1, 1, 25, 27, 1, true );
			texture	= THREE.ImageUtils.loadTexture( "images/brick.jpg" );
			texture.wrapT = THREE.RepeatWrapping;
			
			//applico la texture attorno al cilindro
			var material = new THREE.MeshLambertMaterial({ map : texture});
			var mesh = new THREE.Mesh( geometry, material );
			mesh.rotation.x	= Math.PI/2;
			scene.add( mesh );

			mesh.flipSided	= true;
		}


		function animate() {
			requestAnimationFrame( animate );
			render();
			stats.update();
		}

		// renderizzo la scena
		function render() {

			// muovo la texture per dare l'ullusione di discesa giu' nel tunnel
			texture.offset.y += 0.010; // illusione di discesa

			//muovo la camera avanti e indietro
			var secondi	= Date.now() / 1000;
			var raggio = 0.50;
			var angolo	= (secondi*Math.PI)/4;
			
			//per l'effetto di rotazione
			camera.position.x = Math.cos(angolo - Math.PI/2) * raggio;
			camera.position.y = Math.sin(angolo - Math.PI/2) * raggio;
			camera.rotation.z = angolo;

			// renderizzo la scena
			renderer.render( scene, camera );
		}
	}