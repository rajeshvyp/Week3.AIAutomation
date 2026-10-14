
return $input.all().map(item => {
  const s = item.json;
  let row = s;

  // Read the AI response if it is returned as text
  if (typeof s.text === "string") {
    try {
      row = JSON.parse(s.text);
    } catch (error) {
      row = s;
    }
  }

  const email = String(row.Email ?? "").trim().toLowerCase();

  const city = String(row.City ?? "")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return {
    json: {
      ...row,
      Email: validEmail ? email : "INVALID_EMAIL",
      City: city || "UNKNOWN",
      Email_Valid: validEmail
    }
  };
});
