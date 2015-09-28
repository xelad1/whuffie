### DDP

```js
var ddp = new DDP({
	host: 'localhost',
  port: 8000,
  ssl: false,
  autoReconnect: true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1'
});

ddp.initialize()
	.then(function() {
		return ddp.subscribe()
	});
```