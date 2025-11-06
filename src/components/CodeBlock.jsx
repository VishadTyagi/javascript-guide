import React, { useState, useEffect, useRef, useCallback } from 'react'
import './CodeBlock.css'

const CodeBlock = React.memo(({ code, language = 'javascript', runFunction, outputId }) => {
    const [output, setOutput] = useState('')
    const [showOutput, setShowOutput] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
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

    const copyCode = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = code
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand('copy')
                setCopySuccess(true)
                setTimeout(() => setCopySuccess(false), 2000)
            } catch (e) {
                console.error('Fallback copy failed:', e)
            }
            document.body.removeChild(textArea)
        }
    }, [code])

    const runCode = useCallback(() => {
        if (runFunction) {
            setShowOutput(true)
            try {
                const result = runFunction()
                setOutput(result || 'Code executed successfully. Check console for detailed output.')
            } catch (error) {
                setOutput(`Error: ${error.message}`)
            }
        }
    }, [runFunction])

    return (
        <div className="code-block-wrapper">
            <div className="code-block">
                <div className="code-header">
                    <span className="code-lang">{language}</span>
                    <div className="code-actions">
                        <button 
                            className={`code-action ${copySuccess ? 'copied' : ''}`} 
                            onClick={copyCode}
                            title="Copy code"
                        >
                            {copySuccess ? (
                                <>
                                    <i className="fas fa-check"></i> Copied!
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-copy"></i> Copy
                                </>
                            )}
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
}, (prevProps, nextProps) => {
    // Custom comparison - only re-render if code or language changes
    return (
        prevProps.code === nextProps.code &&
        prevProps.language === nextProps.language &&
        prevProps.runFunction === nextProps.runFunction &&
        prevProps.outputId === nextProps.outputId
    )
})

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock
