import CusLayout from "../components/CusLayout";
import { validToken, syncInfoAc } from '../../../store/login/ActionCreators';
import store from '../../../store';
import CusEditor from "../components/CusEditor";
import { EditorState } from "draft-js";
import '../assets/css/article.css'

function ArticlePage() {
    

    const content = ( 
                      <div className="rich-text">
                          <header className="rich-header">
                            Rich Text Editor
                          </header>
                          <CusEditor >
                            <p>Article</p>
                          </CusEditor>
                      </div>
                      
                    );
    
    return (
      <CusLayout children={content}>
        
      </CusLayout>
    );
  }
  
  export default ArticlePage;
  