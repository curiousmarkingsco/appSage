function readElectronStore(){
  if (window.api) window.api.readStore()
    .then(store => {
      appSageStore = store;
      return store;
    })
    .catch(error => {
      console.error('Error initializing store:', error.stack || error);
    });
}