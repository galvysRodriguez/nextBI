import { getHeaderContent } from "./headerContent";

export const exportEChart = (chartInstance, fileName, type = 'png') => {
  if (!chartInstance) return;

  const dataUrl = chartInstance.getDataURL({
    type,
    pixelRatio: 2,
    backgroundColor: '#fff',
  });

  drawImageWithHeader(dataUrl, fileName, type);
};

export const exportApexChart = (chartInstance, fileName, type = 'png') => {
  if (!chartInstance) return;

  chartInstance.dataURI().then(({ imgURI }) => {
    drawImageWithHeader(imgURI, fileName, type);
  });
};

const drawImageWithHeader = (chartDataUrl, fileName, type) => {
  const canvas = document.createElement("canvas");
  const width = 1800;
  const height = 1500;
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  const chartImg = new Image();
  chartImg.crossOrigin = "anonymous";
  chartImg.src = chartDataUrl;

  chartImg.onload = async () => {
    await getHeaderContent().image(ctx); 

    ctx.drawImage(chartImg, 0, 120, width, height - 120); 

    canvas.toBlob(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.${type}`;
      link.click();
    }, `image/${type}`);
  };
};