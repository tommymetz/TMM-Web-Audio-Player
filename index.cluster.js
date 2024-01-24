import cluster from 'cluster'
const WORKERS = process.env.WEB_CONCURRENCY || 1
console.log('WORKERS', WORKERS)

import { startServer } from './index.js'

const startWorker = () => {
  var worker = cluster.fork();
  console.log('CLUSTER: Worker %d started', worker.id)
}

if(cluster.isPrimary){
  for(let i=0; i<WORKERS; i++) startWorker()
 
  cluster.on('disconnect', (worker) => {
    console.log('CLUSTER: Worker %d disconnected from the cluster.', worker.id)
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log('CLUSTER: Worker %d died with exit code %d (%s)', worker.id, code, signal)
    startWorker()
  })
}else{
  startServer()
}
