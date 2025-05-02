export const exportEChart = (chartInstance, fileName, type = 'png') => {
    if (!chartInstance) return
  
    const dataUrl = chartInstance.getDataURL({
      type,
      pixelRatio: 2,
      backgroundColor: '#fff',
    })
  
    downloadImage(dataUrl, fileName, type)
  }
  
  export const exportApexChart = (chartInstance, fileName, type = 'png') => {
    if (!chartInstance) return
  
    chartInstance.dataURI().then(({ imgURI }) => {
      downloadImage(imgURI, fileName, type)
    })
  }
  

  const downloadImage = (dataUrl, fileName, type) => {
    const link = document.createElement('a')
    link.download = `${fileName}.${type}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }