window.addEventListener('load', function(){
  axios.get('/getList')
    .then(result => {
      const datas = result.data
      const planUL = document.querySelector('#planList')
      const designUL = document.querySelector('#designList')
      datas.forEach(data => {
        const li = document.createElement('li')
        const input = document.createElement('input')
        const span = document.createElement('span')
        input.type="checkbox"
        input.class="planCheck"
        input.onchange = function() { 
          const sibling = this.nextSibling 
          axios.post('/push', {text: sibling.textContent})
            .then(result => { 
              if(result.data === 'success'){
                const li2 = document.createElement('li')
                const input2 = document.createElement('input')
                const span2 = document.createElement('span')
                span2.textContent = sibling.textContent
                li2.append(input2)
                li2.append(span2)
                input2.type="checkbox"
                input2.class="planCheck"
                sibling.style.textDecoration = 'line-through' 
                designUL.append(li2)
              }
            })
        }
        span.textContent = data
        li.append(input)
        li.append(span)
        planUL.append(li)
      });
    }) 
});
