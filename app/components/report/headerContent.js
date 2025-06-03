import * as XLSX from "xlsx";


export const getHeaderContent = () => {
  const company = {
    name: "Mi Empresa C.A.",
    rif: "J-12345678-9",
    address: "Calle Principal, Ciudad, País",
    logo: "/images/logo.png",
  };

  const getDate = () => {
    const now = new Date();
    return `Fecha de emisión: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  };

  return {
    pdf: async (doc) => {
      const img = new Image();
      img.src = company.logo;

      await new Promise(resolve => {
        img.onload = () => {
          doc.addImage(img, "SVG", 10, 10, 30, 30);
          doc.setFontSize(12);
          doc.text(company.name, 45, 15);
          doc.text(`RIF: ${company.rif}`, 45, 22);
          doc.text(company.address, 45, 29);
          doc.text(getDate(), 45, 36);
          resolve(true);
        };
      });
    },

    excel: (worksheet, title) => {
      XLSX.utils.sheet_add_aoa(worksheet, [
        [company.name],
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
        company.name,
        `RIF: ${company.rif}`,
        company.address,
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
          // Dibuja el logo
          ctx.drawImage(img, 20, 20, 60, 60);

          // Dibuja el texto al lado del logo
          ctx.font = "18px Arial";
          ctx.fillStyle = "#000";
          const xText = 100;
          let yText = 40;

          ctx.fillText(company.name, xText, yText);
          yText += 25;
          ctx.fillText(`RIF: ${company.rif}`, xText, yText);
          yText += 25;
          ctx.fillText(company.address, xText, yText);
          yText += 25;
          ctx.fillText(getDate(), xText, yText);

          resolve(true);
        };
      });
    }
  };
};
