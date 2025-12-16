export function getPasswordStrength(password = "") {
  let rawScore = 0;

  const checks = {
    length6: password.length >= 6,
    length10: password.length >= 10,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    at: /@/.test(password),
    valid: /^[a-zA-Z0-9@]*$/.test(password),
  };

  if (!checks.valid) {
    return { score: 0, label: "Invalid chars", checks };
  }

  if (checks.length6) rawScore++;
  if (checks.length10) rawScore++;
  if (checks.lower) rawScore++;
  if (checks.upper) rawScore++;
  if (checks.number) rawScore++;
  if (checks.at) rawScore++;

  let score;
  if (rawScore >= 5) score = 2;
  else if (rawScore >= 3) score = 1;
  else score = 0;

  return { score };
}
