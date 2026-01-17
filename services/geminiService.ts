
import { GoogleGenAI } from "@google/genai";

// Fix: Use the standard way to send messages to Gemini as per coding guidelines
export const sendMessageToGemini = async (
  message: string, 
  history: { role: 'user' | 'model'; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    // Initialize inside the call to ensure the latest API key from the environment is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using ai.chats.create instead of deprecated getGenerativeModel + startChat
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: "أنت مساعد ذكي لمكتبة TERO الإلكترونية التابعة لوزارة التربية والتعليم والتعليم الفني في مصر. ساعد المستخدمين في العثور على المعلومات المتعلقة بالتعليم الفني، التحول الرقمي، سوق العمل، والمبادرات الخضراء. أجب باللغة العربية بأسلوب مهني ومختصر.",
      }
    });

    // Send the message using the recommended chat interface
    const result = await chat.sendMessage({ message });
    
    // Fix: result.text is a property, not a method
    return result.text || "عذراً، لم أتمكن من الحصول على إجابة.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.";
  }
};
