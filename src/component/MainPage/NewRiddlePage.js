import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NewRiddlePage.css';

const NewRiddlePage = ({ JWT }) => {
    const [riddleTitle, setRiddleTitle] = useState('');
    const [problem, setProblem] = useState('');
    const [situation, setSituation] = useState('');
    const [answer, setAnswer] = useState('');
    const [progressSentences, setProgressSentences] = useState(['', '', '']);
    const [queryResponsePairs, setQueryResponsePairs] = useState([{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }]);
    const navigate = useNavigate();

    const handleAddProgressSentence = () => {
        if (progressSentences.length < 5) {
            setProgressSentences([...progressSentences, '']);
        }
    };

    const handleAddQRPair = () => {
        if (queryResponsePairs.length < 15) {
            setQueryResponsePairs([...queryResponsePairs, { question: '', answer: '' }]);
        }
    };

    const handleRemoveProgressSentence = (index) => {
        if (progressSentences.length > 3) {
            setProgressSentences(progressSentences.filter((_, i) => i !== index));
        }
    };

    const handleRemoveQRPair = (index) => {
        if (queryResponsePairs.length > 5) {
            setQueryResponsePairs(queryResponsePairs.filter((_, i) => i !== index));
        }
    };

    const handleChangeProgressSentence = (index, value) => {
        const newProgressSentences = [...progressSentences];
        newProgressSentences[index] = value;
        setProgressSentences(newProgressSentences);
    };

    const handleChangeQAPair = (index, field, value) => {
        const newQaPairs = [...queryResponsePairs];
        newQaPairs[index][field] = value;
        setQueryResponsePairs(newQaPairs);
    };

    const validateInputs = () => {
        if (riddleTitle.length < 1 || riddleTitle.length > 1000) return false;
        if (problem.length < 1 || problem.length > 1000) return false;
        if (situation.length < 1 || situation.length > 1000) return false;
        if (answer.length < 1 || answer.length > 1000) return false;
        if (progressSentences.some(sentence => sentence.length < 1) || progressSentences.length < 1) return false;
        if (queryResponsePairs.length < 1 || queryResponsePairs.some(pair => pair.question.length < 1 || pair.answer.length < 1)) return false;
        return true;
    };

    const handleCreateRiddle = () => {
        if (!validateInputs()) {
            alert('Please ensure all inputs are correctly filled out.');
            return;
        }

        const newRiddle = {
            riddleTitle: riddleTitle,
            problem: problem,
            situation: situation,
            answer: answer,
            progressSentences: progressSentences.filter(sentence => sentence.length > 0),
            exQueryResponse: queryResponsePairs.filter(pair => pair.question.length > 0 && pair.answer.length > 0).map(pair => ({
                exQuery: pair.question,
                exResponse: pair.answer
            }))
        };
        axios.post('http://localhost:8000/newriddle', newRiddle, {
            headers: { 'Authorization': `Bearer ${JWT}` }
        }).then(response => {
             navigate('/main');
        }).catch(error => {
             console.error('Failed to create new riddle:', error);
        });
    };

    return (
        <div className="new-riddle-page">
            <h2>Create New Riddle</h2>
            <div className="form-container">
                <div className="new-input-group">
                    <label>Riddle Title</label>
                    <input type="text" placeholder="수수께끼의 제목을 정해주세요. (Write a title about riddle what you make.)" value={riddleTitle} onChange={e => setRiddleTitle(e.target.value)} />
                </div>
                <div className="new-input-group">
                    <label>Problem</label>
                    <textarea value={problem} placeholder="수수께끼의 문제 내용을 적어주세요. (Write a problem about this new riddle.)" onChange={e => setProblem(e.target.value)} />
                </div>
                <div className="new-input-group">
                    <label>Situation</label>
                    <textarea value={situation} placeholder="숨겨진 정보, 상황들을 입력해주세요. (Write a hidden situation infomations.)" onChange={e => setSituation(e.target.value)} />
                </div>
                <div className="new-input-group">
                    <label>Answer</label>
                    <textarea value={answer} placeholder="정답 상황을 구체적으로 작성해주세요. (Write the answer situation specifically.)" onChange={e => setAnswer(e.target.value)} />
                </div>
                <div className="new-input-group progress-sentences">
                    <label>Progress Sentences</label>
                    {progressSentences.map((sentence, index) => (
                        <div key={index} className="progress-sentence">
                            <input
                                type="text"
                                value={sentence}
                                placeholder={`플레이어가 이 상황을 맞추면 진행도가 ${(index + 1) / progressSentences.length * 100}%가 돼요. (If a player says this sentence, the progress will be ${(index + 1) / progressSentences.length * 100}%.)`}
                                onChange={e => handleChangeProgressSentence(index, e.target.value)}
                            />
                            {progressSentences.length > 3 && (
                                <button onClick={() => handleRemoveProgressSentence(index)} className="remove-button">Remove</button>
                            )}
                        </div>
                    ))}
                    {progressSentences.length < 5 && (
                        <button onClick={handleAddProgressSentence} className="add-button">Add Progress Sentence</button>
                    )}
                </div>
                <div className="new-input-group qa-pairs">
                    <label>Q&A Pairs</label>
                    {queryResponsePairs.map((pair, index) => (
                        <div key={index} className="qa-pair-group">
                            <div className="qa-pair">
                                <input
                                    type="text"
                                    placeholder="플레이어의 예상 질문"
                                    value={pair.question}
                                    onChange={e => handleChangeQAPair(index, 'question', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="해당 질문에 대해 LPT_GPT가 해야하는 답변"
                                    value={pair.answer}
                                    onChange={e => handleChangeQAPair(index, 'answer', e.target.value)}
                                />
                            </div>
                            {queryResponsePairs.length > 5 && (
                                <button onClick={() => handleRemoveQRPair(index)} className="remove-button">Remove</button>
                            )}
                        </div>
                    ))}
                    {queryResponsePairs.length < 15 && (
                        <button onClick={handleAddQRPair} className="add-button">Add Q&A Pair</button>
                    )}
                </div>
                <button className="create-button" onClick={handleCreateRiddle}>Create New Riddle</button>
            </div>
        </div>
    );
};

export default NewRiddlePage;
