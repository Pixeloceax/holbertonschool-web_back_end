export default function createIteratorObject(report) {
  const allEmployees = [];
  for (const department of Object.values(report.allEmployees)) {
    for (const employee of department) {
      allEmployees.push(employee);
    }
  }
  return allEmployees;
}
