# OAPE - Organização e Assistência para Escritores

OAPE é um software de escrita desenvolvido com Electron que oferece um editor de texto rico (RichText) com assistência de inteligência artificial integrada, utilizando a API Gemini do Google.

![OAPE Software](https://i.postimg.cc/RCgNk9VK/Captura-de-tela-de-2025-09-15-16-47-37.png)

## Características Principais

- **Editor RichText Avançado**: Baseado no Quill.js, oferece formatação completa de texto incluindo:
  - Cabeçalhos (H1, H2, H3)
  - Formatação básica (negrito, itálico, sublinhado, tachado)
  - Cores de texto e fundo
  - Listas ordenadas e não ordenadas
  - Alinhamento de texto
  - Links, citações e blocos de código
  
- **Assistência de IA Integrada**: 
  - Integração com a API Gemini 2.0 Flash
  - Análise e sugestões de melhoria para textos
  - Orientações baseadas no Acordo Ortográfico da Língua Portuguesa
  - Foco em auxiliar na melhoria do conteúdo existente, não na criação do zero

- **Interface Intuitiva**: 
  - Design inspirado em editores como Microsoft Word e LibreOffice
  - Interface limpa e profissional
  - Botão dedicado para acesso à IA
  - Modal para exibição das respostas da IA

- **Configuração Segura**: 
  - Armazenamento seguro da chave API do usuário
  - Interface de configurações dedicada
  - Persistência de configurações entre sessões

## Requisitos do Sistema

- Node.js 16 ou superior
- Sistema operacional: Windows, macOS ou Linux

## Instalação e Uso

### Para Desenvolvedores

1. Clone ou baixe o projeto
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o aplicativo:
   ```bash
   npm start
   ```

## Obtendo uma Chave API do Gemini

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Faça login com sua conta Google
3. Crie uma nova chave API
4. Copie a chave e cole nas configurações do OAPE

## Como Usar a Assistência de IA

1. Escreva seu texto no editor
2. Clique no botão "IA" na barra de ferramentas
3. O conteúdo será automaticamente copiado para a área de transferência
4. A IA analisará seu texto e fornecerá sugestões de melhoria
5. As sugestões aparecerão em uma janela modal

## Estrutura do Projeto

```
oape-app/
├── main.js              # Processo principal do Electron
├── renderer.js          # Lógica do frontend
├── preload.js           # Script de comunicação segura
├── ai-service.js        # Módulo de integração com Gemini
├── index.html           # Interface principal
├── settings.html        # Interface de configurações
├── styles/
│   └── main.css         # Estilos da aplicação
├── assets/
│   └── icon.png         # Ícone da aplicação
└── package.json         # Configurações e dependências
```

## Tecnologias Utilizadas

- **Electron**: Framework para aplicações desktop
- **Quill.js**: Editor de texto rico
- **Google Generative AI**: API para integração com Gemini
- **Electron Store**: Armazenamento seguro de configurações
- **HTML/CSS/JavaScript**: Interface do usuário

## Licença

MIT License - Veja o arquivo LICENSE para detalhes.

## Suporte

Para suporte técnico ou sugestões, entre em contato com a equipe OAPE.

