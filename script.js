const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photoArrays = []

let imagesLoaded = 0
let ready = false
let totalImages = 0

const key = "jaqL-W5NZ3RhbuS5iE6cwV4lifGCSM7Vc3lu6BKuyuE"
const count = 30
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`

function setAttrib (element , attributes){
    for(const key in attributes)
    {
        element.setAttribute(key,attributes[key])
    }
}

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready= true
        loader.hidden=true
        
    }
}

function displayPhotos(){
    imagesLoaded=0
    totalImages=photoArrays.length
    photoArrays.forEach((photo)=>{
     const a = document.createElement('a')
     setAttrib(a,{href:photo.links.html,target:"_blank"});
     const img = document.createElement('img')
     setAttrib(img,{
         src:photo.urls.regular,
         alt:photo.alt_description,
         title:photo.alt_description
     })
     img.addEventListener('load',imageLoaded)
     a.appendChild(img)
     imgContainer.appendChild(a)
    });
}

async function getImages(){
try {
    const response = await fetch(apiUrl)
    photoArrays= await response.json()
    displayPhotos()
} catch (error) {
    
}
}




window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false
        getImages();
    }
})
getImages();