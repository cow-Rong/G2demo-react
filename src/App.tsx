import './App.less';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import { BigScreenGuide } from './features/BigScreen/BigScreenGuide';
// import { VisualConfigList } from './features/VisualConfig/VisualConfigList';
// import { VisualConfigDetail } from './features/VisualConfig/VisualConfigDetail';
import { GraphsManageList } from './features/GraphsManage/GraphsManageList';
import { CardsManageList } from './features/CardsManage/CardsManageList';
import { PagesManageList } from './features/PagesManage/PagesManageList';
import { DatasManageList } from './features/DatasManage/DatasManageList';
import { NotFound } from './features/NotFound/NotFound';
import { CardEditDetail } from './features/CardsManage/CardEditDetail';
import { PageEditDetail } from './features/PagesManage/PageEditDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<DatasManageList />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;