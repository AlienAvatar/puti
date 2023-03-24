import React from 'react';
import ReactDOM from 'react-dom';
import { EditorState, ContentState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../assets/css/editor.css';
import { useState, useEffect  } from 'react';

function CusEditor() {
    const _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState);
    const [contentState, setContentState] = useState(raw);

    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
    }

    return <Editor
                className = "editor" 
                defaultContentState={contentState}
                onContentStateChange={setContentState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class" 
            />;
}

export default CusEditor;