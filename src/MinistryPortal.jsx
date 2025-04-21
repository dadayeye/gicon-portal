
import { useState } from "react";

const ministries = [
  "과학기술정보통신부",
  "중소벤처기업부",
  "문화체육관광부",
  "산업통상자원부",
  "교육부"
];

const sampleNotices = [
  {
    ministry: "과학기술정보통신부",
    title: "2025년 ICT R&D 혁신 공모사업 공고",
    deadline: "2025-05-15",
    link: "https://www.msit.go.kr/notice"
  },
  {
    ministry: "문화체육관광부",
    title: "2025년 지역 콘텐츠 개발지원 사업",
    deadline: "2025-05-10",
    link: "https://www.mcst.go.kr/notice"
  },
  {
    ministry: "중소벤처기업부",
    title: "스타트업 지원 프로그램 공모 안내",
    deadline: "2025-05-20",
    link: "https://www.mss.go.kr/notice"
  }
];

export default function MinistryPortal() {
  const [selectedMinistry, setSelectedMinistry] = useState("전체");
  const [search, setSearch] = useState("");

  const filtered = sampleNotices.filter(
    (n) =>
      (selectedMinistry === "전체" || n.ministry === selectedMinistry) &&
      n.title.includes(search)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>5대 부처 공모사업 통합 포털</h1>

      <div style={{ margin: '1rem 0', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => setSelectedMinistry("전체")}>전체</button>
        {ministries.map((min) => (
          <button
            key={min}
            style={{
              backgroundColor: selectedMinistry === min ? '#ccc' : '#eee',
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
            onClick={() => setSelectedMinistry(min)}
          >
            {min}
          </button>
        ))}
      </div>

      <input
        placeholder="공고명 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {filtered.map((notice, idx) => (
          <div key={idx} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{notice.title}</h2>
            <p style={{ color: '#666' }}>{notice.ministry}</p>
            <p style={{ fontSize: '0.9rem' }}>마감일: {notice.deadline}</p>
            <a href={notice.link} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>
              자세히 보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
