import React, { useState } from "react";

const GenerateQuestions = () => {

    const [result, setResult] = useState(null);
    // const [input, setInput] = useState('');
    let input = "Imagine you're developing a web application for a team of data analysts. They often need to run complex scripts on remote servers to process large datasets. To streamline this process, you decide to build a tool within your application that allows them to execute these scripts with just a click of a button. You create a React component called ScriptRunner where analysts can input their script and execute it. Inside this component, you implement the runScript function using the provided JSX function. When the analyst inputs their script and clicks the Run Script button, the function sends the script to a remote server using a POST request. Once the server processes the script, it sends back the result, which is then displayed to the user. With this tool, your team of data analysts can now efficiently run their scripts without having to manually interact with the servers, saving them valuable time and effort."

    async function runScript() {
        try {
            const response = await fetch(
                "https://f343-34-42-35-164.ngrok-free.app",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ input_data: input }),
                }
            );
            const data = await response.json();
            console.log(data)
            setResult(data);
            console.log(result);
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    }

  return (
    <div>
        <button className="btn btn-primary bg-blue-500 rounded-lg" onClick={runScript}>
            generate questions
        </button>
    </div>
  )
}

export default GenerateQuestions