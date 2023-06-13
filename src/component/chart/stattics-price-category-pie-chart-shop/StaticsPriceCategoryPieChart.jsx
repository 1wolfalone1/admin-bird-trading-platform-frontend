import { ResponsivePie } from "@nivo/pie";
import { data } from "./mock";
import React from "react";
const legends = [
   {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      itemTextColor: "#ffffff",
      symbolSize: 20,
      effects: [
         {
            on: "hover",
            style: {
               itemOpacity: 1,
            },
         },
      ],
   },
];
const themes = {
   fontSize: "1.6rem",
   axis: {
      fontSize: "10px",
      tickColor: "#eee",
      ticks: {
         line: {
            stroke: "#ababab",
         },
         text: {
            fill: "#97ff57",
         },
      },
      legend: {
         text: {
            fill: "#ffffff",
         },
      },
      domain: {
         text: {
            fill: "#ffffff",
         },
      },
      keys: {
         text: {
            fill: "#ffffff",
         },
      },
   },
   grid: {
      line: {
         stroke: "#d8d8d8",
      },
   },
};
export default function StaticsPriceCategoryPieChart({ data }) {
   return (
      <>
         {data ? (
            <ResponsivePie
               data={data}
               theme={themes}
               legends={legends}
               margin={{ top: 40, right: 90, bottom: 80, left: 100 }}
               innerRadius={0.5}
               padAngle={0.7}
               cornerRadius={3}
               activeOuterRadiusOffset={8}
               borderWidth={1}
               borderColor={{
                  from: "color",
                  modifiers: [["darker", 0.2]],
               }}
               arcLinkLabelsSkipAngle={10}
               arcLinkLabelsTextColor="#c3c3c3"
               arcLinkLabelsThickness={2}
               arcLinkLabelsColor={{ from: "color" }}
               arcLabelsSkipAngle={10}
               arcLabelsTextColor={{
                  from: "color",
                  modifiers: [["darker", 2]],
               }}
               defs={[
                  {
                     id: "dots",
                     type: "patternDots",
                     background: "inherit",
                     color: "rgba(255, 255, 255, 0.3)",
                     size: 4,
                     padding: 1,
                     stagger: true,
                  },
                  {
                     id: "lines",
                     type: "patternLines",
                     background: "inherit",
                     color: "rgba(255, 255, 255, 0.3)",
                     rotation: -45,
                     lineWidth: 6,
                     spacing: 10,
                  },
               ]}
               fill={[
                  {
                     match: {
                        id: "ruby",
                     },
                     id: "dots",
                  },
                  {
                     match: {
                        id: "c",
                     },
                     id: "dots",
                  },
                  {
                     match: {
                        id: "go",
                     },
                     id: "dots",
                  },
                  {
                     match: {
                        id: "python",
                     },
                     id: "dots",
                  },
                  {
                     match: {
                        id: "scala",
                     },
                     id: "lines",
                  },
                  {
                     match: {
                        id: "lisp",
                     },
                     id: "lines",
                  },
                  {
                     match: {
                        id: "elixir",
                     },
                     id: "lines",
                  },
                  {
                     match: {
                        id: "javascript",
                     },
                     id: "lines",
                  },
               ]}
            />
         ) : (
            ""
         )}
      </>
   );
}
