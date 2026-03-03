const defaultDB = {
  topics: [],
  testCases: [],
  regressions: [],
  releaseTemplates: [],
  executions: [],
};

export let db = loadDB();

function loadDB() {
  const stored = localStorage.getItem("qaDB");

  if (!stored) {
    localStorage.setItem("qaDB", JSON.stringify(defaultDB));
    return structuredClone(defaultDB);
  }

  const parsed = JSON.parse(stored);

  return {
    topics: parsed.topics || [],
    testCases: parsed.testCases || [],
    regressions: parsed.regressions || [],
    releaseTemplates: parsed.releaseTemplates || [],
    executions: parsed.executions || [],
  };
}

export function saveDB() {
  localStorage.setItem("qaDB", JSON.stringify(db));
}

window.__QA_DB__ = db;
window.__QA_SAVE__ = saveDB;
