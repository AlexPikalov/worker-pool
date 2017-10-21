const WorkerPool = require('./index.js');

const intervals = [1000, 2000, 1000, 1000];
const workers = intervals.map((interval, n) => {
  return () => new Promise(resolve => {
    console.log(`worker ${n} started at ${Date.now()}`);
    setTimeout(() => resolve([n, Date.now()]), interval);
  });
});

const pool = new WorkerPool(workers, {batchSize: 2});
pool.then(results => console.log('done', results));
