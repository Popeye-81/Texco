export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { username, password } = req.body;

  const users = [
    { username: "cso1", password: "123", role: "CSO" },
    { username: "ase1", password: "123", role: "ASE" },
    { username: "sm1", password: "123", role: "SM" },
    { username: "asm1", password: "123", role: "ASM" },
    { username: "admin", password: "admin123", role: "ADMIN" },
  ];

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    token: "demo-token-" + user.role,
    username: user.username,
    role: user.role,
  });
}