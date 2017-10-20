function WorkersPool(workers, config = {batchSize: 3}) {
  let cursor = 0;
  var runners = workers.map(makeRunner);

  start();

  return Promise.all(runners.map((r) => r.done));

  function makeRunner(fn) {
    let run;
    const promise = new Promise((res) => run = res);
    const done = promise.then(fn);
    done.then(runNext).catch(() => {});

    return { run, done };
  }

  function runNext() {
    const next = runners[cursor];
    cursor += 1;

    if (next) {
      next.run();
    }
  }

  function start() {
    for (; cursor < config.batchSize && cursor < workers.length;) {
      runNext();
    }
  }
}

module.exports = WorkersPool;
