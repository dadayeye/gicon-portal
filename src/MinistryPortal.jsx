import { useState, useEffect } from "react";

export default function MinistryPortal() {
  const [notices, setNotices] = useState([]);
  const [selectedMinistry, setSelectedMinistry] = useState("전체");
  const [search, setSearch] = useState("");

  // ✅ JSON 불러오기
  useEffect(() => {
    fetch("/msit_data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("불러온 공고 데이터:", data); // ✅ 여기 추가됨!
        setNotices(data);
      })
      .catch((err) => console.error("불러오기 실패", err));
  }, []);

  const ministries = ["과학기술정보통신부"];
  const filtered = notices.filter(
    (n) =>
      (selectedMinistry === "전체" || n.ministry === selectedMinistry) &&
      n.title.includes(search)
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>공고 자동 수집 포털</h1>

      <div style={{ margin: '1rem 0', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setSelectedMinistry("전체")}>전체</button>
        {ministries.map((min) => (
          <button
            key={min}
            style={{
              backgroundColor: selectedMinistry === min ? '#ccc' : '#eee',
              padding: '0.5rem',
              borderRadius: '5px'
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
            <h2 style={{ fontSize: '1.1rem' }}>{notice.title}</h2>
            <p style={{ color: '#666' }}>{notice.ministry}</p>
            <p style={{ fontSize: '0.9rem' }}>마감일: {notice.date}</p>
            <a href={notice.link} target="_blank" rel="noreferrer" style={{ color: 'blue' }}>
              자세히 보기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
