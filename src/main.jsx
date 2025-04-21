import React from 'react';
import ReactDOM from 'react-dom/client';
import MinistryPortal from './MinistryPortal'; // ✅ 공고 포털 컴포넌트 불러오기

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MinistryPortal /> {/* ✅ 이 컴포넌트가 화면에 나타나요! */}
  </React.StrictMode>
);
