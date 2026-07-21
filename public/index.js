    document.getElementById('convertBtn').addEventListener('click', async () => {
      const errorLog = document.getElementById('errorLog');
      errorLog.textContent = '';
      
      const rawInput = document.getElementById('jsonInput').value;
      const fileNameInput = document.getElementById('fileNameInput').value;
      let parsedJson;

      try {
        parsedJson = JSON.parse(rawInput);
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
        link.download = fileNameInput + '.csv'; 
        
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        window.URL.revokeObjectURL(downloadUrl);

      } catch (err) {
        errorLog.textContent = `Ошибка: ${err.message}`;
      }
    });