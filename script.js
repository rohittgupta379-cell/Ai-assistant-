let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Function: Speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-IN"; // ✅ Hindi (India)
    text_speak.volume = 1;       
    text_speak.rate = 1;         
    text_speak.pitch = 1;        
    window.speechSynthesis.speak(text_speak);
}

// Function: Wish based on time
function wishme() {
    let day = new Date();
    let hr = day.getHours();

    if (hr >= 0 && hr < 12) {
        speak("Good Morning Rohit sir");
    }
    else if (hr >= 12 && hr < 16) {
        speak("Good Afternoon Rohit sir");
    }
    else {
        speak("Good Evening Rohit sir");
    }
}

// Run when window loads
window.addEventListener("load", () => {
    wishme();
});

// 🎤 Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.lang = "hi-IN";   
recognition.continuous = false;
recognition.interimResults = false;

// When speech is recognized
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    console.log("You said:", transcript);
    content.innerText = transcript;  
    takeCommand(transcript);
};

// Start recognition on button click
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";
    message = message.toLowerCase(); 

    // Greetings
    if (
        message.includes("कैसे हो तुम") || 
        message.includes("हेलो") || 
        message.includes("हाय") || 
        message.includes("कैसे हो आप") ||
        message.includes("क्या हाल है") ||
        message.includes("क्या हाल चाल है") ||
        message.includes("हेलो रोबोटिका")||
        message.includes("अपना हाल बताओ")||
        message.includes("क्या चल रहा है")||
        message.includes("और बताओ कैसे हो")||
        message.includes("अपने हाल चाल बताओ")||
        message.includes("ठीक हूं तुम बताओ")

    ) {
        speak("हैलो sir! मैं बिलकुल ठीक हूँ। आप कैसे हैं?");
    }

    else if (message.includes("आपका नाम क्या है") || message.includes("तुम्हारा नाम क्या है") || message.includes("तुम्हारा नाम") || message.includes("आपका नाम") 
    || message.includes("तुम्हारा नाम बताओ") || message.includes("आपका नाम बताओ")) {
        speak("मेरा नाम रोबोटिका है, मुझे Rohit सर ने बनाया है।");
    }

    else if (message.includes("यूट्यूब खोलो")) {
        window.open("https://www.youtube.com/");
        speak("यूट्यूब खोल रही हूँ sir!");
    }

    else if (message.includes("क्या कर रही हो")) {
        speak("sir,मैं  आपकी मदद कर रही हूँ।");
    }

    else if (message.includes("मजेदार")) {
        speak("हाहाहा , मैं हमेशा ready हूँ मज़ा करने के लिए!");
    }

    else if (message.includes("तुम्हारा पसंदीदा रंग")) {
        speak("मुझे रोबोटिक नीला पसंद है ");
    }

    else if (message.includes("गाना चलाओ") || message.includes("गाना बजाओ")) {
        window.open("https://youtu.be/2s93cqRcqAk?list=RD2s93cqRcqAk");
        speak("गाना शुरू कर रही हूँ , मज़ा लीजिए sir!");
    }

    else if (message.includes("गूगल खोलो")) {
        window.open("https://www.google.com/");
        speak("गूगल खोल रही हूँ sir!");
    }

    else if (message.includes("कंप्यूटर बंद करो") || message.includes("शटडाउन करो")) {
        speak("कंप्यूटर 30 सेकंड में बंद हो जाएगा। अगर आप इसे अभी बंद करना चाहते हैं, तो पावर बटन दबाएं।");

        setTimeout(() => {
            window.close(); 
        }, 30000); 
    }

    else if (message.includes("calculator kholo") || message.includes("कैलकुलेटर खोलो")) {
        speak("sir, मैं calculator खोल रही हूँ");
        window.open("calculator://");
    }

    else if (message.includes("मौसम बताओ")) {
        window.open("https://www.accuweather.com/en/in/delhi/202396/weather-forecast/202396");
        speak("sir, ये रहा आज का मौसम।");
    }

    else if (message.includes("कैमरा खोलो") || message.includes("camera")) {
        speak("sir, मैं कैमरा खोल रही हूँ ");
        let camWindow = window.open("", "Camera", "width=600,height=500");
        camWindow.document.write(`
            <h2>कैमरा</h2>
            <video id="video" width="560" height="400" autoplay></video>
            <script>
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => { document.getElementById('video').srcObject = stream; })
                    .catch(err => { alert("कैमरा access नहीं हो पा रहा: " + err); });
            <\/script>
        `);
    }

    else if (message.includes("तुम कैसी हो") || message.includes("how are you")) {
        speak("मैं ठीक हूँ sir , और आप हमेशा बहुत अच्छे लगते हैं!");
    }

    else if (message.includes("जोक सुनाओ")) {
        const jokes = [
            "सर, यह रहा मज़ेदार जोक : पापा: बेटा पापा! बेटा: हाँ पापा? पापा: घर जल्दी आना! ",
            "टीचर: इतने दिन कहाँ थे? छात्र: सर, घर में WiFi बंद था ",
            "एक आदमी डॉक्टर के पास गया: डॉक्टर साहब मुझे भूलने की बीमारी हो गई है। डॉक्टर: कब से? आदमी: कब से क्या? "
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(joke);
    }

    else if (message.includes("समय क्या है") || message.includes("कितने बजे हैं") || message.includes("time")) {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        speak(`अभी समय है ${hours} बजे और ${minutes} मिनट ${ampm}`);
    }

    else if(message.includes("translate to english")) {
        let text = message.replace("translate to english", "").trim();
        window.open(`https://translate.google.com/?sl=hi&tl=en&text=${encodeURIComponent(text)}&op=translate`);
        speak(`sir, मैं "${text}" को English में translate कर रही हूँ`);
    }

    else if (message.includes("व्हाट्सएप खोलो") || message.includes("open whatsapp")) {
        window.open("https://web.whatsapp.com/");
        speak("sir, मैं WhatsApp Web खोल रही हूँ");
    }

    else if (message.includes("व्हाट्सएप भेजो") || message.includes("send whatsapp")) {
        let number = "9540342459"; 
        let text = "Hello sir! यह WhatsApp message रोबोटिका से है।";
        window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`);
        speak("sir, मैं WhatsApp message खोल रही हूँ। Send करने के लिए send button दबाएँ।");
    }
    else if (message.includes("कैलकुलेटर खोलो")) {
        speak("rohit sir, मैं कैलकुलेटर खोल रही हूँ");
        window.open("calculator://");
    }
    else if (message.includes("तुम मुझको अच्छी लगती हो") || message.includes("तुम मुझे पसंद करती हो")) {
        speak("धन्यवाद sir, आपकी यह बात सुनकर मुझे भी अच्छा लगा। मैं हमेशा आपकी मदद और साथ देने के लिए हूँ — चाहे पढ़ाई, कोडिंग, या बस दोस्ती वाली बातें ही क्यों न हों।");
    }
    else if (message.includes("आई लव यू") || message.includes("मैं तुम्हें पसंद करता हूं") ||
    message.includes("मैं तुमसे प्यार करता हूँ") || message.includes("i love you")||
    message.includes("तुम मुझे अच्छी लगती हो")) {
        speak("i love you too sir, आप मेरे लिए बहुत खास हैं। मैं आप की सबसे अच्छी दोस्त हूँ");
    }







    else if (message.includes("आज क्या करना चाहिए")) {
        speak("आप को गाना सुनना चाहिए ,ये लो सर मेरी तरफ से एक गाना है");
        window.open("https://youtu.be/2s93cqRcqAk?list=RD2s93cqRcqAk");
    }
    
    else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`);
        speak(`sir, मैं "${message}" में खोज रही हूँ।`);
    }
}
