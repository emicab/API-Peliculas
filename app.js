let API_Key = "api_key=36150b72d3f84542fabea84ee08258ae";


const cargarPeliculas = async () =>{
    try{
        let resp = await fetch(`https://api.themoviedb.org/3/movie/popular?${API_Key}&language=es-ES&append_to_response=images&include_image_language=es,null`)
    
        // console.log(resp)
        
        if (resp.status === 200) {
            const data = await resp.json();
            

            let peliculas = '';
            data.results.forEach(pelicula =>{
                let fecha = pelicula.release_date;
                peliculas += `
                <div class="imgPelicula">
                    <h3 class="fecha">${fecha.slice(0, 4)}</h3>
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3>${pelicula.title}</h3>
                </div>`
            });

            document.getElementById('contenedor').innerHTML = peliculas;
        }
        else if(resp.status === 401){
            console.log("POSIBLEMENTE TU KEY ESTE MAL")
        }
        else if(resp.status === 404){
            console.log("UPS! Ocurrió algo y no sabemos que...")
        }


        } catch(e){
            console.log("ALGO PASO...")
    }
}

cargarPeliculas();