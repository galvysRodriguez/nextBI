import * as XLSX from "xlsx";

export const getHeaderContent = () => {
  
  const storedCompany = localStorage.getItem("company");

 const company = JSON.parse(storedCompany)
  

  const getDate = () => {
      const now = new Date();
      const optionsDate = {
          timeZone: 'America/Caracas',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
      };

      const optionsTime = {
          timeZone: 'America/Caracas',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
      };
      
      const dateStr = now.toLocaleDateString('es-VE', optionsDate);
      const timeStr = now.toLocaleTimeString('es-VE', optionsTime);
      
      return `Fecha de emisión: ${dateStr} ${timeStr}`;
  };

  return {
    pdf: async (doc) => {
    const img = new Image();
    img.src = company.logo;

    await new Promise(resolve => {
      img.onload = () => {

        doc.addImage(img, "PNG", 10, 10, 25, 25); 

        const xInfo = 45;
        let y = 15;
        doc.setFontSize(10);
        doc.text(company.company_name, xInfo, y);
        y += 6;
        doc.text(`RIF: ${company.rif}`, xInfo, y);
        y += 6;
        doc.text(`Dirección: ${company.address}`, xInfo, y);
        y += 6;
        doc.text(`Teléfono: ${company.phone}`, xInfo, y);

        const dateStr = new Date().toLocaleDateString('es-VE', {
          timeZone: 'America/Caracas',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });

        const timeStr = new Date().toLocaleTimeString('es-VE', {
          timeZone: 'America/Caracas',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });

        doc.setFontSize(10);
        doc.text(`Fecha: ${dateStr}`, 160, 15);
        doc.text(`Hora: ${timeStr}`, 160, 20);

        resolve(true);
      };
  });
    },

    excel: (worksheet, title) => {
      XLSX.utils.sheet_add_aoa(worksheet, [
        [company.company_name],
        [`RIF: ${company.rif}`],
        [company.address],
        [getDate()],
        [], 
        [title], 
        [], 
        ], { origin: "A1" });
    },

    csv: (title) => {
      return [
        company.company_name,
        `RIF: ${company.rif}`,
        `Dirección: ${company.address}`,
        `Telefono: ${company.phone}`,
        getDate(),
        "", 
        title,
        "",
      ];
    },

    image: async (ctx) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = company.logo;

        img.onload = () => {
          ctx.drawImage(img, 20, 20, 100, 100);

          ctx.font = "16px Arial";
          ctx.fillStyle = "#000";
          const xText = 140;
          let yText = 40;

          ctx.fillText(company.company_name, xText, yText);
          yText += 25;
          ctx.fillText(`RIF: ${company.rif}`, xText, yText);
          yText += 25;
          ctx.fillText(`Dirección: ${company.address}`, xText, yText);
          yText += 25;
          ctx.fillText(`Teléfono: ${company.phone}`, xText, yText);

          const now = new Date();
          const dateStr = now.toLocaleDateString('es-VE', {
            timeZone: 'America/Caracas',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

          const timeStr = now.toLocaleTimeString('es-VE', {
            timeZone: 'America/Caracas',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });

          ctx.font = "14px Arial";
          ctx.textAlign = "right";

          const paddingRight = 20;
          const canvasWidth = ctx.canvas.width;

          ctx.fillText(`Fecha: ${dateStr}`, canvasWidth - paddingRight, 40);
          ctx.fillText(`Hora: ${timeStr}`, canvasWidth - paddingRight, 65);

          resolve(true);
        };
      });
    }

  };
};
