const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    
    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
});

// install button handler
butInstall.addEventListener('click', async () => {
   
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);

});

// console log for app instllation
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    console.log('app successfully installed', event)
});
