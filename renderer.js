// Lógica do processo de renderização (frontend)

let quill;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar o editor Quill
    quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Comece a escrever seu texto aqui...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'blockquote', 'code-block'],
                ['clean']
            ]
        }
    });

    const iaButton = document.getElementById('ia-button');
    const settingsButton = document.getElementById('settings-button');

    iaButton.addEventListener('click', () => {
        const content = quill.getText(); // Obtém o texto puro
        const htmlContent = quill.root.innerHTML; // Obtém o HTML formatado
        
        console.log('Conteúdo para IA:', content);
        
        if (content.trim().length === 0) {
            alert('Por favor, escreva algum conteúdo antes de usar a assistência da IA.');
            return;
        }
        
        // Copiar para área de transferência
        navigator.clipboard.writeText(content).then(() => {
            console.log('Conteúdo copiado para área de transferência');
        }).catch(err => {
            console.error('Erro ao copiar para área de transferência:', err);
        });
        
        // Enviar conteúdo para o processo principal
        if (window.electronAPI) {
            window.electronAPI.sendContentToAI(content);
        }
    });

    settingsButton.addEventListener('click', () => {
        if (window.electronAPI) {
            window.electronAPI.openSettingsWindow();
        }
    });

    // Receber resposta da IA
    if (window.electronAPI) {
        window.electronAPI.receiveAIResponse((response) => {
            console.log('Resposta da IA:', response);
            showAIResponse(response);
        });
    }
});

function showAIResponse(response) {
    // Criar uma janela modal para exibir a resposta da IA
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 600px;
        max-height: 80%;
        overflow-y: auto;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    const title = document.createElement('h2');
    title.textContent = 'Resposta da IA';
    title.style.marginTop = '0';

    const responseText = document.createElement('div');
    responseText.style.cssText = `
        white-space: pre-wrap;
        line-height: 1.6;
        margin: 15px 0;
        padding: 15px;
        background-color: #f8f9fa;
        border-radius: 4px;
        border-left: 4px solid #007bff;
    `;
    responseText.textContent = response;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.style.cssText = `
        background-color: #007bff;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
    `;

    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modalContent.appendChild(title);
    modalContent.appendChild(responseText);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    // Fechar modal ao clicar fora dele
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}


