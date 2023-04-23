(async () => {
  for (let index = 0; index < 10000; index++) {
    try {
      const { Octokit } = require("@octokit/core");
      const { createAppAuth } = require("@octokit/auth-app");

      const octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          id: process.env.TEST_APP_ID,
          privateKey: process.env.TEST_APP_PRIVATE_KEY,
          installationId: process.env.TEST_APP_INSTALLATION_ID,
        },
      });

      await octokit.request("GET /installation/repositories", {
        mediaType: {
          previews: ["machine-man"],
        },
      });

      process.stdout.write(".");
    } catch (error) {
      console.log("Error: ", error);
      process.exit(1);
    }
  }

  console.log("");
})();
