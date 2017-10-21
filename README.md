## Worker Pool

`WorkersPool` provides functionality which is similar to `Promise.all` however
it executes a predefined number of concurent workers at the same moment. As a
first arguments it receives a list of functions that should be executed by a
pool. Second argument is optional and is a config object that defines a max number
of concurent workers. Default batch size is 3.

### Example

```javascript
const WorkerPool = require('worker-pool');

const intervals = [1000, 2000, 1000, 1000];
const workers = intervals.map((interval, n) => {
  return () => new Promise(resolve => {
    console.log(`worker ${n} started at ${Date.now()}`);
    setTimeout(() => resolve([n, Date.now()]), interval);
  });
});

const pool = new WorkerPool(workers, {batchSize: 2});
pool.then(results => console.log('done', results));
```
console output is

```
worker 0 started at 1508609469064
worker 1 started at 1508609469066
worker 2 started at 1508609470069
worker 3 started at 1508609471067
done [ [ 0, 1508609470069 ],
  [ 1, 1508609471067 ],
  [ 2, 1508609471069 ],
  [ 3, 1508609472071 ] ]
```

If some of workers throw an error or return a rejected promise, in this case result
promise will be rejected as well (same as `Promise.all`).

Licensed as MIT.
