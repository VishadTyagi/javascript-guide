import React, { useState, useEffect, useRef } from 'react'
import './CodeBlock.css'

function CodeBlock({ code, language = 'javascript', runFunction, outputId }) {
    const [output, setOutput] = useState('')
    const [showOutput, setShowOutput] = useState(false)
    const codeRef = useRef(null)

    useEffect(() => {
        // Initialize Prism.js syntax highlighting after render
        const timer = setTimeout(() => {
            if (window.Prism && codeRef.current) {
                window.Prism.highlightElement(codeRef.current)
            }
        }, 0)
        
        return () => clearTimeout(timer)
    }, [code, language])

    const copyCode = async () => {
        try {
            await navigator.clipboard.writeText(code)
            // You could add a toast notification here
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const runCode = () => {
        if (runFunction) {
            setShowOutput(true)
            try {
                const result = runFunction()
                setOutput(result || 'Code executed successfully. Check console for detailed output.')
            } catch (error) {
                setOutput(`Error: ${error.message}`)
            }
        }
    }

    return (
        <div className="code-block-wrapper">
            <div className="code-block">
                <div className="code-header">
                    <span className="code-lang">{language}</span>
                    <div className="code-actions">
                        <button className="code-action" onClick={copyCode}>
                            Copy
                        </button>
                    </div>
                </div>
                <div className="code-content">
                    <pre>
                        <code 
                            ref={codeRef}
                            className={`language-${language}`}
                        >
                            {code}
                        </code>
                    </pre>
                </div>
            </div>
            {runFunction && (
                <>
                    <button className="run-button" onClick={runCode}>
                        <i className="fas fa-play"></i> Run Example
                    </button>
                    {showOutput && output && (
                        <div className="output" id={outputId}>
                            <pre>{output}</pre>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default CodeBlock

