export default function guardrail(mathFunction) {
  const queue = [];
  let result;
  try {
    result = mathFunction();
  } catch (err) {
    result = err.toString();
  }
  queue.push(result);
  queue.push('Guardrail was processed');
  return queue;
}
