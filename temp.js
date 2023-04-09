ocument.addEventListener("mouseup", async (event) => {
    console.log('mouse up')
  
    var dialog = document.getElementById('dialog');
    var selectedText = window.getSelection().toString().trim();
  
    if (selectedText !== '') {
      if (!dialog) { 
        const response = await fetch(browser.extension.getURL('dialog.html'));
        const htmlContent = await response.text();
        // Create a new dialog window element
        var dialog = document.createElement('div'); // Use div instead of iframe

        // Populate the selected text in the dialog window
        var selectedTextElement = dialog.querySelector('#selectedText'); 
        selectedTextElement.textContent = selectedText; 
        
        var translatedTextElement = dialog.querySelector('#translatedText');
        const { translatedText } = await translate($(selectedText), { to: 'ru' });
        console.log(text); 
        translatedTextElement.textContent = translatedText; 
       
        document.body.appendChild(dialog);
  
    }}
  });