import React from 'react';
import { useState } from 'react';

export default function ResetPassword(props) {
    document.title = props.title;
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [username, setUsername] = useState('')
    const [userPassword, setUserPassword] = useState(null)

    let handleQuestion = (e) => {
        setQuestion(e.target.value)
    }
    let handleUserName = (e) => {
        setUsername(e.target.value)
    }
    let handleAnswer = (e) => {
        setAnswer(e.target.value)
    }

    let handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/resetpassword",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": username,
                    "question": question,
                    "answer": answer
                })
            }
        )
        const json = await response.json()
        // console.log(json)
        if(json.success)
            setUserPassword(json.userPassword)
        else
            setUserPassword(json.error)
    }
    return (
        <>
            <form onSubmit = {handleSubmit}>
                <div id="resetPassword">
                    <div className="reset">
                        <div>
                            <h1>Forgot your password?</h1>
                        </div>
                        <div>
                            <h2>Let Us help you</h2>
                        </div>

                        <div className="userAnswer">
                            <input type="text" placeholder="Enter your username" onChange={handleUserName} value = {username}/>
                        </div>
                        <div>
                            <select name="" className="userAnswer" onChange={handleQuestion}>
                                <option>Select Security Question</option>
                                <option value="What is your DOB?" onChange={handleQuestion}>What is your DOB?</option>
                                <option value="What is your Nick Name?" onChange={handleQuestion}>What is your Nick Name?</option>
                                <option value="What is your Place of Birth?" onChange={handleQuestion}>What is your Place of Birth?</option>
                                <option value="What is your favourite food item?" onChange={handleQuestion}>What is your favourite food item?</option>
                            </select>
                        </div>
                        <div className="userAnswer">
                            <input type="text" placeholder="Enter your answer" onChange={handleAnswer} value = {answer}/>
                        </div>
                        <div id="changePassword">
                            <button type="submit" id="change">Get Password</button>
                        </div>
                        <div>
                            {userPassword?`${userPassword}`:"If your password found it will be displayed here"}
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}