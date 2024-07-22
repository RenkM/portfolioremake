const totalBanners = 3;
let bannerAtual = 1;
let intervaloTrocaBanner;

const titlesBanner = ["TRANSPORTE COMUNITARIO - FB", "Projetos De Desenvolvimento", "Web Design"];
const textsBanner = ["Feito em HTML/CSS/JS e API do GOOGLE MAPS", "Diversos protótipos de projetos Web/GameDev", "Estilização com HTML e CSS"];
const colorsBanner = ["#1D1C1F", "#3546D8", "#B67DF5"];
const textColors = ["#FFFFFF"];

let banner = document.getElementById("banner");
let btns = document.getElementById("btns");

export function criarBanners(){
    for(let i = 0; i < titlesBanner.length ; i++){
        var div = document.createElement('div');
        var h2 = document.createElement('h3');
        var h6 = document.createElement('h6');

        h2.textContent = titlesBanner[i];
        h6.textContent = textsBanner[i];

        h2.style.color = textColors[i % textColors.length]; // Use modulo operator to cycle through textColors array
        h6.style.color = textColors[(i + 1) % textColors.length];

        h2.style.fontSize = "1.8em";
        h6.style.fontSize = "1.4em";

        div.style.background = "linear-gradient(149deg, " + colorsBanner[i] + " 75%, rgba(245,244,244,1) 100%)";

        div.append(h2);
        div.appendChild(h6);
        banner.appendChild(div);

        var btn = document.createElement('div');
        btn.id = 'btn'+(i+1);
        btn.addEventListener('click', function() {
            trocaBanner(i+1);
        });
        btns.appendChild(btn);
    }
}

export function trocaBanner(numero) {    
    banner.style.left = "-" + (numero - 1) + "00vw";

    for (let i = 1; i <= totalBanners; i++) {
        document.getElementById("btn" + i).style.width = '1.2vw';
        document.getElementById("btn" + i).style.height = '1.2vw';
    }   
    document.getElementById("btn" + numero).style.width = '1.7vw';  
    document.getElementById("btn" + numero).style.height = '1.7vw';
}

export function startAutoSwap() {
    intervaloTrocaBanner = setInterval(autoTrocaBanner, 3000); // Troca a cada 3 segundos
}

function autoTrocaBanner() {
    bannerAtual = (bannerAtual >= totalBanners) ? 1 : bannerAtual + 1;
    trocaBanner(bannerAtual);
}