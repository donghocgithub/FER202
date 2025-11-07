function Exercise4() {
  // Bài 4: Destructuring và Rest parameter
  const age = [25, 30, 35, 40, 45];
  const [first, second, ...rest] = age;

  // Khai báo mảng people trước khi dùng
  const people = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 34 },
    { name: "Charlie", age: 22 },
    { name: "David", age: 19 },
    { name: "Eve", age: 15 },
  ];

  // Bài 5: filter + map
  const teens = people
    .filter((person) => person.age >= 13 && person.age <= 19)
    .map((person) => `${person.name} ${person.age}`);

  // Bài 6 + 7: Mảng công ty (có revenue để sort)
  const companies = [
    { name: "Company A", category: "Tech", start: 2010, end: 2020, revenue: 5000 },
    { name: "Company B", category: "Finance", start: 2005, end: 2015, revenue: 7000 },
    { name: "Company C", category: "Retail", start: 2012, end: 2022, revenue: 6000 },
    { name: "Company D", category: "Tech", start: 2008, end: 2018, revenue: 5500 },
    { name: "Company E", category: "Finance", start: 2011, end: 2021, revenue: 8000 },
    { name: "Company F", category: "Retail", start: 2009, end: 2019, revenue: 4000 },
    { name: "Company G", category: "Tech", start: 2013, end: 2023, revenue: 7500 },
    { name: "Company H", category: "Finance", start: 2007, end: 2017, revenue: 6500 },
  ];

  // Sort theo end
  const sortedByEnd = [...companies].sort((a, b) => a.end - b.end);

  // Top 3 revenue
  const top3Companies = [...companies]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3);

  // Bài 7: rest & spread
  const newCompany0 = { ...companies[0], start: companies[0].start + 1 };

  function concatAll(...Arrays) {
    return [].concat(...Arrays);
  }

  // Bài 8: reduce
  const numbers = [3, 5, 2, 8, 1, 4];
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const min = numbers.reduce((acc, num) => (num < acc ? num : acc), numbers[0]);
  const max = numbers.reduce((acc, num) => (num > acc ? num : acc), numbers[0]);

  const groupedByCategory = companies.reduce((acc, company) => {
    if (!acc[company.category]) {
      acc[company.category] = [];
    }
    acc[company.category].push(company);
    return acc;
  }, {});

  return (
    <div>
      <h2>Exercise4</h2>
      <p>In ra số đầu tiên của mảng</p>
      <p>Số đầu tiên: {first}</p>
      <p>Số thứ hai: {second}</p>
      <p>Các phần tử còn lại: {rest.join(", ")}</p>

      <h3>Exercise5: Danh sách người trong độ tuổi teen (13-19):</h3>
      <ul>
        {teens.map((teen, index) => (
          <li key={index}>{teen}</li>
        ))}
        <p> so ngươi có tuổi teen: {teens.length}</p>
      </ul>

      <h4>Exercise6</h4>
      <p>Danh sách công ty sắp xếp theo năm kết thúc (tăng dần):</p>
      <ul>
        {sortedByEnd.map((company, index) => (
          <li key={index}>
            {company.name} - {company.end}
          </li>
        ))}
      </ul>

      <p>Top 3 công ty có doanh thu cao nhất:</p>
      <ul>
        {top3Companies.map((company, index) => (
          <li key={index}>
            {company.name} - {company.revenue}
          </li>
        ))}
      </ul>

      <h5>Exercise7</h5>
      <p>
        Công ty mới (thay đổi năm bắt đầu của công ty đầu tiên):{" "}
        {JSON.stringify(newCompany0)}
      </p>
      <p>Công ty gốc: {JSON.stringify(companies[0])}</p>
      <p>
        Kết quả concatAll([1,2],[3,4],[5,6]):{" "}
        {JSON.stringify(concatAll([1, 2], [3, 4], [5, 6]))}
      </p>

      <h6>Exercise8</h6>
      <p>Tổng các phần tử trong mảng numbers: {sum}</p>
      <p>Giá trị nhỏ nhất: {min}</p>
      <p>Giá trị lớn nhất: {max}</p>

      <div>Phân nhóm công ty theo category:</div>
      <ul>
        {Object.entries(groupedByCategory).map(([category, comps], index) => (
          <li key={index}>
            <strong>{category}:</strong>
            <ul>
              {comps.map((comp, idx) => (
                <li key={idx}>{comp.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Exercise4;
