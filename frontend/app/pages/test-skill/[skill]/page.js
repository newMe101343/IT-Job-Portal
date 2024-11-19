// app/test-skill/[skill]/page.js

"use client"

import Sidebar from '@/app/Components/Sidebar';
import CodeEditor from '@/app/Components/CodeEditor';
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';

const TestSkill = () => {
    const params = useParams();
    const skill = params.skill;  // Get the dynamic route parameter
    const [code, setCode] = useState("");  // Store code in the editor

    useEffect(() => {
        // Initialize with some default code if necessary
        setCode("// Write your code here...");
    }, [skill]);

    if (!skill) {
        return <div>Loading...</div>;  // Handle loading state
    }

    const handleCodeChange = (newCode) => {
        setCode(newCode);  // Update code in state when user types
    };

    return (
        <div>
            <Sidebar />
            <div className='ml-64 p-6'>
                <h2>{skill} Test</h2>
                <CodeEditor
                    language={skill}  // Use the dynamic skill as language
                    value={code}  // Pass the code to the editor
                    onChange={handleCodeChange}  // Handle code changes
                />
            </div>
        </div>
    );
};

export default TestSkill;
