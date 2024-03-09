import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import the necessary modes and themes for the Ace editor
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';

const CodeEditor = (
    {
        roomId,
        username,
        code,
        onChange,
    }
) => {

    return (
        <div>
            <h3>Code Editor for Room: {roomId}</h3>
            <AceEditor
                mode="javascript"
                theme="github"
                onChange={onChange}
                name="code_editor"
                editorProps={{ $blockScrolling: true }}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </div>
    );
};

export default CodeEditor;
