const buildHistory = {};

module.exports = {
  get: buildId => {
    return buildHistory[buildId];
  },
  buildStarted: (jobName, buildId, startedAt) => {
    buildHistory[buildId] = {
      id: buildId,
      jobName,
      startedAt,
      status: "started",
      steps: [],
      messages: []
    };
  },
  buildSuccess: (buildId, successAt) => {
    buildHistory[buildId] = {
      ...buildHistory[buildId],
      successAt,
      status: "success"
    };
  },
  buildFailure: (buildId, failureAt) => {
    buildHistory[buildId] = {
      ...buildHistory[buildId],
      failureAt,
      status: "failure"
    };
  },
  buildStepStarted: (buildId, stepId, stepName, startedAt) => {
    buildHistory[buildId].steps.push({
      id: stepId,
      name: stepName,
      startedAt,
      status: "started"
    });
  },
  buildStepSuccess: (buildId, stepId, stepName, successAt) => {
    const index = buildHistory[buildId].steps.findIndex(s => s.id === stepId);
    buildHistory[buildId].steps[index] = {
      ...(buildHistory[buildId].steps[index] || {}),
      successAt,
      status: "success"
    };
  },
  buildStepFailure: (buildId, stepId, stepName, failureAt) => {
    const index = buildHistory[buildId].steps.findIndex(s => s.id === stepId);
    buildHistory[buildId].steps[index] = {
      ...(buildHistory[buildId].steps[index] || {}),
      failureAt,
      status: "failure"
    };
  },
  addBuildMessage: (buildId, message, timestamp) => {
    buildHistory[buildId].messages.push({
      message,
      timestamp
    });
  },
  query: ({ jobName }) => {
    return Object.values(buildHistory).filter(
      build => build.jobName === jobName
    );
  }
};
