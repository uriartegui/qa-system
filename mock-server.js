import http from "http";

const PORT = 8080;

// Dados mock
const USERS = [
  {
    id: "user-1",
    name: "Guilherme Uriarte",
    email: "admin@qualyra.dev",
    password: "qualyra123",
    role: "OWNER",
    organizationId: "org-1",
    organizationName: "Qualyra Labs",
  },
];

const NON_CONFORMITIES = [
  {
    id: "nc-1",
    title: "Falha no processo de inspeção",
    description: "Inspeção não realizada conforme procedimento",
    category: "Processo",
    severity: "HIGH",
    status: "OPEN",
    createdAt: new Date().toISOString(),
    updatedAt: null,
    dueDate: "2026-03-15",
  },
  {
    id: "nc-2",
    title: "Documento desatualizado",
    description: "Manual de qualidade com revisão vencida",
    category: "Documentação",
    severity: "MEDIUM",
    status: "IN_PROGRESS",
    createdAt: new Date().toISOString(),
    updatedAt: null,
    dueDate: "2026-03-10",
  },
  {
    id: "nc-3",
    title: "Equipamento sem calibração",
    description: "Paquímetro com calibração vencida há 30 dias",
    category: "Equipamento",
    severity: "CRITICAL",
    status: "OPEN",
    createdAt: new Date().toISOString(),
    updatedAt: null,
    dueDate: "2026-03-05",
  },
];

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
}

function json(res, status, data) {
  setCors(res);
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  // CORS preflight
  if (method === "OPTIONS") {
    setCors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  console.log(`[${method}] ${url}`);

  // POST /auth/login
  if (method === "POST" && url === "/auth/login") {
    const body = await getBody(req);
    const user = USERS.find(
      (u) => u.email === body.email && u.password === body.password,
    );
    if (!user) {
      return json(res, 401, { message: "Credenciais inválidas" });
    }
    return json(res, 200, {
      token: "mock-jwt-" + Date.now(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: user.organizationId,
        organizationName: user.organizationName,
      },
    });
  }

  // GET /non-conformities
  if (method === "GET" && url.startsWith("/non-conformities")) {
    const id = url.split("/")[2];
    if (id) {
      const nc = NON_CONFORMITIES.find((n) => n.id === id);
      if (!nc) return json(res, 404, { message: "Não encontrada" });
      return json(res, 200, nc);
    }
    return json(res, 200, {
      content: NON_CONFORMITIES,
      totalElements: NON_CONFORMITIES.length,
      totalPages: 1,
      number: 0,
    });
  }

  // POST /non-conformities
  if (method === "POST" && url === "/non-conformities") {
    const body = await getBody(req);
    const nc = {
      id: "nc-" + Date.now(),
      ...body,
      status: "OPEN",
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    NON_CONFORMITIES.push(nc);
    return json(res, 201, nc);
  }

  // Rota não encontrada
  json(res, 404, { message: "Rota não encontrada" });
});

server.listen(PORT, () => {
  console.log(`✅ Mock server rodando em http://localhost:${PORT}`);
  console.log(`   POST /auth/login`);
  console.log(`   GET  /non-conformities`);
  console.log(`   POST /non-conformities`);
});
