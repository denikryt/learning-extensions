document.addEventListener("mouseup", async (event) => {
  console.log('mouse up')

  var dialog = document.getElementById('dialog');
  var selectedText = window.getSelection().toString().trim();

  if (selectedText !== '') {
    if (!dialog) { 
      const response = await fetch(browser.extension.getURL('dialog.html'));
      const htmlContent = await response.text();
      // Create a new dialog window element
      var dialog = document.createElement('div'); // Use div instead of iframe
      dialog.innerHTML = htmlContent;
      dialog.id = 'dialog' // Add content to the dialog

      // Populate the selected text in the dialog window
      var selectedTextElement = dialog.querySelector('#selectedText'); 
      selectedTextElement.textContent = selectedText; 
      
      var translatedTextElement = dialog.querySelector('#translatedText');
      const { translatedText } = await translate($(selectedText), { to: 'ru' });
      console.log(text); 
      translatedTextElement.textContent = translatedText; 
     
      var range = window.getSelection().getRangeAt(0); 
      var rect = range.getBoundingClientRect(); 
      dialog.style.position = 'absolute';
      dialog.style.top = (rect.top + window.pageYOffset+15) + 'px'; 
      dialog.style.left = (rect.left + window.pageXOffset+10) + 'px'; 

      // Append the dialog window to the document body
      document.body.appendChild(dialog);

  }}
});

document.addEventListener("mousedown", (event) => {
  console.log('mouse down')
  var dialog = document.getElementById('dialog');
  var dialogContent = document.getElementById('dialogContent'); // Replace with your dialog content ID or reference
  
  // Add an event listener for the click event on the document
  if (dialog){
    if (dialog && event.target !== dialog && !dialog.contains(event.target)) { // Check if the clicked element is not the dialog window or its child    
      dialog.remove();
      return

    } else if (event.target === dialog || dialog.contains(event.target)) { 

    // Mouse down event listener
      dialog.addEventListener("mousedown", (event) => {
        console.log('dialog.mousedown')
        isDragging = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
      });

      // Mouse move event listener
      dialog.addEventListener("mousemove", (event) => {
        console.log('dialog.mousemove')
        if (isDragging) {
          var deltaX = event.clientX - mouseX;
          var deltaY = event.clientY - mouseY;
          mouseX = event.clientX;
          mouseY = event.clientY;
          dialog.style.top = (dialog.offsetTop + deltaY) + "px";
          dialog.style.left = (dialog.offsetLeft + deltaX) + "px";
        }
      });

      // Mouse up event listener
      dialog.addEventListener("mouseup", (event) => {
        console.log('dialog.mouseup')
        isDragging = false;
      });
  }}
})
