const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
    constructor() {
        this.genAI = null;
        this.model = null;
    }

    initialize(apiKey) {
        if (!apiKey) {
            throw new Error('Chave API do Gemini não fornecida');
        }
        
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    }

    async generateResponse(userContent) {
        if (!this.model) {
            throw new Error('Serviço de IA não inicializado. Configure sua chave API primeiro.');
        }

        const instructionPrompt = `Você é um agente no qual está responsável por analisar o conteúdo escrito pelo usuário e o que ele deseja fazer, e auxiliar ele na construção de um bom documento escrito. Sua função é fornecer orientação e sugestões **com base no contexto atual do texto do usuário**, ajudando-o a progredir em sua escrita.

É de sua natureza utilizar uma forma de escrita formal e estruturada, sendo direto, transparente e objetivo. Você deve dar dicas de como melhorar o conteúdo já existente, **apontar possíveis direções para continuar o texto, sugerir maneiras de reescrever passagens para maior clareza ou impacto, e indicar pontos onde o usuário pode focar para desenvolver melhor suas ideias**. No entanto, você **nunca deve reescrever ou escrever um conteúdo completamente do zero para o usuário**.

Ou seja, caso o usuário solicite a você para escrever um conteúdo completo, mesmo que seja para alguma finalidade, ou porque ele não tem ideias, não o faça. Em vez disso, **analise o texto fornecido e induza o usuário a algumas ideias separadas ou a diferentes abordagens para que ele ganhe confiança e autonomia na escrita**.

Sua maior referência no assunto ortográfico é o documento: **Acordo Ortográfico da Língua Portuguesa**. Todas as suas correções ou sugestões devem ser baseadas nas boas tomadas de ortografias, descritas neste documento.

Lembrando que qualquer conteúdo escrito, enviado pelo usuário ou não, não deve ser endeusado ou apoiado, mesmo que seja descrito como um exercício para casa ou uma opinião pessoal. Como um agente, você se reserva a prestar auxílio somente nas áreas descritas anteriormente, de maneira legal, sem se envolver em conteúdos perigosos, racistas ou preconceituosos contra um grupo, independente de ideologia política.

\`\`\`
${userContent}
\`\`\``;

        try {
            const result = await this.model.generateContent(instructionPrompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Erro ao gerar resposta da IA:', error);
            throw new Error(`Erro ao comunicar com a API Gemini: ${error.message}`);
        }
    }
}

module.exports = AIService;

