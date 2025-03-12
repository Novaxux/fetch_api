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
                    <div id="divbtnComentarios${post.id}">
                        <button class ="verComentarios" id="verComentarios${post.id}" onclick="asignarComentarios(${post.id})">Ver comentarios</button>
                        <button class ="ocultarComentarios" id="hideComments${post.id}" hidden= "true" onclick = "ocultarComentarios(${post.id})" >Ocultar comentarios</button>
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
        let divComment = document.getElementById("coment"+id);
        let btnComments = document.getElementById("verComentarios"+id)
        let btnHideComments = document.getElementById("hideComments"+ id)
        btnComments.hidden = true;
        btnHideComments.hidden = false;
        divComment.innerHTML = ''
        comments.forEach(comment => {
            divComment.innerHTML += `
            <article>
                <h3>${comment.name}</h3>
                <p>${comment.body}</p>
            </article>
            `
        })
    })
}

function ocultarComentarios(id){
    let btnComments = document.getElementById("verComentarios"+id)
    let btnHideComments = document.getElementById("hideComments"+ id)
    let divComment = document.getElementById("coment"+id);
    btnComments.hidden = false;
    btnHideComments.hidden = true;
    divComment.innerHTML = ''
}