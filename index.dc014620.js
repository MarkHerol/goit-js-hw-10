function e(e){return fetch(`https://api.thecatapi.com/v1/images/search?api_key=live_hgVLmozRnWu8KA5AwXcTnQHagnoN82mIVmdHKvikbJsJw7KLhHIWKYVzJ3B5sXy5&breed_ids=${e}`).then((e=>{if(e.ok)return e.json();throw new Error(e.status)}))}const s=document.querySelector(".breed-select"),t=document.querySelector(".cat-info"),i=document.querySelector(".loader"),n=document.querySelector(".error");function d(){n.classList.remove("is-hidden"),s.classList.add("is-hidden")}n.classList.add("is-hidden"),fetch("https://api.thecatapi.com/v1/breeds?api_key=live_hgVLmozRnWu8KA5AwXcTnQHagnoN82mIVmdHKvikbJsJw7KLhHIWKYVzJ3B5sXy5").then((e=>{if(e.ok)return e.json();throw new Error(e.status)})).then((e=>{i.classList.replace("loader","is-hidden");let t=e.map((({name:e,id:s})=>`<option value=${s}>${e}</option>`));s.insertAdjacentHTML("beforeend",t),s.classList.remove("is-hidden")})).catch(d),s.addEventListener("change",(n=>{i.classList.replace("is-hidden","loader"),s.classList.add("is-hidden"),t.classList.add("is-hidden"),e(n.target.value).then((e=>{const{url:n,breeds:d}=e[0],{name:a,description:r,temperament:c}=d[0];t.innerHTML=`\n            <img src='${n}' alt='{name}' width="400"/>\n            <div class='box'>\n                <h2>${a}</h2>\n                <p>${r}</p>\n                <p>${c}</p>\n            </div>\n        `,t.classList.remove("is-hidden"),s.classList.remove("is-hidden"),i.classList.add("is-hidden")})).catch(d)}));
//# sourceMappingURL=index.dc014620.js.map
