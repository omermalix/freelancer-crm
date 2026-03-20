import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const crm_action = (args) => {
  const { action, client_name, project_name, project_cost, project_timeline } = args;
  const scriptPath = path.join(__dirname, "crm_cli.py");
  
  let cmd = `python3 "${scriptPath}" ${action}`;
  if (action === "proposal") {
    cmd += ` "${client_name || ""}" "${project_name || ""}" "${project_cost || ""}" "${project_timeline || ""}"`;
  }

  try {
    const output = execSync(cmd, { encoding: "utf-8" });
    return output;
  } catch (error) {
    return `Error executing CRM action: ${error.message}`;
  }
};
