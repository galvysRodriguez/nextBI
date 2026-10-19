import { COLORS } from "../color";

export const OPTION_ECHART = {
  colors: COLORS,
  legend: {
    top: "bottom",
    padding: [20, 0, 0, 0], 
    textStyle: {
      fontSize: 12,
    },
  },
};

export const SERIE_ECHART = {
  name: "Valor",
  radius: ["50%", "70%"], 
  center: ["50%", "50%"], 
  avoidLabelOverlap: true,
  label: {
    show: true,
    position: "outside",
    formatter: "{b}: {d}%", 
  },
  labelLine: {
    show: true,
  },
  itemStyle: {
    borderRadius: 5,
    borderColor: "#fff",
    borderWidth: 2,
  },
  labelLine: {
    length: 8,
    length2: 0,
    maxSurfaceAngle: 80,
  },
  emphasis: {
    itemStyle: {
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowColor: "rgba(0, 0, 0, 0.5)",
    },
  },
};

export const TITLE_ECHART = {
  left: "center",
  top: "10",
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtextStyle: {
    fontSize: 14,
    color: "#888",
  },
};

export const STYLE_AXIS_ECHART = {
  nameLocation: "middle",
  nameGap: 30,
  nameTextStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
};
