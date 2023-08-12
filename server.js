import express from "express";
import useragent from "useragent";
import { publicIpv4 } from "public-ip";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const userAgent = useragent.parse(req.headers["user-agent"]);
    const ipAddress = await publicIpv4();
    const timestamp = new Date().toISOString();
    const data = {
      timestamp,
      browser: userAgent.toAgent(),
      system: `${userAgent.os.toString()} ${userAgent.os.version}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      ipAddress,
    };

    const logEntry = `
      Timestamp: ${data.timestamp}
      Location: ${data.location}
      Browser: ${data.browser}
      System: ${data.system}
      Timezone: ${data.timeZone}
      IP Address: ${data.ipAddress}
      -----------------------------------
    `;

    console.log(logEntry);

    fs.appendFile("./log.md", logEntry, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      } else {
        console.log("You don't have correct information to access the files.");
      }
    });

    const responseHtml = await fs.readFile("./response.html", "utf-8");
    res.status(200).send(responseHtml);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Error processing request.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
