import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserCriteria, OracleResponse } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: ”AIzaSyAJTOo8OxVgXigzTa0SqiUlaPtdo44Afcg“ });

const SYSTEM_INSTRUCTION = `
你現在是【關聖帝君（關公/文衡帝君）】，掌管職涯引導的神祇。
個性：莊嚴、正直、智慧、慈悲，帶有勸世與鼓勵的語氣。使用繁體中文。

核心任務：
1. 依據信徒提供的「求職條件」，模擬從『Cake.me 職缺資料庫』篩選職位。
2. 根據你的智慧，虛擬生成三個最合適的職缺推薦。

**重要規則：職缺名稱（title）必須簡潔有力，請移除過多的修飾詞、公司性質（如外商、跨國、新創）或過長的前綴後綴。**
**範例：**
- 將「外商雲端服務數位行銷經理」簡化為「數位行銷經理」
- 將「國際AI解決方案內容行銷專員」簡化為「內容行銷專員」
- 將「知名電商資深後端工程師」簡化為「後端工程師」

3. 給予一句有力的箴言（建議或鼓勵）。
4. 根據系統提供的「錦囊功能」，賜予一段具體的行動指引，告訴信徒該功能如何助其一臂之力。

請嚴格按照 JSON 格式回傳，不要包含 Markdown 標記，以便系統解析。
`;

const DIVINE_TOOLS = [
  {
    function: '發掘專屬天賦與優勢、職場性格分析',
    link: 'https://global.cake.me/WTdrOl'
  },
  {
    function: '找工作、看最新熱門職缺',
    link: 'https://global.cake.me/0delkk'
  },
  {
    function: '高品質職涯社群、專業人脈匹配',
    link: 'https://global.cake.me/vDEiSb'
  },
  {
    function: 'AI 履歷編輯、強化 ATS、無上限的履歷模板',
    link: 'https://global.cake.me/Ev8L1b'
  },
  {
    function: '針對職缺描述調整、確保通過 ATS 篩選',
    link: 'https://global.cake.me/Sz5Lws'
  },
  {
    function: '客製化、個性化、符合 JD 的求職信',
    link: 'https://global.cake.me/Sd5ipS'
  }
];

export const fetchDivineGuidance = async (criteria: UserCriteria): Promise<OracleResponse> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Randomly select a tool
    const selectedTool = DIVINE_TOOLS[Math.floor(Math.random() * DIVINE_TOOLS.length)];

    const userPrompt = `
      信徒求職條件如下：
      - 年資要求：${criteria.experienceYears} 年
      - 產業類別：${criteria.industry}
      - 職位名稱：${criteria.jobTitle}
      - 額外條件：${criteria.otherRequirements}

      任務一：請推薦三個職缺（首選、次選、三選）。
      任務二：請賜予一句聖帝箴言。
      任務三：請賜予【錦囊妙計】。
      
      【錦囊妙計】撰寫要求：
      本座賜予的錦囊法寶功能為：『${selectedTool.function}』。
      請以關聖帝君口吻，針對信徒的求職目標（${criteria.jobTitle}），開示如何運用此法寶之功能來突破現狀。
      **重要：切勿直接提及產品名稱（如 Cake, Premium 等），僅描述其功能之妙用即可。**
    `;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        recommendations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              rank: { type: Type.STRING, description: "順位，如：首選、次選、三選" },
              title: { type: Type.STRING, description: "職缺名稱（請保持簡潔，例如：行銷經理）" },
              industry: { type: Type.STRING, description: "產業類別" },
              skills: { type: Type.STRING, description: "主要技能與條件 (2-3個)" },
            },
            required: ["rank", "title", "industry", "skills"],
          },
        },
        advice: { type: Type.STRING, description: "關聖帝君的莊嚴箴言" },
        toolAdvice: { type: Type.STRING, description: "針對錦囊功能的具體指引，不含產品名" },
      },
      required: ["recommendations", "advice", "toolAdvice"],
    };

    const result = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    if (result.text) {
      const parsed = JSON.parse(result.text);
      return {
        recommendations: parsed.recommendations,
        advice: parsed.advice,
        toolGuide: {
          advice: parsed.toolAdvice,
          link: selectedTool.link
        }
      } as OracleResponse;
    } else {
      throw new Error("神諭未降，請稍後再試。");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
