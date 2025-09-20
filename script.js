// Funções para modal de imagens
function openImageModal(imageSrc, imageTitle) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    // Verificar se a imagem existe, se não, tentar PNG
    const img = new Image();
    img.onload = function() {
        modalImage.src = imageSrc;
        modalTitle.textContent = imageTitle;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Previne scroll da página
    };
    img.onerror = function() {
        // Se JPG não carregar, tentar PNG
        const pngSrc = imageSrc.replace('.jpg', '.png');
        const pngImg = new Image();
        pngImg.onload = function() {
            modalImage.src = pngSrc;
            modalTitle.textContent = imageTitle;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        pngImg.onerror = function() {
            // Se nem JPG nem PNG carregarem, mostrar placeholder
            modalImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+';
            modalTitle.textContent = imageTitle;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
        pngImg.src = pngSrc;
    };
    img.src = imageSrc;
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página
}

// Fechar modal clicando fora da imagem
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
});

// Função para mostrar mensagem de sucesso
function showSuccessMessage(message) {
    // Criar elemento de mensagem
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Adicionar estilos
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Adicionar animação CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .success-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .success-content i {
            font-size: 18px;
        }
    `;
    document.head.appendChild(style);
    
    // Adicionar ao body
    document.body.appendChild(successDiv);
    
    // Remover após 3 segundos
    setTimeout(() => {
        successDiv.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80; // Altura do header fixo
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Garantir que o scroll funcione após fechar o menu mobile
        setTimeout(() => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.querySelectorAll('.product-card, .stat, .contact-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco mais para garantir que o DOM esteja carregado
    setTimeout(function() {
        const contactForm = document.querySelector('.contact-form form');
        console.log('Formulário encontrado:', contactForm);
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Formulário enviado!');
                
                // Coletar dados do formulário
                const name = this.querySelector('input[type="text"]').value;
                const phone = this.querySelector('input[type="tel"]').value;
                const product = this.querySelector('select').value;
                const message = this.querySelector('textarea').value;
                
                console.log('Dados coletados:', { name, phone, product, message });
                
                // Validar campos obrigatórios
                if (!name || !phone || !product || !message) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                
                // Criar mensagem para WhatsApp
                const whatsappMessage = `🦒 *FELISART - Produtos Personalizados*

Olá! Gostaria de fazer um pedido:

👤 *Nome:* ${name}
📱 *WhatsApp:* ${phone}
🛍️ *Produto:* ${product}
📝 *Descrição:* ${message}

Aguardo retorno! 😊`;
                
                // Redirecionar para WhatsApp
                const whatsappUrl = `https://wa.me/554198007815?text=${encodeURIComponent(whatsappMessage)}`;
                console.log('Redirecionando para:', whatsappUrl);
                window.open(whatsappUrl, '_blank');
                
                // Limpar o formulário após o envio
                this.reset();
                console.log('Formulário limpo via submit!');
                
                // Mostrar mensagem de sucesso
                showSuccessMessage('Mensagem enviada com sucesso! O formulário foi limpo.');
            });
        } else {
            console.log('Formulário não encontrado!');
        }
        
        // Alternativa: Evento direto no botão
        const whatsappButton = document.querySelector('.contact-form button[type="submit"]');
        if (whatsappButton) {
            console.log('Botão WhatsApp encontrado!');
            whatsappButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Botão clicado!');
                
                // Encontrar o formulário pai
                const form = this.closest('form');
                if (form) {
                    // Coletar dados do formulário
                    const name = form.querySelector('input[type="text"]').value;
                    const phone = form.querySelector('input[type="tel"]').value;
                    const product = form.querySelector('select').value;
                    const message = form.querySelector('textarea').value;
                    
                    console.log('Dados coletados via botão:', { name, phone, product, message });
                    
                    // Validar campos obrigatórios
                    if (!name || !phone || !product || !message) {
                        alert('Por favor, preencha todos os campos obrigatórios.');
                        return;
                    }
                    
                    // Criar mensagem para WhatsApp
                    const whatsappMessage = `🦒 *FELISART - Produtos Personalizados*

Olá! Gostaria de fazer um pedido:

👤 *Nome:* ${name}
📱 *WhatsApp:* ${phone}
🛍️ *Produto:* ${product}
📝 *Descrição:* ${message}

Aguardo retorno! 😊`;
                    
                    // Redirecionar para WhatsApp
                    const whatsappUrl = `https://wa.me/554198007815?text=${encodeURIComponent(whatsappMessage)}`;
                    console.log('Redirecionando para WhatsApp:', whatsappUrl);
                    window.open(whatsappUrl, '_blank');
                    
                    // Limpar o formulário após o envio
                    form.reset();
                    console.log('Formulário limpo!');
                    
                    // Mostrar mensagem de sucesso
                    showSuccessMessage('Mensagem enviada com sucesso! O formulário foi limpo.');
                }
            });
        }
    }, 100);
});

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Adicionar classe ativa ao link de navegação atual
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilos para link ativo
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #e91e63;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        padding: 1rem;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
