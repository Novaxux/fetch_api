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
                    <div id="btnVerComentarios${post.id}">
                        <button class ="verComentarios" onclick="asignarComentarios(${post.id})">Ver comentarios</button>
                    </div>
                    <div id="coment${post.id}"></div>
                </article>`
            }
        });
    })
})

function asignarComentarios(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => response.json())
    .then(comments => {
        let divComent = document.getElementById("coment"+id);
        let btnComment = document.getElementById("btnVerComentarios"+id)
        btnComment.hidden = true;
        comments.forEach(comment => {
            divComent.innerHTML += `
            <article>
                <h3>${comment.name}</h3>
                <p>${comment.body}</p>
            </article>
            `
        })
        divComent.innerHTML += `
        <button class ="verComentarios" onclick = "ocultarComentarios(${id})" >Ocultar comentarios</button>
        `
    })
}

function ocultarComentarios(id){
    let btnComment = document.getElementById("btnVerComentarios"+id)
    btnComment.hidden = false;
    let divComent = document.getElementById("coment"+id);
    divComent.innerHTML = ''
}