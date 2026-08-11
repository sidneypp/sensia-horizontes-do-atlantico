import fs from "node:fs";
import path from "node:path";

const localGuidePath = path.join(process.cwd(), "private-guide.local.json");

function readGuideSource() {
  if (process.env.PRIVATE_GUIDE_JSON) {
    return process.env.PRIVATE_GUIDE_JSON;
  }

  if (fs.existsSync(localGuidePath)) {
    return fs.readFileSync(localGuidePath, "utf8");
  }

  return "";
}

export function getPrivateGuide() {
  const source = readGuideSource();

  if (!source) {
    throw new Error("PRIVATE_GUIDE_JSON não configurado");
  }

  try {
    return JSON.parse(source);
  } catch {
    throw new Error("PRIVATE_GUIDE_JSON não contém um JSON válido");
  }
}
