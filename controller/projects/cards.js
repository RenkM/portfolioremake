export class CriadorCards {
    constructor() {
        this.cards_projetos = document.getElementById('cards_projetos');
        this.criar_card = document.getElementById('criar_card');
        this.input_titulo = document.getElementById('input_titulo');
        this.input_descricao = document.getElementById('input_descricao');
        this.input_img = document.getElementById('input_img');

        this.addCard = this.addCard.bind(this);
        this.removerCard = this.removerCard.bind(this);

    }

    async criarCards() {
        const response = await fetch('http://backendportfolio-fawn.vercel.app//pegaCards');
        const data = await response.json();
        const projetos = data.projetos;

        this.cards_projetos.innerHTML = '';

        for (let i = 0; i < projetos.length; i++) {
            const projeto = projetos[i];
            
            // Cria o container do card
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            
            // Cria e adiciona a imagem ao card
            const img = document.createElement('img');
            img.src = `../../assets/img/${projeto.img}`;  // Usando caminho relativo para a pasta assets
            img.alt = projeto.nome;
            img.style.width = '12vw';
            img.style.height = '12vw';
            cardDiv.appendChild(img);
            
            // Cria e adiciona o título ao card
            const h3 = document.createElement('h3');
            h3.textContent = projeto.nome;
            cardDiv.appendChild(h3);
            
            // Cria e adiciona a descrição ao card
            const p = document.createElement('p');
            p.textContent = projeto.descricao;
            cardDiv.appendChild(p);
            
            // Cria e adiciona o botão de apagar ao card
            const btn = document.createElement('button');
            btn.style.width = '5vw';
            btn.style.height = '2vw';
            btn.textContent = 'Apagar';
            btn.addEventListener('click', () => {
                this.removerCard(projeto.id);
            });
            cardDiv.appendChild(btn);
            
            // Adiciona o card ao container de cards
            this.cards_projetos.appendChild(cardDiv);
        }

        // Adiciona o card para criar um novo projeto
        let divAdd = document.createElement('div');
        divAdd.className = 'card cardAdd';
        divAdd.addEventListener('click', () => {
            this.criar_card.style.display = 'flex';
        });

        let icon = document.createElement('i');
        icon.className = "fa-solid fa-plus iconeMais";

        divAdd.appendChild(icon);
        this.cards_projetos.appendChild(divAdd);
    }

    async addCard() {
        const nome = this.input_titulo.value;
        const descricao = this.input_descricao.value;
        const img = this.input_img.value;

        const response = await fetch('http://backendportfolio-fawn.vercel.app//addCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, img })
        });
        const result = await response.json();

        if (response.status === 201) {
            console.log(result.message);
            this.criar_card.style.display = 'none';
            this.criarCards();
        } else {
            console.error(result.error);
        }
    }

    async removerCard(id) {
        const response = await fetch('http://backendportfolio-fawn.vercel.app//deleteCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardId: id })
        });
        const result = await response.json();

        if (response.status === 200) {
            console.log(result.message);
            this.criarCards();
        } else {
            console.error(result.error);
        }
    }
}
