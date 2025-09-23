// AI Chatbot for Ajith's Portfolio
class AjithAIAgent {
    constructor() {
        this.responses = {
            // Greetings
            greetings: [
                "Hello! I'm Ajith's AI assistant. How can I help you learn more about him?",
                "Hi there! I'm here to tell you about Ajith's background and skills.",
                "Welcome! Ask me anything about Ajith's journey and aspirations."
            ],
            
            // About Ajith
            about: [
                "Ajith is a self-taught web developer and machine maintenance technician at Brakes India Pvt Ltd. He's the Founder & CEO of Dream It Code It!",
                "He's a person with an entrepreneurial mindset who has achieved some impossible things through his own effort.",
                "Ajith is passionate about exploring and learning new technologies while working in the automotive industry."
            ],
            
            // Current Role
            current: [
                "Currently, Ajith works as a machine maintenance technician at Brakes India Pvt Ltd Research and Development Center.",
                "He's responsible for maintaining machines and is well-versed in his field, working in an important team in the automotive industry.",
                "He's known for finding efficient ways to complete challenging work."
            ],
            
            // Skills
            skills: [
                "Ajith is skilled in frontend development, machine maintenance, and has strong self-motivation.",
                "He's a self-taught web developer with experience in HTML, CSS, and web technologies.",
                "His technical skills span both software development and mechanical engineering."
            ],
            
            // Future Goals
            future: [
                "In 5 years, Ajith aims to become more powerful in everything than he is now.",
                "He wants to be an engineer with high responsibilities in the automotive industry or become the best web developer - possibly part of Silicon Valley!",
                "He plans to achieve either of these goals or has a backup plan ready."
            ],
            
            // Company/Work
            company: [
                "Ajith founded Dream It Code It - you can check it out on his portfolio!",
                "He works at Brakes India Pvt Ltd, a major automotive company's R&D center.",
                "He's built his career from being a maintenance technician to founding his own company."
            ],
            
            // Contact/Social
            contact: [
                "You can find Ajith on various social platforms - Instagram, Facebook, Twitter, GitHub, and LinkedIn!",
                "Check out his GitHub (@periyan007) to see his coding projects.",
                "Connect with him on LinkedIn or follow his journey on social media."
            ],
            
            // Default responses
            default: [
                "That's an interesting question! You can learn more about Ajith by scrolling through his portfolio.",
                "I'm still learning! You can find more details about Ajith in the sections above.",
                "Great question! Check out the different sections of his portfolio for more information."
            ]
        };
        
        this.keywords = {
            greetings: ['hello', 'hi', 'hey', 'greetings', 'good'],
            about: ['about', 'who', 'biography', 'bio', 'background', 'story'],
            current: ['current', 'job', 'work', 'role', 'position', 'brakes', 'india', 'maintenance'],
            skills: ['skills', 'abilities', 'technologies', 'programming', 'development', 'frontend'],
            future: ['future', 'goals', 'plans', 'aspirations', 'dreams', '5 years', 'silicon valley'],
            company: ['company', 'dream it code it', 'founder', 'ceo', 'business'],
            contact: ['contact', 'social', 'github', 'linkedin', 'instagram', 'twitter', 'facebook']
        };
        
        this.init();
    }
    
    init() {
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotContainer = document.getElementById('chatbot-container');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => {
            this.toggleChatbot();
        });
        
        // Send message on button click
        this.chatbotSend.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Send message on Enter key
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    toggleChatbot() {
        this.chatbotContainer.classList.toggle('chatbot-hidden');
        if (!this.chatbotContainer.classList.contains('chatbot-hidden')) {
            this.chatbotInput.focus();
        }
    }
    
    sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.chatbotInput.value = '';
        
        // Generate and add bot response
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 500);
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<span>${text}</span>`;
        
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }
    
    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check for keyword matches
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                const responses = this.responses[category];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        
        // Special handling for specific questions
        if (message.includes('name')) {
            return "His name is Ajith! He's the founder of Dream It Code It and works as a maintenance technician.";
        }
        
        if (message.includes('age') || message.includes('old')) {
            return "I don't have specific age information, but you can connect with Ajith through his social media to learn more!";
        }
        
        if (message.includes('location') || message.includes('where')) {
            return "Ajith works at Brakes India Pvt Ltd Research and Development Center. You can find his contact details in his portfolio!";
        }
        
        if (message.includes('dream it code it')) {
            return "Dream It Code It is Ajith's company! He's the Founder & CEO. The motto seems to be 'Dream It, Code It, Achieve It'!";
        }
        
        if (message.includes('portfolio') || message.includes('website')) {
            return "You're already on his portfolio! Scroll through to see his journey, goals, and achievements.";
        }
        
        // Default response
        const defaultResponses = this.responses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

// Initialize the AI agent when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AjithAIAgent();
});