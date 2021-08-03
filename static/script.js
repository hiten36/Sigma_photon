function main(pn,flag)
{
    var api="563492ad6f917000010000013acc7a0809f5462da0672fee0e31c674";
    var url=`https://api.pexels.com/v1/curated?page=${pn}&per_page=9`;
    nc1=document.createElement('div');
    nc1.setAttribute("class","spinner-border text-danger");
    nc1.setAttribute("role","status");
    nc1.innerHTML=`<span class="visually-hidden">Loading...</span>`;
    document.querySelector('.gal-img-box').appendChild(nc1);
    fetch(url, {
        headers:{
            Authorization:api
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        var str='';
        for(i of data.photos)
        {
            let src=i.src.original;
            let photographer=i.photographer;
            let imgsrc=i.src.medium;
            let previewsrc=i.src.large;
            str+=`<div class="gal-i">
                    <input type="hidden" value=${previewsrc}>
                    <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${imgsrc}" alt="${photographer}" download>
                    <a class="gal-a" href="${src}" download>Download</a>
                    <p class="gal-p" >${photographer}</p>
                </div>`;
        }
        let nc=document.createElement('div');
        nc.setAttribute('class','gal-img-box1');
        nc.innerHTML=str;
        if(!flag)
        {
            document.querySelector('.gal-img-box').removeChild(nc1);
        }
        document.querySelector('.gal-img-box').appendChild(nc);
        
        let b1=document.querySelectorAll('.gal-i');
        for(i of b1)
        {
            i.addEventListener('mouseover',(e)=>{
                e.target.parentNode.children[2].classList.add('gal-ani');
                e.target.parentNode.children[2].style.display='block';
                e.target.parentNode.children[3].classList.add('gal-ani');
                e.target.parentNode.children[3].style.display='block';
            })
            i.addEventListener('mouseleave',(f)=>{
                f.target.children[2].classList.remove('gal-ani');
                f.target.children[2].style.display='none';
                f.target.children[3].classList.remove('gal-ani');
                f.target.children[3].style.display='none';
            })
            i.addEventListener('click',(e)=>{
                console.log(e.target.nextElementSibling);
                document.getElementById('modal-img').src=e.target.previousElementSibling.value;
                document.getElementById('model-down').href=e.target.nextElementSibling.href;
            })
        }
    })
}

function main2(query,pn,flag)
{
    console.log(pn);
    if(!flag)
    {
        document.querySelector('.gal-img-box').innerHTML="";
    }
    var surl= `https://api.pexels.com/v1/search?query=${query}&page=${pn}&per_page=9`;
    var api="563492ad6f917000010000013acc7a0809f5462da0672fee0e31c674";
    nc11=document.createElement('div');
    nc11.setAttribute("class","spinner-border text-danger");
    nc11.setAttribute("role","status");
    nc11.innerHTML=`<span class="visually-hidden">Loading...</span>`;
    document.querySelector('.gal-img-box').appendChild(nc11);
    fetch(surl,{
        headers:{
            Authorization:api
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        var str='';
        for(i of data.photos)
        {
            let src=i.src.original;
            let photographer=i.photographer;
            let imgsrc=i.src.medium;
            let previewsrc=i.src.large;
            str+=`<div class="gal-i">
                    <input type="hidden" value=${previewsrc}>
                    <img data-bs-toggle="modal" data-bs-target="#exampleModal" src="${imgsrc}" alt="${photographer}" download>
                    <a class="gal-a" href="${src}" download>Download</a>
                    <p class="gal-p" >${photographer}</p>
                </div>`;
        }
        let nc=document.createElement('div');
        nc.setAttribute('class','gal-img-box1');
        nc.innerHTML=str;
        if(flag)
        {
            document.querySelector('.gal-img-box').removeChild(nc11);
        }
        if(!flag)
        {
            document.querySelector('.gal-img-box').innerHTML="";
        }
        document.querySelector('.gal-img-box').appendChild(nc);
        let b1=document.querySelectorAll('.gal-i');
        for(i of b1)
        {
            i.addEventListener('mouseover',(e)=>{
                e.target.parentNode.children[2].classList.add('gal-ani');
                e.target.parentNode.children[2].style.display='block';
                e.target.parentNode.children[3].classList.add('gal-ani');
                e.target.parentNode.children[3].style.display='block';
            })
            i.addEventListener('mouseleave',(f)=>{
                f.target.children[2].classList.remove('gal-ani');
                f.target.children[2].style.display='none';
                f.target.children[3].classList.remove('gal-ani');
                f.target.children[3].style.display='none';
            })
            i.addEventListener('click',(e)=>{
                console.log(e.target.nextElementSibling);
                document.getElementById('modal-img').src=e.target.previousElementSibling.value;
                document.getElementById('model-down').href=e.target.nextElementSibling.href;
            })
        }
    })
}

j=1;

document.getElementById('gal-s').addEventListener('input',(e)=>{
    if(e.target.value!="")
    {
        j=1;
        main2(e.target.value,j,false);
    }
    else
    {
        j=1
        main(j,true);
    }
})

main(j,false);
document.querySelector('.load_more').addEventListener('click',()=>{
    j++;
    if(document.getElementById('gal-s').value=='')
    {
        main(j,false);
    }
    if(document.getElementById('gal-s').value!='')
    {
        let q=document.getElementById('gal-s').value;
        main2(q,j,true);
    }
})

let b3 = document.querySelectorAll('.gal-drops');
for(i of b3)
{
    i.addEventListener('click',(e)=>{
        document.querySelector('.gal-drops-active').classList.remove('gal-drops-active');
        e.target.parentNode.classList.add('gal-drops-active');
        let q=e.target.innerText;
        j=1;
        main2(q,j,false);
    })
}