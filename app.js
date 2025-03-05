let selector = document.getElementById('opcion_usuario')
let userId = null
fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(usuarios =>{
        usuarios.forEach(usuario => {
            selector.innerHTML += `<option value="${usuario.id}">${usuario.name}</option>`
        });
      })


document.getElementById('opcion_usuario').addEventListener('change',function () {
    selectValue = this.value
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts =>{
        let container = document.getElementById('posts')
        container.innerHTML = ''
        posts.forEach(post =>{
            if(post.userId == selectValue){
                container.innerHTML += `
                <article>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button class ="verComentarios" data-id="${post.id}">Ver comentarios</button>
                    <button class ="ocultarComentarios" data-id="${post.id}">Ocultar comentarios</button>
                </article>`
            }
        });
        // asignarEventosComentarios();
    })
})

// function asignarEventosComentarios() {
//     document.querySelectorAll('.verComentarios').forEach(boton => { // 🔹 Corregido el selector
//         boton.addEventListener('click', function () {
//             let postId = this.getAttribute('data-id'); // 🔹 Ahora obtiene el ID correctamente
//             console.log(postId);
//         });
//     });
// }

