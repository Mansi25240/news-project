
const apikey="b0648c5ce63f4fc699bda9b0fbe8df8c"
const url="https://newsapi.org/v2/everything?q="


function reload()
{
    window.location.reload()
}

var a=new Date()
var b=a.getDate()
var c=a.getMonth()
var d=b-4
var e=c+1

window.addEventListener('load',()=>fetchNews("India"))

async function fetchNews(query)
{
    const res=await fetch(`${url}${query}&from=2024-${e}-${d}&apikey=${apikey}`)
    const data=await res.json()
    console.log(data)
    binddata(data.articles)

}
function binddata(articles)
{
    const cards=document.querySelector('.cards')
    const temp=document.querySelector('.news-template')

    cards.innerHTML=""

    articles.forEach((article)=>
    {
        if(!article.urlToImage) return;
        const cardclone=temp.content.cloneNode(true)
        fillData(cardclone,article)
        cards.appendChild(cardclone)
    })
}
function fillData(cardclone,article)
{
    const image=cardclone.querySelector('.im')
    const ntitle=cardclone.querySelector('#news-title')
    const source=cardclone.querySelector('.news-source')
    const description=cardclone.querySelector('.news-desc')

    image.src=article.urlToImage;
    ntitle.innerHTML=article.title;
    description.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    source.innerHTML=`${article.source.name} . ${date}`

    cardclone.firstElementChild.addEventListener("click",()=>
    {
        window.open(article.url,"_blank")
    })
}
let navselector=null;
function nav(id)
{
    fetchNews(id)
    const navItem=document.getElementById(id)
    navselector?.classList.remove("active")
    navselector=navItem
    navselector.classList.add("active")

}

const button=document.querySelector('.btn')
const text=document.querySelector('.search')

button.addEventListener("click",()=>
{
    const query=text.value
    if(!query) return
    fetchNews(query)
    navselector?.classList.remove("active")
    navselector=null;
})


const main=document.querySelector('.main')
const dark=document.querySelector('.mode')

dark.addEventListener("click",()=>
{
   main.classList.add('show')
   dark.classList.add('show2')
   light.classList.remove('show3')
   
})

const light=document.querySelector('.modee')
light.addEventListener("click",()=>
{
   main.classList.remove('show')
   dark.classList.remove('show2')
   light.classList.add('show3')
   
})

window.addEventListener("load",()=>
{
    light.classList.add('show3') 
})









