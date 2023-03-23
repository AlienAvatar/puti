import CusLayout from "../components/CusLayout";
import { validToken, syncInfoAc } from '../../../store/login/ActionCreators';
import store from '../../../store';



function ArticlePage() {
    const content = ( <p>
      ArticlePage
    </p>);
    
    return (
      <CusLayout children={content}>
        
      </CusLayout>
    );
  }
  
  export default ArticlePage;
  