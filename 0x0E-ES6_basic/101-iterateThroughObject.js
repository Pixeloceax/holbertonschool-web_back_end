export default function iterateThroughObject(reportWithIterator) {
  let allEmployees = "";
  for (const employee of reportWithIterator) {
    if (allEmployees.length > 0) {
      allEmployees += " | ";
    }
    allEmployees += `${employee}`;
  }
  return allEmployees;
}
