const trash = document.querySelectorAll('.fa-trash')



// document.querySelectorAll('.checkBoxes').forEach( box => {
//   box.addEventListener("change", event => {
//     console.log(event.target)
//     console.log(event.target.checked)

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){

    const word = this.parentNode.querySelector('.bold').innerText

    fetch('deleteWord', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'word': word,
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

document.querySelectorAll('.star').forEach( starBtn => {
  starBtn.addEventListener("click", event => {

    const conclude = event.target.parentNode.querySelector('.outCome').innerText
    const word = event.target.parentNode.querySelector('.bold').innerText

    console.log(word)

    fetch('/upDate', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: word,
        outcome: "Don't get saucey"
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
})

// update.addEventListener('click', _ => {

//   const word = this.parentNode.querySelector('.bold').innerText

//   fetch('/upDate', {
//     method: 'put',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       'word': word,
//       quote: 'I find your lack of faith disturbing.'
//     })
//   })
//     .then(res => {
//       if (res.ok) return res.json()
//     })
//     .then(response => {
//       window.location.reload(true)
//     })
// })