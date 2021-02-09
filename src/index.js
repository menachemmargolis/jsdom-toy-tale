    let addToy = false;
    const toyUrl = 'http://localhost:3000/toys'
    document.addEventListener("DOMContentLoaded", () => {
      const addBtn = document.querySelector("#new-toy-btn");
      const toyFormContainer = document.querySelector(".container");
      addBtn.addEventListener("click", () => {
        // hide & seek with the form
        addToy = !addToy;
        if (addToy) {
          toyFormContainer.style.display = "block";
        } else {
          toyFormContainer.style.display = "none";
        }
      });
    });

    const toyCollection = document.getElementById("toy-collection")
    const newToyForm = document.querySelector(".add-toy-form")
    fetch(toyUrl)
    .then(response => response.json())
    .then(data => data.forEach(renderToys))



    function renderToys(toy){
        const div = document.createElement('div')
        div.dataset.id = toy.id
        div.className = 'card'
        div.innerHTML = `
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar"/>
          <p>${toy.likes} likes</p>
          <button class="like-btn">Like </button>
          `
        toyCollection.append(div)
    }

    toyCollection.addEventListener('click',increaeLikes)
    
    function increaeLikes(e){

    


      if(e.target.className === 'like-btn'){
        const card = e.target.closest("div.card")
        const likeTag = card.querySelector("p")
        const like = parseInt(likeTag.innerHTML)


        fetch(`${toyUrl}/${card.dataset.id}`, {
          method: "PATCH",
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({likes: like + 1})
        })
        .then(response => response.json())
        .then(data => {likeTag.innerHTML = `${data.likes} likes`})
        
      }
      
    }

  newToyForm.addEventListener('submit', createNewToy)

  function createNewToy(e){
    e.preventDefault()
    const name = e.target.name.value
    const image = e.target.image.value
    const toyData = {name, image, likes:0 }
    fetch(toyUrl,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toyData)
    })
    .then(response => response.json())
    .then(renderToys)
    newToyForm.reset()
  }