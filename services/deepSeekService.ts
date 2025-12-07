
import { MOCK_PROCEDURES, MOCK_LAWS, MINISTRY_CONTEXT, MOCK_LOCKER_DOCS, MOCK_MARKET_PRICES } from "../data/mockDatabase";
import { VerificationRequest, Appointment, District } from "../types";

const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

interface ContextActions {
  addVerification: (req: VerificationRequest) => void;
  addAppointment: (apt: Appointment) => void;
}

// ------------------------------------------------------------------
// REAL API IMPLEMENTATION
// ------------------------------------------------------------------
const callDeepSeekApi = async (
    apiKey: string,
    history: { role: string; content: string }[],
    onStream: (text: string) => void
) => {
    // Inject System Context
    const messages = [
        { role: 'system', content: MINISTRY_CONTEXT },
        ...history
    ];

    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                stream: true,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedText = "";

        while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");
            
            for (const line of lines) {
                if (line.startsWith("data: ")) {
                    const jsonStr = line.replace("data: ", "");
                    if (jsonStr === "[DONE]") return;
                    try {
                        const json = JSON.parse(jsonStr);
                        const content = json.choices[0]?.delta?.content || "";
                        if (content) {
                            accumulatedText += content;
                            onStream(accumulatedText);
                        }
                    } catch (e) {
                        // ignore parse errors for partial chunks
                    }
                }
            }
        }
    } catch (error) {
        throw error;
    }
};


// ------------------------------------------------------------------
// SIMULATION ENGINE (Fallback)
// ------------------------------------------------------------------
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const simulateAgentResponse = async (
  message: string, 
  onStream: (text: string) => void,
  contextActions?: ContextActions
) => {
  const lowerMsg = message.toLowerCase();
  
  const streamThought = async (thought: string) => {
    onStream(`[[THOUGHT]] ${thought}`);
    await delay(800 + Math.random() * 500); 
  };

  try {
    // 1. MARKET AGENT
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('market') || lowerMsg.includes('cocoa') || lowerMsg.includes('yam') || lowerMsg.includes('palm') || lowerMsg.includes('garri') || lowerMsg.includes('fish')) {
      await streamThought("Activating Market Intelligence Agent...");
      await streamThought("Connecting to Akure, Ondo, and Owo market databases...");
      
      let commodity = '';
      if(lowerMsg.includes('cocoa')) commodity = 'Cocoa';
      else if(lowerMsg.includes('palm')) commodity = 'Palm Oil';
      else if(lowerMsg.includes('garri')) commodity = 'Garri';
      else if(lowerMsg.includes('fish')) commodity = 'Fish';
      else commodity = 'General';

      const results = MOCK_MARKET_PRICES.filter(p => commodity === 'General' || p.item.includes(commodity));
      
      let response = `[[AGENT:MARKET]] **Market Intelligence Report**\n\nRetrieving live data:\n\n`;
      results.forEach(p => {
          response += `*   **${p.item}**\n    *   Price: **${p.price}**\n    *   Location: ${p.location}\n`;
      });
      if (results.length === 0) response += `No data found for this item.`;
      
      onStream(response);
      return;
    }

    // 2. LEGAL AGENT
    if (lowerMsg.includes('law') || lowerMsg.includes('constitution') || lowerMsg.includes('right') || lowerMsg.includes('act') || lowerMsg.includes('legal')) {
      await streamThought("Activating Legal Agent...");
      await streamThought("Querying 1999 Constitution and Statutes...");
      
      const keywords = lowerMsg.split(' ');
      const law = MOCK_LAWS.find(l => keywords.some(k => k.length > 3 && l.content.toLowerCase().includes(k))) || MOCK_LAWS[0];

      let response = `[[AGENT:LEGAL]] **Legal Citation**\n\n`;
      response += `> **${law.title}**\n> "${law.content}"\n\n`;
      response += `**Verified by**: ${law.source}`;
      onStream(response);
      return;
    }

    // 3. PROCESS AGENT
    if (lowerMsg.includes('how to') || lowerMsg.includes('start') || lowerMsg.includes('process') || lowerMsg.includes('register') || lowerMsg.includes('business')) {
      await streamThought("Activating Process Agent...");
      await streamThought("Retrieving Standard Operating Procedures...");
      
      const procedure = MOCK_PROCEDURES.find(p => lowerMsg.includes(p.relatedMinistry.toLowerCase()) || lowerMsg.includes('business')) || MOCK_PROCEDURES[0];

      let response = `[[AGENT:PROCESS]] **${procedure.title}**\n\n`;
      response += `**Steps**:\n`;
      procedure.steps.forEach((step, i) => response += `${i+1}. ${step}\n`);
      onStream(response);
      return;
    }

    // 4. DOCUMENT AGENT (Locker)
    if (lowerMsg.includes('locker') || lowerMsg.includes('document') || lowerMsg.includes('certificate')) {
        await streamThought("Activating Document Agent...");
        await streamThought("Accessing Ondo-Locker...");
        
        let response = `[[AGENT:DOCUMENT]] **Ondo-Locker Access**\n\nDocuments found for **${MOCK_LOCKER_DOCS[0].issuingAuthority === 'ODIRS' ? 'Tax ID' : 'User'}**:\n\n`;
        MOCK_LOCKER_DOCS.forEach(doc => {
            response += `*   📄 **${doc.title}** (${doc.status})\n`;
        });
        onStream(response);
        return;
    }

    // 5. PAYMENTS & IGR (New E-Gov)
    if (lowerMsg.includes('pay') || lowerMsg.includes('tax') || lowerMsg.includes('receipt') || lowerMsg.includes('remita')) {
        await streamThought("Connecting to IGR Gateway (Remita)...");
        await streamThought("Verifying Tax ID...");
        onStream(`[[AGENT:PROCESS]] **Payment Portal Access**\n\nYou can pay your Taxes, Business Levies, and Verification Fees instantly.\n\nPlease navigate to the **Payments (IGR)** section in the sidebar to proceed securely.`);
        return;
    }

    // 6. GRIEVANCE & REPORTS (New E-Gov)
    if (lowerMsg.includes('report') || lowerMsg.includes('complain') || lowerMsg.includes('issue') || lowerMsg.includes('pothole') || lowerMsg.includes('broken')) {
        await streamThought("Activating Public Works Agent...");
        await streamThought("Logging Ticket...");
        onStream(`[[AGENT:FRONT_DESK]] **Grievance Redressal**\n\nI can help you report this issue to the relevant Ministry.\n\nPlease use the **Report Issue** form in the sidebar to log this complaint with geolocation tagging.`);
        return;
    }

    // 7. GIS MAPS (New E-Gov)
    if (lowerMsg.includes('map') || lowerMsg.includes('location') || lowerMsg.includes('where is') || lowerMsg.includes('gis')) {
        await streamThought("Accessing Ondo GIS Database...");
        await streamThought("Loading Layers...");
        onStream(`[[AGENT:DOCUMENT]] **Geospatial Data**\n\nYou can view land parcels, government assets, and infrastructure on the interactive map.\n\nOpen the **GIS Maps** view to explore.`);
        return;
    }

    // 8. HEALTH & TRIAGE (New E-Gov)
    if (lowerMsg.includes('sick') || lowerMsg.includes('health') || lowerMsg.includes('fever') || lowerMsg.includes('doctor') || lowerMsg.includes('pain')) {
        await streamThought("Activating Health Triage Protocol...");
        await streamThought("Checking Hospital Availability...");
        onStream(`[[AGENT:ADVISORY]] **Health Triage**\n\nBased on your query, I recommend visiting the **Nearest General Hospital**. \n\nI have logged a triage note. Please use the **Telemedicine** section for a quick assessment.`);
        return;
    }

    // 9. FRONT DESK (Verification)
    if (lowerMsg.includes('verify') || lowerMsg.includes('check')) {
        await streamThought("Front Desk: Routing to Verification Officer...");
        
        let type = 'General';
        let district = 'Akure';
        if (lowerMsg.includes('title') || lowerMsg.includes('chief') || lowerMsg.includes('palace')) { 
            type = 'Heritage'; 
            district = 'Ondo Town'; 
        } else if (lowerMsg.includes('land') || lowerMsg.includes('plot')) {
            type = 'Land';
            district = 'Akure';
        } else if (lowerMsg.includes('fish') || lowerMsg.includes('boat')) {
            type = 'Maritime';
            district = 'Ilaje';
        } else if (lowerMsg.includes('farm') || lowerMsg.includes('cocoa')) {
            type = 'Business';
            district = 'Owo';
        }
        
        if (contextActions) {
            contextActions.addVerification({
                id: `VR-${Math.floor(Math.random() * 10000)}`,
                type: type as any,
                citizenId: 'User-Current',
                details: message,
                status: 'pending',
                receivedAt: 'Just now',
                lga: 'User-LGA',
                district: district as District,
                ministry: 'Admin'
            });
        }
        await delay(500);
        onStream(`[[AGENT:FRONT_DESK]] **Request Submitted**\n\nA **${type} Verification** ticket has been sent to the **${district}** office dashboard.`);
        return;
    }

    // 10. SMART ADVISORY FALLBACK
    await streamThought("Front Desk: Analyzing Query...");
    
    if (lowerMsg === 'hello' || lowerMsg === 'hi' || lowerMsg === 'help') {
        onStream(`[[AGENT:FRONT_DESK]] Ẹ kú àbọ̀! I am **IṢẹ́Lẹ̀**.\n\nI can help you:\n*   Check Market Prices\n*   Verify Documents\n*   Explain Laws\n*   Guide Business Registration\n\nWhat do you need today?`);
        return;
    }

    await streamThought("Consulting Knowledge Base...");
    
    // Simulate a general helpful response with specific advice
    let response = `[[AGENT:ADVISORY]] I understand you are asking about "**${message}**".\n\n`;
    response += `Since I am currently in **Simulation Mode** (Simulating DeepSeek V3.2 reasoning), I can tell you that typically this would involve checking with the relevant Ministry.\n\n`;
    response += `However, I can directly help you if you ask about:\n*   **"Cocoa Price in Owo"**\n*   **"How to register a business"**\n*   **"Verify my Land"**\n*   **"How do I pay tax?"**`;
    onStream(response);

  } catch (error) {
    onStream(`[[AGENT:FRONT_DESK]] System Error.`);
  }
};

// --- MAIN HANDLER ---
export const sendMessageToAgent = async (
  history: { role: string; content: string }[],
  message: string,
  onStream: (text: string) => void,
  contextActions?: ContextActions
): Promise<void> => {
  const apiKey = localStorage.getItem('deepseek_api_key');

  if (apiKey) {
      console.log("Using Real DeepSeek API");
      try {
          await callDeepSeekApi(apiKey, [...history, { role: 'user', content: message }], onStream);
      } catch (e) {
          console.error("API Failed, falling back to Simulation", e);
          onStream("[[THOUGHT]] API Connection Failed. Switching to High-Fidelity Simulation...\n");
          await simulateAgentResponse(message, onStream, contextActions);
      }
  } else {
      console.log("No API Key found. Using Simulation.");
      await simulateAgentResponse(message, onStream, contextActions);
  }
};
