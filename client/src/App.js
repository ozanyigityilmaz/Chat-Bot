import logo from './logo.svg';
import './normal.css';
import './App.css';

import{useState,useEffect} from 'react'

function App() {

 /* useEffect(()=>{
    getEngines();
  },[])*/
  
  const [input,setInput]=useState("")
  //const [models,setModels]=useState([])
  const[chatLog,setChatlog]=useState([{
    user:"gpt",
    message:"How can I help you today?"
  },
  {
    user: "me",
    message: "I want to use you"
  }]);
  function clearChat(){
    setChatlog([])
  }
 /* function getEngines(){
    fetch("http://localhost:3080/models")
    .then(res=>res.json())
    .then(data=>{
      console.log(data.models.data)
      setModels(data.models.data)
    })
  }*/
  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew=([...chatLog, {user: "me", message: input}]);
    await setInput("")
    setChatlog(chatLogNew)
    const messages=chatLogNew.map((message)=>message.message).join("\n")
    const response =await fetch("http://localhost:3080/",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message:messages
      })
    });
    const data= await response.json();
    setChatlog([...chatLogNew,{user:"gpt",message: `${data.message}`}])
    //console.log(data.message)
  }
  return (
    <div className="App">
    <aside className="sidemenu">
      <div className='side-menu-button' onClick={clearChat}>
        Yeni Sohbet
      </div>
    </aside>
    <section className="chatbox">
      <div className="chat-log">
      {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        
      </div>
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
        <input 
            className="chat-input" 
            rows="1" 
            placeholder="Sorunu sor" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
        />

          
          

        </form>
      </div>
    </section>
      
    </div>
  );
}
const ChatMessage=({message})=>{
  return(
    <div className={`chat.message ${message.user === "gpt" ? "chatgpt" : ""}`}>
          <div className="chat_message-center">
          <div className={`avatar ${message.user === "gpt" ? "chatgpt" : ""}`}>
              {message.user==="gpt" && <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
  >
    <path
      d="M409.55 70.347C374.452 24.326 321.356 0 256 0S137.548 24.326 102.45 70.347c-30.208 39.611-46.175 93.382-46.175 155.5 0 67.981 19.424 137.928 53.291 191.905C147.7 478.529 199.706 512 256 512s108.3-33.471 146.433-94.248c33.868-53.977 53.291-123.923 53.291-191.905 0-62.118-15.966-115.889-46.174-155.5z"
      style={{
        fill: "#d7d7d7",
      }}
    />
    <path
      d="M409.55 70.347C374.452 24.326 321.356 0 256 0v512c56.294 0 108.3-33.471 146.433-94.248 33.868-53.977 53.291-123.923 53.291-191.905 0-62.118-15.966-115.889-46.174-155.5z"
      style={{
        fill: "#b0b0b0",
      }}
    />
    <path
      d="M343.335 301.739c-29.668 0-53.806-24.137-53.806-53.807 0-29.668 24.137-53.806 53.806-53.806 29.668 0 53.807 24.137 53.807 53.806 0 29.67-24.139 53.807-53.807 53.807z"
      style={{
        fill: "#444",
      }}
    />
    <circle
      cx={343.329}
      cy={247.93}
      r={20.901}
      style={{
        fill: "#211915",
      }}
    />
    <path
      d="M205.523 381.507h100.942v33.391H205.523z"
      style={{
        fill: "#8b8b8b",
      }}
    />
    <path
      d="M256 381.507h50.477v33.391H256zM442.894 322.902 324.06 344.336l-22.908 160.221c12.518-4.21 24.651-10.18 36.279-17.825l16.272-113.812 77.664-14.009a373.782 373.782 0 0 0 11.527-36.009zM391.784 50.356a169.719 169.719 0 0 0-33.391-25.095v127.722h33.391V50.356z"
      style={{
        fill: "#6f6f6f",
      }}
    />
    <path
      d="M114.858 247.933c0-29.668 24.139-53.806 53.807-53.806s53.806 24.137 53.806 53.806c0 29.669-24.137 53.807-53.806 53.807s-53.807-24.138-53.807-53.807z"
      style={{
        fill: "#8b8b8b",
      }}
    />
    <circle
      cx={168.659}
      cy={247.93}
      r={20.901}
      style={{
        fill: "#444",
      }}
    />
    <path
      d="m69.106 322.902 118.834 21.434 22.908 160.221c-12.518-4.21-24.651-10.18-36.279-17.825L158.297 372.92l-77.664-14.009a373.782 373.782 0 0 1-11.527-36.009zM120.216 50.356a169.719 169.719 0 0 1 33.391-25.095v127.722h-33.391V50.356zM289.776 2.323v119.348L256 140.79l-33.776-19.119V2.323c-11.629 1.645-22.774 4.157-33.391 7.529v131.287L256 179.16l67.168-38.02V9.853c-10.618-3.373-21.763-5.885-33.392-7.53z"
      style={{
        fill: "#8b8b8b",
      }}
    />
    <path
      d="m256 179.16 67.168-38.02V9.853c-10.617-3.371-21.762-5.885-33.391-7.529v119.348L256 140.79v38.37z"
      style={{
        fill: "#6f6f6f",
      }}
    />
  </svg>}
                
            </div>
            <div className="messsage">
                {message.message}
            </div> 
          </div>
        </div>
  )
}
export default App;
