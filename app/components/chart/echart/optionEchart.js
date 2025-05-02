import { COLORS } from "../color"

export const OPTION_ECHART = {
    colors: COLORS,
    legend: {
        top: 'bottom',
        padding: [20, 0, 0, 0], // top, right, bottom, left
        textStyle: {
        fontSize: 12
        }
    },
}

export const SERIE_ECHART = {
    name: 'Valor',
    radius: ['50%', '70%'], // Inner and outer radius to create the "donut" effect
    center: ['50%', '50%'], // Center the chart
    avoidLabelOverlap: true,
    label: {
    show: true,
    position: 'outside',
    formatter: '{b}: {d}%', // Show percentage and name
    },
    labelLine: {
        show: true,
    },
    itemStyle: {
                  borderRadius: 5,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                labelLine: {
                  length: 8,
                  length2: 0,
                  maxSurfaceAngle: 80
                },
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
}

export const TITLE_ECHART = {
    left: "center",
    top: "10",
    style: {
              color: '#000',
              fontFamily: 'Arial, sans-serif',
              fontSize: '24px',
              fontWeight: '500',
            },
}

