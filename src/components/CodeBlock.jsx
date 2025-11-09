import React, { useState, useEffect, useRef, useCallback } from 'react'

const CodeBlock = React.memo(({ code, language = 'javascript', runFunction, outputId }) => {
    const [output, setOutput] = useState('')
    const [showOutput, setShowOutput] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
    const codeRef = useRef(null)

    useEffect(() => {
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
        <div className="my-4">
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-gray-800 border-b border-gray-700">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {language}
                    </span>
                    <button
                        onClick={copyCode}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                            copySuccess
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        {copySuccess ? (
                            <><i className="fas fa-check mr-1.5"></i>Copied</>
                        ) : (
                            <><i className="fas fa-copy mr-1.5"></i>Copy</>
                        )}
                    </button>
                </div>
                
                {/* Code */}
                <div className="p-4 overflow-x-auto">
                    <pre className="m-0">
                        <code
                            ref={codeRef}
                            className={`language-${language} text-sm font-mono text-gray-100`}
                        >
                            {code}
                        </code>
                    </pre>
                </div>
            </div>

            {/* Run Button & Output */}
            {runFunction && (
                <div className="mt-3">
                    <button
                        onClick={runCode}
                        className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                        <i className="fas fa-play text-xs"></i>
                        Run Code
                    </button>
                    {showOutput && output && (
                        <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg border-l-4 border-l-brand-500" id={outputId}>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Output:</div>
                            <pre className="text-sm font-mono text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words m-0">
                                {output}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}, (prevProps, nextProps) => {
    return (
        prevProps.code === nextProps.code &&
        prevProps.language === nextProps.language &&
        prevProps.runFunction === nextProps.runFunction &&
        prevProps.outputId === nextProps.outputId
    )
})

CodeBlock.displayName = 'CodeBlock'

export default CodeBlock
