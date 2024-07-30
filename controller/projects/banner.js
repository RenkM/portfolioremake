const totalBanners = 1;
let bannerAtual = 1;
let intervaloTrocaBanner;

const titlesBanner = ["Plataforma de Eventos", "Projetos De Desenvolvimento", "Web Design"];
const textsBanner = ["Site de divulgação e venda de ingresso de eventos.", "Diversos protótipos de projetos Web/GameDev", "Estilização com HTML e CSS"];
const colorsBanner = ["#1D1C1F", "#3546D8", "#B67DF5"];
const textColors = ["#FFFFFF"];

let banner = document.getElementById("banner");
let btns = document.getElementById("btns");

export function criarBanners(){
    for(let i = 0; i < titlesBanner.length ; i++){
        var div = document.createElement('div');
        var h2 = document.createElement('h2');  // Alterei de h3 para h2 para corresponder à semântica
        var h6 = document.createElement('h6');

        h2.textContent = titlesBanner[i];
        h6.textContent = textsBanner[i];

        h2.style.color = textColors[i % textColors.length];
        h6.style.color = textColors[(i + 1) % textColors.length];

        h2.style.fontSize = "3em";
        h6.style.fontSize = "1.5em";

        // Estilize o div para centralizar o conteúdo
        div.style.background = "linear-gradient(149deg, " + colorsBanner[i] + " 75%, rgba(245,244,244,1) 100%)";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.textAlign = "center";
        div.style.height = "350px"; // Ajuste conforme necessário

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