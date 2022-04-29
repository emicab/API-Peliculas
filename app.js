let API_Key = "api_key=36150b72d3f84542fabea84ee08258ae";

let btnAnterior = document.getElementById('btnAnterior');
let btnSiguiente = document.getElementById('btnSiguiente');

let pagina = 1;

btnSiguiente.addEventListener('click', () =>{
    pagina += 1;
    cargarPeliculas();
})
btnAnterior.addEventListener('click', () =>{
    pagina -= 1;
    cargarPeliculas();
})


const cargarPeliculas = async () =>{
    try{
        let resp = await fetch(`https://api.themoviedb.org/3/movie/popular?${API_Key}&language=es-ES&append_to_response=images&include_image_language=es,null&page=${pagina}`)

        // console.log(resp)
        
        if (resp.status === 200) {
            const data = await resp.json();

            let peliculas = '';
            
            data.results.forEach(pelicula =>{
                let idPeli = pelicula.id;
                // console.log(idPeli);
                
                const cargarID = async () =>{
                    try{
                        let id = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?${API_Key}&language=es-ES&append_to_response=images&include_image_language=es,null`)

                        const id_movie = await id.json();
                        // console.log(id_movie.genres)
                        id_movie.genres.forEach(genero =>{
                            let genres_movie = genero.name;
                            // console.log(genres_movie)
                        })

                    } catch(e){
                        console.log("asd")
                    }
                }
                cargarID();

                let fecha = pelicula.release_date;
                let popularity = pelicula.popularity;
                peliculas += `
                <div class="imgPelicula">
                <span class="fecha">${fecha.slice(0, 4)}</span>
                <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                <h4 class="popularity">Popularidad: ${Math.floor(popularity)} pts.</h4>
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

