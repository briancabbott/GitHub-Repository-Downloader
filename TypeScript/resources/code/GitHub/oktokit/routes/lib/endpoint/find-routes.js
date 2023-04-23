module.exports = findRoutes;

const _ = require("lodash");

const { getOperationId } = require("../openapi");

function findRoutes(state) {
  const route = state.routes[0];
  const { operation } = route;
  const routeBlocks = state.blocks.filter((block) => block.type === "route");

  if (routeBlocks.length === 1) {
    const routeBlock = routeBlocks[0];
    const { method, path } = routeBlock;
    assignRouteProperties(route, method, path);
    state.blocks.splice(state.blocks.indexOf(routeBlock), 1);
    return;
  }

  const hasAuthenticatedUserRoute = routeBlocks.some((block) => {
    const routeBlockIndex = state.blocks.indexOf(block);
    const blockWithTitle = findBlockWithRouteTitleAbove(
      state.blocks,
      routeBlockIndex
    );

    if (!blockWithTitle) {
      return false;
    }

    if (blockWithTitle.type !== "description") {
      return false;
    }
    // all paths starting with /user/ are routes specific to authenticated user
    if (/^\/user\//.test(block.path)) {
      return true;
    }

    if (/the authenticated user's/.test(blockWithTitle.text)) {
      return true;
    }

    return false;
  });

  const hasExampleRoutes = !!routeBlocks.slice(1).find((block) => {
    const prevBlock = state.blocks[state.blocks.indexOf(block) - 1];

    if (prevBlock.type === "exampleTitle") {
      return true;
    }

    if (prevBlock.type !== "description") {
      return false;
    }

    if (/\bexample\b/i.test(prevBlock.text)) {
      return true;
    }

    // https://developer.github.com/v3/scim/#get-a-list-of-provisioned-identities
    if (/^If you want to filter/.test(prevBlock.text)) {
      return true;
    }

    return false;
  });

  const hasStubbedRoute = !!routeBlocks.slice(1).find((block) => {
    const prevBlock = state.blocks[state.blocks.indexOf(block) - 1];

    return /\bstubbed endpoint\b/i.test(prevBlock.text);
  });

  if (hasStubbedRoute) {
    assignRouteProperties(route, routeBlocks[0].method, routeBlocks[0].path);

    const route2 = { operation: _.cloneDeep(operation) };
    route2.operation.summary += " (stubbed)";
    assignRouteProperties(
      route2,
      routeBlocks[1].method || routeBlocks[0].method,
      routeBlocks[1].path
    );
    state.routes.push(route2);

    const routeBlockIndex = state.blocks.indexOf(routeBlocks[1]);
    state.blocks.splice(routeBlockIndex - 1, 2);

    return;
  }

  if (hasAuthenticatedUserRoute) {
    state.routes = routeBlocks.map((routeBlock) => {
      const newRoute = { operation: _.cloneDeep(operation) };

      // <description>, <route block 1>, <description>, <route block 2>
      // e.g. https://developer.github.com/v3/activity/starring/#list-repositories-being-starred
      // => make description the name of the endpoints
      const routeBlockIndex = state.blocks.indexOf(routeBlock);

      // find paragraph above route block, ignore notes.
      const blockWithTitle = findBlockWithRouteTitleAbove(
        state.blocks,
        routeBlockIndex
      );

      const [newName] = (blockWithTitle.textOnly || blockWithTitle.text)
        .replace(/[^\w]*$/, "")
        .replace(/\n/g, " ")
        .split(/\.[\s\n]/); // use first sentence as name if there are multiple
      newRoute.operation.summary = newName;

      assignRouteProperties(newRoute, routeBlock.method, routeBlock.path);

      state.blocks.splice(routeBlockIndex - 1, 2);

      return newRoute;
    });

    return;
  }

  if (hasExampleRoutes) {
    assignRouteProperties(route, routeBlocks[0].method, routeBlocks[0].path);
    routeBlocks.slice(1).forEach((block) => {
      block.type = "description";
      block.text = "```\n" + [block.method, block.path].join(" ") + "\n```";

      delete block.method;
      delete block.path;
    });

    return;
  }

  throw new Error(
    `Multiple routes could not be handled for: "${operation.summary}"`
  );
}

function findBlockWithRouteTitleAbove(blocks, index) {
  return blocks
    .slice(0, index)
    .reverse()
    .find((block) => {
      if (block.type === "alternativeRouteTitle") return true;
      if (block.type !== "description") return false;
      if ("isNote" in block) return false;

      return true;
    });
}

function assignRouteProperties(route, method, path) {
  const { operation } = route;
  route.method = method.toUpperCase();
  route.path = path;
  operation.operationId = getOperationId(route);
  operation["x-github"].legacy = /-legacy$/.test(operation.operationId);
}
