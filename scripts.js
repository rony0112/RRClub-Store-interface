
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');

let current = 0;
const total = items.length;

function goTo(index) {
    items.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    current = (index + total) % total;

    items[current].classList.add('active');
    dots[current].classList.add('active');

    const numbersElement = document.querySelector('.numbers');
    if (numbersElement) {
        numbersElement.textContent = String(current + 1).padStart(2, '0');
    }
}

prev.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));

goTo(0);


let autoPlayTimer = null;

function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => goTo(current + 1), 5000);
}

startAutoPlay();


function pauseAutoPlay() {
    if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }
}

function resumeAutoPlay() {
    if (!autoPlayTimer) startAutoPlay();
}

const hoverAreas = [
    document.querySelector('.list'),
    document.querySelector('.content'),
    document.querySelector('.product-side'),
    document.querySelector('.arrows'),
    document.querySelector('.indicators')
].filter(el => el);

hoverAreas.forEach(el => {
    el.addEventListener('mouseenter', pauseAutoPlay);
    el.addEventListener('mouseleave', resumeAutoPlay);
});

// MODAL "SAIBA MAIS"
   const products = [
    {
        title: "Apple Watch Series 10",
        image: "./img/apple-watch.png",
        description: "O ápice da tecnologia vestível.\n\n• Tela AMOLED Always-On 30% maior\n• Sensor avançado detecta apneia do sono e temperatura corporal\n• ECG, oxigenação sanguínea e monitoramento cardíaco 24h\n• GPS preciso + resistência à água 50m\n• Bateria de até 18h (36h em modo economia)\n\nPerfeito para quem vive intensamente e não abre mão de saúde e estilo."
    },
    {
        title: "AirPods Max",
        image: "./img/air-pods.png",
        description: "Som que redefine imersão.\n\n• Cancelamento ativo de ruído líder de mercado\n• Áudio espacial com rastreamento dinâmico de cabeça\n• Drivers de 40mm para graves potentes e agudos cristalinos\n• Modo transparência adaptável\n• Até 20 horas de bateria com ANC ligado\n\nDesign premium em alumínio anodizado e malha knit respirável."
    },
    {
        title: "Apple Vision Pro",
        image: "./img/vision-pro.png",
        description: "O futuro da computação espacial.\n\n• Displays micro-OLED 4K por olho\n• Rastreamento ocular e manual de alta precisão\n• visionOS: janelas 3D flutuantes e ambientes imersivos\n• FaceTime em tamanho real + colaboração remota\n• Ideal para trabalho, entretenimento e criação\n\nBateria externa com até 2 horas de uso contínuo."
    }
];

const modal = document.getElementById('productModal');

if (modal) {
    console.log("Modal encontrado no DOM!");

    document.querySelectorAll('.btn').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Botão 'Saiba Mais' clicado, índice:", index);

            const product = products[index];
            if (product) {
                document.getElementById('modalTitle').textContent = product.title;
                document.getElementById('modalImage').src = product.image;
                document.getElementById('modalImage').alt = product.title;
                document.getElementById('modalDescription').textContent = product.description;
                modal.style.display = 'block';
            } else {
                console.warn("Produto não encontrado para o índice:", index);
            }
        });
    });


    document.querySelector('.close-modal')?.addEventListener('click', () => modal.style.display = 'none');
    document.querySelector('.modal-close-btn')?.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
} else {
    console.error("Elemento #productModal não encontrado! Verifique se está no HTML dentro do <body>.");
}