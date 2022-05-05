// const getResidents = document.querySelector('#button')
const agentContainer = document.querySelector('#agent__container')

var config = {
  method: 'get',
  url: 'https://valorant-api.com/v1/agents',
  headers: { }
};

    axios(config) 
    .then(function (res) {
    for(let i = 0; i < res.data.data.length; i++){
      // let abilities = res.data.data[i].abilities
      // console.log(res.data.data[i].displayName)

      let name = res.data.data[i].displayName;
      let description = res.data.data[i].description
      // for(let j = 0; j < res.data.data.length; j++){
      //   abilityName = res.data.data[i].abilities[j].displayName
      // }
      const agentCard = document.createElement('div')
      agentCard.id = name
      agentCard.innerHTML = `<h2 id=${name}>${name}</h2>
      <button id='agent-${i}' class='favBtn'>Add to Favorite</button>
      <img id='agent' src=${res.data.data[i].fullPortrait} />
      <p>${description}</p>
      <p></p>
      `

      agentContainer.appendChild(agentCard)

      let x = document.querySelector(`#agent-${i}`)
      x.addEventListener('click', () => favorite(res.data.data[i]))

      // let agent = document.createElement('h2')
      // agent.id = 'agentName';
      // var button = document.createElement("button");
      // button.innerHTML = "Add to Favorite";
      // button.id = 'favBtn';
      // var image = document.createElement('img')
      // image.width = 512;
      // image.height = 512;
      // image.id = "agent"
      // let agentDesc = document.createElement('p')
      // let agentAbilName = document.createElement('p')


      // image.src = res.data.data[i].fullPortrait
      // agent.textContent = name;
      // agentDesc.textContent = description;
      // agentAbilName.textContent = abilityName;
      
      //  agentContainer.appendChild(agent);
      //  agentContainer.appendChild(button);
      //  agentContainer.appendChild(image);
      //  agentContainer.appendChild(agentDesc);
      //  agentContainer.appendChild(agentAbilName);
      //  abilities.map(ability => {
      //   let slot = document.createElement('h3')
      //   let abilityName = document.createElement('h4')
      //   let abilityDescription = document.createElement('p')
      //   slot.innerText = ability.slot;
      //   abilityName.innerText = ability.displayName;
      //   abilityDescription.innerText = ability.description;
      //   abilityName.appendChild(abilityDescription)
      //   slot.appendChild(abilityName)
      //   agentContainer.appendChild(slot)
      // })

    }
    // var x = document.querySelectorAll('.favBtn');
    // for(let j = 0; j < x.length; j++){
    //   x[j].addEventListener('click', favorite(res.data.data[i]))
    //     }
      }
    )
    .catch(function (error) {
      console.log(error);
    });

    const favorite = (body) => {
      // console.log(body)
      let {displayName, description} = body

      let newDescription = description.replaceAll("'", '')

      let bodyObj = {
        agent_name: displayName,
        agent_description: newDescription
      }
      axios.post(`http://localhost:4004/api/favorite`, bodyObj).then( res => {
      console.log('favorite success')
    }).catch(err => {
      console.log(err)
      alert('Uh oh. Your request did not work.')
    })}

// function favoriteSubmitHandler(e, body) {
//   e.preventDefault()
    
//   let agentName = document.querySelector('#agentName')

    
//   let bodyObj = {
//       agent_name: 'Testing here',
//   }
    
//   favorite(bodyObj)
    
//   // agentName.value = ''
  
// }
    