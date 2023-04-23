import axios from "axios";

import fixtures from "../../../index.js";

test("Get repository", async () => {
  const mock = fixtures.mock("api.github.com/get-repository");

  const result = await axios({
    method: "get",
    url: "https://api.github.com/repos/octokit-fixture-org/hello-world",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: "token 0000000000000000000000000000000000000001",
    },
  }).catch(mock.explain);

  expect(mock.done.bind(mock)).not.toThrow();
  expect(result.data.id).toBe(1000);
});
