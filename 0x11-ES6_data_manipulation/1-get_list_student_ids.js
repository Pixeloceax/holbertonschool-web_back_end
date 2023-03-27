export default function getListStudentIds(Ids) {
  if (!Array.isArray(Ids)) {
    return [];
  }
  return Ids.map((student) => student.id);
}
