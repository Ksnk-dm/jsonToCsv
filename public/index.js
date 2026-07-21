    
      const errorLog = document.getElementById('errorLog');
      errorLog.textContent = '';
      
      const rawInput = document.getElementById('jsonInput');
      const fileNameInput = document.getElementById('fileNameInput');
      const clearButton = document.getElementById('clearBtn');
      let parsedJson;

     
     clearButton.addEventListener('click', () => {
        rawInput.value = '';
        errorLog.textContent = '';
      });

    
    document.getElementById('convertBtn').addEventListener('click', async () => {

      try {
        parsedJson = JSON.parse(rawInput.value);
      } catch (e) {
        errorLog.textContent = 'Помилка валідації';
        return;
      }

      try {
        const response = await fetch('/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(parsedJson)
        });

        if (!response.ok) {
          const textError = await response.text();
          throw new Error(textError || 'Помилка сервера');
        }

        const blob = await response.blob();
        
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileNameInput.value + '.csv'; 
        
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        window.URL.revokeObjectURL(downloadUrl);

      } catch (err) {
        errorLog.textContent = `Ошибка: ${err.message}`;
      }
    });