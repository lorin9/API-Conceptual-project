// .then(response => response.json())
    // .then(data=>console.log(data))
    // .catch(err => console.log(err))
const handleCategory = async() =>{
   
    const response = await  fetch("https://openapi.programming-hero.com/api/news/categories")
    const data = await response.json()

    const tabContainer = document.getElementById('tab-container')
    data.data.news_category.slice(0,3).forEach(category =>{
        const div =document.createElement('div')
        div.innerHTML = `
        <a onclick =" handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a> 
        `
        tabContainer.appendChild(div)
    })
    console.log(data.data.news_category)

}

const handleLoadNews = async(categoryId) =>{
  console.log(categoryId)
  const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
  const data = await response.json()
  const cardContainer = document.getElementById('card-container')

  cardContainer.innerHTML = ''

  data.data?.forEach(news =>{
    const div = document.createElement('div')
    div.innerHTML =`
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src=${news?.image_url} /></figure>
    <div class="card-body">
      <h2 class="card-title">${news.title.slice(0,40)}</h2>
      <p>${news.details.slice(0,60)}</p>
      <h3>total views: ${news.total_view?news.total_view : "no views" }</h3>
      <div class=" flex justify-between">
      <div class='flex gap-2'>
      <img class='w-10 rounded-full' src="${news.author?.img}" alt="">
      <h6>${news.author?.name}</h6>
      </div>
      <button onclick ="handleModal('${news._id}')" class="btn bg-pink-600">Buy Now</button>
      </div>
    </div>
  </div>
    `
    cardContainer.appendChild(div)
    console.log(data.data)
  })
 
}

const handleModal = (data) =>{
  const modalContainer = document.getElementById('modal-container')
const div = document.createElement('div')
div.innerHTML = `
<dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
`
modalContainer.appendChild(div)

const modal = document.getElementById('my_modal_1')
modal.showModal()
}

handleCategory()
handleLoadNews('01')