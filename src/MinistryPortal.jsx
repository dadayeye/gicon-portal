import { useEffect, useState } from "react";

export default function MinistryPortal() {
  const ministries = {
    과학기술정보통신부: ["NIA", "NIPA"],
    중소벤처기업부: [],
    산업통상자원부: [],
    문화체육관광부: [],
    교육부: [],
  };

  const [selectedMinistry, setSelectedMinistry] = useState("과학기술정보통신부");
  const [selectedAgency, setSelectedAgency] = useState("NIA");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    if (!selectedMinistry || !selectedAgency) return;

    // JSON 경로 구성
    const url = `/data/msit/${selectedAgency.toLowerCase()}.json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setNotices(data);
        console.log(`📦 ${selectedAgency} 데이터 로딩 완료`, data);
      })
      .catch((err) => {
        console.error("❌ 데이터 불러오기 실패", err);
        setNotices([]);
      });
  }, [selectedMinistry, selectedAgency]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>5대 부처 공고 통합 포털</h1>

      {/* 부처 탭 */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        {Object.keys(ministries).map((ministry) => (
          <button
            key={ministry}
            onClick={() => {
              setSelectedMinistry(ministry);
              setSelectedAgency(ministries[ministry][0] || null);
              setNotices([]);
            }}
            style={{
              backgroundColor: selectedMinistry === ministry ? "#ccc" : "#eee",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {ministry}
          </button>
        ))}
      </div>

      {/* 산하기관 탭 */}
      {ministries[selectedMinistry] && ministries[selectedMinistry].length > 0 && (
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
          {ministries[selectedMinistry].map((agency) => (
            <button
              key={agency}
              onClick={() => setSelectedAgency(agency)}
              style={{
                backgroundColor: selectedAgency === agency ? "#ddd" : "#f2f2f2",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            >
              {agency}
            </button>
          ))}
        </div>
      )}

      {/* 공고 카드 출력 */}
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          marginTop: "2rem",
        }}
      >
        {notices.map((notice, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              background: "#fafafa",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{notice.title}</h2>
            <p style={{ color: "#666", marginBottom
